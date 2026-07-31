# KYC Form Hub: A Multi-Stack Interactive Benchmark Suite for Autonomous Know-Your-Customer Form-Filling Agents

**Authors:** KYC Form Hub Contributors¹
¹ Independent Research & Engineering Effort — Open Source Benchmark Project
Project Repository: `kyc.forms-hub` (this repository) · License: MIT

> This paper documents the design, methodology, dataset construction, and evaluation
> protocol of **KYC Form Hub**, an interactive benchmark suite for autonomous
> AI agents that fill Know-Your-Customer (KYC) compliance forms on the web. Its structure
> intentionally follows the format of *FormFactory: An Interactive Benchmarking Suite for
> Multimodal Form-Filling Agents* (Li et al., arXiv:2506.01520, 2025), which we use as our
> primary related-work reference and methodological template, while describing a distinct
> benchmark with a different scope, dataset, task formalism, and evaluation protocol.

---

## Abstract

Know-Your-Customer (KYC) onboarding is one of the highest-stakes, highest-friction
form-filling workflows on the web: a single account-opening journey can span 50+ fields,
multiple document uploads, conditional logic, multi-step wizards, and strict identity-safety
requirements, all rendered differently across the handful of front-end technology stacks
that dominate production fintech and banking systems. Despite the practical urgency of
automating KYC form completion with autonomous agents, no existing benchmark evaluates
this task end-to-end, across realistic technology stacks, under adversarial UI conditions,
with a deterministic and independently auditable ground truth. We introduce **KYC Form
Hub**, an interactive benchmarking suite comprising (i) a central evaluation orchestrator,
(ii) six parallel "stack servers" that render the identical scenario corpus using React,
plain HTML/jQuery, Angular, Vue, PHP, and Flask, weighted by real-world market share, and
(iii) a scenario corpus of **22 scenarios × 10 deterministic variants = 220 evaluable
variants**, materialized into **330 served stack instances**, covering **89 canonical field
definitions** (68 core KYC fields plus 21 input-widget-variation fields) and **2,400
field-value ground-truth pairs**. Unlike prior GUI-agent benchmarks that rely on
LLM-synthesized natural-language source documents, KYC Form Hub grounds every expected
value in two fixed, hand-authored canonical identity profiles, making scoring fully
deterministic and reproducible without a judge model. We formalize the KYC form-filling
task, define an eight-dimension evaluation rubric (Accuracy, Completeness, Robustness,
Efficiency, Cost, Reliability, Recovery, Safety) collapsed into a weighted overall score
$0.35\cdot\text{Accuracy} + 0.25\cdot\text{Completeness} + 0.40\cdot\text{Safety}$, and
describe a systematic *Input Widget Variation* methodology that decomposes every logical
field family (date, selector, radio, checkbox, file upload) into its real-world concrete
renderings (native pickers, custom dropdowns, triple day/month/year selects, calendar
popups, drag-and-drop dropzones, toggle switches, card-style radios, etc.), each
implemented as a fully interactive, framework-agnostic web component. We validate the
benchmark's internal consistency by exhaustively verifying that all 220 variants resolve
to their own ground truth with a perfect 100/100 score, establishing KYC Form Hub as a
sound, zero-noise evaluation surface on which external agents can subsequently be measured.
We release the full scenario corpus, canonical field registry, rendering engine, and
evaluation API as open-source software (MIT license) to support reproducible research on
robust, layout- and format-invariant form-filling agents.

**Keywords:** Form-Filling Agents, Know-Your-Customer (KYC) Automation, Web Agent
Benchmarks, GUI Grounding, Input Widget Robustness, Multi-Stack Evaluation, LLM Agents.

**CCS Concepts:** • Information systems → Web applications; • Security and privacy →
Usability in security and privacy; • Human-centered computing → Human computer
interaction (HCI); Web-based interaction.

---

## 1. Introduction

Financial institutions, fintech platforms, and regulated marketplaces universally require
a Know-Your-Customer (KYC) onboarding step before a user may transact: applicants supply
identity, address, government-ID, banking, employment, nominee, and consent information
through a web form before an account is activated. Unlike a job application or a
conference-registration form — the typical subjects of prior GUI-agent research — a KYC
form is characterized by (a) a very large field count (50–90+ distinct data points), (b)
strict field-level correctness requirements (a transposed digit in a PAN or Aadhaar number
is a compliance failure, not a minor error), (c) heavy use of "compound" widgets — date
pickers, multi-step wizards, cascading dropdowns, document uploads — rather than plain text
boxes, and (d) frequent appearance of adversarial or accidental UI noise (duplicate field
labels across sections, decoy buttons injected by A/B testing frameworks, honeypot fields
inserted for bot detection, dynamically regenerated DOM identifiers, and artificial network
latency).

Autonomous form-filling agents — whether implemented as classic DOM/RPA scripts, or as
modern multimodal/LLM-driven browser agents — are increasingly proposed as a way to
eliminate this friction on behalf of the applicant. However, evaluating whether such an
agent is actually *safe and correct enough* to operate on a real KYC portal requires a
benchmark that (1) is deterministic, so that a failed submission is unambiguously the
agent's fault and not an artifact of noisy synthetic ground truth; (2) spans the small set
of front-end technologies that KYC forms are actually built with in the wild (React,
plain HTML, Angular, Vue, PHP, Flask/Jinja); (3) exhaustively covers the *concrete widget
variations* that a given logical field (e.g., "date of birth") can take across different
production implementations (native `<input type="date">`, three separate day/month/year
`<select>` elements, a custom calendar popup, a plain text box expecting `DD/MM/YYYY`,
another expecting `MM/DD/YYYY`, a third expecting `YYYY-MM-DD`, and so on); and (4)
deliberately injects the adversarial and incidental conditions that real production forms
exhibit, so that "robustness," not merely "capability on a clean form," is measurable.

No existing benchmark satisfies all four requirements simultaneously. General-purpose GUI
benchmarks (MiniWoB++, WebArena, Mind2Web, AITW) target broad web/desktop navigation and
under-represent the specific compound-widget density of compliance forms. The most directly
related prior work, **FormFactory** (Li et al., 2025), is — to our knowledge — the first
benchmark dedicated specifically to form-filling, and it is an important methodological
precedent for this paper: it pairs 25 realistic forms across 8 domains with an
LLM-synthesized natural-language document (e.g., a resume) per instance, and scores agents
on pixel-level `Click` and semantic `Value` metrics using vision-driven MLLMs operating a
real browser via PyAutoGUI. FormFactory's central finding — that state-of-the-art MLLMs
score under 5% end-to-end accuracy on realistic forms — is a powerful demonstration that
form-filling remains an open problem. However, FormFactory's ground truth is derived from
LLM-generated free text descriptions rather than a fixed canonical identity record, its
forms are single-stack HTML with stylistic variation rather than genuinely different
front-end frameworks, and it does not systematically decompose each logical field type into
its concrete real-world widget renderings, nor does it inject deliberate adversarial UI
noise as a first-class, toggleable benchmark dimension.

**KYC Form Hub** is designed to close exactly this gap for the KYC/compliance-onboarding
domain. Our benchmark is built around three central design commitments:

1. **A deterministic, profile-grounded ground truth.** Two fixed canonical identity
   profiles (Profile A — *Rajesh Kumar Sharma*, Mumbai; Profile B — *Anjali Devi Iyer*,
   Bengaluru) are the single source of truth for every expected field value across the
   entire benchmark. No LLM is used to synthesize or judge ground truth; every score is a
   deterministic string/number/date/boolean comparison against a fixed record.
2. **Genuine multi-stack diversity weighted by real-world market share.** The identical
   scenario corpus is rendered natively in six different technologies — React/Next.js
   (30%), plain HTML/jQuery (20%), Angular Reactive Forms (15%), PHP server-rendered forms
   (15%), Vue.js (10%), and Flask/Jinja (10%) — so that an agent's score reflects whether it
   generalizes across real DOM/event/binding idioms, not whether it has memorized one
   template.
3. **Systematic Input Widget Variation coverage.** Every logical field family that admits
   more than one common real-world implementation (dates, dropdown/selector fields, radio
   groups, checkboxes/consents, document uploads) is exploded into a registered set of
   concrete widget variations, each rendered as a fully interactive, framework-agnostic web
   component (not merely a static screenshot mockup), so that agents must genuinely operate
   triple date selects, custom dropdowns, calendar popups, drag-and-drop zones, and toggle
   switches — not just recognize that they exist.

In addition, KYC Form Hub treats **adversarial and incidental UI noise** — duplicate labels,
decoy submit buttons, hidden honeypot fields, dynamically mutating element identifiers, and
artificial network latency — as toggleable, composable *stress flags* attached to scenario
metadata, allowing us to isolate which specific noise conditions degrade an agent's
performance rather than only reporting an aggregate pass rate.

### 1.1 Contributions

- We formalize the **KYC form-filling task** as a profile-conditioned, multi-stack,
  multi-variant form completion problem with a deterministic evaluation function, and
  distinguish it from the generic GUI-navigation and free-text-conditioned form-filling
  tasks studied by prior work.
- We construct and release a **22-scenario, 220-variant, 330-instance benchmark corpus**
  spanning 7 difficulty levels — from single-line text entry to adversarial stress
  conditions — with 89 canonical field definitions and 2,400 field-value ground-truth
  pairs, implemented across 6 production-representative web stacks.
- We introduce and document an **Input Widget Variation methodology**: a registry-driven
  approach that decomposes 5 logical field families (date, selector, radio, checkbox, file
  upload) into 20+ concrete, fully interactive widget implementations, each backed by a
  shared, framework-agnostic web-component library (`kyc-custom-select`, `kyc-date-triple`,
  `kyc-date-calendar`, `kyc-toggle`, `kyc-dropzone`), and a formatting/parsing layer
  (`field-formatters.js`) that keeps every variation's ground truth centrally derived from
  the two canonical profiles.
- We define an **eight-dimension evaluation rubric** (Accuracy, Completeness, Robustness,
  Efficiency, Cost, Reliability, Recovery, Safety) and a weighted overall-score formula
  emphasizing Safety (40%) — reflecting the compliance domain's priority on never
  mis-submitting identity data or triggering a honeypot — over Accuracy (35%) and
  Completeness (25%).
- We validate the benchmark's **internal consistency**: an exhaustive self-verification
  run confirms all 220 variants score a perfect 100/100 against their own ground truth,
  establishing a zero-noise baseline before any external agent is measured.
- We release the complete benchmark — scenario definitions, canonical field registry, all
  six stack renderers, the evaluation API, and documentation — as open-source software
  (MIT license) to support reproducible research on robust, format-invariant, layout-
  invariant form-filling agents.

---

## 2. Related Work

### 2.1 GUI and Web Agent Benchmarks

A substantial body of work benchmarks agents that operate general-purpose graphical or web
interfaces: MiniWoB++ synthesizes simplified web-interaction micro-tasks; WebShop and
Mind2Web target realistic e-commerce and general website navigation; WebArena and
VisualWebArena extend this to fully-hosted, interactive websites with functional
back-ends; AITW and AITZ (Android in the Wild / Android in the Zoo) and mobile-agent
arenas such as A3, AMEX, and SPA-Bench target smartphone GUI automation; OSWorld and
Windows Agent Arena extend evaluation to full desktop operating-system environments.
These benchmarks collectively establish the methodology of scoring agents via ground-truth
action trajectories or end-state comparisons, and of stressing agents with layout and
interaction diversity. However, none of them are specialized for the *compound, high
field-count, identity-sensitive* structure of compliance/KYC forms — their tasks are
predominantly navigation- or single/low-field-count-oriented, and they do not model the
duplicate-label, honeypot, and decoy-button noise patterns that are common on real
onboarding forms.

### 2.2 Form-Filling-Specific Benchmarks

**FormFactory** (Li et al., arXiv:2506.01520, 2025) is the direct methodological
predecessor and structural template for this paper. It is, to our knowledge, the first
benchmark dedicated to the form-filling task itself, comprising 25 forms across 8 domains
(academic, professional, arts, technology, finance, healthcare, legal, construction), a
paired dataset of 1,250 LLM-synthesized or web-sourced source documents, and 13,800
field-value annotations, evaluated via a Click/Value split at both an atomic (per-field)
and episodic (end-to-end) level, using vision-driven MLLM agents executing real
`Click(x,y)`/`Type(text)` actions through PyAutoGUI on Windows. FormFactory's headline
result — that no evaluated MLLM (GPT-4o, Gemini 2.5 Pro, Claude 3.7 Sonnet, Qwen-VL-Max,
Grok 3, Doubao-Vision-Pro-32k) exceeds roughly 5% episodic accuracy, with click-level
accuracy on structurally complex fields such as dropdowns and checkboxes near zero — is
strong evidence that even state-of-the-art multimodal reasoning does not yet transfer
reliably to precise, layout-aware GUI grounding.

KYC Form Hub differs from FormFactory along four axes, summarized in Table 1.

**Table 1 — Structural comparison with FormFactory.**

| Dimension | FormFactory (2025) | KYC Form Hub (this work) |
|---|---|---|
| Domain | 8 general domains (academic, business, arts, tech, finance, healthcare, legal, construction) | Single deep domain: KYC / identity onboarding |
| Forms / Scenarios | 25 forms | 22 scenarios × 10 variants = 220 evaluable variants |
| Served instances | 25 forms × 50 samples = 1,250 instances | 330 rendered stack instances (132 consistency-core + 198 market-share allocated) |
| Field-value pairs | 13,800 | 2,400 |
| Ground truth source | LLM-synthesized free text / real scraped documents | Two fixed, hand-authored canonical identity profiles |
| Front-end diversity | Single Flask-rendered HTML platform with stylistic variation | 6 independent stacks (React, HTML/jQuery, Angular, Vue, PHP, Flask) rendering identical scenarios |
| Widget variation modeling | Field *types* enumerated per form (Table 1 of FormFactory) | Field *families* systematically exploded into concrete widget implementations via a variation registry |
| Adversarial UI noise | Not modeled | First-class, composable `stressFlags` (duplicate labels, fake buttons, honeypots, dynamic IDs, network delay, Shadow DOM) |
| Evaluation actor | Vision-driven MLLM agent via pixel `Click`/`Type` actions (PyAutoGUI) | Any agent (DOM-, vision-, or hybrid-driven) submitting structured form data to a REST evaluation API |
| Scoring | Click accuracy + Value accuracy (Atomic & Episodic) | Weighted Accuracy/Completeness/Safety score (+ 5 auxiliary dimensions: Robustness, Efficiency, Cost, Reliability, Recovery) |
| Reproducibility | Requires re-running MLLM inference + PyAutoGUI execution | Deterministic JSON-in/JSON-out scoring; no judge model required |

These are complementary rather than competing efforts: FormFactory established that
form-filling is a uniquely hard *visual grounding and semantic alignment* problem across
broad domains; KYC Form Hub specializes and deepens this investigation for a single
high-stakes domain, trading domain breadth for (a) exhaustive widget-level and stack-level
coverage, and (b) a fully deterministic, judge-free evaluation pipeline suitable for rapid,
reproducible agent iteration.

### 2.3 Multimodal Large Language Models and Web/GUI Agents

As MLLMs (GPT-4V/4o, Gemini, Claude, Qwen-VL, and open efforts such as BLIP-2 and LLaVA)
have matured, a parallel line of work builds GUI agents on top of them: CogAgent, SeeClick,
Auto-GUI, and AutoWebGLM improve action grounding via chain-of-thought prompting, visual
parsing, and reinforcement learning; Pixel-to-UI-Action approaches translate raw pixels
directly into device actions. These systems demonstrate that MLLM-driven agents can
perform reasonably on generic navigation but, as both FormFactory and our own internal
observations of production KYC portals suggest, compound and compliance-sensitive form
widgets (multi-part date selectors, cascading dropdowns, drag-and-drop uploads, consent
toggles) remain a distinct and under-addressed failure mode. KYC Form Hub is designed as an
evaluation surface that these MLLM-driven agents — as well as classical DOM/accessibility-
tree-driven agents and hybrid agents — can all be pointed at without modification, since
scoring is based on the submitted structured payload rather than on pixel coordinates.

### 2.4 Compliance / Identity-Verification Automation

Outside the academic GUI-agent literature, commercial KYC/AML automation vendors
(document-OCR autofill, resume-parsing autofill on job boards) provide narrow, rule-based
autofill for specific, tightly-scoped field sets, but these systems are not benchmarks:
they are closed, proprietary, single-purpose pipelines that do not generalize across
front-end stacks or widget variations, and their accuracy is not independently measurable
by third-party researchers. KYC Form Hub is, to our knowledge, the first open,
independently reproducible benchmark targeting this domain specifically.

---

## 3. The KYC Form Hub Benchmark

### 3.1 Platform Architecture

KYC Form Hub is implemented as a set of plain Node.js/Express servers (no external
database, no build pipeline), chosen deliberately for operational simplicity and
inspectability. The platform has two architectural layers:

- **Central Orchestrator** (port 3000) — owns the canonical field registry
  (`forms/canonical-fields.json`), the two canonical identity profiles
  (`forms/profiles.json`), the scenario catalog (`forms/scenarios/index.json` plus one JSON
  file per scenario), the variant-resolution engine (`server/variants.js`), the evaluation
  API (`server/routes/evaluation.js`, `POST /api/verify-submission`), the benchmark-run
  recorder and aggregate reporter (`POST /api/benchmark/run`, `GET
  /api/benchmark/report`), the market-share distribution calculator
  (`server/distribution.js`, `GET /api/distribution`), and the agent-facing entry points
  (`GET /agent-portal`, `GET /api/agent-manifest`).
- **Six Stack Servers** (ports 3010–3015) — each hosts only the subset of scenario
  variants allocated to it by market share (Section 3.5), rendered natively in its
  respective front-end technology (plain HTML/jQuery, React/Next.js, Angular Reactive
  Forms, Vue.js, PHP server-rendered, Flask/Jinja + WTForms-style mock), and forwards every
  submission to the central orchestrator's evaluation API.

Every stack renders the *identical* underlying scenario/field/profile data; only the
markup, event wiring, state-management idiom, and (for PHP/Flask) request lifecycle differ.
This lets us attribute an agent's score differences to genuine stack-generalization
capability rather than to different underlying content.

A **consistency core** — variant `v1` of every one of the 22 scenarios — is deliberately
mirrored across *all six* stacks (132 instances), so that identical ground truth can be
directly compared stack-by-stack for the same agent. The remaining variants (`v2`–`v10`,
198 instances) are allocated across stacks proportionally to real-world web-technology
market share (React 30%, HTML/jQuery 20%, Angular 15%, PHP 15%, Vue 10%, Flask 10%),
yielding the **330 total served forms** summarized in Table 2.

**Table 2 — Stack allocation and market-share weighting.**

| Stack | Share | Consistency core (v1 × 22) | v2–v10 allocated | Total instances |
|---|---:|---:|---:|---:|
| React / Next.js | 30% | 22 | 59 | 81 |
| Plain HTML / jQuery | 20% | 22 | 40 | 62 |
| Angular Reactive Forms | 15% | 22 | 30 | 52 |
| PHP (server-rendered) | 15% | 22 | 30 | 52 |
| Vue.js | 10% | 22 | 20 | 42 |
| Flask / Jinja (WTForms-style) | 10% | 22 | 19 | 41 |
| **Total** | **100%** | **132** | **198** | **330** |

### 3.2 Canonical Field Registry & Profile-Grounded Ground Truth

All expected values in KYC Form Hub trace back to exactly **two canonical identity
profiles** stored in `forms/profiles.json`:

- **Profile A** — *Rajesh Kumar Sharma*, resident of Mumbai.
- **Profile B** — *Anjali Devi Iyer*, resident of Bengaluru.

Variant `v1` of every scenario always resolves to Profile A; variants `v2`–`v10`
deterministically alternate between Profile A and Profile B. This design choice —
central to the benchmark's reproducibility — means an agent's score can never be
attributed to noisy or ambiguous ground truth: every expected value is a fixed, auditable
string, number, date, or boolean drawn from one of exactly two records.

The **canonical field registry** (`forms/canonical-fields.json`) defines **89 field
specifications** across **10 categories**, shown in Table 3.

**Table 3 — Canonical field registry composition.**

| Category | Field count | Representative fields |
|---|---:|---|
| Personal Identity | 10 | Full name, DOB, gender, marital status, father's/mother's name |
| Contact & Address | 17 | Mobile, alternate phone, email, current/permanent address (line 1/2, city, district, state, pincode, country) |
| Identity Documents | 5 | PAN, Aadhaar, Passport, Voter ID, Driving License |
| Banking Details | 5 | Account number, IFSC, bank name, account type, branch |
| Employment & Financial Profile | 9 | Occupation, employer, annual income, income source, PEP status |
| Nominee & Family Details | 9 | Nominee name/DOB/relationship/share, spouse details |
| Document Uploads | 5 | PAN card, Aadhaar card, photograph, signature, address proof |
| Verification & Consents | 4 | Terms acceptance, e-sign consent, data-sharing consent |
| Application Metadata | 4 | Application/reference IDs, branch code, submission channel |
| **Input Widget Variations** | 21 | Date-format text variants, triple date selects, calendar popup, custom/segmented/searchable selectors, radio inline/cards, toggle, checkbox cards, dropzone, multiple-file, camera-capture |
| **Total** | **89** | |

Every canonical field declares a `type` (see Table 4 for the full type inventory) and,
where applicable, a `profileKey` — an indirection that lets a new widget variation (e.g.
`dob_dmy_text`, a plain-text DD/MM/YYYY rendering of date-of-birth) declare that its
expected value should be derived from the profile's `dob` field rather than requiring its
own duplicate ground-truth entry. A companion formatting layer
(`server/field-formatters.js`) then transforms the canonical profile value into the
representation the concrete widget actually expects (e.g., ISO `1985-07-18` →
`18/07/1985`), and, symmetrically, parses an agent's submission back into a comparable
canonical form during evaluation. This "one profile value, many widget renderings"
architecture is the mechanism that lets us multiply widget-variation coverage without ever
duplicating or drifting the ground truth.

**Table 4 — Full field-type inventory (registry-level counts).**

| Type | Count | Type | Count | Type | Count |
|---|---:|---|---:|---|---:|
| `text` | 35 | `date_dmy_text` | 2 | `radio_inline` | 1 |
| `select` | 9 | `date_mdy_text` | 1 | `radio_cards` | 2 |
| `number` | 4 | `date_ymd_text` | 1 | `toggle` | 2 |
| `tel` | 4 | `date_dmy_selects` | 1 | `checkbox_cards` | 1 |
| `file` | 5 | `date_calendar` | 1 | `file_dropzone` | 1 |
| `radio` | 3 | `month_year` | 1 | `file_multiple` | 1 |
| `checkbox` | 3 | `select_custom` | 2 | `file_camera` | 1 |
| `date` | 2 | `segmented` | 2 | | |
| `email` | 1 | `searchable_select` | 1 | | |
| `masked_input` | 2 | | | | |

### 3.3 Difficulty-Level Taxonomy

Scenarios are organized into **7 progressive difficulty levels**, plus a Level 0 full
baseline used as a repeatable cross-stack reference form:

| Level | Focus | Representative capability under test |
|---|---|---|
| 0 — Baseline | Full 89-field canonical KYC form | Cross-stack structural consistency |
| 1 — Basic Text | Single-line text, email, phone | Fundamental input detection/typing |
| 2 — Selection Controls | Dropdowns, radios, checkboxes, toggles | Discrete-value selection across widget styles |
| 3 — Complex Inputs | Date pickers/formats, comboboxes, uploads | Compound-widget interaction and format compliance |
| 4 — Dynamic Rules | Conditional fields, cascading dropdowns, live regex validation | Stateful, dependency-aware reasoning |
| 5 — Modals & Multi-step | Wizards, side-drawers, iframes | Multi-page/multi-context navigation |
| 6 — Framework Internals | Shadow DOM, custom web components | Encapsulation-piercing interaction |
| 7 — Adversarial Stress | Duplicate labels, decoy buttons, honeypots, dynamic IDs, latency | Robustness against incidental and intentional UI noise |

### 3.4 Input Widget Variation Methodology

The central methodological contribution of KYC Form Hub (beyond its predecessor's field-type
enumeration in Table 1 of FormFactory) is a **systematic, registry-driven decomposition of
each logical field family into its concrete real-world widget renderings**, applied
uniformly across five families: date, selector/dropdown, radio, checkbox/consent, and
file upload. Each concrete variation is declared once in `forms/field-variations.json`
(family, human label, `profileKey`, submission `format`, and `parser`), rendered by a
dedicated branch of `fieldInputHtml()` in `server/form-renderers.js`, and — where the
native HTML element repertoire is insufficient — implemented as a genuinely interactive
custom element from a small, shared, **framework-agnostic web-component library**:

- `<kyc-custom-select>` — a fully keyboard- and mouse-operable custom dropdown (Shadow DOM),
  used for `select_custom` and `segmented`-adjacent styles.
- `<kyc-date-triple>` — three cascading day/month/year `<select>` elements composed behind
  one component, used for `date_dmy_selects`.
- `<kyc-date-calendar>` — a popup calendar grid, used for `date_calendar`.
- `<kyc-toggle>` — an animated switch bound to a hidden checkbox, used for `toggle`.
- `<kyc-dropzone>` — a drag-and-drop area that also supports click-to-browse, used for
  `file_dropzone`.

Every custom element writes its resolved value into a conventional, name-bearing hidden
`<input>`, so that each stack's existing `collectData()` / `FormData` / two-way-binding
logic continues to work completely unmodified — React, Angular, and Vue submit handlers
additionally merge `window.collectWidgetValues(formElement)` output into their payload
before POST. This design allows the same five widget components to be embedded, verbatim,
inside six structurally different front-end frameworks, which is what allows KYC Form Hub
to claim genuine cross-stack widget-variation coverage rather than six independent
reimplementations.

**Table 5 — Widget variation coverage by family.**

| Family | Concrete variations captured |
|---|---|
| **Date** | Native `<input type="date">`; `DD/MM/YYYY` text; `MM/DD/YYYY` text; `YYYY-MM-DD` text; manual day/month/year triple-select; month/year picker; popup calendar grid |
| **Selector / Dropdown** | Native `<select>`; custom Shadow-DOM dropdown; searchable/filter-as-you-type combobox; segmented button-group control; grouped `<optgroup>` options |
| **Radio** | Stacked radio group; inline radio group; card-style radio selection; segmented single-select control |
| **Checkbox / Consent** | Standard checkbox; inline checkbox group; card-style checkbox; animated toggle switch |
| **File Upload** | Native `<input type="file">`; drag-and-drop dropzone; multiple-file input; camera-capture-facing input |

Each of the seven dedicated variation scenarios (Section 3.5) additionally sprinkles
**duplicate instances of the same logical field family** into a single form (e.g., two
independent "select your gender" dropdowns rendered with different widget styles and
surrounding label text), forcing an agent to disambiguate by context, label proximity, and
`name`/`id` semantics rather than relying on there being exactly one field of a given kind
per page — directly mirroring a common real-world KYC UI pattern where different sections
(applicant, nominee, co-applicant) re-ask structurally identical questions.

### 3.5 Scenario Corpus & Dataset Statistics

The full scenario corpus comprises **22 scenarios**, listed in Table 6, each instantiated
into **10 deterministic variants** (v1 = Profile A, v2–v10 alternating A/B), for **220
total evaluable variants** and **2,400 field-value ground-truth pairs** (computed as
Σ over scenarios of `field_count(scenario) × 10`).

**Table 6 — Scenario corpus with field counts (analogous to FormFactory Table 1).**

| Scenario | Level | Field count | Variant count | Pair count | Notable widget families exercised |
|---|---:|---:|---:|---:|---|
| `baseline` | 0 | 89 | 10 | 890 | All families (full canonical form) |
| `level1-basic` | 1 | 4 | 10 | 40 | Text, email, tel |
| `level2-selection` | 2 | 15 | 10 | 150 | Select, radio, checkbox, toggle, segmented |
| `level2a-dropdown-variations` | 2 | 9 | 10 | 90 | Native/custom/searchable select, duplicates |
| `level2b-radio-variations` | 2 | 7 | 10 | 70 | Inline/stacked/card radio, segmented, duplicates |
| `level2c-checkbox-variations` | 2 | 7 | 10 | 70 | Checkbox, cards, toggle, duplicates |
| `level3-pickers` | 3 | 18 | 10 | 180 | Date pickers, comboboxes, uploads |
| `level3a-date-format-variations` | 3 | 6 | 10 | 60 | DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD text |
| `level3b-date-picker-variations` | 3 | 6 | 10 | 60 | Native date, triple select, month/year, calendar |
| `level3c-upload-variations` | 3 | 8 | 10 | 80 | Native file, dropzone, multiple, camera |
| `level3d-combined-input-variations` | 3 | 14 | 10 | 140 | All families + heavy duplicate clusters |
| `level4-dynamic` | 4 | 8 | 10 | 80 | Conditional fields, cascading dropdowns, regex validation |
| `level5-complex` | 5 | 7 | 10 | 70 | Multi-step wizard, modal, iframe |
| `level6-frameworks` | 6 | 6 | 10 | 60 | Shadow DOM, web components |
| `level7-adversarial` | 7 | 5 | 10 | 50 | Combined adversarial stress |
| `issue-duplicate-labels` | 7 | 5 | 10 | 50 | Duplicate labels |
| `issue-fake-buttons` | 7 | 4 | 10 | 40 | Decoy submit buttons |
| `issue-hidden-fields` | 7 | 5 | 10 | 50 | Hidden honeypots |
| `issue-dynamic-ids` | 7 | 4 | 10 | 40 | Dynamic IDs + randomized order |
| `issue-network-delay` | 7 | 4 | 10 | 40 | Artificial latency |
| `issue-shadow-dom` | 7 | 4 | 10 | 40 | Shadow-DOM-encapsulated inputs |
| `issue-combined` | 7 | 5 | 10 | 50 | All Level-7 stresses combined |
| **Total** | | **240** | **220** | **2,400** | |

(Note: the 240 "field count" total sums *field slots per scenario definition*, which
double-counts the 89 baseline fields once and adds the reduced field sets used by the
other 21 scenarios — this mirrors how FormFactory's Table 1 reports per-form field counts
rather than a deduplicated global count.)

### 3.6 Task Definition

We formalize the KYC form-filling task as a tuple $(\mathcal{P}, \mathcal{F}, \mathcal{S},
\mathcal{V}, g)$:

- $\mathcal{P} = \{P_A, P_B\}$ — the two canonical identity profiles, each a complete,
  fixed key–value record of ground-truth applicant data.
- $\mathcal{F}$ — the canonical field registry (89 field specifications, each with a
  `type`, optional `profileKey`, and rendering metadata).
- $\mathcal{S}$ — the scenario corpus (22 scenarios), each selecting a subset of
  $\mathcal{F}$ (or the full baseline set), declaring a set of `stressFlags`, and rendered
  by exactly one of 6 stack renderers $R_{\text{react}}, R_{\text{html}},
  R_{\text{angular}}, R_{\text{vue}}, R_{\text{php}}, R_{\text{flask}}$.
- $\mathcal{V}$ — the deterministic variant function mapping (scenario, variant index
  $n \in \{1,\dots,10\}$) to a resolved profile ($P_A$ if $n=1$, alternating $P_A/P_B$
  otherwise) and a fully materialized ground-truth answer key.
- $g(\hat{y}, y^*)$ — the evaluation function (Section 4.4) comparing an agent's submitted
  field values $\hat{y}$ against the resolved ground truth $y^*$.

Given a form URL (or its rendered DOM/screenshot) and the currently indicated profile (via
the agent manifest, `GET /api/agent-manifest`), an agent must: (1) parse the on-screen
fields, (2) map each field to the correct value in the indicated profile (respecting the
concrete widget's expected format — e.g., typing `18/07/1985` into a DD/MM/YYYY text field
versus operating three separate day/month/year `<select>` elements for the same logical
date), (3) avoid interacting with any honeypot field, (4) identify and click the single
genuine submit control among any decoy buttons present, and (5) submit the completed form,
which the hosting stack server forwards to the central orchestrator's evaluation API. This
formalization deliberately leaves the *action space* unconstrained (unlike FormFactory's
explicit `Click(x,y)`/`Type(text)` pixel-action model) — an agent may be DOM-driven,
accessibility-tree-driven, vision-driven, or any hybrid, since the evaluation function
operates purely on the submitted structured payload, not on the trajectory used to produce
it. This is an intentional benchmark-design trade-off: it sacrifices FormFactory's granular
`Click` metric (whether the agent clicked the geometrically correct on-screen location) in
exchange for stack-, tool-, and modality-agnostic comparability across arbitrary agent
architectures.

---

## 4. Methodology

### 4.1 Deterministic Variant Generation

Each scenario's 10 variants are generated by a pure function of (scenario definition,
variant index, profile pair) — there is no randomness or LLM sampling involved anywhere in
ground-truth construction, in contrast to FormFactory's LLM-synthesized natural-language
source documents. Variant `v1` always resolves to Profile A, guaranteeing a stable
"golden" instance per scenario for cross-stack comparison; variants `v2`–`v10`
deterministically alternate Profile A/B, which both (a) exercises both canonical profiles
across the corpus and (b) keeps every variant fully reproducible byte-for-byte across runs
and across researchers. This is a direct methodological trade-off against FormFactory's
approach of synthesizing 50 unique natural-language instances per form: we sacrifice
input-document diversity in exchange for zero ground-truth noise and full reproducibility,
which we consider the correct trade-off for a compliance-domain benchmark where an
incorrect ground-truth label would itself constitute a serious methodological flaw.

### 4.2 Multi-Stack Rendering Strategy

`server/form-renderers.js` implements one renderer function per stack. All six renderers
consume the identical resolved (scenario, variant, profile) triple and share common helper
functions for input-HTML generation (`fieldInputHtml()`), widget CSS (`widgetStyles()`),
the shared web-component script bundle (`sharedWidgetScripts()`), fake-button injection,
honeypot injection, and network-delay simulation — ensuring that stress-flag semantics are
identical across stacks even though the surrounding framework code (JSX/React state,
Angular `ngModel` bindings, Vue `v-model`, PHP `$_POST` handling, Flask/Jinja templates)
differs completely. Adding a new stack in the future requires implementing only the
framework-specific shell around these shared primitives.

### 4.3 Adversarial & Incidental Stress Injection

Seven Level-7 scenarios isolate individual and combined "stress flags," each a boolean/
numeric toggle on the scenario definition:

- `duplicateLabels` — non-unique visible labels across the form, forcing disambiguation by
  DOM position, `id`, or surrounding context.
- `fakeSubmitButtons` (+ `fakeButtonCount`) — decoy, submit-styled buttons that do not
  trigger the real submission handler.
- `hiddenHoneypotFields` — invisible inputs that must remain empty; any non-empty value
  is scored as a Safety violation.
- `dynamicIds` (+ `randomizedFieldOrder`) — element identifiers and DOM order regenerate
  on each page load, penalizing agents that hardcode selectors instead of using semantic/
  label-based matching.
- `networkDelayMs` (+ `delayedRendering`) — artificial latency before the form becomes
  interactive or before submission completes, testing wait/retry robustness.
- `shadowDom` (+ `webComponents`) — critical fields are rendered inside Shadow DOM
  subtrees, requiring the agent to pierce encapsulation boundaries.

These flags compose freely — `issue-combined` and `level7-adversarial` apply several
simultaneously — allowing controlled ablation of which specific noise source most degrades
a given agent, a level of experimental granularity not present in FormFactory's stylistic-
variation-only approach to layout diversity.

### 4.4 Evaluation & Scoring Formula

Every submission is scored server-side (`server/routes/evaluation.js`) via a per-field
comparator `compareValues(expected, actual, fieldMeta)` that normalizes strings
(trimming/casing), booleans, numbers, and — for variation-typed fields — applies
`parseSubmission()` to canonicalize date separators (`/`, `-`, `.`) and other
format-specific quirks before comparison, so that an agent submitting `18-07-1985` against
an expected `18/07/1985` (same logical date, different separator) is still scored
correctly for fields where separator-tolerance is appropriate, while still requiring
exact-format compliance where the field explicitly declares a fixed target format.

Individual field-level results are aggregated into an **eight-dimension rubric**:

| Dimension | Definition |
|---|---|
| **Accuracy** | % of filled fields whose submitted value matches expected ground truth |
| **Completeness** | % of mandatory/required fields successfully completed |
| **Robustness** | Score consistency across different stacks and stress-flag combinations |
| **Efficiency** | Time taken to navigate and submit the form |
| **Cost** | LLM token consumption / API call count per submission |
| **Reliability** | Pass-rate consistency over repeated runs under identical parameters |
| **Recovery** | Ability to re-attempt successfully after a validation error |
| **Safety** | Correct handling of sensitive identity fields and zero honeypot fills |

These collapse into a single **Overall Score**:

$$
\text{Overall Score} = 0.35 \cdot \text{Accuracy} + 0.25 \cdot \text{Completeness} + 0.40 \cdot \text{Safety}
$$

Safety receives the largest weight (40%) — a deliberate departure from FormFactory's
equally-weighted Click/Value split — reflecting the compliance domain's priority: an agent
that is 100% accurate on visible fields but fills a honeypot, or transposes a PAN/Aadhaar
digit, represents a materially worse real-world outcome than one that is merely
incomplete. Robustness, Efficiency, Cost, Reliability, and Recovery are tracked and
reported per-run but are treated as auxiliary diagnostic dimensions rather than
contributing directly to the primary comparability metric, since they depend on agent
implementation details (execution harness, retry policy, model choice) that are orthogonal
to whether the agent correctly understood and filled the form.

### 4.5 Ground-Truth Resolution Algorithm

`server/variants.js` resolves the expected value for field $f$ under variant $v$ of
scenario $s$ as follows:

1. If $f$ is a honeypot field, the expected value is always the empty value, regardless of
   profile (Safety fields are profile-invariant).
2. Otherwise, look up the source key: `profileKey(f)` if declared, else `id(f)`.
3. Retrieve the raw value from the resolved profile ($P_A$ if $v=1$, else alternating
   $P_A/P_B$).
4. If $f$ declares a widget variation (i.e., `isVariationType(f.type)`), apply
   `formatValue(rawValue, f)` to transform the canonical value into the exact
   representation the concrete widget expects (e.g., ISO date → `dd/MM/yyyy`).
5. Otherwise, fall back to: profile value → scenario-level ground-truth override → `null`.

Because steps 1–3 are identical for every scenario, and step 4 is purely a
formatting transform with no independent data source, no widget variation can ever drift
from the two canonical profiles — this is the structural guarantee that keeps the
benchmark's ground truth centralized even as widget-level coverage (Section 3.4) grows.

---

## 5. Benchmark Validation

### 5.1 Internal Consistency Verification

Before any external agent is evaluated on KYC Form Hub, we validate that the benchmark
itself is internally consistent: for every one of the 220 variants, we submit the
resolved ground-truth values for that exact variant back through the evaluation API
(`npm run test:all`, which drives `POST /api/verify-submission` for every scenario ×
variant combination against a running instance of the orchestrator and all six stack
servers) and confirm a perfect score.

**Result: 220 / 220 variants score 100 / 100** (Accuracy = 100%, Completeness = 100%,
Safety = 100%, hence Overall Score = 100 by the Section 4.4 formula) — see Table 7.

**Table 7 — Self-verification summary.**

| Metric | Value |
|---|---:|
| Total variants tested | 220 |
| Variants scoring 100/100 | 220 |
| Variants failing | 0 |
| Distinct scenarios covered | 22 |
| Distinct stacks covered (v1 consistency core) | 6 |
| Field-value pairs verified | 2,400 |

This process surfaced one real defect during development: an early version of
`normalizeDateString()` always inserted `/` as the date separator during ground-truth
formatting regardless of the field's declared target format, causing all 10 variants of
`level3a-date-format-variations` (which includes a `YYYY-MM-DD`-formatted field) to
mis-score at 94/100 due to a separator mismatch on a single field
(`dob_ymd_text`). The fix — deriving the separator from the field's declared `format`
string rather than hardcoding it — is now covered by the full 220-variant regression
check, which we re-run after every scenario or renderer change. We report this defect and
its resolution transparently, both because it demonstrates the value of exhaustive
self-verification as a benchmark-engineering practice, and because it is the kind of subtle
format-normalization bug that a real agent could equally be tripped up by if a benchmark's
own scoring pipeline were not exhaustively validated.

### 5.2 Distribution & Coverage Analysis

Table 2 (Section 3.1) shows the realized market-share allocation deviates from the target
percentages by at most the rounding error inherent in distributing 198 non-divisible units
across 6 buckets (e.g., Flask's target 10% of 198 is 19.8, realized as 19 — a 0.4
percentage-point rounding shortfall reallocated elsewhere), confirming the distribution
algorithm (`server/distribution.js`) behaves as designed. Table 5 (Section 3.4) confirms
all five targeted widget families (date, selector, radio, checkbox, file) have at least
four concrete variations each, and Table 6 confirms every difficulty level (1–7) plus the
baseline has at least one dedicated scenario, with Level 2 and Level 3 — the levels
specifically targeted by the input-variation expansion described in this paper — each
receiving four scenarios (one enrichment of the pre-existing scenario plus three
dedicated new ones for Level 2, and one enrichment plus four dedicated new ones for Level
3, including the combined `level3d` scenario).

### 5.3 Field-Type × Difficulty Coverage Matrix

Table 8 cross-tabulates the 26 distinct field `type` values in the canonical registry
(Table 4) against the 7 difficulty levels, confirming that no widget family is
concentrated in a single difficulty tier — date and selector variations, in particular,
appear in Levels 2, 3, and the Level-7 combined-adversarial scenario (which reuses a subset
of variation fields under stress conditions), so that robustness can be measured both in
isolation (Levels 2/3) and under adversarial UI noise (Level 7) using the same underlying
widget implementations.

**Table 8 — Difficulty-level exposure of the five variation-widget families.**

| Family | L2 (selection) | L3 (complex inputs) | L7 (adversarial, via `level3d`-style reuse in combined stacks) |
|---|:---:|:---:|:---:|
| Date | — | ✓ (formats, pickers) | ✓ (via combined-input stress) |
| Selector/Dropdown | ✓ | ✓ (searchable combo) | ✓ |
| Radio | ✓ | — | ✓ |
| Checkbox/Consent | ✓ | — | ✓ |
| File Upload | — | ✓ | — |

### 5.4 Agent Benchmarking Protocol

With internal consistency established, an external agent is benchmarked as follows: (1)
fetch both canonical profiles from `GET /api/profiles`; (2) fetch the full URL manifest
from `GET /api/agent-manifest` (or browse `/agent-portal`), which lists every one of the
330 served form instances together with the profile (A or B) each expects; (3) for each
manifest entry, visit the form URL, using only the indicated profile's data, and submit;
(4) each stack server forwards the submission to `POST /api/verify-submission`, which
returns a per-field PASS/MISMATCH/MISSING breakdown plus the aggregate score; (5) results
are optionally recorded via `POST /api/benchmark/run` (tagged with an `agentId`) for later
aggregate reporting via `GET /api/benchmark/report` (including a human-readable
`format=html` dashboard). A reference harness (`server/agent-benchmark.js`) automates
steps (2)–(5) for any agent exposing a `--url`/`--profile` CLI contract, writing the
correct profile JSON to disk before each invocation and tagging every submission URL with
`?agentId=<id>` for run tracking.

### 5.5 Expected Failure Modes and Discussion

While this paper does not (yet) report cross-model MLLM results in the style of
FormFactory's Table 2 — KYC Form Hub is released as an evaluation *surface*, and
large-scale agent evaluation is left as follow-on work using the protocol in Section 5.4 —
the benchmark's design directly targets the specific failure modes FormFactory identified
as most damaging to current MLLMs: near-zero click accuracy on structurally complex fields
(dropdowns, checkboxes) and steep accuracy degradation as field count grows. We expect
(and the widget-variation methodology of Section 3.4 is specifically designed to surface)
three additional KYC-specific failure modes not directly measured by FormFactory: (a)
**format non-compliance** — an agent correctly identifying "date of birth" but submitting
it in the wrong text format for a given field's declared target (e.g., `MM/DD/YYYY` when
`DD/MM/YYYY` was expected); (b) **duplicate-field misattribution** — an agent conflating two
structurally identical fields serving different logical roles (e.g., filling the nominee's
date of birth into the applicant's date-of-birth field, or vice versa, when both are
rendered with the same widget style in the same form); and (c) **honeypot/decoy
susceptibility** — an agent that is visually or semantically thorough enough to interact
with every input-shaped element on the page, including ones deliberately hidden or marked
non-interactive, thereby failing the Safety dimension despite high raw Accuracy. We
consider identifying and quantifying these three failure modes across a representative
set of agents to be the primary empirical follow-up enabled by this benchmark.

---

## 6. Limitations

- **No cross-model agent results yet.** This paper documents and validates the benchmark
  surface itself; it does not (yet) report an evaluation of specific MLLM- or DOM-driven
  agents in the style of FormFactory's Section 5. This is deliberate — validating the
  benchmark's own internal consistency (Section 5.1) is a prerequisite we consider more
  important to establish first and report transparently, including the one defect found
  and fixed during that process.
- **Single-locale ground truth.** Both canonical profiles reflect Indian KYC conventions
  (PAN, Aadhaar, Indian address hierarchy). International expansion (US/EU profiles and
  field sets) is identified as future work in the project's methodology documentation but
  not yet implemented.
- **File upload fields are not content-validated.** Upload fields test whether an agent can
  identify and interact with the correct upload control (including drag-and-drop and
  multi-file variants), but do not validate uploaded file *content*, since the benchmark
  deliberately avoids operating a storage/virus-scanning backend, by design (see
  `METHODOLOGY.md §3.4`).
- **No pixel-level click metric.** Because evaluation is payload-based rather than
  trajectory-based (Section 3.6), KYC Form Hub cannot, unlike FormFactory's `Click`
  metric, distinguish an agent that reached the correct value via correct on-screen
  interaction from one that reached it via some out-of-band DOM manipulation not
  representative of realistic browser automation. We view this as an acceptable trade-off
  for modality-agnostic comparability, but note it as a genuine methodological
  limitation relative to FormFactory's stricter, execution-grounded scoring.
- **Deterministic profile pair may not capture the full diversity of real applicant data**
  (e.g., non-standard name orderings, incomplete addresses, edge-case income levels) that
  a production KYC system would encounter; this is a known trade-off in exchange for zero
  ground-truth ambiguity.

---

## 7. Conclusion

We presented **KYC Form Hub**, an interactive, multi-stack benchmark suite for autonomous
KYC form-filling agents, built with a deliberately deterministic, profile-grounded ground
truth and genuine cross-framework (React, HTML/jQuery, Angular, Vue, PHP, Flask) coverage.
Following the structural template of FormFactory — the first benchmark dedicated to the
general form-filling task — we specialize deeply into the compliance/KYC domain,
contributing (1) a systematic Input Widget Variation methodology that decomposes five
logical field families into 20+ concrete, fully interactive real-world widget
implementations shared across all six stacks; (2) a first-class, composable adversarial
stress-injection mechanism (duplicate labels, decoy buttons, honeypots, dynamic IDs,
network latency, Shadow DOM); (3) an eight-dimension evaluation rubric weighted toward
Safety, reflecting the compliance domain's priorities; and (4) an exhaustively
self-verified corpus of 220 variants / 330 served instances / 2,400 field-value pairs,
released as open-source software. We believe this benchmark provides a reproducible,
domain-specialized complement to general-purpose GUI- and form-filling benchmarks, and we
release it to support future work quantifying and improving the robustness of autonomous
agents on the specific, high-stakes class of forms that gate access to financial and
regulated services.

---

## 8. Ethical Considerations, Privacy, and Licensing

The two canonical identity profiles used throughout KYC Form Hub (`Rajesh Kumar Sharma`
and `Anjali Devi Iyer`) are entirely fictitious constructions, hand-authored for this
benchmark; they are not derived from, and do not correspond to, any real individual's
personal or financial data. All government-ID-shaped values (PAN, Aadhaar, Passport,
Voter ID, Driving License numbers) are synthetic and constructed only to satisfy the
respective format/checksum patterns for validation-logic testing — they are not valid,
issuable identifiers and cannot be used to impersonate a real applicant. No real personal
data, uploaded documents, or third-party content are included anywhere in the benchmark
corpus. The entire benchmark — scenario definitions, canonical field registry, stack
renderers, evaluation API, and documentation — is released under the **MIT License**,
consistent with the reference paper's own release terms, to maximize reuse for both
academic research and practical agent-development purposes.

---

## Appendix A — Repository Map

| Path | Purpose |
|---|---|
| `forms/canonical-fields.json` | 89-field canonical registry (10 categories) |
| `forms/profiles.json` | Two canonical identity profiles (A, B) |
| `forms/field-variations.json` | Widget-variation registry (family → concrete variations) |
| `forms/scenarios/*.json` | 22 scenario definitions |
| `forms/scenarios/index.json` | Generated scenario catalog |
| `server/scenarios.js` | Scenario loader & canonical-field resolver |
| `server/variants.js` | Deterministic variant / ground-truth resolution |
| `server/field-formatters.js` | Value formatting/parsing for widget variations |
| `server/form-renderers.js` | Six stack renderers + shared web-component library |
| `server/routes/evaluation.js` | `compareValues()` scoring logic, `/api/verify-submission` |
| `server/distribution.js` | Market-share stack allocation, `/api/distribution` |
| `server/agent-benchmark.js` | Reference external-agent benchmarking harness |
| `Documentation/ARCHITECTURE.md` | System architecture & scoring formula reference |
| `Documentation/METHODOLOGY.md` | Design rationale and methodology notes |
| `Documentation/Input-Fields-type.md` | Widget-variation documentation |
| `Documentation/Form-Canonical-Fields.md` | Full canonical field listing |
| `Documentation/SCHEMA_SPECIFICATION.md` | JSON schema for scenarios/fields |

## Appendix B — Scoring Formula Reference

$$
\text{Overall Score} = 0.35 \cdot \text{Accuracy} + 0.25 \cdot \text{Completeness} + 0.40 \cdot \text{Safety}
$$

with Robustness, Efficiency, Cost, Reliability, and Recovery tracked as auxiliary,
non-weighted diagnostic dimensions per Section 4.4.

---

## References

1. Bobo Li, Yuheng Wang, Hao Fei, Juncheng Li, Wei Ji, Mong-Li Lee, Wynne Hsu. **FormFactory:
   An Interactive Benchmarking Suite for Multimodal Form-Filling Agents.** arXiv:2506.01520,
   2025. (Primary structural and methodological reference for this paper.)
2. Xiang Deng, Yu Gu, Boyuan Zheng, Shijie Chen, Samual Stevens, Boshi Wang, Huan Sun, Yu Su.
   **Mind2Web: Towards a Generalist Agent for the Web.** NeurIPS, 2023.
3. Shuyan Zhou et al. **WebArena: A Realistic Web Environment for Building Autonomous
   Agents.** 2023.
4. Jing Yu Koh, Robert Lo, Lawrence Jang, Vikram Duvvur, Ming Chong Lim, Po-Yu Huang, Graham
   Neubig, Shuyan Zhou, Russ Salakhutdinov, Daniel Fried. **VisualWebArena: Evaluating
   Multimodal Agents on Realistic Visual Web Tasks.** ACL, 2024.
5. Christopher Rawles et al. **Android in the Wild: A Large-Scale Dataset for Android Device
   Control.** (AITW), 2023.
6. Wenyi Hong, Weihan Wang, Qingsong Lv, Jiazheng Xu, Wenmeng Yu, Junhui Ji, Yan Wang, Zihan
   Wang, Yuxiao Dong, Ming Ding, Jie Tang. **CogAgent: A Visual Language Model for GUI
   Agents.** CVPR, 2024.
7. Kanzhi Cheng, Qiushi Sun, Yougang Chu, Fangzhi Xu, Yantao Li, Jianbing Zhang, Zhiyong Wu.
   **SeeClick: Harnessing GUI Grounding for Advanced Visual GUI Agents.** ACL, 2024.
8. Hanyu Lai, Xiao Liu, Iat Long Iong, Shuntian Yao, Yuxuan Chen, Pengbo Shen, Hao Yu,
   Hanchen Zhang, Xiaohan Zhang, Yuxiao Dong, Jie Tang. **AutoWebGLM: A Large Language
   Model-based Web Navigating Agent.** KDD, 2024.
9. Tianbao Xie et al. **OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in
   Real Computer Environments.** 2024.
10. Rogerio Bonatti, Dan Zhao, Francesco Bonacci, Dillon Dupont, Sara Abdali, Yinheng Li,
    Yadong Lu, Justin Wagle, Kazuhito Koishida, Arthur Bucker, Lawrence Jang, Zack Hui.
    **Windows Agent Arena: Evaluating Multi-Modal OS Agents at Scale.** arXiv:2409.08264,
    2024.
11. OpenAI. **GPT-4o / GPT-4V System Card.** 2024.
12. Google DeepMind. **Gemini 2.5: Our Most Intelligent AI Model.** 2025.
13. Anthropic. **Claude 3.7 Sonnet System Card.** 2025.
14. Jinze Bai, Shuai Bai, Shusheng Yang, Shijie Wang, Sinan Tan, Peng Wang, Junyang Lin,
    Chang Zhou, Jingren Zhou. **Qwen-VL: A Frontier Large Vision-Language Model with
    Versatile Abilities.** arXiv:2308.12966, 2023.
15. KYC Form Hub Contributors. **KYC Form Hub: README, Architecture, and Methodology
    Documentation.** This repository, `Documentation/ARCHITECTURE.md`,
    `Documentation/METHODOLOGY.md`, `README.md`, 2025.

---

*This document was produced as part of the KYC Form Hub open-source benchmark project. All
statistics (89 canonical fields, 22 scenarios, 220 variants, 330 served instances, 2,400
field-value pairs, 220/220 self-verification pass rate) were computed directly against the
repository state at the time of writing and can be independently reproduced via `npm run
generate`, `npm run test:all`, and `GET /api/distribution` on a locally running instance
of the benchmark.*
