const { createStackServer } = require('./stack-server');
const { getStackPort } = require('./distribution');

const centralApiBaseUrl = process.env.CENTRAL_API_URL || 'http://localhost:3000';
const port = getStackPort('vue');

createStackServer('vue', centralApiBaseUrl).listen(port, () => {
  console.log(`Vue.js server running on http://localhost:${port}`);
});
