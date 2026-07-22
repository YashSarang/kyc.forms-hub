const express = require('express');
const router = express.Router();
const scenarios = require('../scenarios');
const { getVariant } = require('../variants');
const { evaluateSubmission } = require('./evaluation');

const runs = [];

router.post('/run', (req, res) => {
  const { agentId, agentName, scenarioId, variantId, stack, startTime, endTime, data, metadata } = req.body;

  if (!scenarioId) {
    return res.status(400).json({ success: false, error: 'scenarioId is required' });
  }

  let scenario;
  if (variantId) {
    const match = variantId.match(/^(.+)-v(\d+)$/);
    if (match) scenario = getVariant(match[1], parseInt(match[2], 10));
  }
  if (!scenario) {
    scenario = scenarios.getScenario(scenarioId);
  }

  if (!scenario) {
    return res.status(404).json({ success: false, error: `Scenario '${scenarioId}' not found` });
  }

  const report = evaluateSubmission(data || {}, scenario.groundTruth, scenario);

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

  runs.push(run);

  res.json({ success: true, run });
});

router.get('/report', (req, res) => {
  const { agentId, scenarioId, variantId, stack } = req.query;
  let filtered = runs;
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
    minScore: Math.min(...scores),
    maxScore: Math.max(...scores),
    passRatePercent: Math.round((filtered.filter(r => r.report.score >= 80).length / filtered.length) * 100),
    byScenario: Object.fromEntries(Object.entries(byScenario).map(([k, v]) => [k, avg(v)])),
    byVariant: Object.fromEntries(Object.entries(byVariant).map(([k, v]) => [k, avg(v)])),
    byStack: Object.fromEntries(Object.entries(byStack).map(([k, v]) => [k, avg(v)]))
  };

  res.json({ success: true, count: filtered.length, aggregate, runs: filtered });
});

module.exports = router;
