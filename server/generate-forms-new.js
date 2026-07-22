const fs = require('fs');
const path = require('path');
const scenarios = require('./scenarios');
const { renderStackForm, STACK_META } = require('./form-renderers');
const { getVariant } = require('./variants');
const { STACKS, distribution } = require('./distribution');

function generateAllForms() {
  const scenarioList = scenarios.listScenarios();

  // Baseline scenario forms (legacy / central route mirrors)
  console.log(`Generating baseline forms for ${scenarioList.length} scenarios × ${STACKS.length} stacks = ${scenarioList.length * STACKS.length} files...`);
  STACKS.forEach(stack => {
    const outDir = path.join(__dirname, 'stacks', stack.id);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    scenarioList.forEach(s => {
      const scenario = scenarios.getScenario(s.id);
      const html = renderStackForm(scenario, stack.id, '');
      fs.writeFileSync(path.join(outDir, `${s.id}.html`), html);
    });
    console.log(`  ✓ ${STACK_META[stack.id].name}: ${scenarioList.length} baseline forms`);
  });

  // Distributed variant forms (market-share allocation)
  let variantCount = 0;
  STACKS.forEach(stack => {
    const outDir = path.join(__dirname, 'stacks', stack.id, 'variants');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    distribution[stack.id].forEach(variantId => {
      const match = variantId.match(/^(.+)-v(\d+)$/);
      const variant = getVariant(match[1], parseInt(match[2], 10));
      const html = renderStackForm(variant, stack.id, '');
      fs.writeFileSync(path.join(outDir, `${variantId}.html`), html);
      variantCount++;
    });
    console.log(`  ✓ ${STACK_META[stack.id].name}: ${distribution[stack.id].length} variant forms`);
  });

  console.log(`Form generation complete. ${variantCount} variant files written across ${STACKS.length} stacks.`);
}

generateAllForms();
