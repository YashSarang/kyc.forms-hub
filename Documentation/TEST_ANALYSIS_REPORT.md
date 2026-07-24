# KYC Form Hub - Verification Test Analysis Report

## Summary
The KYC Form Hub project includes a comprehensive test suite for verifying form submission handling across multiple scenarios, difficulty levels, and web tech stacks. However, **the test suite CANNOT currently execute in this environment due to shell access limitations**.

## Test Infrastructure

### Available Test Scripts
1. **npm test** → `node server/test-verification.js baseline`
   - Tests a single scenario (default: "baseline")
   - Requires running server
   - Verifies form submission accuracy

2. **npm run test:scenario {scenarioId}** → `node server/test-verification.js {scenarioId}`
   - Tests a specific scenario
   - Supports variant syntax: `level4-dynamic-v3`
   - Returns verification score and metrics

3. **npm run test:all** → `node server/test-all-scenarios.js`
   - Comprehensive smoke test
   - Verifies **every scenario variant** against ground truth
   - Requires server to be running
   - Tests up to 150 scenario variants (15 scenarios × 10 variants)

## Test Architecture

### Server Requirements
- **Central Orchestrator**: Must be running on `http://localhost:3000`
- **Health endpoint**: `GET /health`
- **Verification endpoint**: `POST /api/verify-submission`

### Test Payload Structure
```json
{
  "scenarioId": "baseline",
  "variantId": null,
  "data": {
    "full_name": "Rajesh Kumar Sharma",
    "email": "rajesh.sharma@example.com",
    ...canonical KYC fields...
  }
}
```

### Expected Response Format
```json
{
  "success": true,
  "statusCode": 200,
  "report": {
    "score": 100,
    "metrics": {
      "accuracy": 100,
      "completeness": 100,
      "safety": 100
    },
    "details": { ...field-level verification... }
  }
}
```

## Scenario Configuration

### 15 Core Scenarios (from Plan.md)

**Basic Scenarios (Levels 1-4)**
1. **baseline** - All canonical KYC fields, full profiles
2. **level1-basic** - Text/basic input fields only
3. **level2-selection** - Add select, radio, checkbox controls
4. **level3-pickers** - Add date/time pickers and comboboxes
5. **level4-dynamic** - Conditional/cascading fields with dependencies

**Advanced Scenarios (Levels 5-7)**

6. **level5-wizards** - Multi-step wizard layouts and modals
7. **level6-shadow-dom** - Shadow DOM and web components
8. **level7-adversarial** - Extreme stress testing

**Issue/Adversarial Variants**
9-15. **issue-{type}** variants:
   - `issue-duplicate-labels` - Duplicate field labels
   - `issue-fake-submit-buttons` - Decoy submit buttons
   - `issue-hidden-honeypots` - Hidden honeypot fields
   - `issue-dynamic-ids` - Dynamically changing element IDs
   - `issue-network-latency` - Simulated network delays
   - `issue-combined-stress` - Multiple combined adversarial conditions

### Variants per Scenario
- **10 variants** per scenario (v1 through v10)
- **Total testable combinations**: 15 scenarios × 10 variants = **150 scenario variants**
- **Profile alternation**:
  - Variant v1: Always **Profile A** (Rajesh Kumar Sharma)
  - Variant v2-v10: Alternate between Profile A and Profile B (Anjali Devi Iyer)

## Test Data & Ground Truth

### Canonical KYC Fields (~50+ fields across categories)
**Personal Identity**: full_name, first_name, middle_name, last_name, gender, dob, nationality, marital_status
**Contact & Address**: mobile_number, email, curr_address_line1, curr_city, curr_state, curr_pincode
**Identity Documents**: aadhaar_number, pan_number, passport_number, driving_licence
**Banking**: bank_name, account_number, ifsc_code, account_type
**Employment & Financial**: occupation, employment_type, annual_income, income_range
**Nominee & Family**: nominee_name, nominee_relationship
**Verification**: is_pep (Politically Exposed Person flag)

### User Profiles
**Profile A** - Rajesh Kumar Sharma (Mumbai, Maharashtra)
**Profile B** - Anjali Devi Iyer (Bengaluru, Karnataka)

## Test Execution Flow

### Step 1: Server Health Check
```javascript
GET http://localhost:3000/health
```
- Returns HTTP 200 if ready
- Timeout: 2 seconds

### Step 2: Load Scenario Data
- Reads scenario definition from `forms/scenarios/{scenarioId}.json`
- Resolves field definitions
- Determines ground truth values based on profile

### Step 3: Submit Verification
```javascript
POST http://localhost:3000/api/verify-submission
Content-Type: application/json

{
  "scenarioId": "scenario-id",
  "variantId": "scenario-id-v1",
  "data": { ...ground truth fields... }
}
```

### Step 4: Verify Results
- Expects HTTP 200 response with JSON body
- Checks `result.success === true`
- Checks `result.report.score === 100`
- If score < 100: FAILED, shows details
- If score === 100: PASSED ✅

## Expected Metrics

### Scoring Formula
```
Overall Score = (Accuracy × 0.4) + (Completeness × 0.4) + (Safety × 0.2)
```

**Accuracy**: % of fields with correct values
**Completeness**: % of required fields that were filled
**Safety**: % of honeypot fields that were correctly left empty

### Success Criteria
- ✅ PASSED: Score = 100%
- ❌ FAILED: Score < 100%

## Current Test Status

### Cannot Execute Because:
1. **No Shell Access** - PowerShell unavailable in this environment
2. **No Server Running** - Port 3000 not responding
3. **Missing Test Scenario Data** - Scenarios might not be generated

### To Run Tests Manually:

**In Terminal 1 (Start Server):**
```bash
cd C:\Code\kyc-form-hub
npm install
npm start
```

**In Terminal 2 (Run Tests):**
```bash
cd C:\Code\kyc-form-hub

# Test single scenario
npm test                              # baseline
npm run test:scenario level4-dynamic  # specific scenario

# Test everything
npm run test:all                      # All 150 scenario variants
```

## Potential Issues & Workarounds

### Issue 1: Scenarios Directory Empty
**Symptom**: No JSON files in `forms/scenarios/`
**Cause**: Scenarios may need to be generated
**Solution**: Run `npm run generate` to materialize all forms

### Issue 2: Server Won't Start
**Symptom**: Cannot connect to http://localhost:3000
**Cause**: Port 3000 already in use or server crashed
**Solution**: 
```bash
# Check port 3000
netstat -ano | findstr :3000
# Kill process and retry
```

### Issue 3: Tests Fail with "Invalid JSON Response"
**Symptom**: "Invalid JSON response: ..."
**Cause**: Server returned HTML error instead of JSON
**Solution**: Check server logs for stack traces

### Issue 4: All Tests Score < 100
**Symptom**: All scenarios pass but scores are less than perfect
**Cause**: Field validation rules or profile mismatch
**Solution**: Inspect `report.details` for which fields failed

## Test Performance Expectations

| Test | Duration | Output |
|------|----------|--------|
| Single scenario | ~500ms | 1 JSON response |
| 5 scenarios | ~2.5s | 5 results |
| All scenarios (150) | ~60s | Summary with pass/fail counts |

## Files Involved

**Test Scripts**:
- `server/test-verification.js` - Single scenario tester
- `server/test-all-scenarios.js` - Comprehensive test suite

**Core Modules**:
- `server/scenarios.js` - Scenario loader
- `server/variants.js` - Variant resolver
- `server/index.js` - Express server
- `server/routes/evaluation.js` - Verification API

**Test Data**:
- `forms/scenarios/*.json` - Scenario definitions (15 files)
- `forms/canonical-fields.json` - Field definitions
- `forms/ground-truth.json` - Default values
- `forms/profiles.json` - User profiles A & B

## Recommended Actions

1. **First**: Ensure server can start
   ```bash
   npm install  # Install dependencies if needed
   npm start    # Start on port 3000
   ```

2. **Second**: Verify scenarios exist
   ```bash
   npm run generate  # Generate scenario files
   ```

3. **Third**: Run baseline test
   ```bash
   npm test  # Should show ✅ 100% VERIFICATION PASSED
   ```

4. **Fourth**: Run complete test suite
   ```bash
   npm run test:all  # Comprehensive verification of all 150 variants
   ```

## Summary

The KYC Form Hub test suite is comprehensive and well-structured, designed to verify form-filling accuracy across:
- ✅ 15 different scenarios
- ✅ 10 variants per scenario (150 total)
- ✅ 6 web tech stacks
- ✅ Multiple user profiles
- ✅ Adversarial stress conditions

To run the tests, you need a terminal with Node.js access and the ability to start background processes.
