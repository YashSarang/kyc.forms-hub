const fs = require('fs');
const path = require('path');
const scenarios = require('./scenarios');

const VARIANTS_PER_SCENARIO = 10;

const PROFILES_PATH = path.join(__dirname, '../forms/profiles.json');
const profiles = loadProfiles();

// Map scenario-specific field ids to the canonical profile key when they differ.
const FIELD_ALIASES = {
  full_name_primary: 'full_name'
};

function loadProfiles() {
  const raw = JSON.parse(fs.readFileSync(PROFILES_PATH, 'utf8'));
  const map = {};
  raw.profiles.forEach(p => { map[p.id] = p; });
  return map;
}

function getProfile(profileId) {
  return profiles[profileId] || null;
}

function getAllProfiles() {
  return Object.values(profiles);
}

function getProfileValue(profile, fieldId) {
  if (!profile) return undefined;
  if (profile.data[fieldId] !== undefined) return profile.data[fieldId];
  const alias = FIELD_ALIASES[fieldId];
  if (alias && profile.data[alias] !== undefined) return profile.data[alias];
  return undefined;
}

function isHoneypotField(fieldId, scenario) {
  if (fieldId.startsWith('honeypot_')) return true;
  const field = scenario.fields.find(f => f.id === fieldId);
  return !!(field && field.isHoneypot);
}

function getVariantProfileId(scenarioId, variantIndex) {
  // Variant 1 is the consistency baseline and always uses Profile A.
  // Remaining variants alternate deterministically so both profiles are exercised.
  if (variantIndex === 1) return 'A';
  return variantIndex % 2 === 0 ? 'B' : 'A';
}

function resolveScenarioGroundTruth(scenario, profileId) {
  const profile = getProfile(profileId);
  const baseGt = scenario.groundTruth || {};
  const gt = {};

  scenario.fields.forEach(field => {
    const fieldId = field.id;

    // Honeypots must stay empty regardless of profile.
    if (isHoneypotField(fieldId, scenario)) {
      gt[fieldId] = baseGt[fieldId] !== undefined ? baseGt[fieldId] : '';
      return;
    }

    // Use the active profile value when available (this is the source of truth).
    const profileValue = getProfileValue(profile, fieldId);
    if (profileValue !== undefined) {
      gt[fieldId] = profileValue;
      return;
    }

    // Fall back to scenario-specific values for fields not covered by profiles.
    gt[fieldId] = baseGt[fieldId] !== undefined ? baseGt[fieldId] : null;
  });

  // Preserve any extra scenario ground-truth keys (e.g. legacy honeypots not in fields).
  Object.keys(baseGt).forEach(fieldId => {
    if (!(fieldId in gt)) {
      gt[fieldId] = isHoneypotField(fieldId, scenario)
        ? baseGt[fieldId]
        : (getProfileValue(profile, fieldId) !== undefined ? getProfileValue(profile, fieldId) : baseGt[fieldId]);
    }
  });

  return gt;
}

function getVariant(scenarioId, variantIndex) {
  if (variantIndex < 1 || variantIndex > VARIANTS_PER_SCENARIO) {
    throw new Error(`Variant index must be between 1 and ${VARIANTS_PER_SCENARIO}`);
  }
  const scenario = scenarios.getScenario(scenarioId);
  if (!scenario) return null;

  const profileId = getVariantProfileId(scenarioId, variantIndex);
  const groundTruth = resolveScenarioGroundTruth(scenario, profileId);

  return {
    ...scenario,
    variantId: `${scenarioId}-v${variantIndex}`,
    variantIndex,
    expectedProfile: profileId,
    groundTruth
  };
}

function listVariantIds() {
  const scenarioIds = scenarios.listScenarios().map(s => s.id);
  const ids = [];
  scenarioIds.forEach(sid => {
    for (let i = 1; i <= VARIANTS_PER_SCENARIO; i++) {
      ids.push(`${sid}-v${i}`);
    }
  });
  return ids;
}

function listScenariosWithVariants() {
  return scenarios.listScenarios().map(s => ({
    ...s,
    variants: Array.from({ length: VARIANTS_PER_SCENARIO }, (_, i) => `${s.id}-v${i + 1}`)
  }));
}

module.exports = {
  VARIANTS_PER_SCENARIO,
  getVariant,
  getProfile,
  getAllProfiles,
  getVariantProfileId,
  listVariantIds,
  listScenariosWithVariants
};
