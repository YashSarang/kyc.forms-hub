const { createStackServer } = require('./stack-server');
const { getStackPort } = require('./distribution');

const centralApiBaseUrl = process.env.CENTRAL_API_URL || 'http://localhost:3000';
const port = getStackPort('php');

createStackServer('php', centralApiBaseUrl).listen(port, () => {
  console.log(`PHP server running on http://localhost:${port}`);
});
