const http = require('http');
const https = require('https');
const { URL } = require('url');
const scenarios = require('./scenarios');
const { getVariant } = require('./variants');
const { CONFIG } = require('./config');

const arg = process.argv[2] || 'baseline';
let scenarioId = arg;
let variantId = null;
const variantMatch = arg.match(/^(.+)-v(\d+)$/);

let scenario;
if (variantMatch) {
  scenarioId = variantMatch[1];
  scenario = getVariant(scenarioId, parseInt(variantMatch[2], 10));
  if (!scenario) {
    console.error(`Variant '${arg}' not found`);
    process.exit(1);
  }
  variantId = scenario.variantId;
} else {
  scenario = scenarios.getScenario(scenarioId);
}

if (!scenario) {
  console.error(`Scenario '${scenarioId}' not found`);
  process.exit(1);
}

const testPayload = JSON.stringify({
  scenarioId: scenario.id,
  variantId,
  data: scenario.groundTruth
});

const apiUrl = new URL('/api/verify-submission', CONFIG.publicBaseUrl);
const client = apiUrl.protocol === 'https:' ? https : http;
const options = {
  hostname: apiUrl.hostname,
  port: apiUrl.port || (apiUrl.protocol === 'https:' ? 443 : 80),
  path: apiUrl.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testPayload)
  }
};

const req = client.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`Server returned ${res.statusCode}: ${body}`);
      process.exit(1);
    }
    console.log(`--- Verification Result for scenario '${scenarioId}' ---`);
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch (err) {
      console.error('Invalid JSON response:', body);
      process.exit(1);
    }
    console.log('Score:', parsed.report?.score);
    console.log('Metrics:', parsed.report?.metrics);
    if (parsed.success && parsed.report.score === 100) {
      console.log('✅ 100% VERIFICATION PASSED');
      process.exit(0);
    } else {
      console.error('❌ VERIFICATION FAILED OR INCOMPLETE');
      console.error(parsed.report?.details);
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.error('Server offline or request failed:', err.message);
  process.exit(1);
});

req.write(testPayload);
req.end();
