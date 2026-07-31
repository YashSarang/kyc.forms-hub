# Changelog

All notable changes to KYC Form Hub are documented in this file.

## [1.2.0] - 2026-07-31

### Added
- **Input Widget Variation coverage** — systematic decomposition of date, selector, radio,
  checkbox, and file-upload field families into 20+ concrete widget variations, each
  implemented as a fully interactive, framework-agnostic custom web component.
- 7 new scenario definitions:
  - `level2a-dropdown-variations`
  - `level2b-radio-variations`
  - `level2c-checkbox-variations`
  - `level3a-date-format-variations`
  - `level3b-date-picker-variations`
  - `level3c-upload-variations`
  - `level3d-combined-input-variations`
- `forms/field-variations.json` registry and `server/field-formatters.js` formatting/parsing
  layer, enabling widget variations to share canonical profile values via `profileKey`.
- 21 new input-widget-variation fields in `forms/canonical-fields.json`, bringing the total
  canonical field count to 89.
- Duplicate same-type fields inside individual scenarios to test agent disambiguation.
- Research paper draft in `Research-Paper/KYC-Form-Hub-A-Benchmark-Suite-for-Autonomous-KYC-Form-Filling-Agents.md`.
- `Documentation/Limitiations and Future Scope.md` documenting current limitations and
  planned extensions.

### Changed
- Benchmark surface expanded from 15 scenarios / 225 served forms to **22 scenarios /
  330 served forms**.
- `server/variants.js` now resolves `profileKey` aliases and applies `formatValue()` for
  widget-variation fields.
- `server/routes/evaluation.js` normalizes variation-typed submissions (e.g., date
  separator tolerance) during comparison.
- `server/form-renderers.js` injects shared widget styles, custom-element scripts, and
  `collectWidgetValues()` into all six stack renderers.
- All documentation (README, Plan, ARCHITECTURE, METHODOLOGY, SCHEMA_SPECIFICATION,
  BENCHMARK_REPORT, TEST_ANALYSIS_REPORT, Tech-stacks) updated to reflect the expanded
  scenario set and verified 220/220 self-verification status.

### Fixed
- Date-separator normalization in `field-formatters.js` now derives the separator from the
  field's declared target format rather than hardcoding `/`, fixing `YYYY-MM-DD` text
  fields in `level3a-date-format-variations`.

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
