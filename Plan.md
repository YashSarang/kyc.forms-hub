# KYC Form Hub — Benchmark Plan

A representative suite of **50+ canonical fields** covering identity, contact, addresses, government IDs, banking, employment, uploads, nominees, family, and consents captures most KYC workflows.

The benchmark pairs these fields with varied labels, validation rules, UI widgets, and adversarial stress conditions to reflect real-world KYC portals while remaining maintainable.

The current canonical dataset is focused on Indian KYC; a US variant can be added on-demand by swapping `forms/ground-truth.json` and state/city option maps.

---

## Implemented Scenarios

| ID | Level | Focus |
|----|-------|-------|
| `baseline` | 0 | Full 50+ field canonical form (repeatable baseline) |
| `level1-basic` | 1 | Text, email, phone |
| `level2-selection` | 2 | Dropdowns, radio, checkboxes |
| `level3-pickers` | 3 | Date pickers, comboboxes, file uploads, masked inputs |
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

Each scenario has **10 deterministic variants**. Variant `v1` is always Profile A and is mirrored to every stack (consistency core). Variants `v2`–`v10` alternate between Profile A and Profile B and are allocated by stack market share. The data is constant per profile; variants differ only in web stack, difficulty level, and stress conditions.

- **Mirrored consistency core**: variant `v1` of every scenario exists on all 6 stacks (90 forms, all Profile A).
- **Market-share variants**: variants `v2`–`v10` are allocated by stack market share (135 forms, mixed profiles).
- **Total benchmark surface**: 225 served forms.

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
- [ ] CAPTCHA detection placeholder
- [ ] Rate limiting

These expose brittle heuristics and reward agents that use robust DOM understanding.

## Completed Implementation

- [x] 15 scenario definitions (baseline, levels 1–7, 6 issue variants, combined)
- [x] 10 deterministic variants per scenario mapped to Profile A or Profile B
- [x] 2 canonical user profiles in `forms/profiles.json` exposed via `/api/profiles`
- [x] Agent entry portal (`/agent-portal`) and machine-readable manifest (`/api/agent-manifest`)
- [x] Market-share distribution across 6 independent stack servers
- [x] Central orchestrator API (scenarios, canonical fields, distribution, verify, benchmark)
- [x] Per-stack servers on ports 3010–3015
- [x] Evaluation scoring: Accuracy 35% + Completeness 25% + Safety 40%
- [x] Blank editable forms — only read-only fields are pre-filled
- [x] Auto-recording of benchmark runs on every form submission via `?agentId=`
- [x] External-agent harness `server/agent-benchmark.js` for `--url/--profile` agents
- [x] Static form generator for all baseline + variant forms
- [x] Updated documentation (README, ARCHITECTURE, Plan, SCHEMA_SPECIFICATION, BENCHMARK_REPORT)

## Known Gaps / Future Work

- Advanced visual stress features (multi-step wizard pages, modal/iframe fields, dynamic IDs in rendered DOM) are declared in scenario metadata but only partially implemented in the rendered HTML. They can be expanded incrementally without changing the API.
- CAPTCHA detection and rate-limiting placeholders are not implemented.
- No persistent database: benchmark runs are stored in memory and lost on server restart.
- Runtime verification of the latest profile/harness changes is pending (the environment could not execute Node commands).