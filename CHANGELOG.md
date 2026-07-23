# Changelog

All notable changes to KYC Form Hub are documented in this file.

## [1.1.0] - 2026-07-23

### Added
- Central `server/config.js` for environment-based configuration.
- `.env.example` documenting all supported environment variables.
- `BENCHMARK_STORAGE_PATH` option for lightweight JSON persistence of benchmark runs.
- Human-friendly HTML benchmark report at `/api/benchmark/report?format=html`.
- `/health` endpoint for orchestrator health checks.
- Open source release files: `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`.
- `server/start-stack-server.js` shared launcher to reduce boilerplate across stack servers.
- `npm run test:all` script to verify every scenario variant.
- Graceful shutdown and port-conflict handling for stack servers.

### Changed
- Stack server ports are now configurable via environment variables.
- Generated links and agent manifest use `PUBLIC_BASE_URL` instead of hardcoded `localhost`.
- `is_pep` ground truth is now boolean `false` in profiles and canonical data.
- Upload fields are no longer required (benchmark does not persist files).
- `annual_income`, `net_worth`, and `nominee_share` are consistently numeric in ground truth.

### Fixed
- Invalid variant indices now return `null` instead of throwing.
- `getVariant()` is validated before dereferencing in manifest and portal generation.
- `verify-submission` validates `scenarioId` and submission payload types.
- Stack servers report meaningful errors when their port is already in use.
