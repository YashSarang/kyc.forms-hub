const { createStackServer } = require('./stack-server');
const { getStackPort } = require('./distribution');

const centralApiBaseUrl = process.env.CENTRAL_API_URL || 'http://localhost:3000';
const port = getStackPort('flask');

createStackServer('flask', centralApiBaseUrl).listen(port, () => {
  console.log(`Flask server running on http://localhost:${port}`);
});
