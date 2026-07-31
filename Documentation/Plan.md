# KYC Form Hub — Benchmark Plan

A representative suite of **89 canonical fields** (68 core KYC fields plus 21 input-widget-
variation fields) covering identity, contact, addresses, government IDs, banking,
employment, uploads, nominees, family, consents, and concrete widget implementations
captures most real-world KYC workflows.

The benchmark pairs these fields with varied labels, validation rules, UI widgets, and
adversarial stress conditions to reflect real-world KYC portals while remaining
maintainable.

The current canonical dataset is focused on Indian KYC; a US/EU variant can be added
on-demand by introducing new profiles and state/city option maps.

---

## Implemented Scenarios

| ID | Level | Focus |
|----|-------|-------|
| `baseline` | 0 | Full 89-field canonical form (repeatable baseline) |
| `level1-basic` | 1 | Text, email, phone |
| `level2-selection` | 2 | Dropdowns, radio, checkboxes, toggles, segmented controls |
| `level2a-dropdown-variations` | 2 | Dropdown & selector widget variations |
| `level2b-radio-variations` | 2 | Radio button widget variations |
| `level2c-checkbox-variations` | 2 | Checkbox & toggle widget variations |
| `level3-pickers` | 3 | Date pickers, comboboxes, file uploads, masked inputs |
| `level3a-date-format-variations` | 3 | Date text-format variations (DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD) |
| `level3b-date-picker-variations` | 3 | Date picker widget variations |
| `level3c-upload-variations` | 3 | Document upload widget variations |
| `level3d-combined-input-variations` | 3 | Mixed widget families with duplicate same-type fields |
| `level4-dynamic` | 4 | Conditional fields, cascading dropdowns, regex validation |
| `level5-complex` | 5 | Multi-step wizard, modal, iframe |
| `level6-frameworks` | 6 | Shadow DOM, web components |
| `level7-adversarial` | 7 | Duplicate labels, fake buttons, honeypots, dynamic IDs, latency |
| `issue-combined` | 7 | Multiple adversarial conditions combined |
| `issue-duplicate-labels` | 7 | Non-unique labels only |
| `issue-dynamic-ids` | 7 | Mutating IDs only |
| `issue-fake-buttons` | 7 | Decoy submit buttons only |
| `issue-hidden-fields` | 7 | Honeypot inputs only |
| `issue-network-delay` | 7 | Latency only |
| `issue-shadow-dom` | 7 | Shadow DOM encapsulation only |

Each scenario has **10 deterministic variants**. Variant `v1` is always Profile A and is
mirrored to every stack (consistency core). Variants `v2`–`v10` alternate between Profile A
and Profile B and are allocated by stack market share. The data is constant per profile;
variants differ only in web stack, difficulty level, and stress conditions.

- **Mirrored consistency core**: variant `v1` of every scenario exists on all 6 stacks
  (132 forms, all Profile A).
- **Market-share variants**: variants `v2`–`v10` are allocated by stack market share
  (198 forms, mixed profiles).
- **Total benchmark surface**: **330 served forms**.
- **Total field-value ground-truth pairs**: **2,400** (240 field slots × 10 variants).

Stack ports: HTML `3010`, React `3011`, Angular `3012`, Vue `3013`, PHP `3014`, Flask `3015`.

Profiles are stored in `forms/profiles.json` and exposed via `/api/profiles`.

---

## Evaluation Dimensions

| Dimension    | Metric |
| ------------ | --------------------------------------------- |
| Accuracy     | % fields correctly filled vs ground truth |
| Completeness | % required fields completed |
| Robustness   | Success across different stacks and stress flags |
| Efficiency   | Time to complete |
| Cost         | LLM tokens / API calls |
| Reliability  | Success rate over repeated runs |
| Recovery     | Ability to re-attempt after validation errors |
| Safety       | No identity mismatch or honeypot fills |

Scoring formula:

```
Score = 0.35 × Accuracy + 0.25 × Completeness + 0.40 × Safety
```

---

## Stress Testing Checklist

- [x] Duplicated labels
- [x] Multiple fake submit buttons
- [x] Hidden honeypot fields
- [x] Dynamic / randomized element IDs
- [x] Randomized field order
- [x] Network latency / delayed rendering
- [x] Shadow DOM encapsulation
- [x] Web component wrappers
- [x] Multi-step wizard layout
- [x] Modal / iframe fields
- [x] Date format variations
- [x] Date picker variations
- [x] Dropdown / selector variations
- [x] Radio button variations
- [x] Checkbox / toggle variations
- [x] Document upload variations
- [x] Duplicate same-type fields in one form
- [ ] CAPTCHA detection placeholder
- [ ] Rate limiting

These expose brittle heuristics and reward agents that use robust DOM understanding.

## Completed Implementation

- [x] 22 scenario definitions (baseline, levels 1–7, 7 dedicated input-variation scenarios,
  7 issue variants, combined)
- [x] 10 deterministic variants per scenario mapped to Profile A or Profile B
- [x] 89 canonical fields (68 core + 21 input-widget variations)
- [x] 2 canonical user profiles in `forms/profiles.json` exposed via `/api/profiles`
- [x] `profileKey` indirection so widget variations share the same ground truth as core fields
- [x] Shared, framework-agnostic custom web components (`kyc-custom-select`,
  `kyc-date-triple`, `kyc-date-calendar`, `kyc-toggle`, `kyc-dropzone`) used across all 6 stacks
- [x] Agent entry portal (`/agent-portal`) and machine-readable manifest (`/api/agent-manifest`)
- [x] Market-share distribution across 6 independent stack servers
- [x] Central orchestrator API (scenarios, canonical fields, distribution, verify, benchmark)
- [x] Per-stack servers on ports 3010–3015
- [x] Evaluation scoring: Accuracy 35% + Completeness 25% + Safety 40%
- [x] Blank editable forms — only read-only fields are pre-filled
- [x] Auto-recording of benchmark runs on every form submission via `?agentId=`
- [x] External-agent harness `server/agent-benchmark.js` for `--url/--profile` agents
- [x] Static form generator for all baseline + variant forms
- [x] Exhaustive self-verification: `npm run test:all` passes **220 / 220 variants**
- [x] Updated documentation (README, ARCHITECTURE, Plan, SCHEMA_SPECIFICATION,
  BENCHMARK_REPORT, Input-Fields-type, Form-Canonical-Fields, METHODOLOGY,
  Limitiations and Future Scope, and research paper)

## Known Gaps / Future Work

For a detailed treatment, see [`Limitiations and Future Scope.md`](Limitiations%20and%20Future%20Scope.md).

High-level items:

- No cross-model agent results have been published yet (the benchmark surface is validated,
  agent evaluation is follow-on work).
- Single geographic locale (Indian KYC only).
- Upload fields are not content-validated.
- No pixel-level click/trajectory metric (payload-based evaluation only).
- Only two deterministic profiles exist.
- CAPTCHA detection and rate-limiting placeholders are not implemented.
- Benchmark persistence is a lightweight JSON file; SQLite/webhook backends are future options.
- Richer agent-performance dashboards (per-field drill-down, regression detection) are
  possible next steps.