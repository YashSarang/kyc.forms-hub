const scenarios = require('./scenarios');
const { VARIANTS_PER_SCENARIO } = require('./variants');
const { CONFIG } = require('./config');

const STACKS = [
  { id: 'html', name: 'Plain HTML / jQuery', share: 0.20, port: CONFIG.stacks.html.port },
  { id: 'react', name: 'React / Next.js', share: 0.30, port: CONFIG.stacks.react.port },
  { id: 'angular', name: 'Angular Reactive', share: 0.15, port: CONFIG.stacks.angular.port },
  { id: 'vue', name: 'Vue.js', share: 0.10, port: CONFIG.stacks.vue.port },
  { id: 'php', name: 'PHP Server-Rendered', share: 0.15, port: CONFIG.stacks.php.port },
  { id: 'flask', name: 'Flask / Python WTForms', share: 0.10, port: CONFIG.stacks.flask.port }
];

function distributeVariants() {
  const scenarioList = scenarios.listScenarios();
  const totalVariantsPerScenario = VARIANTS_PER_SCENARIO;

  const distribution = {};
  STACKS.forEach(s => { distribution[s.id] = []; });

  // Variant 1 of every scenario is mirrored across all stacks (consistency core).
  scenarioList.forEach(scenario => {
    const mirroredId = `${scenario.id}-v1`;
    STACKS.forEach(s => distribution[s.id].push(mirroredId));
  });

  // Variants 2..N are allocated globally by market share while keeping a mix per scenario.
  const remainingQuota = getGlobalQuota(scenarioList.length * (totalVariantsPerScenario - 1));

  scenarioList.forEach(scenario => {
    const toDistribute = Array.from({ length: totalVariantsPerScenario - 1 }, (_, i) => `${scenario.id}-v${i + 2}`);
    // Pick stacks with the largest remaining quota for this scenario's variants
    const assigned = assignToStacksByQuota(toDistribute, remainingQuota);
    Object.entries(assigned).forEach(([stackId, variantIds]) => {
      distribution[stackId].push(...variantIds);
      // Quota is already decremented inside assignToStacksByQuota.
    });
  });

  return distribution;
}

function getGlobalQuota(total) {
  // Target shares applied to the total pool of non-mirrored variants.
  const raw = {};
  let allocated = 0;
  STACKS.forEach((s, i) => {
    if (i === STACKS.length - 1) {
      raw[s.id] = total - allocated;
    } else {
      raw[s.id] = Math.round(total * s.share);
      allocated += raw[s.id];
    }
  });
  // Correct any rounding drift on the last stack
  const sum = Object.values(raw).reduce((a, b) => a + b, 0);
  if (sum !== total) raw[STACKS[STACKS.length - 1].id] += total - sum;
  return raw;
}

function assignToStacksByQuota(variantIds, quota) {
  const assigned = {};
  STACKS.forEach(s => { assigned[s.id] = []; });

  variantIds.forEach(variantId => {
    // Choose the stack with the highest remaining quota; break ties by original share
    const stack = STACKS.slice().sort((a, b) => {
      const diff = quota[b.id] - quota[a.id];
      if (diff !== 0) return diff;
      return b.share - a.share;
    })[0];
    assigned[stack.id].push(variantId);
    quota[stack.id]--;
  });

  return assigned;
}

const distribution = distributeVariants();

function getStackForms(stackId) {
  return distribution[stackId] || [];
}

function getStackPort(stackId) {
  const stack = STACKS.find(s => s.id === stackId);
  return stack ? stack.port : null;
}

function getStackMeta(stackId) {
  return STACKS.find(s => s.id === stackId) || null;
}

function getDistributionSummary() {
  return STACKS.map(s => ({
    ...s,
    formCount: distribution[s.id].length,
    forms: distribution[s.id]
  }));
}

module.exports = {
  STACKS,
  distribution,
  getStackForms,
  getStackPort,
  getStackMeta,
  getDistributionSummary
};
