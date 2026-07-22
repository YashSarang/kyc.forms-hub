# KYC Form Hub — Benchmark Report Template

Use this template to document an agent's performance on the KYC Form Hub benchmark suite.

---

## 1. Agent Under Test

| Attribute | Value |
|-----------|-------|
| Agent Name | e.g., MyFormAgent v1.0 |
| Model / Engine | e.g., GPT-4, Claude, custom DOM heuristic |
| Browser / Driver | e.g., Playwright, Puppeteer, Selenium |
| Run Date | YYYY-MM-DD |
| Notes | Optional configuration notes |

---

## 2. User Profiles

All forms expect values from one of two canonical profiles:

- **Profile A** — `Rajesh Kumar Sharma` (Mumbai)
- **Profile B** — `Anjali Devi Iyer` (Bengaluru)

Fetch the full profile JSON from `/api/profiles/A` and `/api/profiles/B`. The agent manifest at `/api/agent-manifest` tags each form with its expected profile.

## 3. Scenarios Covered

The suite currently exposes 15 scenarios across 6 stacks:

| Level | Scenario | Stacks |
|-------|----------|--------|
| 0 | `baseline` | html, react, angular, vue, php, flask |
| 1 | `level1-basic` | html, react, angular, vue, php, flask |
| 2 | `level2-selection` | html, react, angular, vue, php, flask |
| 3 | `level3-pickers` | html, react, angular, vue, php, flask |
| 4 | `level4-dynamic` | html, react, angular, vue, php, flask |
| 5 | `level5-complex` | html, react, angular, vue, php, flask |
| 6 | `level6-frameworks` | html, react, angular, vue, php, flask |
| 7 | `level7-adversarial` | html, react, angular, vue, php, flask |
| 7 | `issue-combined` | html, react, angular, vue, php, flask |
| 7 | `issue-duplicate-labels` | html, react, angular, vue, php, flask |
| 7 | `issue-dynamic-ids` | html, react, angular, vue, php, flask |
| 7 | `issue-fake-buttons` | html, react, angular, vue, php, flask |
| 7 | `issue-hidden-fields` | html, react, angular, vue, php, flask |
| 7 | `issue-network-delay` | html, react, angular, vue, php, flask |
| 7 | `issue-shadow-dom` | html, react, angular, vue, php, flask |

Total forms: **225** (15 scenarios × 10 variants × market-share allocation, with v1 mirrored on all 6 stacks).

---

## 4. Recording Runs

### Option A — Automated harness (recommended)

Use the provided harness to drive an agent that accepts `--url` and `--profile`:

```bash
node /path/to/kyc-form-hub/server/agent-benchmark.js \
  --agent-cmd "npx tsx src/index.ts fill" \
  --agent-dir /path/to/your/agent-project \
  --profile-out ./shared/user-profile.json \
  --agent-id my-agent
```

The harness reads `/api/agent-manifest`, writes the correct profile for each form, and appends `?agentId=my-agent` to every URL. Each successful form submission is automatically recorded via `/api/benchmark/run`.

### Option B — Manual API calls

For each completed form, post the result to the benchmark API:

```bash
curl -X POST http://localhost:3000/api/benchmark/run \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "my-agent",
    "agentName": "MyFormAgent v1.0",
    "scenarioId": "level4-dynamic",
    "variantId": "level4-dynamic-v5",
    "expectedProfile": "A",
    "stack": "react",
    "startTime": "2026-07-22T10:00:00Z",
    "endTime": "2026-07-22T10:00:12Z",
    "data": { "full_name": "Rajesh Kumar Sharma", ... },
    "metadata": { "run": 1 }
  }'
```

---

## 5. Aggregate Report

Fetch the aggregate report:

```bash
curl "http://localhost:3000/api/benchmark/report?agentId=my-agent"
```

Example response:

```json
{
  "success": true,
  "count": 225,
  "aggregate": {
    "totalRuns": 225,
    "averageScore": 87,
    "averageAccuracy": 91,
    "averageCompleteness": 89,
    "averageSafety": 98,
    "minScore": 45,
    "maxScore": 100,
    "passRatePercent": 78,
    "byScenario": {
      "baseline": 98,
      "level1-basic": 100,
      "level7-adversarial": 45,
      "issue-shadow-dom": 62
    },
    "byStack": {
      "html": 92,
      "react": 88,
      "angular": 85,
      "vue": 87,
      "php": 90,
      "flask": 89
    }
  }
}
```

---

## 6. Interpretation Guide

| Metric | Meaning | Target |
|--------|---------|--------|
| Average Score | Overall weighted performance | ≥ 90 |
| Accuracy | Fields filled exactly as ground truth | ≥ 95 |
| Completeness | Required fields completed | ≥ 95 |
| Safety | No identity mismatch / honeypot fills | 100 |
| Pass Rate | % of runs scoring ≥ 80 | ≥ 80 |
| By-Stack scores | Robustness across technologies | Balanced, no stack < 70 |
| By-Scenario scores | Difficulty scaling | Level 1–4 near 100, Level 7 > 50 |

---

## 7. Known Pitfalls

- **Duplicate labels**: Agents must disambiguate by DOM context, surrounding text, or stable data attributes.
- **Fake submit buttons**: The real submit button has `id="realSubmit"`; decoys are `type="button"`.
- **Hidden honeypots**: Inputs with negative absolute positioning and `tabindex="-1"` must remain empty.
- **Dynamic IDs**: Do not rely on `id` attributes; use `data-field-id` or label text.
- **Network delay**: Wait for inputs to become enabled before interacting.
- **Shadow DOM**: Use shadow-piercing selectors or keyboard events when supported.
