const { createStackServer } = require('./stack-server');
const { getStackPort } = require('./distribution');

const centralApiBaseUrl = process.env.CENTRAL_API_URL || 'http://localhost:3000';
const port = getStackPort('html');

createStackServer('html', centralApiBaseUrl).listen(port, () => {
  console.log(`Plain HTML / jQuery server running on http://localhost:${port}`);
});
