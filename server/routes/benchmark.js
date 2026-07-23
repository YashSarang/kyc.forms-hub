const express = require('express');
const router = express.Router();
const scenarios = require('../scenarios');
const { getVariant } = require('../variants');
const { evaluateSubmission } = require('./evaluation');
const { addRun, getRuns } = require('../benchmark-storage');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseVariant(variantId) {
  const match = variantId ? variantId.match(/^(.+)-v(\d+)$/) : null;
  return match ? { scenarioId: match[1], variantIndex: parseInt(match[2], 10) } : null;
}

router.post('/run', (req, res) => {
  const { agentId, agentName, scenarioId, variantId, stack, startTime, endTime, data, metadata } = req.body;

  if (!scenarioId || typeof scenarioId !== 'string') {
    return res.status(400).json({ success: false, error: 'scenarioId is required' });
  }

  let scenario = null;
  const parsed = parseVariant(variantId);
  if (parsed) {
    scenario = getVariant(parsed.scenarioId, parsed.variantIndex);
  }
  if (!scenario) {
    scenario = scenarios.getScenario(scenarioId);
  }

  if (!scenario) {
    return res.status(404).json({ success: false, error: `Scenario '${scenarioId}' not found` });
  }

  const submission = data && typeof data === 'object' ? data : {};
  const report = evaluateSubmission(submission, scenario.groundTruth, scenario);

  const run = {
    runId: `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    agentId: agentId || 'anonymous-agent',
    agentName: agentName || 'Unknown Agent',
    scenarioId: scenario.id,
    variantId: variantId || null,
    expectedProfile: scenario.expectedProfile || null,
    stack: stack || 'unknown',
    startTime: startTime || new Date(Date.now() - 1000).toISOString(),
    endTime: endTime || new Date().toISOString(),
    durationMs: endTime && startTime ? new Date(endTime) - new Date(startTime) : null,
    report,
    metadata: metadata || {}
  };

  addRun(run);

  res.json({ success: true, run });
});

router.get('/report', (req, res) => {
  const { agentId, scenarioId, variantId, stack, format } = req.query;
  let filtered = getRuns();
  if (agentId) filtered = filtered.filter(r => r.agentId === agentId);
  if (scenarioId) filtered = filtered.filter(r => r.scenarioId === scenarioId);
  if (variantId) filtered = filtered.filter(r => r.variantId === variantId);
  if (stack) filtered = filtered.filter(r => r.stack === stack);

  if (filtered.length === 0) {
    return res.json({ success: true, count: 0, aggregate: null, runs: [] });
  }

  const scores = filtered.map(r => r.report.score);
  const accuracy = filtered.map(r => r.report.metrics.accuracyPercent);
  const completeness = filtered.map(r => r.report.metrics.completenessPercent);
  const safety = filtered.map(r => r.report.metrics.safetyPercent);

  const avg = arr => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const sum = arr => arr.reduce((a, b) => a + b, 0);

  const byScenario = {};
  const byVariant = {};
  const byStack = {};
  filtered.forEach(r => {
    byScenario[r.scenarioId] = byScenario[r.scenarioId] || [];
    byScenario[r.scenarioId].push(r.report.score);
    if (r.variantId) {
      byVariant[r.variantId] = byVariant[r.variantId] || [];
      byVariant[r.variantId].push(r.report.score);
    }
    byStack[r.stack] = byStack[r.stack] || [];
    byStack[r.stack].push(r.report.score);
  });

  const aggregate = {
    totalRuns: filtered.length,
    averageScore: avg(scores),
    averageAccuracy: avg(accuracy),
    averageCompleteness: avg(completeness),
    averageSafety: avg(safety),
    totalDurationMs: sum(filtered.map(r => r.durationMs || 0)),
    minScore: Math.min(...scores),
    maxScore: Math.max(...scores),
    passRatePercent: Math.round((filtered.filter(r => r.report.score >= 80).length / filtered.length) * 100),
    byScenario: Object.fromEntries(Object.entries(byScenario).map(([k, v]) => [k, avg(v)])),
    byVariant: Object.fromEntries(Object.entries(byVariant).map(([k, v]) => [k, avg(v)])),
    byStack: Object.fromEntries(Object.entries(byStack).map(([k, v]) => [k, avg(v)]))
  };

  // Human-friendly HTML view for quick inspection without writing a client.
  if (format === 'html') {
    const rows = filtered.map(r => `
      <tr>
        <td>${escapeHtml(r.agentId)}</td>
        <td>${escapeHtml(r.scenarioId)}</td>
        <td>${escapeHtml(r.variantId || '-')}</td>
        <td>${escapeHtml(r.stack)}</td>
        <td>${r.report.score}</td>
        <td>${r.report.metrics.accuracyPercent}</td>
        <td>${r.report.metrics.completenessPercent}</td>
        <td>${r.report.metrics.safetyPercent}</td>
        <td>${r.durationMs != null ? r.durationMs + 'ms' : '-'}</td>
      </tr>
    `).join('');

    return res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Benchmark Report — KYC Form Hub</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; }
    .card { background: #1e293b; border-radius: 12px; padding: 25px; max-width: 1200px; margin: 0 auto; }
    h1 { color: #38bdf8; }
    h2 { color: #94a3b8; font-size: 1.1rem; margin-top: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #334155; }
    th { color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; }
    .metric { display: inline-block; background: #334155; padding: 6px 12px; border-radius: 6px; margin-right: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>📈 Benchmark Report</h1>
    <p>Filter with <code>?agentId=...</code>, <code>?scenarioId=...</code>, <code>?variantId=...</code>, <code>?stack=...</code>. Currently showing ${filtered.length} run(s).</p>
    <div>
      <span class="metric">Runs: ${aggregate.totalRuns}</span>
      <span class="metric">Avg Score: ${aggregate.averageScore}</span>
      <span class="metric">Avg Accuracy: ${aggregate.averageAccuracy}%</span>
      <span class="metric">Avg Completeness: ${aggregate.averageCompleteness}%</span>
      <span class="metric">Avg Safety: ${aggregate.averageSafety}%</span>
      <span class="metric">Pass Rate: ${aggregate.passRatePercent}%</span>
    </div>
    <h2>Runs</h2>
    <table>
      <thead>
        <tr><th>Agent</th><th>Scenario</th><th>Variant</th><th>Stack</th><th>Score</th><th>Accuracy</th><th>Completeness</th><th>Safety</th><th>Duration</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
</body>
</html>`);
  }

  res.json({ success: true, count: filtered.length, aggregate, runs: filtered });
});

module.exports = router;
