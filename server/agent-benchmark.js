/**
 * KYC Form Hub — Agent benchmark harness.
 *
 * This script drives an external form-filling agent across every form URL in the
 * benchmark manifest. For each URL it writes the expected user profile to disk,
 * invokes the agent, and relies on the form's submit handler to record the run.
 *
 * Usage (from the agent project root):
 *   node ../kyc-form-hub/server/agent-benchmark.js \
 *     --agent-cmd "npx tsx src/index.ts fill" \
 *     --profile-out ./shared/user-profile.json \
 *     --agent-id my-agent \
 *     --manifest http://localhost:3000/api/agent-manifest
 *
 * Environment variables (fallbacks):
 *   AGENT_CMD     command to run the agent (must accept --url and --profile)
 *   AGENT_DIR     working directory in which to run the agent command
 *   PROFILE_OUT   path where the active profile JSON should be written
 *   AGENT_ID      identifier used to group benchmark runs
 *   MANIFEST_URL  URL of /api/agent-manifest
 *   API_BASE      base URL of the central orchestrator
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { execFileSync } = require('child_process');

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    parsed[key] = args[i + 1];
  }
  return parsed;
}

function getConfig() {
  const args = parseArgs();
  return {
    agentCmd: args['agent-cmd'] || process.env.AGENT_CMD,
    agentDir: args['agent-dir'] || process.env.AGENT_DIR || process.cwd(),
    profileOut: args['profile-out'] || process.env.PROFILE_OUT,
    agentId: args['agent-id'] || process.env.AGENT_ID || 'anonymous-agent',
    manifestUrl: args.manifest || process.env.MANIFEST_URL || 'http://localhost:3000/api/agent-manifest',
    apiBase: args['api-base'] || process.env.API_BASE || 'http://localhost:3000'
  };
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const req = client.get(url, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(new Error(`Failed to parse JSON from ${url}: ${err.message}`));
        }
      });
    });
    req.on('error', reject);
  });
}

function loadLocalProfiles() {
  const profilesPath = path.join(__dirname, '../forms/profiles.json');
  const raw = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
  const map = {};
  raw.profiles.forEach(p => { map[p.id] = p; });
  return map;
}

function writeProfile(profile, filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  // Flatten the profile so the agent receives the metadata plus all field values.
  const flat = { profileId: profile.id, profileName: profile.name, ...profile.data };
  fs.writeFileSync(filePath, JSON.stringify(flat, null, 2));
}

function appendAgentId(url, agentId) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}agentId=${encodeURIComponent(agentId)}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const config = getConfig();

  if (!config.agentCmd) {
    console.error('Error: --agent-cmd is required (or set AGENT_CMD).');
    process.exit(1);
  }
  if (!config.profileOut) {
    console.error('Error: --profile-out is required (or set PROFILE_OUT).');
    process.exit(1);
  }

  console.log(`Agent benchmark harness`);
  console.log(`  agentId:    ${config.agentId}`);
  console.log(`  agentDir:   ${config.agentDir}`);
  console.log(`  agentCmd:   ${config.agentCmd}`);
  console.log(`  profileOut: ${config.profileOut}`);
  console.log(`  manifest:   ${config.manifestUrl}\n`);

  const manifestRes = await fetchJson(config.manifestUrl);
  const manifest = manifestRes.manifest || [];
  const profiles = loadLocalProfiles();

  console.log(`Found ${manifest.length} form URLs. Starting benchmark...\n`);

  let completed = 0;
  let failed = 0;

  for (const entry of manifest) {
    const profile = profiles[entry.expectedProfile];
    if (!profile) {
      console.error(`❌ Unknown profile "${entry.expectedProfile}" for ${entry.variantId}`);
      failed++;
      continue;
    }

    writeProfile(profile, config.profileOut);
    const url = appendAgentId(entry.directUrl || entry.centralUrl, config.agentId);
    const cmd = `${config.agentCmd} --url "${url}" --profile "${config.profileOut}"`;

    console.log(`[${completed + failed + 1}/${manifest.length}] ${entry.variantId} → ${url}`);
    try {
      execSync(cmd, { cwd: config.agentDir, stdio: 'inherit' });
      completed++;
    } catch (err) {
      console.error(`❌ Agent failed for ${entry.variantId}: ${err.message}`);
      failed++;
    }

    // Small delay between forms to avoid hammering the servers.
    await sleep(500);
  }

  console.log(`\nBenchmark sweep complete: ${completed} completed, ${failed} failed.`);
  console.log(`\nView the aggregate report:`);
  console.log(`  ${config.apiBase}/api/benchmark/report?agentId=${encodeURIComponent(config.agentId)}`);
}

main().catch(err => {
  console.error('Harness error:', err.message);
  process.exit(1);
});
