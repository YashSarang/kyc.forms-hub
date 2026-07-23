const express = require('express');
const cors = require('cors');
const path = require('path');
const { router: evaluationRouter } = require('./routes/evaluation');
const benchmarkRouter = require('./routes/benchmark');
const scenarios = require('./scenarios');
const { renderStackForm } = require('./form-renderers');
const { STACKS, getStackPort, getStackForms, getDistributionSummary } = require('./distribution');
const { getAllProfiles, getProfile, getVariant } = require('./variants');
const { CONFIG, VALID_STACKS } = require('./config');

const app = express();

if (CONFIG.trustProxy) app.set('trust proxy', true);

app.use(cors({ origin: CONFIG.corsOrigin }));
app.use(express.json({ limit: CONFIG.jsonLimit }));
app.use(express.urlencoded({ extended: true }));

// Minimal security headers for production hosting without adding complexity.
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

function validateStack(stack) {
  if (!VALID_STACKS.includes(stack)) {
    return `Invalid stack '${stack}'. Valid: ${VALID_STACKS.join(', ')}`;
  }
  return null;
}

// Serve full baseline forms at legacy stack URLs (variant v1 / Profile A)
app.get('/stacks/:stack/index.html', (req, res) => {
  const stack = req.params.stack;
  const error = validateStack(stack);
  if (error) return res.status(400).send(error);
  const variant = getVariant('baseline', 1);
  if (!variant) return res.status(404).send("Scenario 'baseline' not found");
  res.set('Content-Type', 'text/html');
  res.send(renderStackForm(variant, stack, ''));
});

// Dynamically render scenario forms for any supported stack (defaults to variant v1 / Profile A)
app.get('/form/:stack/:scenarioId', (req, res) => {
  const { stack, scenarioId } = req.params;
  const error = validateStack(stack);
  if (error) return res.status(400).send(error);
  const variant = getVariant(scenarioId, 1);
  if (!variant) {
    return res.status(404).send(`Scenario '${scenarioId}' not found`);
  }
  res.set('Content-Type', 'text/html');
  res.send(renderStackForm(variant, stack, ''));
});

// Render a specific variant on the central orchestrator
app.get('/form/:stack/:scenarioId/v:variantIndex', (req, res) => {
  const { stack, scenarioId, variantIndex } = req.params;
  const error = validateStack(stack);
  if (error) return res.status(400).send(error);
  const variant = getVariant(scenarioId, parseInt(variantIndex, 10));
  if (!variant) {
    return res.status(404).send(`Scenario '${scenarioId}' variant ${variantIndex} not found`);
  }
  res.set('Content-Type', 'text/html');
  res.send(renderStackForm(variant, stack, ''));
});

app.get('/stacks/:stack/', (req, res) => {
  res.redirect(`/stacks/${req.params.stack}/index.html`);
});

app.use('/stacks', express.static(path.join(__dirname, 'stacks'), { index: false }));

app.use('/api', evaluationRouter);
app.use('/api/benchmark', benchmarkRouter);

// Agent-facing profile APIs
app.get('/api/profiles', (req, res) => {
  res.json({ success: true, profiles: getAllProfiles() });
});

app.get('/api/profiles/:id', (req, res) => {
  const profile = getProfile(req.params.id);
  if (!profile) return res.status(404).json({ success: false, error: 'Profile not found' });
  res.json({ success: true, profile });
});

// Agent manifest: every form URL an agent must fill, with expected profile
app.get('/api/agent-manifest', (req, res) => {
  const manifest = [];
  STACKS.forEach(stack => {
    const port = getStackPort(stack.id);
    getStackForms(stack.id).forEach(variantId => {
      const match = variantId.match(/^(.+)-v(\d+)$/);
      if (!match) return;
      const [, scenarioId, variantIndex] = match;
      const variant = getVariant(scenarioId, parseInt(variantIndex, 10));
      if (!variant) return;
      manifest.push({
        variantId,
        scenarioId,
        variantIndex: parseInt(variantIndex, 10),
        stack: stack.id,
        stackName: stack.name,
        expectedProfile: variant.expectedProfile,
        centralUrl: `${CONFIG.publicBaseUrl}/form/${stack.id}/${scenarioId}/v${variantIndex}`,
        directUrl: `${CONFIG.publicBaseUrl.replace(/:\d+$/, '')}:${port}/form/${scenarioId}/v${variantIndex}`
      });
    });
  });
  res.json({ success: true, count: manifest.length, manifest });
});

// Human-friendly agent portal
app.get('/agent-portal', (req, res) => {
  const profilesList = getAllProfiles();
  const profileBadges = profilesList.map(p =>
    `<span class="badge profile-${p.id.toLowerCase()}">Profile ${p.id}: ${p.name}</span>`
  ).join(' ');

  const rows = [];
  STACKS.forEach(stack => {
    const port = getStackPort(stack.id);
    getStackForms(stack.id).forEach(variantId => {
      const match = variantId.match(/^(.+)-v(\d+)$/);
      if (!match) return;
      const [, scenarioId, variantIndex] = match;
      const variant = getVariant(scenarioId, parseInt(variantIndex, 10));
      if (!variant) return;
      const profile = variant.expectedProfile;
      const directBase = CONFIG.publicBaseUrl.replace(/:\d+$/, '');
      rows.push(`
        <tr>
          <td>${scenarioId}</td>
          <td>v${variantIndex}</td>
          <td><span class="stack stack-${stack.id}">${stack.name}</span></td>
          <td><span class="profile profile-${profile.toLowerCase()}">Profile ${profile}</span></td>
          <td>
            <a href="/form/${stack.id}/${scenarioId}/v${variantIndex}">Central</a>
            <a href="${directBase}:${port}/form/${scenarioId}/v${variantIndex}">Direct</a>
          </td>
        </tr>
      `);
    });
  });

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Agent Entry Portal — KYC Form Hub</title>
      <style>
        body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; }
        .card { background: #1e293b; border-radius: 12px; padding: 25px; max-width: 1200px; margin: 0 auto; }
        h1 { color: #38bdf8; }
        h2 { color: #94a3b8; font-size: 1.1rem; margin-top: 24px; }
        a { color: #60a5fa; text-decoration: none; font-weight: 600; margin-right: 12px; }
        a:hover { text-decoration: underline; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; margin-right: 8px; }
        .profile-a { background: #065f46; color: #a7f3d0; }
        .profile-b { background: #7c2d12; color: #fed7aa; }
        .stack { display: inline-block; background: #334155; color: #cbd5e1; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #334155; }
        th { color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; }
        .api { color: #a7f3d0; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🤖 Agent Entry Portal</h1>
        <p>This is the single entry point for autonomous form-filling agents. Each row links to one form variant and shows which user profile values are expected.</p>
        <p>${profileBadges}</p>
        <p>
          <a href="/api/agent-manifest">Download JSON Manifest</a>
          <a href="/api/profiles">View Profiles API</a>
          <a href="/">Back to Server Home</a>
        </p>
        <h2>All ${rows.length} Form Variants</h2>
        <table>
          <thead>
            <tr><th>Scenario</th><th>Variant</th><th>Stack</th><th>Expected Profile</th><th>Links</th></tr>
          </thead>
          <tbody>
            ${rows.join('\n')}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `);
});

app.get('/', (req, res) => {
  const list = scenarios.listScenarios();
  const scenarioLinks = list.map(s =>
    `<li><a href="/form/html/${s.id}">${s.name}</a> — <a href="/form/html/${s.id}">HTML</a> · <a href="/form/react/${s.id}">React</a> · <a href="/form/angular/${s.id}">Angular</a> · <a href="/form/vue/${s.id}">Vue</a> · <a href="/form/php/${s.id}">PHP</a> · <a href="/form/flask/${s.id}">Flask</a></li>`
  ).join('\n');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>KYC Form Hub Benchmark Server</title>
      <style>
        body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; }
        .card { background: #1e293b; border-radius: 12px; padding: 25px; max-width: 900px; margin: 0 auto; }
        h1 { color: #38bdf8; }
        h2 { color: #94a3b8; font-size: 1.1rem; margin-top: 24px; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 8px; }
        a { color: #60a5fa; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
        .tag { display: inline-block; background: #334155; color: #cbd5e1; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; margin-left: 6px; }
        .api { color: #a7f3d0; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>KYC Form Hub Benchmark Server</h1>
        <p>Web-stack form variants for agent evaluation. Each scenario is rendered across all 6 target stacks.</p>
        <p><a href="/agent-portal" style="font-size:1.1rem">🤖 Open Agent Entry Portal</a> — the single URL list for form-filling agents.</p>
        <h2>Scenario Variants</h2>
        <ul>
          ${scenarioLinks}
        </ul>
        <h2>Legacy Baseline Forms</h2>
        <ul>
          <li>🔗 <a href="/stacks/html/index.html">Plain HTML / jQuery</a> <span class="tag">20%</span></li>
          <li>🔗 <a href="/stacks/react/index.html">React / Next.js</a> <span class="tag">30%</span></li>
          <li>🔗 <a href="/stacks/angular/index.html">Angular Reactive</a> <span class="tag">15%</span></li>
          <li>🔗 <a href="/stacks/vue/index.html">Vue.js</a> <span class="tag">10%</span></li>
          <li>🔗 <a href="/stacks/php/index.html">PHP Server-Rendered</a> <span class="tag">15%</span></li>
          <li>🔗 <a href="/stacks/flask/index.html">Flask / Python</a> <span class="tag">10%</span></li>
        </ul>
        <h2>Stack Servers (Ports)</h2>
        <ul>
          ${STACKS.map(s => `<li><a href="${CONFIG.publicBaseUrl.replace(/:\d+$/, '')}:${s.port}">${s.name}</a> — port ${s.port} · ${Math.round(s.share * 100)}% share</li>`).join('\n          ')}
        </ul>
        <h2>API Endpoints</h2>
        <ul>
          <li class="api">GET <a href="/health">/health</a> — health check</li>
          <li class="api">GET <a href="/api/scenarios">/api/scenarios</a> — list all scenarios</li>
          <li class="api">GET <a href="/api/scenarios/baseline">/api/scenarios/:id</a> — scenario details & ground truth</li>
          <li class="api">GET <a href="/api/canonical-fields">/api/canonical-fields</a> — canonical field definitions</li>
          <li class="api">GET <a href="/api/distribution">/api/distribution</a> — market-share distribution of all 225 forms</li>
          <li class="api">POST /api/verify-submission — evaluate a submission (body: { scenarioId, variantId?, data })</li>
          <li class="api">POST /api/benchmark/run — record an agent run</li>
          <li class="api">GET <a href="/api/benchmark/report">/api/benchmark/report</a> — aggregate benchmark report</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// Health check endpoint for load balancers / container orchestrators.
app.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok', uptime: process.uptime() });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Generic error handler — keeps responses JSON and avoids leaking stack traces in production.
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const message = CONFIG.nodeEnv === 'production' ? 'Internal server error' : err.message;
  res.status(err.status || 500).json({ success: false, error: message });
});

const server = app.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`KYC Form Hub server running on http://${CONFIG.host}:${CONFIG.port}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = { app, server };
