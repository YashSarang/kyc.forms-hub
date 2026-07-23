const express = require('express');
const path = require('path');
const { renderStackForm, STACK_META } = require('./form-renderers');
const { getVariant, listScenariosWithVariants, getVariantProfileId } = require('./variants');
const { getStackForms, getStackPort, getStackMeta } = require('./distribution');

function createStackServer(stackId, centralApiBaseUrl) {
  const resolvedApiUrl = centralApiBaseUrl || process.env.CENTRAL_API_URL || 'http://localhost:3000';
  const app = express();
  const meta = getStackMeta(stackId);
  const theme = STACK_META[stackId];
  if (!meta) throw new Error(`Unknown stack: ${stackId}`);
  if (!theme) throw new Error(`Missing theme metadata for stack: ${stackId}`);

  const assignedForms = getStackForms(stackId);

  app.get('/', (req, res) => {
    const grouped = {};
    assignedForms.forEach(variantId => {
      const [scenarioId, v] = variantId.split('-v');
      if (!grouped[scenarioId]) grouped[scenarioId] = [];
      grouped[scenarioId].push(v);
    });

    const scenarioLinks = Object.entries(grouped).map(([scenarioId, variants]) => {
      const variantLinks = variants.map(v => {
        const profile = getVariantProfileId(scenarioId, parseInt(v, 10));
        return `<a href="/form/${scenarioId}/v${v}">v${v}</a><span class="profile-tag profile-${profile.toLowerCase()}">${profile}</span>`;
      }).join(' ');
      return `<li><strong>${scenarioId}</strong>: ${variantLinks}</li>`;
    }).join('\n        ');

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${meta.name} Benchmark Server</title>
        <style>
          body { font-family: system-ui, sans-serif; background: ${theme.bg}; color: #f8fafc; padding: 40px; }
          .card { background: ${adjustColor(theme.bg, 20)}; border-radius: 12px; padding: 25px; max-width: 900px; margin: 0 auto; border: 1px solid ${theme.accent}; }
          h1 { color: ${theme.color}; }
          h2 { color: #94a3b8; font-size: 1.1rem; margin-top: 24px; }
          ul { list-style: none; padding: 0; }
          li { margin-bottom: 8px; }
          a { color: #60a5fa; text-decoration: none; font-weight: 600; margin-right: 4px; }
          a:hover { text-decoration: underline; }
          .badge { display: inline-block; background: ${theme.accent}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; }
          .profile-tag { display: inline-block; font-size: 0.65rem; padding: 1px 5px; border-radius: 4px; margin-right: 8px; vertical-align: middle; }
          .profile-a { background: #065f46; color: #a7f3d0; }
          .profile-b { background: #7c2d12; color: #fed7aa; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">${meta.name} (${Math.round(meta.share * 100)}% share) · Port ${meta.port}</span>
          <h1>${meta.name} Form Server</h1>
          <p>Total forms assigned: <strong>${assignedForms.length}</strong></p>
          <p>Central API: <code>${resolvedApiUrl}</code></p>
          <h2>Assigned Forms</h2>
          <ul>
            ${scenarioLinks}
          </ul>
          <h2>API</h2>
          <ul>
            <li>GET <a href="/api/forms">/api/forms</a> — list assigned variant IDs</li>
          </ul>
        </div>
      </body>
      </html>
    `);
  });

  app.get('/form/:scenarioId/v:variantIndex', (req, res) => {
    const { scenarioId, variantIndex } = req.params;
    const variantId = `${scenarioId}-v${variantIndex}`;
    if (!assignedForms.includes(variantId)) {
      return res.status(404).send(`Variant ${variantId} is not assigned to ${stackId} stack`);
    }
    const variant = getVariant(scenarioId, parseInt(variantIndex, 10));
    if (!variant) return res.status(404).send('Scenario not found');
    res.set('Content-Type', 'text/html');
    res.send(renderStackForm(variant, stackId, resolvedApiUrl));
  });

  app.get('/api/forms', (req, res) => {
    const forms = assignedForms.map(variantId => {
      const match = variantId.match(/^(.+)-v(\d+)$/);
      return {
        variantId,
        scenarioId: match ? match[1] : variantId,
        variantIndex: match ? parseInt(match[2], 10) : null,
        expectedProfile: match ? getVariantProfileId(match[1], parseInt(match[2], 10)) : null,
        url: `/form/${match ? match[1] : variantId}/v${match ? match[2] : ''}`
      };
    });
    res.json({
      success: true,
      stack: stackId,
      port: meta.port,
      share: meta.share,
      count: assignedForms.length,
      forms
    });
  });

  app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Endpoint not found' });
  });

  return app;
}

function adjustColor(hex, percent) {
  if (!hex || hex.length !== 7) return '#1e293b';
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

module.exports = { createStackServer };
