const { createStackServer } = require('./stack-server');
const { STACKS } = require('./distribution');

const centralApiBaseUrl = process.env.CENTRAL_API_URL || 'http://localhost:3000';

STACKS.forEach(stack => {
  const app = createStackServer(stack.id, centralApiBaseUrl);
  app.listen(stack.port, () => {
    console.log(`${stack.name} server running on http://localhost:${stack.port}`);
  });
});

console.log('All stack servers started. Central API:', centralApiBaseUrl);
