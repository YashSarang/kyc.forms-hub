# KYC Form Hub Architecture

## 1. Executive Overview

**KYC Form Hub** is a benchmark platform for evaluating autonomous web-filling AI agents. It benchmarks agent performance on complex, real-world Know-Your-Customer (KYC) workflows, specifically targeting Indian compliance standards (with US expansion capability).

---

## 2. System Architecture

```
                      +------------------------------------------+
                      |         AI Form-Filling Agent            |
                      |  Loads profiles + agent-manifest, then   |
                      |  visits each form URL and submits        |
                      +------------------------------------------+
                                           |
                    (Interacts via DOM / Browser Automation)
                                           v
+----------------------------------------------------------------------------------+
|                       Central Orchestrator (port 3000)                           |
|  - Agent portal: /agent-portal & /api/agent-manifest                             |
|  - User profiles: /api/profiles                                                  |
|  - Global scenario catalog, canonical fields, ground truth                       |
|  - Dynamic renderer: /form/:stack/:scenarioId(/v{n})                            |
|  - Evaluation API: POST /api/verify-submission                                   |
|  - Benchmark API:  POST /api/benchmark/run, GET /api/benchmark/report            |
|  - Distribution API: GET /api/distribution                                       |
+----------------------------------------------------------------------------------+
        ^        ^        ^        ^        ^        ^
        |        |        |        |        |        |
   +---------+ +---------+ +---------+ +---------+ +---------+ +---------+
   | HTML    | | React   | | Angular | | Vue     | | PHP     | | Flask   |
   | :3010   | | :3011   | | :3012   | | :3013   | | :3014   | | :3015   |
   +---------+ +---------+ +---------+ +---------+ +---------+ +---------+
```

- **Central orchestrator** owns canonical schemas, scenario definitions, evaluation, and benchmark reporting. It is configured via environment variables (see `.env.example` and `server/config.js`).
- **Stack servers** each host only the variants allocated to them by market share. They render forms dynamically and POST submissions to the central API configured by `CENTRAL_API_URL`.
- **Consistency core**: variant `v1` of every scenario exists on all 6 stacks so cross-stack behavior can be compared for identical ground truth.
- **Benchmark storage**: runs are stored in memory by default. Set `BENCHMARK_STORAGE_PATH` to a JSON file for lightweight persistence across restarts.

---

## 3. Tech Stack Distribution Benchmark

To evaluate agent robustness across real-world web environments, target forms are implemented across 6 distinct web technologies with realistic market proportions:

| Web Tech Stack | Target Share | Implementation Characteristics |
| :--- | :---: | :--- |
| **React / Next.js** | 30% | Controlled input components, synthetic state updates, virtual DOM |
| **Plain HTML / jQuery** | 20% | Standard DOM elements, native HTML validation, traditional event handlers |
| **Angular** | 15% | Two-way binding (`ngModel`), reactive forms, shadow root components |
| **PHP (Server-rendered)** | 15% | Full page posts, session state, classic server-rendered forms |
| **Vue.js** | 10% | `v-model` binding, reactive properties, component slots |
| **Flask / Python Mock** | 10% | Jinja template rendering, multipart uploads |

### Market-Share Distribution

Each of the 15 scenarios has 10 deterministic variants. Variant `v1` is mirrored to every stack (consistency core). Variants `v2`–`v10` are allocated by share:

| Stack | Share | v2-v10 Allocated | Total Forms |
| :--- | :---: | :---: | :---: |
| React | 30% | 41 | 56 |
| HTML / jQuery | 20% | 27 | 42 |
| Angular | 15% | 20 | 35 |
| PHP | 15% | 20 | 35 |
| Vue | 10% | 14 | 29 |
| Flask | 10% | 13 | 28 |
| **Total** | **100%** | **135** | **225** |

Allocation is computed by `server/distribution.js` and exposed via `GET /api/distribution`.

---

## 4. Difficulty Matrix (Levels 1–7)

1. **Level 1 (Basic Text)**: Standard single-line text, email, phone number fields.
2. **Level 2 (Selection Controls)**: Native dropdowns, radio buttons, checkboxes, toggle switches.
3. **Level 3 (Complex Inputs)**: Datepickers, autocomplete/typeahead inputs, searchable comboboxes.
4. **Level 4 (Dynamic Rules)**: Conditional fields (e.g., spouse name on marital status), cascading dropdowns (Country -> State -> City), live validation (PAN/Aadhaar regex).
5. **Level 5 (Modals & Multi-step)**: Wizards with step validation, side-drawers, popups, embedded iframes.
6. **Level 6 (Advanced Framework Features)**: Custom Web Components, Shadow DOM encapsulations, virtualized lists.
7. **Level 7 (Adversarial & Stress Conditions)**: Duplicate labels, fake/decoy submit buttons, network latency delays, hidden fields, dynamic DOM mutating elements.

---

## 5. Scenario Engine

The benchmark is driven by JSON scenario definitions in `forms/scenarios/`:

- **Level 0** (`baseline`): full canonical 50+ field KYC form for repeatable cross-stack comparison.
- **Levels 1–7**: progressively harder interaction patterns.
- **Issue variants**: focused adversarial stress tests (duplicate labels, fake buttons, hidden honeypots, dynamic IDs, network delay, shadow DOM, combined).

Each scenario declares:
- `id`, `level`, `name`, `description`
- `fields`: either `"canonical"` or a per-scenario array
- `stressFlags`: toggles for adversarial behavior
- `groundTruth`: per-scenario structural overrides (e.g., honeypots must be empty)

The server resolves scenario fields against `forms/canonical-fields.json` and expected values against `forms/profiles.json`. Two canonical profiles (A and B) are the single source of truth; every variant is deterministically mapped to one profile, while the UI/stack/stress conditions vary.

## 6. Evaluation Dimensions & Scoring Formula

Agents are scored on 8 primary metrics upon form submission:

$$ \text{Overall Score} = 0.35 \cdot \text{Accuracy} + 0.25 \cdot \text{Completeness} + 0.40 \cdot \text{Safety} $$

- **Accuracy**: % of filled fields matching expected ground truth data values.
- **Completeness**: % of mandatory/required fields successfully completed.
- **Robustness**: Benchmark score across different tech stacks and stress flags.
- **Efficiency**: Time taken to navigate and submit the form successfully.
- **Cost**: LLM token consumption and API call count per submission.
- **Reliability**: Pass rate over repeated runs under identical parameters.
- **Recovery**: Ability to re-attempt after triggering validation errors.
- **Safety**: Correct handling of sensitive identity records (PAN/Aadhaar match) and zero honeypot fills.

## 7. Benchmark Pipeline

1. Agent fetches the two profiles via `GET /api/profiles`.
2. Agent fetches the full URL manifest via `GET /api/agent-manifest` (or browses `/agent-portal`).
3. For each manifest entry, the agent opens the form URL and uses the indicated profile (A or B) to fill the fields.
4. The stack server submits the form to `POST /api/verify-submission` on the central orchestrator.
5. The orchestrator evaluates the submission against the profile-based ground truth and returns a per-form score.
6. Agent or harness records runs via `POST /api/benchmark/run`.
7. Aggregate metrics fetched via `GET /api/benchmark/report`.
