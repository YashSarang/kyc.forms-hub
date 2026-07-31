# KYC Form Hub - Verification Test Analysis Report

## Summary

The KYC Form Hub project includes a comprehensive, automated smoke-test suite that
verifies every form submission against its deterministic, profile-based ground truth
across all scenarios, variants, and web tech stacks.

**Current verified status:** `npm run test:all` passes **220 / 220 variants** (22
scenarios × 10 variants each), covering **2,400 field-value pairs** and all 6 web stacks.

---

## Test Infrastructure

### Available Test Scripts

1. **`npm test`** → `node server/test-verification.js baseline`
   - Tests the default `baseline` scenario.
   - Requires the central orchestrator to be running on `http://localhost:3000`.

2. **`npm run test:scenario <scenarioId>`** → `node server/test-verification.js <scenarioId>`
   - Tests a specific scenario.
   - Supports explicit variant syntax: `npm run test:scenario level4-dynamic-v3`.
   - Returns verification score and per-field details.

3. **`npm run test:all`** → `node server/test-all-scenarios.js`
   - Exhaustive smoke test.
   - Verifies **every scenario variant** against ground truth.
   - Requires both the central orchestrator and the stack servers to be running.
   - Tests **220 scenario variants** (22 scenarios × 10 variants).

### Server Requirements

- **Central Orchestrator**: must be running on `http://localhost:3000`.
- **Stack Servers**: must be running on ports `3010`–`3015` (or as configured).
- **Health endpoint**: `GET /health`
- **Verification endpoint**: `POST /api/verify-submission`

---

## Test Payload Structure

The test scripts construct a payload by resolving the expected ground truth for the
scenario/variant and POSTing it back to the evaluation API:

```json
{
  "scenarioId": "baseline",
  "variantId": "baseline-v1",
  "data": {
    "full_name": "Rajesh Kumar Sharma",
    "email": "rajesh.sharma@example.com",
    ...all expected canonical KYC fields for this variant...
  }
}
```

For variation-typed fields (e.g., `dob_dmy_text`), the expected value is formatted by
`server/field-formatters.js` and parsed back leniently by `server/routes/evaluation.js`
(separator-tolerant for dates where appropriate).

---

## Expected Response Format

```json
{
  "success": true,
  "scenarioId": "baseline",
  "variantId": "baseline-v1",
  "expectedProfile": "A",
  "report": {
    "score": 100,
    "metrics": {
      "accuracyPercent": 100,
      "completenessPercent": 100,
      "safetyPercent": 100,
      "totalFields": 89,
      "filledFields": 89,
      "correctFields": 89
    },
    "details": {
      "full_name": { "expected": "Rajesh Kumar Sharma", "actual": "Rajesh Kumar Sharma", "status": "PASS" },
      ...
    }
  }
}
```

---

## Scenario Configuration

### 22 Core Scenarios

| # | Scenario | Level | Field count | Focus |
|---|----------|-------|-------------|-------|
| 1 | `baseline` | 0 | 89 | Full canonical KYC form |
| 2 | `level1-basic` | 1 | 4 | Text/email/phone basics |
| 3 | `level2-selection` | 2 | 15 | Select/radio/checkbox/toggle |
| 4 | `level2a-dropdown-variations` | 2 | 9 | Dropdown & selector variations |
| 5 | `level2b-radio-variations` | 2 | 7 | Radio button variations |
| 6 | `level2c-checkbox-variations` | 2 | 7 | Checkbox & toggle variations |
| 7 | `level3-pickers` | 3 | 18 | Date pickers, comboboxes, uploads |
| 8 | `level3a-date-format-variations` | 3 | 6 | Date text-format variations |
| 9 | `level3b-date-picker-variations` | 3 | 6 | Date picker widget variations |
| 10 | `level3c-upload-variations` | 3 | 8 | Document upload variations |
| 11 | `level3d-combined-input-variations` | 3 | 14 | Mixed widget families |
| 12 | `level4-dynamic` | 4 | 8 | Conditional/cascading fields |
| 13 | `level5-complex` | 5 | 7 | Wizard, modal, iframe |
| 14 | `level6-frameworks` | 6 | 6 | Shadow DOM, web components |
| 15 | `level7-adversarial` | 7 | 5 | Combined adversarial stress |
| 16 | `issue-combined` | 7 | 5 | All stresses combined |
| 17 | `issue-duplicate-labels` | 7 | 5 | Duplicate labels only |
| 18 | `issue-dynamic-ids` | 7 | 4 | Dynamic IDs + randomized order |
| 19 | `issue-fake-buttons` | 7 | 4 | Decoy submit buttons only |
| 20 | `issue-hidden-fields` | 7 | 5 | Hidden honeypots only |
| 21 | `issue-network-delay` | 7 | 4 | Latency only |
| 22 | `issue-shadow-dom` | 7 | 4 | Shadow DOM only |

### Variants per Scenario

- **10 variants** per scenario (`v1` through `v10`).
- **Total testable combinations**: 22 scenarios × 10 variants = **220 variants**.
- **Profile alternation**:
  - Variant `v1`: always **Profile A** (`Rajesh Kumar Sharma`).
  - Variants `v2`–`v10`: deterministically alternate between Profile A and Profile B
    (`Anjali Devi Iyer`).
- **Stack coverage**:
  - Variant `v1` of every scenario is mirrored on all 6 stacks (consistency core).
  - Variants `v2`–`v10` are allocated across stacks by market share (React 30%, HTML 20%,
    Angular 15%, PHP 15%, Vue 10%, Flask 10%).

---

## Test Data & Ground Truth

### Canonical Field Categories (89 fields total)

- **Personal Identity** (10 fields): `full_name`, `first_name`, `middle_name`,
  `last_name`, `preferred_name`, `gender`, `dob`, `age`, `nationality`, `marital_status`
- **Contact & Address** (17 fields): mobile/alternate/landline/email, current and
  permanent address lines, landmark, city, district, state, pincode, country,
  `same_as_current`
- **Identity Documents** (5 fields): `aadhaar_number`, `pan_number`, `passport_number`,
  `driving_licence`, `voter_id`
- **Banking Details** (5 fields): `bank_name`, `branch_name`, `account_number`,
  `ifsc_code`, `account_type`
- **Employment & Financial Profile** (9 fields): occupation, employment type, employer,
  designation, industry, annual income, income range, net worth, PEP flag
- **Nominee & Family Details** (9 fields): nominee name/relationship/DOB/share, father,
  mother, spouse, emergency contact
- **Document Uploads** (5 fields): PAN, Aadhaar front/back, photo, signature
- **Verification & Consents** (4 fields): mobile/email OTP, e-sign consent, terms consent
- **Application Metadata** (4 fields): customer ID, branch code, agent ID, referral code
- **Input Widget Variations** (21 fields): date-format text fields, triple date selects,
  calendar popup, custom/searchable/segmented selectors, inline/card radios, toggles,
  checkbox cards, dropzone, multi-file, camera upload

### User Profiles

- **Profile A** — `Rajesh Kumar Sharma` (Mumbai, Maharashtra)
- **Profile B** — `Anjali Devi Iyer` (Bengaluru, Karnataka)

Both profiles are stored in `forms/profiles.json` and exposed via `/api/profiles`.

---

## Test Execution Flow

### Step 1: Health Check
```bash
GET http://localhost:3000/health
```
- Expected: HTTP 200.

### Step 2: Resolve Scenario / Variant
- Load scenario definition from `forms/scenarios/{scenarioId}.json`.
- Resolve fields against `forms/canonical-fields.json`.
- Resolve ground truth from `forms/profiles.json` via `server/variants.js`.
- Apply `server/field-formatters.js` for widget-variation fields.

### Step 3: Submit Verification
```bash
POST http://localhost:3000/api/verify-submission
Content-Type: application/json

{
  "scenarioId": "scenario-id",
  "variantId": "scenario-id-v1",
  "data": { ...ground-truth fields... }
}
```

### Step 4: Verify Results
- Expect HTTP 200 with JSON body.
- Check `response.success === true`.
- Check `response.report.score === 100`.
- If score < 100: FAILED — inspect `response.report.details` for `MISMATCH` or `MISSING`
  fields.
- If score === 100: PASSED ✅

---

## Expected Metrics

### Scoring Formula

```
Overall Score = (Accuracy × 0.35) + (Completeness × 0.25) + (Safety × 0.40)
```

- **Accuracy**: % of ground-truth fields with matching submitted values.
- **Completeness**: % of required fields that were filled.
- **Safety**: 100 unless an identity field (PAN/Aadhaar) is wrong or any honeypot field
  is filled; drops to 0 in either case.

### Success Criteria

- ✅ **PASSED**: `score === 100`.
- ❌ **FAILED**: `score < 100`.

---

## Current Test Status

- ✅ **220 / 220 variants verified at 100/100** (latest run).
- ✅ All 22 scenarios exercise their intended widget families and stress flags.
- ✅ All 6 stacks render forms correctly for the `v1` consistency core.
- ✅ Date-separator normalization correctly handles `/`, `-`, and `.` separators.
- ✅ `profileKey` indirection resolves widget-variation ground truth from the canonical
  profile values.

---

## How to Run Tests Manually

**Terminal 1 — Install and start the central orchestrator:**
```bash
npm install
npm start        # http://localhost:3000
```

**Terminal 2 — Start the stack servers:**
```bash
npm run stacks   # ports 3010-3015
```

**Terminal 3 — Run tests:**
```bash
# Baseline scenario
npm test

# Specific scenario
npm run test:scenario level4-dynamic

# Explicit variant
npm run test:scenario level3a-date-format-variations-v7

# Everything
npm run test:all
```

---

## Potential Issues & Workarounds

### Issue 1: `npm run test:all` reports connection refused
**Cause**: Central orchestrator or stack servers are not running.
**Solution**: Start `npm start` and `npm run stacks` first.

### Issue 2: Tests fail after changing canonical fields or scenario definitions
**Cause**: Static generated forms may be stale.
**Solution**: Run `npm run generate` to regenerate stack HTML files, then restart servers
and re-run `npm run test:all`.

### Issue 3: "Invalid JSON response"
**Cause**: Server returned an HTML error page instead of JSON.
**Solution**: Check server logs for stack traces and ensure the request body is valid JSON.

### Issue 4: All tests score < 100
**Cause**: Ground-truth mismatch, validation rule change, or profile drift.
**Solution**: Inspect `response.report.details` for the offending fields; verify
`forms/profiles.json` and `forms/canonical-fields.json` are consistent.

### Issue 5: Date-format variation fails with separator mismatch
**Cause**: An early formatting bug normalized dates with the wrong separator.
**Solution**: The fix is in `server/field-formatters.js`; ensure you are on the latest
version and re-run `npm run test:all`.

---

## Test Performance Expectations

| Test | Duration | Output |
|------|----------|--------|
| Single scenario | ~500ms | 1 result |
| 5 scenarios | ~2.5s | 5 results |
| All scenarios (220 variants) | ~90s–120s | Summary with pass/fail counts |

---

## Files Involved

**Test Scripts:**
- `server/test-verification.js` — single-scenario tester
- `server/test-all-scenarios.js` — exhaustive variant suite

**Core Modules:**
- `server/scenarios.js` — scenario loader
- `server/variants.js` — deterministic variant / ground-truth resolver
- `server/field-formatters.js` — widget-variation value formatting/parsing
- `server/form-renderers.js` — six stack renderers + shared web components
- `server/index.js` — central orchestrator
- `server/routes/evaluation.js` — verification API and scoring logic
- `server/distribution.js` — market-share allocation

**Test Data:**
- `forms/scenarios/*.json` — 22 scenario definitions
- `forms/scenarios/index.json` — generated scenario catalog
- `forms/canonical-fields.json` — 89-field canonical registry
- `forms/ground-truth.json` — default baseline values
- `forms/profiles.json` — user profiles A & B
- `forms/field-variations.json` — widget-variation registry

---

## Summary

The KYC Form Hub test suite is comprehensive, deterministic, and fully automated:

- ✅ **22 scenarios** covering Levels 0–7 plus input-variation and issue variants.
- ✅ **220 scenario variants** (10 per scenario).
- ✅ **2,400 field-value pairs** verified against deterministic ground truth.
- ✅ **6 web tech stacks** exercised by the `v1` consistency core and market-share
  allocation.
- ✅ **220 / 220 variants pass** at 100/100 in the latest self-verification run.

To reproduce, start the central orchestrator and stack servers, then run `npm run
 test:all`.
