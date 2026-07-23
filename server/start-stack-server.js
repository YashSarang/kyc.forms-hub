/**
 * Shared launcher for individual stack servers.
 *
 * Centralises startup, logging, port-conflict handling and graceful shutdown
 * so each stack launcher file stays a one-liner.
 */

const { createStackServer } = require('./stack-server');
const { getStackPort, getStackMeta } = require('./distribution');
const { CONFIG } = require('./config');

function startStackServer(stackId) {
  const meta = getStackMeta(stackId);
  if (!meta) {
    console.error(`Unknown stack: ${stackId}`);
    process.exit(1);
  }

  const centralApiBaseUrl = process.env.CENTRAL_API_URL || CONFIG.publicBaseUrl;
  const port = getStackPort(stackId);
  const app = createStackServer(stackId, centralApiBaseUrl);

  const server = app.listen(port, CONFIG.host, () => {
    console.log(`${meta.name} server running on http://${CONFIG.host}:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use for ${stackId} stack.`);
    } else {
      console.error(`Failed to start ${stackId} stack server:`, err.message);
    }
    process.exit(1);
  });

  function shutdown(signal) {
    console.log(`[${stackId}] Received ${signal}. Shutting down...`);
    server.close(() => process.exit(0));
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  return server;
}

module.exports = { startStackServer };
