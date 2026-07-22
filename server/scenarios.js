const fs = require('fs');
const path = require('path');

const FORMS_DIR = path.join(__dirname, '../forms');
const SCENARIOS_DIR = path.join(FORMS_DIR, 'scenarios');

let canonicalFieldsCache = null;
let groundTruthCache = null;
let scenarioCache = null;

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function flattenCanonicalFields() {
  const canonical = loadJson(path.join(FORMS_DIR, 'canonical-fields.json'));
  const fields = [];
  canonical.categories.forEach(cat => {
    cat.fields.forEach(f => {
      fields.push({ ...f, category: cat.name });
    });
  });
  return fields;
}

function getCanonicalFields() {
  if (!canonicalFieldsCache) canonicalFieldsCache = flattenCanonicalFields();
  return canonicalFieldsCache;
}

function getDefaultGroundTruth() {
  if (!groundTruthCache) groundTruthCache = loadJson(path.join(FORMS_DIR, 'ground-truth.json')).data;
  return groundTruthCache;
}

function resolveScenarioFields(scenario) {
  if (scenario.fields === 'canonical') {
    return getCanonicalFields();
  }
  if (Array.isArray(scenario.fields)) {
    const canonical = getCanonicalFields();
    return scenario.fields.map(fieldDef => {
      const canonicalField = canonical.find(f => f.id === fieldDef.id);
      return canonicalField ? { ...canonicalField, ...fieldDef } : fieldDef;
    });
  }
  return [];
}

function resolveGroundTruth(scenario) {
  if (scenario.groundTruth === 'canonical') {
    return getDefaultGroundTruth();
  }
  if (scenario.groundTruth && typeof scenario.groundTruth === 'object') {
    return scenario.groundTruth;
  }
  const defaultGt = getDefaultGroundTruth();
  const fields = resolveScenarioFields(scenario);
  const gt = {};
  fields.forEach(f => {
    if (f.id in defaultGt) gt[f.id] = defaultGt[f.id];
  });
  return gt;
}

function listScenarios() {
  if (scenarioCache) return scenarioCache;
  const files = fs.readdirSync(SCENARIOS_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
  scenarioCache = files.map(f => {
    const scenario = loadJson(path.join(SCENARIOS_DIR, f));
    return {
      id: scenario.id,
      level: scenario.level,
      name: scenario.name,
      description: scenario.description,
      stressFlags: scenario.stressFlags || {}
    };
  }).sort((a, b) => (a.level - b.level) || a.id.localeCompare(b.id));
  return scenarioCache;
}

function getScenario(id) {
  const filePath = path.join(SCENARIOS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  const scenario = loadJson(filePath);
  return {
    ...scenario,
    fields: resolveScenarioFields(scenario),
    groundTruth: resolveGroundTruth(scenario)
  };
}

function generateScenarioCatalog() {
  const catalog = listScenarios();
  fs.writeFileSync(path.join(SCENARIOS_DIR, 'index.json'), JSON.stringify({ version: '1.1.0', scenarios: catalog }, null, 2));
  return catalog;
}

function clearCache() {
  canonicalFieldsCache = null;
  groundTruthCache = null;
  scenarioCache = null;
}

module.exports = {
  getCanonicalFields,
  getDefaultGroundTruth,
  listScenarios,
  getScenario,
  generateScenarioCatalog,
  clearCache
};
