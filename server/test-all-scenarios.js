/**
 * Smoke test that verifies every scenario variant against its own ground truth.
 *
 * Run: npm run test:all
 * (Requires the central orchestrator to be running.)
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');
const scenarios = require('./scenarios');
const { getVariant, VARIANTS_PER_SCENARIO } = require('./variants');
const { CONFIG } = require('./config');

function postVerify(scenario) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      scenarioId: scenario.id,
      variantId: scenario.variantId || null,
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
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ scenario: scenario.id, variantId: scenario.variantId, statusCode: res.statusCode, ...parsed });
        } catch (err) {
          reject(new Error(`Invalid JSON for ${scenario.id}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  const list = scenarios.listScenarios();
  let passed = 0;
  let failed = 0;

  for (const s of list) {
    for (let v = 1; v <= VARIANTS_PER_SCENARIO; v++) {
      const variant = getVariant(s.id, v);
      if (!variant) {
        console.error(`❌ ${s.id} v${v}: could not resolve variant`);
        failed++;
        continue;
      }
      try {
        const result = await postVerify(variant);
        if (result.success && result.report && result.report.score === 100) {
          console.log(`✅ ${variant.variantId}: 100`);
          passed++;
        } else {
          console.error(`❌ ${variant.variantId}: score=${result.report?.score}`);
          failed++;
        }
      } catch (err) {
        console.error(`❌ ${variant.variantId}: ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\nTotal: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Test suite error:', err.message);
  process.exit(1);
});
