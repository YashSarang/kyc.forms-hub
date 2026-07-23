/**
 * generate-form-links.js
 * Generates FORM_LINKS.md and form-links.json listing every form URL
 * in the KYC Form Hub — all 6 stacks × all scenarios × all 10 variants.
 *
 * Run: node server/generate-form-links.js
 */

const fs   = require('fs');
const path = require('path');

// Load modules (scenarios + variants + distribution)
const scenarios  = require('./scenarios');
const { VARIANTS_PER_SCENARIO, getVariantProfileId } = require('./variants');
const { STACKS, getStackForms, getStackPort }         = require('./distribution');
const { CONFIG } = require('./config');

const BASE_URL = CONFIG.publicBaseUrl;

const STACK_META = {
  html:    { emoji: '🌐', theme: 'Sky Blue',      color: '#0ea5e9' },
  react:   { emoji: '⚛️', theme: 'Cyan Electric', color: '#06b6d4' },
  angular: { emoji: '🅰️', theme: 'Angular Red',   color: '#e11d48' },
  vue:     { emoji: '💚', theme: 'Emerald Vue',    color: '#059669' },
  php:     { emoji: '🐘', theme: 'Indigo Violet',  color: '#7c3aed' },
  flask:   { emoji: '🐍', theme: 'Amber Python',   color: '#d97706' },
};

// ──────────────────────────────────────────────
// Build structured data
// ──────────────────────────────────────────────
const scenarioList = scenarios.listScenarios();

const allLinks = [];

STACKS.forEach(stack => {
  const port       = getStackPort(stack.id);
  const meta       = STACK_META[stack.id];
  const stackForms = getStackForms(stack.id);   // variant IDs assigned to this stack

  scenarioList.forEach(scenario => {
    for (let v = 1; v <= VARIANTS_PER_SCENARIO; v++) {
      const variantId    = `${scenario.id}-v${v}`;
      const profileId    = getVariantProfileId(scenario.id, v);
      const centralUrl   = `${BASE_URL}/form/${stack.id}/${scenario.id}/v${v}`;
      const directBase   = BASE_URL.replace(/:\d+$/, '');
      const directUrl    = `${directBase}:${port}/form/${scenario.id}/v${v}`;
      const isAssigned   = stackForms.includes(variantId);

      allLinks.push({
        stack:       stack.id,
        stackName:   stack.name,
        stackTheme:  meta.theme,
        stackEmoji:  meta.emoji,
        port,
        scenarioId:  scenario.id,
        scenarioName:scenario.name,
        level:       scenario.level,
        variantIndex: v,
        variantId,
        profile:     profileId,
        isAssigned,           // whether this stack owns this variant (vs mirrors)
        centralUrl,           // always works (served by main orchestrator)
        directUrl             // only valid when that stack's server is running
      });
    }
  });
});

// ──────────────────────────────────────────────
// Write form-links.json
// ──────────────────────────────────────────────
const jsonOutput = {
  generated:    new Date().toISOString(),
  description:  'All KYC Form Hub form URLs across 6 stacks, 15 scenarios, 10 variants each (900 total central URLs).',
  baseUrl:      BASE_URL,
  note:         'Regenerate this file after changing PUBLIC_BASE_URL or stack ports.',
  stacks: STACKS.map(s => ({
    id:    s.id,
    name:  s.name,
    theme: STACK_META[s.id].theme,
    emoji: STACK_META[s.id].emoji,
    port:  s.port,
    share: `${Math.round(s.share * 100)}%`
  })),
  totalForms:  allLinks.length,
  forms:       allLinks
};

const jsonPath = path.join(__dirname, '..', 'form-links.json');
fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2));
console.log(`✅ Wrote ${allLinks.length} entries → form-links.json`);

// ──────────────────────────────────────────────
// Write FORM_LINKS.md
// ──────────────────────────────────────────────
const mdLines = [];

mdLines.push('# KYC Form Hub — Complete Form Links');
mdLines.push('');
mdLines.push('> **Generated:** ' + new Date().toISOString());
mdLines.push('> **Purpose:** This file lists every form URL in the KYC Form Hub for consumption by form-filling agents.');
mdLines.push(`> **Base URL:** \`${BASE_URL}\` (central orchestrator)`);
mdLines.push('');
mdLines.push('---');
mdLines.push('');
mdLines.push('## Quick Reference — Stack Index Pages (Baseline Forms)');
mdLines.push('');
mdLines.push('Each stack\'s `index.html` serves the full canonical KYC form in that stack\'s visual identity:');
mdLines.push('');
mdLines.push('| Stack | Theme | Color | Index URL | Port |');
mdLines.push('|-------|-------|-------|-----------|------|');
STACKS.forEach(s => {
  const m = STACK_META[s.id];
  mdLines.push(`| ${m.emoji} ${s.name} | **${m.theme}** | \`${m.color}\` | [\`/stacks/${s.id}/index.html\`](${BASE_URL}/stacks/${s.id}/index.html) | ${s.port} |`);
});
mdLines.push('');
mdLines.push('---');
mdLines.push('');
mdLines.push('## Agent Entry Points');
mdLines.push('');
mdLines.push('| Resource | URL | Description |');
mdLines.push('|----------|-----|-------------|');
mdLines.push(`| Agent Portal | [/agent-portal](${BASE_URL}/agent-portal) | Human-readable dashboard of all forms |`);
mdLines.push(`| JSON Manifest | [/api/agent-manifest](${BASE_URL}/api/agent-manifest) | Machine-readable manifest of all assigned variants |`);
mdLines.push(`| Profiles API | [/api/profiles](${BASE_URL}/api/profiles) | User profile data (Profile A & B) |`);
mdLines.push(`| Scenarios API | [/api/scenarios](${BASE_URL}/api/scenarios) | All scenario definitions |`);
mdLines.push(`| Canonical Fields | [/api/canonical-fields](${BASE_URL}/api/canonical-fields) | Full field schema |`);
mdLines.push('');
mdLines.push('---');
mdLines.push('');
mdLines.push('## All Dynamic Scenario Variants');
mdLines.push('');
mdLines.push('**Format:** `centralUrl` is always available via the orchestrator. `directUrl` requires the per-stack server to be running.');
mdLines.push('');
mdLines.push('**Profile A** = Rajesh Kumar Sharma &nbsp;|&nbsp; **Profile B** = Priya Sharma');
mdLines.push('');

// Group by stack → scenario
STACKS.forEach(stack => {
  const meta = STACK_META[stack.id];
  mdLines.push(`### ${meta.emoji} ${stack.name} — *${meta.theme}*`);
  mdLines.push('');
  mdLines.push(`> Port: **${stack.port}** &nbsp;·&nbsp; Market Share: **${Math.round(stack.share * 100)}%** &nbsp;·&nbsp; Theme Color: \`${meta.color}\``);
  mdLines.push('');
  mdLines.push('| Scenario | Level | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 |');
  mdLines.push('|----------|-------|----|----|----|----|----|----|----|----|----|-----|');

  scenarioList.forEach(scenario => {
    const cells = [];
    for (let v = 1; v <= VARIANTS_PER_SCENARIO; v++) {
      const profile = getVariantProfileId(scenario.id, v);
      const url     = `${BASE_URL}/form/${stack.id}/${scenario.id}/v${v}`;
      cells.push(`[v${v}·${profile}](${url})`);
    }
    mdLines.push(`| **${scenario.id}** | L${scenario.level} | ${cells.join(' | ')} |`);
  });

  mdLines.push('');
});

mdLines.push('---');
mdLines.push('');
mdLines.push('## Flat URL List (All Central URLs)');
mdLines.push('');
mdLines.push('All `' + allLinks.length + '` central URLs in order (stack → scenario → variant):');
mdLines.push('');

allLinks.forEach(entry => {
  mdLines.push(`- \`${entry.centralUrl}\` · Profile ${entry.profile}`);
});

mdLines.push('');
mdLines.push('---');
mdLines.push('');
mdLines.push('## Verification API');
mdLines.push('');
mdLines.push('After filling any form, POST to verify:');
mdLines.push('');
mdLines.push('```');
mdLines.push(`POST ${BASE_URL}/api/verify-submission`);
mdLines.push('Content-Type: application/json');
mdLines.push('');
mdLines.push('{');
mdLines.push('  "scenarioId": "baseline",');
mdLines.push('  "variantId":  "baseline-v1",');
mdLines.push('  "data": { ...form fields... }');
mdLines.push('}');
mdLines.push('```');
mdLines.push('');
mdLines.push('Response includes a `score` (0–100) and per-field accuracy report.');
mdLines.push('');

const mdPath = path.join(__dirname, '..', 'FORM_LINKS.md');
fs.writeFileSync(mdPath, mdLines.join('\n'));
console.log(`✅ Wrote FORM_LINKS.md`);
console.log(`\n📊 Summary:`);
console.log(`   Stacks:    ${STACKS.length}`);
console.log(`   Scenarios: ${scenarioList.length}`);
console.log(`   Variants:  ${VARIANTS_PER_SCENARIO} per scenario`);
console.log(`   Total URL entries: ${allLinks.length}`);
