/**
 * Lightweight benchmark run storage.
 *
 * Defaults to an in-memory array (simplest possible). When BENCHMARK_STORAGE_PATH
 * is set, runs are persisted to a JSON file so they survive restarts. This is
 * intentionally lightweight — a temporary diagnostic aid for users improving their
 * form-filling agents, not a long-term analytics store.
 */

const fs = require('fs');
const path = require('path');
const { CONFIG, resolveProjectPath } = require('./config');

let runs = [];
let storagePath = '';

function initStorage() {
  if (CONFIG.benchmarkStoragePath) {
    storagePath = resolveProjectPath(CONFIG.benchmarkStoragePath);
    try {
      fs.mkdirSync(path.dirname(storagePath), { recursive: true });
      if (fs.existsSync(storagePath)) {
        const raw = fs.readFileSync(storagePath, 'utf8');
        const parsed = JSON.parse(raw);
        runs = Array.isArray(parsed) ? parsed : (parsed.runs || []);
        console.log(`Loaded ${runs.length} benchmark runs from ${storagePath}`);
      }
    } catch (err) {
      console.warn('Failed to load benchmark storage:', err.message);
      runs = [];
    }
  }
}

function persist() {
  if (!storagePath) return;
  try {
    fs.mkdirSync(path.dirname(storagePath), { recursive: true });
    fs.writeFileSync(storagePath, JSON.stringify(runs, null, 2));
  } catch (err) {
    console.warn('Failed to persist benchmark runs:', err.message);
  }
}

function addRun(run) {
  runs.push(run);
  persist();
  return run;
}

function getRuns() {
  return runs;
}

function clearRuns() {
  runs = [];
  persist();
}

initStorage();

module.exports = { addRun, getRuns, clearRuns };
