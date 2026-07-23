/**
 * Central configuration module.
 *
 * Keeps environment-specific values in one place so the codebase stays
 * simple and self-documenting. Defaults are geared toward local development;
 * override them with environment variables for production deployments.
 */

try {
  require('dotenv').config();
} catch {
  // dotenv is optional. If it is not installed, users can source env vars themselves.
}

const path = require('path');

function intEnv(name, fallback) {
  const value = process.env[name];
  if (value === undefined || value === '') return fallback;
  const trimmed = value.trim();
  if (!/^-?\d+$/.test(trimmed)) {
    console.warn(`Invalid integer for ${name}: "${value}". Using fallback ${fallback}.`);
    return fallback;
  }
  return parseInt(trimmed, 10);
}

function boolEnv(name, fallback = false) {
  const value = process.env[name];
  if (value === undefined || value === '') return fallback;
  return /^(1|true|yes|on)$/i.test(value.trim());
}

function strEnv(name, fallback) {
  const value = process.env[name];
  return value === undefined || value === '' ? fallback : value;
}

const CONFIG = {
  // Central orchestrator
  port: intEnv('PORT', 3000),
  host: strEnv('HOST', '0.0.0.0'),
  nodeEnv: strEnv('NODE_ENV', 'development'),

  // Public base URL used when generating links (manifest, portals, stack callbacks).
  // Falls back to localhost for local development.
  publicBaseUrl: strEnv('PUBLIC_BASE_URL', 'http://localhost:3000'),

  // CORS / security
  corsOrigin: strEnv('CORS_ORIGIN', '*'),
  trustProxy: boolEnv('TRUST_PROXY', false),

  // Request body limits
  jsonLimit: strEnv('JSON_LIMIT', '10mb'),

  // Benchmark run persistence. In-memory storage is still the default, but a
  // JSON file path can be provided for lightweight persistence across restarts.
  benchmarkStoragePath: strEnv('BENCHMARK_STORAGE_PATH', ''),

  // Stack server configuration. Ports are surfaced here so a single env file
  // can drive the whole deployment.
  stacks: {
    html: { port: intEnv('STACK_HTML_PORT', 3010) },
    react: { port: intEnv('STACK_REACT_PORT', 3011) },
    angular: { port: intEnv('STACK_ANGULAR_PORT', 3012) },
    vue: { port: intEnv('STACK_VUE_PORT', 3013) },
    php: { port: intEnv('STACK_PHP_PORT', 3014) },
    flask: { port: intEnv('STACK_FLASK_PORT', 3015) }
  }
};

const VALID_STACKS = Object.keys(CONFIG.stacks);
const STACK_IDS = ['html', 'react', 'angular', 'vue', 'php', 'flask'];

function getStackPort(stackId) {
  return CONFIG.stacks[stackId] ? CONFIG.stacks[stackId].port : null;
}

function resolveProjectPath(relativePath) {
  return path.isAbsolute(relativePath)
    ? relativePath
    : path.join(__dirname, '..', relativePath);
}

module.exports = {
  CONFIG,
  VALID_STACKS,
  STACK_IDS,
  getStackPort,
  resolveProjectPath
};
