# Limitations & Future Scope

This document lists the current limitations, known gaps, and planned future directions for
**KYC Form Hub**. It is intended to help users and contributors understand what the
benchmark does *not* currently cover, what has already been resolved, and what the natural
next steps are.

---

## 1. Current Limitations

### 1.1 No Cross-Model Agent Results Yet

KYC Form Hub is released as a fully validated **evaluation surface**, not as a paper with
pre-computed leader-board results. The benchmark has been exhaustively self-verified
(220/220 variants score 100/100 against their own ground truth), but large-scale
comparative evaluation of external MLLM- or DOM-driven agents is intentionally left as
follow-on work. The `server/agent-benchmark.js` harness and the `/api/benchmark/run`
reporting API are provided for that purpose.

### 1.2 Single Geographic Locale

The two canonical profiles (`Rajesh Kumar Sharma`, `Anjali Devi Iyer`) and all
validation rules reflect **Indian KYC conventions** (PAN, Aadhaar, Indian address
hierarchy, INR income ranges). US/EU profiles and field sets (SSN, ZIP codes, EU ID
cards, GDPR consent flows) are not yet included. They can be added by introducing new
profile records and updating option maps without changing the scoring architecture.

### 1.3 File Upload Fields Are Not Content-Validated

Upload fields exist in the schema and are rendered as native file inputs, drag-and-drop
zones, multiple-file inputs, and camera-capture buttons. However, the benchmark does not
actually store, scan, or validate uploaded file *content*. Ground-truth values for upload
fields are `null` and the fields are marked `required: false`; the benchmark tests whether
an agent can identify and interact with the correct upload control, not whether it can
produce a valid PDF/JPG.

### 1.4 No Pixel-Level Click / Trajectory Metric

Evaluation is based on the **submitted structured payload** (`POST
/api/verify-submission`), not on the sequence of browser actions used to produce it. This
means the benchmark cannot distinguish an agent that correctly clicked and typed each
widget from one that manipulated the DOM out-of-band. This is an intentional trade-off
for modality-agnostic comparability (DOM agents, accessibility-tree agents, vision agents,
and hybrid agents can all be scored uniformly), but it sacrifices the granular
`Click(x,y)` metric used by FormFactory and similar vision-agent benchmarks.

### 1.5 Deterministic Profile Pair

Only two fixed profiles exist. Every variant maps deterministically to either Profile A
or Profile B. This gives the benchmark zero ground-truth noise and full reproducibility,
but it does not exercise the full diversity of real applicant data (unusual name
orderings, incomplete addresses, edge-case income values, etc.). Agents could, in
principle, overfit to the two profiles; future work should add more profiles and/or
synthetic perturbations while keeping ground truth deterministic.

### 1.6 Multi-Step Wizards, Modals, and Iframes Are Declarative

Level 5 (`level5-complex`) and related stress flags declare multi-step wizards, modal
dialogs, side drawers, and iframe-embedded fields. The renderer supports these flags, but
the *complexity* of the wizard/modal/iframe interactions is intentionally basic compared
to production KYC portals. This is a known gap that can be expanded incrementally.

### 1.7 CAPTCHA and Rate-Limiting Placeholders

`Plan.md` and `METHODOLOGY.md` list CAPTCHA detection and rate-limiting middleware as
future work. These are **not implemented**. Adding them would change the agent-facing
contract and should be introduced as opt-in stress flags rather than default behavior.

### 1.8 Lightweight Benchmark Persistence

Benchmark runs are stored **in memory by default**. Setting `BENCHMARK_STORAGE_PATH`
writes runs to a JSON file, which is sufficient for individual agent tuning but lacks
concurrent-write safety, querying, and long-term analytics. A SQLite/webhook backend is
listed as a future improvement.

### 1.9 No Per-Field Regression Dashboard

While the evaluation API returns per-field `PASS`/`MISMATCH`/`MISSING` results, the
aggregate reporter does not yet surface trend lines, per-agent regression detection, or
drill-down dashboards. These are natural extensions of the current `BENCHMARK_STORAGE_PATH`
mechanism.

### 1.10 Market-Share Allocation Uses Integer Rounding

The 198 market-share instances (v2–v10) are allocated across 6 stacks by rounding the
proportional target to whole numbers. The realized shares are within rounding error of the
target 30/20/15/15/10/10 split (e.g., Flask receives 19 instead of 19.8). This is
acceptable for benchmarking but means the distribution is not mathematically exact.

---

## 2. Gaps That Have Already Been Resolved

The following items were previously listed as future work or known gaps and are now
implemented:

- ✅ **Input widget variation coverage.** All five logical field families (date, selector,
  radio, checkbox, file upload) are decomposed into concrete, fully interactive widget
  implementations across all six stacks, including custom web components.
- ✅ **Dedicated variation scenarios.** `level2a-dropdown-variations`,
  `level2b-radio-variations`, `level2c-checkbox-variations`,
  `level3a-date-format-variations`, `level3b-date-picker-variations`,
  `level3c-upload-variations`, and `level3d-combined-input-variations` are implemented and
  verified.
- ✅ **Duplicate same-type fields in one form.** Variation scenarios deliberately include
  multiple instances of the same logical field family to test disambiguation.
- ✅ **Exhaustive self-verification.** `npm run test:all` confirms that all **220 variants**
  score **100/100** against their own ground truth.
- ✅ **Central orchestrator + 6 stack servers.** The multi-server architecture is fully
  implemented and configurable via environment variables.
- ✅ **Agent harness.** `server/agent-benchmark.js` drives any agent with a
  `--url`/`--profile` CLI contract across the full manifest.
- ✅ **Environment-based configuration.** All ports, base URLs, CORS origins, and storage
  paths are configurable.

---

## 3. Future Scope

### 3.1 Agent Evaluation Study

Run a representative set of agents (vision-driven MLLMs, DOM-heuristic agents,
accessibility-tree agents, and hybrid approaches) through the benchmark using the
`server/agent-benchmark.js` harness and publish the results in the research paper. The
expected failure modes to measure are:

- Format non-compliance (e.g., submitting a date in the wrong text format).
- Duplicate-field misattribution (e.g., conflating applicant and nominee fields).
- Honeypot/decoy susceptibility.
- Cross-stack robustness gaps.

### 3.2 Additional Geographic Profiles

Add US and EU canonical profiles with locale-specific fields:

- US: SSN, ZIP code, state dropdown, USD income ranges, W-9 consent.
- EU: GDPR explicit consent, national ID cards, IBAN, country-specific tax identifiers.

This requires only new JSON profile files and updated option maps; the scoring engine is
locale-agnostic.

### 3.3 Richer Persistence & Analytics

- **SQLite backend** (`better-sqlite3`) for structured querying and team-shared analytics.
- **Webhook events** so organizations can route benchmark runs to their own observability
  stacks.
- **Per-field drill-down dashboard** showing which fields an agent consistently mis-fills.
- **Regression detection** comparing the latest agent run against a stored baseline for the
  same agent/scenario/stack.

### 3.4 More Advanced UI Patterns

- True multi-step wizard with per-step validation and navigation state.
- Richer modal/side-drawer interactions (open/close cycles, nested modals).
- Iframe-embedded consent and payment fields with cross-frame value propagation.
- Virtualized lists and canvas-based signature pads.
- CAPTCHA detection placeholder and rate-limiting middleware as opt-in stress flags.

### 3.5 Expanded Widget Families

- Multi-select checkboxes and token/chip inputs.
- Range sliders and rating selectors.
- Color-coded status selectors.
- Tree/hierarchical dropdowns.
- Rich-text / WYSIWYG consent editors.

### 3.6 Stochastic but Reproducible Perturbations

Introduce controlled perturbations of the canonical profiles (e.g., slight name/order
variations, missing optional fields, alternate addresses) while keeping a deterministic
seed so that ground truth remains reproducible. This would broaden data diversity without
sacrificing auditability.

### 3.7 Trajectory Logging (Optional)

Add an opt-in action-logging endpoint so that agents can submit their action trajectories
(clicks, scrolls, typed values with timestamps). This would enable a stricter evaluation
mode that combines payload correctness with interaction plausibility, addressing
Limitation 1.4 for users who want it.

---

## 4. How to Contribute to Future Work

1. Open an issue describing the limitation or future direction you want to address.
2. Keep changes focused and minimal (see `CONTRIBUTING.md`).
3. Add or update the relevant markdown documentation.
4. Run `npm run test:all` against a running server and ensure all 220 variants still
   score 100/100 before submitting a pull request.

---

*Last updated: 2026-07-31 — synchronized with the 22-scenario / 220-variant / 330-instance
benchmark state.*
