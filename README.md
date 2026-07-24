# KYC Form Hub

A comprehensive benchmark suite for evaluating autonomous AI form-filling agents across **50+ canonical KYC fields**, **6 web tech stacks**, **7 difficulty levels**, and real-world adversarial stress conditions.

---

## Benchmark Highlights

- **50+ Canonical Fields**: Personal identity, contact, government IDs (Aadhaar, PAN, Passport), banking, employment, uploads, nominees, family, and consents.
- **6 Web Tech Stacks**:
  1. **React / Next.js** (30% share)
  2. **Plain HTML / jQuery** (20% share)
  3. **Angular Reactive Forms** (15% share)
  4. **PHP Server-Rendered Mock** (15% share)
  5. **Vue.js Reactive Stack** (10% share)
  6. **Flask / Python WTForms Mock** (10% share)
- **7 Difficulty Levels**: Basic text → Selection controls → Pickers & Comboboxes → Dynamic conditional fields → Multi-step wizards & Modals → Framework Shadow DOM → Adversarial stress tests.
- **Issue Variants**: Duplicate labels, fake submit buttons, hidden honeypots, dynamic IDs, network latency, and combined adversarial stacks.
- **Evaluation & Benchmark API**: Per-scenario ground truth, automated scoring (Accuracy, Completeness, Safety), and aggregate benchmark reporting.

---

## Documentation Links

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture, stack ratios, evaluation formulas.
- [SCHEMA_SPECIFICATION.md](SCHEMA_SPECIFICATION.md) - JSON schema format for form scenarios and stress testing.
- [Plan.md](Plan.md) - Benchmark metrics, difficulties, and stress testing.
- [Tech-stacks.md](Tech-stacks.md) - Stack breakdown and advanced features.
- [Form-Canonical-Fields.md](Form-Canonical-Fields.md) - Full list of canonical KYC fields.
- [Input-Fields-type.md](Input-Fields-type.md) - Input widgets and dynamic interaction patterns.
- [BENCHMARK_REPORT.md](BENCHMARK_REPORT.md) - Benchmark report template and sample output.
- [METHODOLOGY.md](METHODOLOGY.md) - Design methodology and thought process.
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines.
- [LICENSE](LICENSE) - MIT license.

---

## Quick Start

### Installation & Server Launch
```bash
npm install
npm start          # central orchestrator on http://localhost:3000
npm run stacks     # six stack servers on ports 3010-3015 (new terminal)
```

Open `http://localhost:3000` to browse all form variants and see distribution details.

For local development with a `.env` file:
```bash
cp .env.example .env
npm run dev
npm run stacks:dev
```

### Production Deployment

KYC Form Hub is a set of plain Node.js/Express servers. Key environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Central orchestrator port |
| `HOST` | `0.0.0.0` | Bind address |
| `PUBLIC_BASE_URL` | `http://localhost:3000` | Used in manifest, portal, and generated links |
| `CORS_ORIGIN` | `*` | CORS origin for API endpoints |
| `TRUST_PROXY` | `false` | Trust `X-Forwarded-*` headers when behind a reverse proxy |
| `BENCHMARK_STORAGE_PATH` | *(in-memory)* | JSON file path to persist benchmark runs across restarts |
| `STACK_*_PORT` | `3010-3015` | Per-stack server ports |
| `CENTRAL_API_URL` | `http://localhost:3000` | URL stack servers use to call the central API |

Copy `.env.example` to `.env` and adjust for your host. A reverse proxy (nginx, Caddy, cloud load balancer) can terminate TLS and forward to the orchestrator and stack ports.

> **Persistence note:** Benchmark runs are stored in memory by default and are lost on restart. Set `BENCHMARK_STORAGE_PATH=benchmark-runs.json` for lightweight JSON persistence. This is intended as a temporary aid for tuning agents, not a long-term analytics database.

### Health Checks

- Orchestrator: `GET /health`
- Stack servers: each stack root page (`/`) returns a list of assigned forms.

### Agent Entry Point

The benchmark exposes a dedicated agent portal at:

```
http://localhost:3000/agent-portal
```

This page lists every form URL an agent must fill, along with the expected user profile (A or B) for each variant. Agents can also consume the machine-readable manifest:

```bash
curl http://localhost:3000/api/agent-manifest
```

Two canonical user profiles are provided in `forms/profiles.json`. Every form variant expects **either Profile A or Profile B** values; variants differ only in web stack, difficulty level, and stress conditions.

### Multi-Server Architecture
| Stack | Port | Market Share | Server File |
|---|---|---|---|
| Plain HTML / jQuery | 3010 | 20% | `server/stack-server-html.js` |
| React / Next.js | 3011 | 30% | `server/stack-server-react.js` |
| Angular Reactive | 3012 | 15% | `server/stack-server-angular.js` |
| Vue.js | 3013 | 10% | `server/stack-server-vue.js` |
| PHP Server-Rendered | 3014 | 15% | `server/stack-server-php.js` |
| Flask / Python WTForms | 3015 | 10% | `server/stack-server-flask.js` |

The **central orchestrator** (`:3000`) hosts global APIs, the scenario catalog, and `/form/{stack}/{scenarioId}`. Each **stack server** hosts only the variants assigned to it by market share and submits results back to the central API.

### Form Distribution
- 15 scenarios × 10 variants = **150 distinct scenario variants** (each with a fixed ground truth).
- Variant `v1` of every scenario is **mirrored on all 6 stacks** (consistency core) = 90 served stack instances.
- Variants `v2`–`v10` are distributed by market share:
  - React 41, HTML 27, Angular 20, PHP 20, Vue 14, Flask 13 = 135 served stack instances.
- **Total served forms = 225**.

Get the live allocation: `GET http://localhost:3000/api/distribution`

### Generate Static Form Files (optional)
The servers render forms dynamically, but you can also materialize every variant to disk:
```bash
npm run generate
```
This creates:
- `server/stacks/{stack}/{scenario}.html` (15 per stack)
- `server/stacks/{stack}/variants/{scenario}-v{n}.html` (market-share allocation)

After changing `PUBLIC_BASE_URL` or stack ports, regenerate the link catalog:
```bash
npm run generate:links
```

### Stack Endpoints — Legacy Full Baseline
- HTML / jQuery: `http://localhost:3000/stacks/html/index.html`
- React: `http://localhost:3000/stacks/react/index.html`
- Angular: `http://localhost:3000/stacks/angular/index.html`
- Vue: `http://localhost:3000/stacks/vue/index.html`
- PHP: `http://localhost:3000/stacks/php/index.html`
- Flask: `http://localhost:3000/stacks/flask/index.html`

### Scenario Form Variants (dynamically rendered)
Any scenario can be rendered in any stack on the central orchestrator:
```
/form/{stack}/{scenarioId}
/form/{stack}/{scenarioId}/v{1-10}
```
Examples:
- `http://localhost:3000/form/html/level1-basic`
- `http://localhost:3000/form/react/level7-adversarial/v3`
- `http://localhost:3000/form/vue/issue-duplicate-labels`

Each stack server serves only its assigned variants:
```
http://localhost:3011/form/level1-basic/v1
http://localhost:3011/form/level4-dynamic/v5
```

### API Endpoints
- `GET /health` — orchestrator health check
- `GET /api/scenarios` — list scenarios
- `GET /api/scenarios/:id` — scenario details and ground truth
- `GET /api/canonical-fields` — canonical field definitions
- `GET /api/distribution` — market-share distribution of all 225 forms
- `GET /api/profiles` — list canonical user profiles (A & B)
- `GET /api/profiles/:id` — single profile data for an agent
- `GET /api/agent-manifest` — JSON list of every form URL with expected profile
- `POST /api/verify-submission` — evaluate submission `{ scenarioId, variantId?, data }`
- `POST /api/benchmark/run` — record an agent run
- `GET /api/benchmark/report` — aggregate report (add `?format=html` for a UI)

### User Profiles

The two profiles are the single source of truth for all forms:

- **Profile A** — `Rajesh Kumar Sharma` (Mumbai)
- **Profile B** — `Anjali Devi Iyer` (Bengaluru)

Fetch them at `/api/profiles/A` and `/api/profiles/B`. When an agent visits a form from the manifest, it should use the indicated profile values.

> **Forms are intentionally blank.** No editable field is pre-filled. The agent must fill every form using only the supplied profile.

### Running an External Agent Across the Whole Benchmark

A harness is provided to drive any agent that accepts `--url` and `--profile`:

```bash
node server/agent-benchmark.js \
  --agent-cmd "npx tsx src/index.ts fill" \
  --agent-dir /path/to/your/agent-project \
  --profile-out ./shared/user-profile.json \
  --agent-id my-agent
```

The harness:
1. Downloads the manifest from `/api/agent-manifest`.
2. Writes the correct profile (A or B) to `--profile-out` before each form. The file is a flat JSON object containing `profileId`, `profileName`, and every field value.
3. Invokes your agent with `--url <form-url> --profile <profile-out>`.
4. Appends `?agentId=<agent-id>` to every URL so the form submission is recorded as a benchmark run.

Track overall results in real time:

```bash
curl "http://localhost:3000/api/benchmark/report?agentId=my-agent"
```

Or open the human-friendly report:
```
http://localhost:3000/api/benchmark/report?agentId=my-agent&format=html
```

Or open the agent portal: `http://localhost:3000/agent-portal`

### Saving Agent Performance for Later Tuning

Whenever a form is submitted with `?agentId=<agent-id>`, the result is recorded as a benchmark run. To keep these runs across server restarts, set:

```bash
BENCHMARK_STORAGE_PATH=benchmark-runs.json
```

This produces a temporary JSON log that you can inspect to identify which scenarios/stacks/fields your agent struggles with. We can discuss richer approaches (SQLite, S3, webhook callbacks, per-field drill-down dashboards) when you are ready.

### Verify a Scenario
```bash
npm test                         # baseline scenario
npm run test:scenario level4-dynamic
npm run test:scenario level1-basic-v3   # variant verification
npm run test:all                 # every scenario variant (requires running server)
```

---

## License
MIT
