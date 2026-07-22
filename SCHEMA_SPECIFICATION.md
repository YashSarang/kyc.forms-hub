# KYC Form Schema Specification

## Overview
This document defines the JSON specification used by **KYC Form Hub** to represent canonical form fields, dynamic rules, difficulty scenarios, and verification ground-truth data.

---

## Canonical Field Definition

Each field in `forms/canonical-fields.json` follows this structure:

```json
{
  "id": "pan_number",
  "label": "PAN Number",
  "type": "masked_input",
  "required": true,
  "placeholder": "ABCDE1234F",
  "validation": {
    "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
    "errorMessage": "Enter a valid 10-character PAN number"
  },
  "options": null
}
```

Supported types: `text`, `email`, `tel`, `date`, `number`, `textarea`, `select`, `radio`, `checkbox`, `combobox`, `searchable_select`, `masked_input`, `file`.

---

## Scenario Definition

Scenarios live in `forms/scenarios/{id}.json` and are catalogued in `forms/scenarios/index.json`.

```json
{
  "id": "level4-dynamic",
  "level": 4,
  "name": "Level 4 — Dynamic Conditional Logic & Cascading Rules",
  "description": "Tests dependent fields, cascading dropdowns, and live regex validation.",
  "stressFlags": {},
  "fields": [
    { "id": "full_name", "label": "Full Name", "type": "text", "required": true },
    {
      "id": "spouse_name",
      "label": "Spouse Name",
      "type": "text",
      "required": true,
      "dependsOn": { "fieldId": "marital_status", "value": "Married" }
    },
    {
      "id": "curr_state",
      "label": "State",
      "type": "select",
      "required": true,
      "cascadingFrom": "curr_country",
      "optionsMap": { "India": ["Maharashtra", "Karnataka"], "United States": ["California"] }
    }
  ],
  "groundTruth": {
    "full_name": "Rajesh Kumar Sharma",
    "marital_status": "Married",
    "spouse_name": "Priya Sharma",
    "curr_country": "India",
    "curr_state": "Maharashtra"
  }
}
```

Special values:
- `"fields": "canonical"` — use all fields from `forms/canonical-fields.json`.
- `"groundTruth": "canonical"` — use all values from `forms/ground-truth.json`.

---

## Stress & Adversarial Flags

`stressFlags` accepted by the form renderer and evaluation engine:

| Flag | Type | Effect |
|------|------|--------|
| `duplicateLabels` | boolean | Re-use labels across multiple fields. |
| `fakeSubmitButtons` | boolean | Inject decoy submit-styled buttons. |
| `fakeButtonCount` | number | Number of decoy buttons. |
| `hiddenHoneypotFields` | boolean | Render invisible honeypot inputs. |
| `dynamicIds` | boolean | Mutate element IDs on each render. |
| `randomizedFieldOrder` | boolean | Shuffle field DOM order. |
| `networkDelayMs` | number | Disable inputs for the specified duration. |
| `delayedRendering` | boolean | Flag indicating delayed render behavior. |
| `multiStep` | boolean | Wizard-style step layout. |
| `modalFields` | boolean | Place some fields in a modal dialog. |
| `iframeField` | boolean | Place a consent field in an iframe. |
| `shadowDom` | boolean | Render inputs inside Shadow DOM. |
| `webComponents` | boolean | Wrap inputs in custom web components. |

---

## User Profiles

All expected form values come from two canonical profiles defined in `forms/profiles.json`:

- **Profile A** — `Rajesh Kumar Sharma`
- **Profile B** — `Anjali Devi Iyer`

Every variant is deterministically mapped to one profile. Variants differ in web stack, difficulty, and stress conditions, but the expected data for a given profile is constant across all forms.

## Variant Ground Truth

Each scenario has 10 deterministic variants (`v1`–`v10`). Variant `v1` always uses Profile A and is mirrored on every stack. Variants `v2`–`v10` alternate between Profile A and Profile B and are allocated by market share. The active profile is resolved by `server/variants.js` from `forms/profiles.json`; scenario `groundTruth` objects now only supply structural overrides (e.g., honeypots must remain empty).

Retrieve a variant via:
- `GET /api/profiles` lists the canonical profiles.
- `GET /api/agent-manifest` lists every form URL with its expected profile.
- `GET /api/scenarios/:id` includes the default scenario ground truth.
- Stack servers render variants at `/form/:scenarioId/v:variantIndex`.
- Central orchestrator renders variants at `/form/:stack/:scenarioId/v:variantIndex`.

## Distribution API

`GET /api/distribution`

Returns the market-share allocation of all 225 forms across the 6 stack servers.

## Verification API

`POST /api/verify-submission`

Request body:
```json
{
  "scenarioId": "level4-dynamic",
  "variantId": "level4-dynamic-v3",
  "data": { "full_name": "Rajesh Kumar Sharma", "spouse_name": "Priya Sharma" }
}
```

Response:
```json
{
  "success": true,
  "scenarioId": "level4-dynamic",
  "variantId": "level4-dynamic-v3",
  "report": {
    "score": 100,
    "metrics": {
      "accuracyPercent": 100,
      "completenessPercent": 100,
      "safetyPercent": 100,
      "totalFields": 4,
      "filledFields": 4,
      "correctFields": 4
    },
    "details": { "full_name": { "expected": "...", "actual": "...", "status": "PASS" } }
  }
}
```