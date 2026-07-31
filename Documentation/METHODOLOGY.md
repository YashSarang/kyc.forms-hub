# KYC Form Hub — Methodology & Thought Process

This document explains the design philosophy, methodology, and reasoning behind KYC Form Hub. It is intended for contributors, maintainers, and anyone evaluating the benchmark for research or production use.

## 1. Why This Project Exists

Autonomous web-filling agents need a realistic, repeatable way to prove they can complete complex, multi-page forms correctly. KYC workflows are an ideal test bed because they:

- Combine many input types (text, selection, dates, files, consents).
- Have strong ground truth (the applicant's real identity and contact details).
- Appear across diverse web stacks in the wild.
- Include adversarial traps such as honeypots, duplicate labels, and decoy buttons.

The goal was not to build yet another form builder, but to build a **benchmark harness** that stresses agents in the same ways production KYC portals do.

## 2. Design Principles

### 2.1 Simplicity First
Every file should do one thing and be readable by a new contributor in a few minutes. We avoided heavy frameworks, databases, and build pipelines because they would increase operational cost without improving the benchmark's core value.

### 2.2 Single Source of Truth
Two canonical profiles (A and B) define the expected values for every field. Scenarios may reduce the field set or add stress conditions, but the expected values always derive from these profiles. This makes the benchmark deterministic and easy to reason about.

### 2.3 Deterministic Variants
Each scenario has exactly 10 variants. Variant `v1` is always Profile A and is mirrored across all stacks. Variants `v2`–`v10` alternate between Profile A and Profile B deterministically and are allocated to stacks by market share. Repeatability is more important than randomness for a benchmark.

### 2.4 Stack Diversity
Agents must work across plain HTML, React, Angular, Vue, PHP, and Flask. Market-share weighting (React 30%, HTML 20%, Angular/PHP 15%, Vue/Flask 10%) reflects the approximate distribution of real KYC portals without over-engineering a perfect census.

### 2.5 Adversarial Conditions as First-Class Citizens
Stress flags (duplicate labels, fake submit buttons, honeypots, dynamic IDs, network delay, shadow DOM) are scenario metadata. This lets us compose issue variants and a combined adversarial scenario without duplicating form definitions.

## 3. Architecture Decisions

### 3.1 Central Orchestrator + Stack Servers
A single central server owns schemas, profiles, evaluation, and reporting. Six small stack servers render forms in their respective technologies. This separation:

- Keeps evaluation logic in one place.
- Lets each stack server be simple and self-contained.
- Makes it easy to add a new stack later by implementing one renderer function.

### 3.2 In-Memory Default with Optional JSON Persistence
Benchmark runs default to in-memory storage because it is the simplest possible behavior. For users who want to tune agents over multiple sessions, `BENCHMARK_STORAGE_PATH` writes runs to a JSON file. We deliberately did not add a database because that would require schema migrations, backups, and operational expertise that distracts from the benchmark mission.

### 3.3 Environment-Based Configuration
All environment-specific values live in `server/config.js`. Ports, base URLs, CORS, and storage path are configurable via environment variables. This lets the same code run on `localhost:3000`, a Docker container, or a cloud VM without source changes.

### 3.4 No File Upload Backend
Upload fields exist in the schema but are marked `required: false` and their ground-truth values are `null`. Real file handling would require storage, virus scanning, and multipart parsers; the benchmark focuses on whether an agent can identify and interact with file inputs, not on actually storing uploads.

### 3.5 Scoring Formula
The score weights accuracy (35%), completeness (25%), and safety (40%). Safety is weighted highest because in KYC workflows an agent must never submit the wrong identity documents or fall into honeypots. Accuracy and completeness measure how well the agent maps profile data to fields.

## 4. Implementation Methodology

### 4.1 Scenario Engine
Scenarios are JSON files in `forms/scenarios/`. Each scenario declares:

- `id`, `level`, `name`, `description`
- `fields`: either `"canonical"` or a reduced array
- `stressFlags`: adversarial toggles
- `groundTruth`: overrides for the canonical data

The scenario loader (`server/scenarios.js`) resolves `"canonical"` against `forms/canonical-fields.json` and merges per-field overrides. This avoids duplicating the full 89-field list in every scenario file.

### 4.2 Variant Resolution
`server/variants.js` builds variants by combining a scenario with a profile. Honeypots are always forced to an empty expected value, regardless of profile. Other fields fall back through profile value → scenario ground truth → `null`.

### 4.3 Form Rendering
`server/form-renderers.js` contains one renderer per stack. Each renderer converts the scenario/variant into stack-specific HTML/JS. The renderers share helpers for input generation, styling, fake buttons, delay scripts, and field preparation, so adding a new stack mostly means implementing the framework-specific shell.

### 4.4 Evaluation
`server/routes/evaluation.js` compares submitted values to ground truth with normalization for strings, booleans, and numbers. Read-only fields are excluded from scoring. Honeypots and identity fields (PAN, Aadhaar) drive the safety metric.

### 4.5 Benchmark Recording
Form submit handlers POST to `/api/verify-submission` and then to `/api/benchmark/run`. The second call records the run with metadata. Aggregated reports can be filtered by agent, scenario, variant, and stack, and a `format=html` view gives non-technical users a quick dashboard.

## 5. Open Source Readiness

To make the project easy to adopt and contribute to:

- **MIT license** allows commercial and research use.
- **CONTRIBUTING.md** and **CODE_OF_CONDUCT.md** set clear expectations.
- **CHANGELOG.md** documents releases.
- **README.md** provides quick-start, deployment, and API reference.
- Environment variables replace hardcoded `localhost` values for hosting.

## 6. Agent Performance Storage — Design Discussion

The user asked to save agent performance temporarily so it can be used to improve form-filling agents. The current implementation uses JSON file persistence via `BENCHMARK_STORAGE_PATH`. This is a pragmatic first step, but several richer approaches are worth discussing:

### 6.1 Current Approach: JSON File
- **Pros:** Zero dependencies, human-readable, survives restarts, trivial to back up.
- **Cons:** No querying beyond in-memory filters, can grow large, no concurrent-write safety.
- **Best for:** Individual developers tuning a single agent on a laptop or small server.

### 6.2 SQLite Backend
- Add an optional SQLite store (via `better-sqlite3` or built-in `sqlite3`).
- **Pros:** Structured queries, small footprint, no separate database server.
- **Cons:** Extra dependency, schema migrations.
- **Best for:** Teams sharing one benchmark host and wanting SQL analytics.

### 6.3 Webhook / External Analytics
- On each submission, POST a normalized event to a user-supplied webhook URL.
- **Pros:** Decouples benchmark from analytics; users can route to their own dashboards.
- **Cons:** Requires users to run an additional service.
- **Best for:** Organizations with existing observability stacks (Datadog, Grafana, custom ML platforms).

### 6.4 Per-Field Drill-Down
- Store per-field PASS/MISMATCH/MISSING results over time.
- Surface which fields an agent consistently mis-fills (e.g., `curr_district`, `nominee_share`).
- **Best for:** Targeted agent prompt/model improvements.

### 6.5 Regression Detection
- Compare the latest run against a stored baseline for the same agent/scenario/stack.
- Flag score drops automatically.
- **Best for:** CI/CD pipelines evaluating agent releases.

We recommend starting with the JSON file and migrating to SQLite or webhooks once the project has multiple concurrent users or long-running benchmarks.

## 7. Future Directions

Implemented since this section was first written:

- ✅ Systematic input widget variations (date formats, date pickers, dropdowns, radios,
  checkboxes, toggles, uploads) across dedicated scenarios.
- ✅ Shared, framework-agnostic custom web components used in all 6 stacks.
- ✅ Exhaustive self-verification (`npm run test:all`) confirming 220/220 variants pass.

Still open:

- Implement richer multi-step wizards, modal fields, and iframe embedding in renderers.
- Add CAPTCHA detection placeholder and rate-limiting middleware.
- Add more geographic profiles (US, EU) by introducing new profile records and option maps.
- Add regression and per-field analytics on top of benchmark storage.
- Publish cross-model agent evaluation results using the benchmark surface.

See [`Limitiations and Future Scope.md`](Limitiations%20and%20Future%20Scope.md) for a
full, up-to-date treatment.

## 8. Summary

KYC Form Hub was built by deliberately choosing the simplest solution at each step: JSON files for data, Express for servers, environment variables for configuration, and a small set of deterministic profiles and variants. This keeps the benchmark easy to host, easy to understand, and easy to extend. The temporary agent-performance store follows the same philosophy and can be upgraded when the need arises.
