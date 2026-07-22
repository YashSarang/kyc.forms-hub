const { createStackServer } = require('./stack-server');
const { getStackPort } = require('./distribution');

const centralApiBaseUrl = process.env.CENTRAL_API_URL || 'http://localhost:3000';
const port = getStackPort('react');

createStackServer('react', centralApiBaseUrl).listen(port, () => {
  console.log(`React / Next.js server running on http://localhost:${port}`);
});
