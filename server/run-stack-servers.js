const { startStackServer } = require('./start-stack-server');
const { STACKS } = require('./distribution');

STACKS.forEach(stack => startStackServer(stack.id));

console.log('All stack servers are starting...');
