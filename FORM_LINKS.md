# KYC Form Hub — Complete Form Links

> **Generated:** 2026-07-23T17:03:15.295Z
> **Purpose:** This file lists every form URL in the KYC Form Hub for consumption by form-filling agents.
> **Base URL:** `http://localhost:3000` (central orchestrator)

---

## Quick Reference — Stack Index Pages (Baseline Forms)

Each stack's `index.html` serves the full canonical KYC form in that stack's visual identity:

| Stack | Theme | Color | Index URL | Port |
|-------|-------|-------|-----------|------|
| 🌐 Plain HTML / jQuery | **Sky Blue** | `#0ea5e9` | [`/stacks/html/index.html`](http://localhost:3000/stacks/html/index.html) | 3010 |
| ⚛️ React / Next.js | **Cyan Electric** | `#06b6d4` | [`/stacks/react/index.html`](http://localhost:3000/stacks/react/index.html) | 3011 |
| 🅰️ Angular Reactive | **Angular Red** | `#e11d48` | [`/stacks/angular/index.html`](http://localhost:3000/stacks/angular/index.html) | 3012 |
| 💚 Vue.js | **Emerald Vue** | `#059669` | [`/stacks/vue/index.html`](http://localhost:3000/stacks/vue/index.html) | 3013 |
| 🐘 PHP Server-Rendered | **Indigo Violet** | `#7c3aed` | [`/stacks/php/index.html`](http://localhost:3000/stacks/php/index.html) | 3014 |
| 🐍 Flask / Python WTForms | **Amber Python** | `#d97706` | [`/stacks/flask/index.html`](http://localhost:3000/stacks/flask/index.html) | 3015 |

---

## Agent Entry Points

| Resource | URL | Description |
|----------|-----|-------------|
| Agent Portal | [/agent-portal](http://localhost:3000/agent-portal) | Human-readable dashboard of all forms |
| JSON Manifest | [/api/agent-manifest](http://localhost:3000/api/agent-manifest) | Machine-readable manifest of all assigned variants |
| Profiles API | [/api/profiles](http://localhost:3000/api/profiles) | User profile data (Profile A & B) |
| Scenarios API | [/api/scenarios](http://localhost:3000/api/scenarios) | All scenario definitions |
| Canonical Fields | [/api/canonical-fields](http://localhost:3000/api/canonical-fields) | Full field schema |

---

## All Dynamic Scenario Variants

**Format:** `centralUrl` is always available via the orchestrator. `directUrl` requires the per-stack server to be running.

**Profile A** = Rajesh Kumar Sharma &nbsp;|&nbsp; **Profile B** = Priya Sharma

### 🌐 Plain HTML / jQuery — *Sky Blue*

> Port: **3010** &nbsp;·&nbsp; Market Share: **20%** &nbsp;·&nbsp; Theme Color: `#0ea5e9`

| Scenario | Level | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 |
|----------|-------|----|----|----|----|----|----|----|----|----|-----|
| **baseline** | L0 | [v1·A](http://localhost:3000/form/html/baseline/v1) | [v2·B](http://localhost:3000/form/html/baseline/v2) | [v3·A](http://localhost:3000/form/html/baseline/v3) | [v4·B](http://localhost:3000/form/html/baseline/v4) | [v5·A](http://localhost:3000/form/html/baseline/v5) | [v6·B](http://localhost:3000/form/html/baseline/v6) | [v7·A](http://localhost:3000/form/html/baseline/v7) | [v8·B](http://localhost:3000/form/html/baseline/v8) | [v9·A](http://localhost:3000/form/html/baseline/v9) | [v10·B](http://localhost:3000/form/html/baseline/v10) |
| **level1-basic** | L1 | [v1·A](http://localhost:3000/form/html/level1-basic/v1) | [v2·B](http://localhost:3000/form/html/level1-basic/v2) | [v3·A](http://localhost:3000/form/html/level1-basic/v3) | [v4·B](http://localhost:3000/form/html/level1-basic/v4) | [v5·A](http://localhost:3000/form/html/level1-basic/v5) | [v6·B](http://localhost:3000/form/html/level1-basic/v6) | [v7·A](http://localhost:3000/form/html/level1-basic/v7) | [v8·B](http://localhost:3000/form/html/level1-basic/v8) | [v9·A](http://localhost:3000/form/html/level1-basic/v9) | [v10·B](http://localhost:3000/form/html/level1-basic/v10) |
| **level2-selection** | L2 | [v1·A](http://localhost:3000/form/html/level2-selection/v1) | [v2·B](http://localhost:3000/form/html/level2-selection/v2) | [v3·A](http://localhost:3000/form/html/level2-selection/v3) | [v4·B](http://localhost:3000/form/html/level2-selection/v4) | [v5·A](http://localhost:3000/form/html/level2-selection/v5) | [v6·B](http://localhost:3000/form/html/level2-selection/v6) | [v7·A](http://localhost:3000/form/html/level2-selection/v7) | [v8·B](http://localhost:3000/form/html/level2-selection/v8) | [v9·A](http://localhost:3000/form/html/level2-selection/v9) | [v10·B](http://localhost:3000/form/html/level2-selection/v10) |
| **level3-pickers** | L3 | [v1·A](http://localhost:3000/form/html/level3-pickers/v1) | [v2·B](http://localhost:3000/form/html/level3-pickers/v2) | [v3·A](http://localhost:3000/form/html/level3-pickers/v3) | [v4·B](http://localhost:3000/form/html/level3-pickers/v4) | [v5·A](http://localhost:3000/form/html/level3-pickers/v5) | [v6·B](http://localhost:3000/form/html/level3-pickers/v6) | [v7·A](http://localhost:3000/form/html/level3-pickers/v7) | [v8·B](http://localhost:3000/form/html/level3-pickers/v8) | [v9·A](http://localhost:3000/form/html/level3-pickers/v9) | [v10·B](http://localhost:3000/form/html/level3-pickers/v10) |
| **level4-dynamic** | L4 | [v1·A](http://localhost:3000/form/html/level4-dynamic/v1) | [v2·B](http://localhost:3000/form/html/level4-dynamic/v2) | [v3·A](http://localhost:3000/form/html/level4-dynamic/v3) | [v4·B](http://localhost:3000/form/html/level4-dynamic/v4) | [v5·A](http://localhost:3000/form/html/level4-dynamic/v5) | [v6·B](http://localhost:3000/form/html/level4-dynamic/v6) | [v7·A](http://localhost:3000/form/html/level4-dynamic/v7) | [v8·B](http://localhost:3000/form/html/level4-dynamic/v8) | [v9·A](http://localhost:3000/form/html/level4-dynamic/v9) | [v10·B](http://localhost:3000/form/html/level4-dynamic/v10) |
| **level5-complex** | L5 | [v1·A](http://localhost:3000/form/html/level5-complex/v1) | [v2·B](http://localhost:3000/form/html/level5-complex/v2) | [v3·A](http://localhost:3000/form/html/level5-complex/v3) | [v4·B](http://localhost:3000/form/html/level5-complex/v4) | [v5·A](http://localhost:3000/form/html/level5-complex/v5) | [v6·B](http://localhost:3000/form/html/level5-complex/v6) | [v7·A](http://localhost:3000/form/html/level5-complex/v7) | [v8·B](http://localhost:3000/form/html/level5-complex/v8) | [v9·A](http://localhost:3000/form/html/level5-complex/v9) | [v10·B](http://localhost:3000/form/html/level5-complex/v10) |
| **level6-frameworks** | L6 | [v1·A](http://localhost:3000/form/html/level6-frameworks/v1) | [v2·B](http://localhost:3000/form/html/level6-frameworks/v2) | [v3·A](http://localhost:3000/form/html/level6-frameworks/v3) | [v4·B](http://localhost:3000/form/html/level6-frameworks/v4) | [v5·A](http://localhost:3000/form/html/level6-frameworks/v5) | [v6·B](http://localhost:3000/form/html/level6-frameworks/v6) | [v7·A](http://localhost:3000/form/html/level6-frameworks/v7) | [v8·B](http://localhost:3000/form/html/level6-frameworks/v8) | [v9·A](http://localhost:3000/form/html/level6-frameworks/v9) | [v10·B](http://localhost:3000/form/html/level6-frameworks/v10) |
| **issue-combined** | L7 | [v1·A](http://localhost:3000/form/html/issue-combined/v1) | [v2·B](http://localhost:3000/form/html/issue-combined/v2) | [v3·A](http://localhost:3000/form/html/issue-combined/v3) | [v4·B](http://localhost:3000/form/html/issue-combined/v4) | [v5·A](http://localhost:3000/form/html/issue-combined/v5) | [v6·B](http://localhost:3000/form/html/issue-combined/v6) | [v7·A](http://localhost:3000/form/html/issue-combined/v7) | [v8·B](http://localhost:3000/form/html/issue-combined/v8) | [v9·A](http://localhost:3000/form/html/issue-combined/v9) | [v10·B](http://localhost:3000/form/html/issue-combined/v10) |
| **issue-duplicate-labels** | L7 | [v1·A](http://localhost:3000/form/html/issue-duplicate-labels/v1) | [v2·B](http://localhost:3000/form/html/issue-duplicate-labels/v2) | [v3·A](http://localhost:3000/form/html/issue-duplicate-labels/v3) | [v4·B](http://localhost:3000/form/html/issue-duplicate-labels/v4) | [v5·A](http://localhost:3000/form/html/issue-duplicate-labels/v5) | [v6·B](http://localhost:3000/form/html/issue-duplicate-labels/v6) | [v7·A](http://localhost:3000/form/html/issue-duplicate-labels/v7) | [v8·B](http://localhost:3000/form/html/issue-duplicate-labels/v8) | [v9·A](http://localhost:3000/form/html/issue-duplicate-labels/v9) | [v10·B](http://localhost:3000/form/html/issue-duplicate-labels/v10) |
| **issue-dynamic-ids** | L7 | [v1·A](http://localhost:3000/form/html/issue-dynamic-ids/v1) | [v2·B](http://localhost:3000/form/html/issue-dynamic-ids/v2) | [v3·A](http://localhost:3000/form/html/issue-dynamic-ids/v3) | [v4·B](http://localhost:3000/form/html/issue-dynamic-ids/v4) | [v5·A](http://localhost:3000/form/html/issue-dynamic-ids/v5) | [v6·B](http://localhost:3000/form/html/issue-dynamic-ids/v6) | [v7·A](http://localhost:3000/form/html/issue-dynamic-ids/v7) | [v8·B](http://localhost:3000/form/html/issue-dynamic-ids/v8) | [v9·A](http://localhost:3000/form/html/issue-dynamic-ids/v9) | [v10·B](http://localhost:3000/form/html/issue-dynamic-ids/v10) |
| **issue-fake-buttons** | L7 | [v1·A](http://localhost:3000/form/html/issue-fake-buttons/v1) | [v2·B](http://localhost:3000/form/html/issue-fake-buttons/v2) | [v3·A](http://localhost:3000/form/html/issue-fake-buttons/v3) | [v4·B](http://localhost:3000/form/html/issue-fake-buttons/v4) | [v5·A](http://localhost:3000/form/html/issue-fake-buttons/v5) | [v6·B](http://localhost:3000/form/html/issue-fake-buttons/v6) | [v7·A](http://localhost:3000/form/html/issue-fake-buttons/v7) | [v8·B](http://localhost:3000/form/html/issue-fake-buttons/v8) | [v9·A](http://localhost:3000/form/html/issue-fake-buttons/v9) | [v10·B](http://localhost:3000/form/html/issue-fake-buttons/v10) |
| **issue-hidden-fields** | L7 | [v1·A](http://localhost:3000/form/html/issue-hidden-fields/v1) | [v2·B](http://localhost:3000/form/html/issue-hidden-fields/v2) | [v3·A](http://localhost:3000/form/html/issue-hidden-fields/v3) | [v4·B](http://localhost:3000/form/html/issue-hidden-fields/v4) | [v5·A](http://localhost:3000/form/html/issue-hidden-fields/v5) | [v6·B](http://localhost:3000/form/html/issue-hidden-fields/v6) | [v7·A](http://localhost:3000/form/html/issue-hidden-fields/v7) | [v8·B](http://localhost:3000/form/html/issue-hidden-fields/v8) | [v9·A](http://localhost:3000/form/html/issue-hidden-fields/v9) | [v10·B](http://localhost:3000/form/html/issue-hidden-fields/v10) |
| **issue-network-delay** | L7 | [v1·A](http://localhost:3000/form/html/issue-network-delay/v1) | [v2·B](http://localhost:3000/form/html/issue-network-delay/v2) | [v3·A](http://localhost:3000/form/html/issue-network-delay/v3) | [v4·B](http://localhost:3000/form/html/issue-network-delay/v4) | [v5·A](http://localhost:3000/form/html/issue-network-delay/v5) | [v6·B](http://localhost:3000/form/html/issue-network-delay/v6) | [v7·A](http://localhost:3000/form/html/issue-network-delay/v7) | [v8·B](http://localhost:3000/form/html/issue-network-delay/v8) | [v9·A](http://localhost:3000/form/html/issue-network-delay/v9) | [v10·B](http://localhost:3000/form/html/issue-network-delay/v10) |
| **issue-shadow-dom** | L7 | [v1·A](http://localhost:3000/form/html/issue-shadow-dom/v1) | [v2·B](http://localhost:3000/form/html/issue-shadow-dom/v2) | [v3·A](http://localhost:3000/form/html/issue-shadow-dom/v3) | [v4·B](http://localhost:3000/form/html/issue-shadow-dom/v4) | [v5·A](http://localhost:3000/form/html/issue-shadow-dom/v5) | [v6·B](http://localhost:3000/form/html/issue-shadow-dom/v6) | [v7·A](http://localhost:3000/form/html/issue-shadow-dom/v7) | [v8·B](http://localhost:3000/form/html/issue-shadow-dom/v8) | [v9·A](http://localhost:3000/form/html/issue-shadow-dom/v9) | [v10·B](http://localhost:3000/form/html/issue-shadow-dom/v10) |
| **level7-adversarial** | L7 | [v1·A](http://localhost:3000/form/html/level7-adversarial/v1) | [v2·B](http://localhost:3000/form/html/level7-adversarial/v2) | [v3·A](http://localhost:3000/form/html/level7-adversarial/v3) | [v4·B](http://localhost:3000/form/html/level7-adversarial/v4) | [v5·A](http://localhost:3000/form/html/level7-adversarial/v5) | [v6·B](http://localhost:3000/form/html/level7-adversarial/v6) | [v7·A](http://localhost:3000/form/html/level7-adversarial/v7) | [v8·B](http://localhost:3000/form/html/level7-adversarial/v8) | [v9·A](http://localhost:3000/form/html/level7-adversarial/v9) | [v10·B](http://localhost:3000/form/html/level7-adversarial/v10) |

### ⚛️ React / Next.js — *Cyan Electric*

> Port: **3011** &nbsp;·&nbsp; Market Share: **30%** &nbsp;·&nbsp; Theme Color: `#06b6d4`

| Scenario | Level | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 |
|----------|-------|----|----|----|----|----|----|----|----|----|-----|
| **baseline** | L0 | [v1·A](http://localhost:3000/form/react/baseline/v1) | [v2·B](http://localhost:3000/form/react/baseline/v2) | [v3·A](http://localhost:3000/form/react/baseline/v3) | [v4·B](http://localhost:3000/form/react/baseline/v4) | [v5·A](http://localhost:3000/form/react/baseline/v5) | [v6·B](http://localhost:3000/form/react/baseline/v6) | [v7·A](http://localhost:3000/form/react/baseline/v7) | [v8·B](http://localhost:3000/form/react/baseline/v8) | [v9·A](http://localhost:3000/form/react/baseline/v9) | [v10·B](http://localhost:3000/form/react/baseline/v10) |
| **level1-basic** | L1 | [v1·A](http://localhost:3000/form/react/level1-basic/v1) | [v2·B](http://localhost:3000/form/react/level1-basic/v2) | [v3·A](http://localhost:3000/form/react/level1-basic/v3) | [v4·B](http://localhost:3000/form/react/level1-basic/v4) | [v5·A](http://localhost:3000/form/react/level1-basic/v5) | [v6·B](http://localhost:3000/form/react/level1-basic/v6) | [v7·A](http://localhost:3000/form/react/level1-basic/v7) | [v8·B](http://localhost:3000/form/react/level1-basic/v8) | [v9·A](http://localhost:3000/form/react/level1-basic/v9) | [v10·B](http://localhost:3000/form/react/level1-basic/v10) |
| **level2-selection** | L2 | [v1·A](http://localhost:3000/form/react/level2-selection/v1) | [v2·B](http://localhost:3000/form/react/level2-selection/v2) | [v3·A](http://localhost:3000/form/react/level2-selection/v3) | [v4·B](http://localhost:3000/form/react/level2-selection/v4) | [v5·A](http://localhost:3000/form/react/level2-selection/v5) | [v6·B](http://localhost:3000/form/react/level2-selection/v6) | [v7·A](http://localhost:3000/form/react/level2-selection/v7) | [v8·B](http://localhost:3000/form/react/level2-selection/v8) | [v9·A](http://localhost:3000/form/react/level2-selection/v9) | [v10·B](http://localhost:3000/form/react/level2-selection/v10) |
| **level3-pickers** | L3 | [v1·A](http://localhost:3000/form/react/level3-pickers/v1) | [v2·B](http://localhost:3000/form/react/level3-pickers/v2) | [v3·A](http://localhost:3000/form/react/level3-pickers/v3) | [v4·B](http://localhost:3000/form/react/level3-pickers/v4) | [v5·A](http://localhost:3000/form/react/level3-pickers/v5) | [v6·B](http://localhost:3000/form/react/level3-pickers/v6) | [v7·A](http://localhost:3000/form/react/level3-pickers/v7) | [v8·B](http://localhost:3000/form/react/level3-pickers/v8) | [v9·A](http://localhost:3000/form/react/level3-pickers/v9) | [v10·B](http://localhost:3000/form/react/level3-pickers/v10) |
| **level4-dynamic** | L4 | [v1·A](http://localhost:3000/form/react/level4-dynamic/v1) | [v2·B](http://localhost:3000/form/react/level4-dynamic/v2) | [v3·A](http://localhost:3000/form/react/level4-dynamic/v3) | [v4·B](http://localhost:3000/form/react/level4-dynamic/v4) | [v5·A](http://localhost:3000/form/react/level4-dynamic/v5) | [v6·B](http://localhost:3000/form/react/level4-dynamic/v6) | [v7·A](http://localhost:3000/form/react/level4-dynamic/v7) | [v8·B](http://localhost:3000/form/react/level4-dynamic/v8) | [v9·A](http://localhost:3000/form/react/level4-dynamic/v9) | [v10·B](http://localhost:3000/form/react/level4-dynamic/v10) |
| **level5-complex** | L5 | [v1·A](http://localhost:3000/form/react/level5-complex/v1) | [v2·B](http://localhost:3000/form/react/level5-complex/v2) | [v3·A](http://localhost:3000/form/react/level5-complex/v3) | [v4·B](http://localhost:3000/form/react/level5-complex/v4) | [v5·A](http://localhost:3000/form/react/level5-complex/v5) | [v6·B](http://localhost:3000/form/react/level5-complex/v6) | [v7·A](http://localhost:3000/form/react/level5-complex/v7) | [v8·B](http://localhost:3000/form/react/level5-complex/v8) | [v9·A](http://localhost:3000/form/react/level5-complex/v9) | [v10·B](http://localhost:3000/form/react/level5-complex/v10) |
| **level6-frameworks** | L6 | [v1·A](http://localhost:3000/form/react/level6-frameworks/v1) | [v2·B](http://localhost:3000/form/react/level6-frameworks/v2) | [v3·A](http://localhost:3000/form/react/level6-frameworks/v3) | [v4·B](http://localhost:3000/form/react/level6-frameworks/v4) | [v5·A](http://localhost:3000/form/react/level6-frameworks/v5) | [v6·B](http://localhost:3000/form/react/level6-frameworks/v6) | [v7·A](http://localhost:3000/form/react/level6-frameworks/v7) | [v8·B](http://localhost:3000/form/react/level6-frameworks/v8) | [v9·A](http://localhost:3000/form/react/level6-frameworks/v9) | [v10·B](http://localhost:3000/form/react/level6-frameworks/v10) |
| **issue-combined** | L7 | [v1·A](http://localhost:3000/form/react/issue-combined/v1) | [v2·B](http://localhost:3000/form/react/issue-combined/v2) | [v3·A](http://localhost:3000/form/react/issue-combined/v3) | [v4·B](http://localhost:3000/form/react/issue-combined/v4) | [v5·A](http://localhost:3000/form/react/issue-combined/v5) | [v6·B](http://localhost:3000/form/react/issue-combined/v6) | [v7·A](http://localhost:3000/form/react/issue-combined/v7) | [v8·B](http://localhost:3000/form/react/issue-combined/v8) | [v9·A](http://localhost:3000/form/react/issue-combined/v9) | [v10·B](http://localhost:3000/form/react/issue-combined/v10) |
| **issue-duplicate-labels** | L7 | [v1·A](http://localhost:3000/form/react/issue-duplicate-labels/v1) | [v2·B](http://localhost:3000/form/react/issue-duplicate-labels/v2) | [v3·A](http://localhost:3000/form/react/issue-duplicate-labels/v3) | [v4·B](http://localhost:3000/form/react/issue-duplicate-labels/v4) | [v5·A](http://localhost:3000/form/react/issue-duplicate-labels/v5) | [v6·B](http://localhost:3000/form/react/issue-duplicate-labels/v6) | [v7·A](http://localhost:3000/form/react/issue-duplicate-labels/v7) | [v8·B](http://localhost:3000/form/react/issue-duplicate-labels/v8) | [v9·A](http://localhost:3000/form/react/issue-duplicate-labels/v9) | [v10·B](http://localhost:3000/form/react/issue-duplicate-labels/v10) |
| **issue-dynamic-ids** | L7 | [v1·A](http://localhost:3000/form/react/issue-dynamic-ids/v1) | [v2·B](http://localhost:3000/form/react/issue-dynamic-ids/v2) | [v3·A](http://localhost:3000/form/react/issue-dynamic-ids/v3) | [v4·B](http://localhost:3000/form/react/issue-dynamic-ids/v4) | [v5·A](http://localhost:3000/form/react/issue-dynamic-ids/v5) | [v6·B](http://localhost:3000/form/react/issue-dynamic-ids/v6) | [v7·A](http://localhost:3000/form/react/issue-dynamic-ids/v7) | [v8·B](http://localhost:3000/form/react/issue-dynamic-ids/v8) | [v9·A](http://localhost:3000/form/react/issue-dynamic-ids/v9) | [v10·B](http://localhost:3000/form/react/issue-dynamic-ids/v10) |
| **issue-fake-buttons** | L7 | [v1·A](http://localhost:3000/form/react/issue-fake-buttons/v1) | [v2·B](http://localhost:3000/form/react/issue-fake-buttons/v2) | [v3·A](http://localhost:3000/form/react/issue-fake-buttons/v3) | [v4·B](http://localhost:3000/form/react/issue-fake-buttons/v4) | [v5·A](http://localhost:3000/form/react/issue-fake-buttons/v5) | [v6·B](http://localhost:3000/form/react/issue-fake-buttons/v6) | [v7·A](http://localhost:3000/form/react/issue-fake-buttons/v7) | [v8·B](http://localhost:3000/form/react/issue-fake-buttons/v8) | [v9·A](http://localhost:3000/form/react/issue-fake-buttons/v9) | [v10·B](http://localhost:3000/form/react/issue-fake-buttons/v10) |
| **issue-hidden-fields** | L7 | [v1·A](http://localhost:3000/form/react/issue-hidden-fields/v1) | [v2·B](http://localhost:3000/form/react/issue-hidden-fields/v2) | [v3·A](http://localhost:3000/form/react/issue-hidden-fields/v3) | [v4·B](http://localhost:3000/form/react/issue-hidden-fields/v4) | [v5·A](http://localhost:3000/form/react/issue-hidden-fields/v5) | [v6·B](http://localhost:3000/form/react/issue-hidden-fields/v6) | [v7·A](http://localhost:3000/form/react/issue-hidden-fields/v7) | [v8·B](http://localhost:3000/form/react/issue-hidden-fields/v8) | [v9·A](http://localhost:3000/form/react/issue-hidden-fields/v9) | [v10·B](http://localhost:3000/form/react/issue-hidden-fields/v10) |
| **issue-network-delay** | L7 | [v1·A](http://localhost:3000/form/react/issue-network-delay/v1) | [v2·B](http://localhost:3000/form/react/issue-network-delay/v2) | [v3·A](http://localhost:3000/form/react/issue-network-delay/v3) | [v4·B](http://localhost:3000/form/react/issue-network-delay/v4) | [v5·A](http://localhost:3000/form/react/issue-network-delay/v5) | [v6·B](http://localhost:3000/form/react/issue-network-delay/v6) | [v7·A](http://localhost:3000/form/react/issue-network-delay/v7) | [v8·B](http://localhost:3000/form/react/issue-network-delay/v8) | [v9·A](http://localhost:3000/form/react/issue-network-delay/v9) | [v10·B](http://localhost:3000/form/react/issue-network-delay/v10) |
| **issue-shadow-dom** | L7 | [v1·A](http://localhost:3000/form/react/issue-shadow-dom/v1) | [v2·B](http://localhost:3000/form/react/issue-shadow-dom/v2) | [v3·A](http://localhost:3000/form/react/issue-shadow-dom/v3) | [v4·B](http://localhost:3000/form/react/issue-shadow-dom/v4) | [v5·A](http://localhost:3000/form/react/issue-shadow-dom/v5) | [v6·B](http://localhost:3000/form/react/issue-shadow-dom/v6) | [v7·A](http://localhost:3000/form/react/issue-shadow-dom/v7) | [v8·B](http://localhost:3000/form/react/issue-shadow-dom/v8) | [v9·A](http://localhost:3000/form/react/issue-shadow-dom/v9) | [v10·B](http://localhost:3000/form/react/issue-shadow-dom/v10) |
| **level7-adversarial** | L7 | [v1·A](http://localhost:3000/form/react/level7-adversarial/v1) | [v2·B](http://localhost:3000/form/react/level7-adversarial/v2) | [v3·A](http://localhost:3000/form/react/level7-adversarial/v3) | [v4·B](http://localhost:3000/form/react/level7-adversarial/v4) | [v5·A](http://localhost:3000/form/react/level7-adversarial/v5) | [v6·B](http://localhost:3000/form/react/level7-adversarial/v6) | [v7·A](http://localhost:3000/form/react/level7-adversarial/v7) | [v8·B](http://localhost:3000/form/react/level7-adversarial/v8) | [v9·A](http://localhost:3000/form/react/level7-adversarial/v9) | [v10·B](http://localhost:3000/form/react/level7-adversarial/v10) |

### 🅰️ Angular Reactive — *Angular Red*

> Port: **3012** &nbsp;·&nbsp; Market Share: **15%** &nbsp;·&nbsp; Theme Color: `#e11d48`

| Scenario | Level | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 |
|----------|-------|----|----|----|----|----|----|----|----|----|-----|
| **baseline** | L0 | [v1·A](http://localhost:3000/form/angular/baseline/v1) | [v2·B](http://localhost:3000/form/angular/baseline/v2) | [v3·A](http://localhost:3000/form/angular/baseline/v3) | [v4·B](http://localhost:3000/form/angular/baseline/v4) | [v5·A](http://localhost:3000/form/angular/baseline/v5) | [v6·B](http://localhost:3000/form/angular/baseline/v6) | [v7·A](http://localhost:3000/form/angular/baseline/v7) | [v8·B](http://localhost:3000/form/angular/baseline/v8) | [v9·A](http://localhost:3000/form/angular/baseline/v9) | [v10·B](http://localhost:3000/form/angular/baseline/v10) |
| **level1-basic** | L1 | [v1·A](http://localhost:3000/form/angular/level1-basic/v1) | [v2·B](http://localhost:3000/form/angular/level1-basic/v2) | [v3·A](http://localhost:3000/form/angular/level1-basic/v3) | [v4·B](http://localhost:3000/form/angular/level1-basic/v4) | [v5·A](http://localhost:3000/form/angular/level1-basic/v5) | [v6·B](http://localhost:3000/form/angular/level1-basic/v6) | [v7·A](http://localhost:3000/form/angular/level1-basic/v7) | [v8·B](http://localhost:3000/form/angular/level1-basic/v8) | [v9·A](http://localhost:3000/form/angular/level1-basic/v9) | [v10·B](http://localhost:3000/form/angular/level1-basic/v10) |
| **level2-selection** | L2 | [v1·A](http://localhost:3000/form/angular/level2-selection/v1) | [v2·B](http://localhost:3000/form/angular/level2-selection/v2) | [v3·A](http://localhost:3000/form/angular/level2-selection/v3) | [v4·B](http://localhost:3000/form/angular/level2-selection/v4) | [v5·A](http://localhost:3000/form/angular/level2-selection/v5) | [v6·B](http://localhost:3000/form/angular/level2-selection/v6) | [v7·A](http://localhost:3000/form/angular/level2-selection/v7) | [v8·B](http://localhost:3000/form/angular/level2-selection/v8) | [v9·A](http://localhost:3000/form/angular/level2-selection/v9) | [v10·B](http://localhost:3000/form/angular/level2-selection/v10) |
| **level3-pickers** | L3 | [v1·A](http://localhost:3000/form/angular/level3-pickers/v1) | [v2·B](http://localhost:3000/form/angular/level3-pickers/v2) | [v3·A](http://localhost:3000/form/angular/level3-pickers/v3) | [v4·B](http://localhost:3000/form/angular/level3-pickers/v4) | [v5·A](http://localhost:3000/form/angular/level3-pickers/v5) | [v6·B](http://localhost:3000/form/angular/level3-pickers/v6) | [v7·A](http://localhost:3000/form/angular/level3-pickers/v7) | [v8·B](http://localhost:3000/form/angular/level3-pickers/v8) | [v9·A](http://localhost:3000/form/angular/level3-pickers/v9) | [v10·B](http://localhost:3000/form/angular/level3-pickers/v10) |
| **level4-dynamic** | L4 | [v1·A](http://localhost:3000/form/angular/level4-dynamic/v1) | [v2·B](http://localhost:3000/form/angular/level4-dynamic/v2) | [v3·A](http://localhost:3000/form/angular/level4-dynamic/v3) | [v4·B](http://localhost:3000/form/angular/level4-dynamic/v4) | [v5·A](http://localhost:3000/form/angular/level4-dynamic/v5) | [v6·B](http://localhost:3000/form/angular/level4-dynamic/v6) | [v7·A](http://localhost:3000/form/angular/level4-dynamic/v7) | [v8·B](http://localhost:3000/form/angular/level4-dynamic/v8) | [v9·A](http://localhost:3000/form/angular/level4-dynamic/v9) | [v10·B](http://localhost:3000/form/angular/level4-dynamic/v10) |
| **level5-complex** | L5 | [v1·A](http://localhost:3000/form/angular/level5-complex/v1) | [v2·B](http://localhost:3000/form/angular/level5-complex/v2) | [v3·A](http://localhost:3000/form/angular/level5-complex/v3) | [v4·B](http://localhost:3000/form/angular/level5-complex/v4) | [v5·A](http://localhost:3000/form/angular/level5-complex/v5) | [v6·B](http://localhost:3000/form/angular/level5-complex/v6) | [v7·A](http://localhost:3000/form/angular/level5-complex/v7) | [v8·B](http://localhost:3000/form/angular/level5-complex/v8) | [v9·A](http://localhost:3000/form/angular/level5-complex/v9) | [v10·B](http://localhost:3000/form/angular/level5-complex/v10) |
| **level6-frameworks** | L6 | [v1·A](http://localhost:3000/form/angular/level6-frameworks/v1) | [v2·B](http://localhost:3000/form/angular/level6-frameworks/v2) | [v3·A](http://localhost:3000/form/angular/level6-frameworks/v3) | [v4·B](http://localhost:3000/form/angular/level6-frameworks/v4) | [v5·A](http://localhost:3000/form/angular/level6-frameworks/v5) | [v6·B](http://localhost:3000/form/angular/level6-frameworks/v6) | [v7·A](http://localhost:3000/form/angular/level6-frameworks/v7) | [v8·B](http://localhost:3000/form/angular/level6-frameworks/v8) | [v9·A](http://localhost:3000/form/angular/level6-frameworks/v9) | [v10·B](http://localhost:3000/form/angular/level6-frameworks/v10) |
| **issue-combined** | L7 | [v1·A](http://localhost:3000/form/angular/issue-combined/v1) | [v2·B](http://localhost:3000/form/angular/issue-combined/v2) | [v3·A](http://localhost:3000/form/angular/issue-combined/v3) | [v4·B](http://localhost:3000/form/angular/issue-combined/v4) | [v5·A](http://localhost:3000/form/angular/issue-combined/v5) | [v6·B](http://localhost:3000/form/angular/issue-combined/v6) | [v7·A](http://localhost:3000/form/angular/issue-combined/v7) | [v8·B](http://localhost:3000/form/angular/issue-combined/v8) | [v9·A](http://localhost:3000/form/angular/issue-combined/v9) | [v10·B](http://localhost:3000/form/angular/issue-combined/v10) |
| **issue-duplicate-labels** | L7 | [v1·A](http://localhost:3000/form/angular/issue-duplicate-labels/v1) | [v2·B](http://localhost:3000/form/angular/issue-duplicate-labels/v2) | [v3·A](http://localhost:3000/form/angular/issue-duplicate-labels/v3) | [v4·B](http://localhost:3000/form/angular/issue-duplicate-labels/v4) | [v5·A](http://localhost:3000/form/angular/issue-duplicate-labels/v5) | [v6·B](http://localhost:3000/form/angular/issue-duplicate-labels/v6) | [v7·A](http://localhost:3000/form/angular/issue-duplicate-labels/v7) | [v8·B](http://localhost:3000/form/angular/issue-duplicate-labels/v8) | [v9·A](http://localhost:3000/form/angular/issue-duplicate-labels/v9) | [v10·B](http://localhost:3000/form/angular/issue-duplicate-labels/v10) |
| **issue-dynamic-ids** | L7 | [v1·A](http://localhost:3000/form/angular/issue-dynamic-ids/v1) | [v2·B](http://localhost:3000/form/angular/issue-dynamic-ids/v2) | [v3·A](http://localhost:3000/form/angular/issue-dynamic-ids/v3) | [v4·B](http://localhost:3000/form/angular/issue-dynamic-ids/v4) | [v5·A](http://localhost:3000/form/angular/issue-dynamic-ids/v5) | [v6·B](http://localhost:3000/form/angular/issue-dynamic-ids/v6) | [v7·A](http://localhost:3000/form/angular/issue-dynamic-ids/v7) | [v8·B](http://localhost:3000/form/angular/issue-dynamic-ids/v8) | [v9·A](http://localhost:3000/form/angular/issue-dynamic-ids/v9) | [v10·B](http://localhost:3000/form/angular/issue-dynamic-ids/v10) |
| **issue-fake-buttons** | L7 | [v1·A](http://localhost:3000/form/angular/issue-fake-buttons/v1) | [v2·B](http://localhost:3000/form/angular/issue-fake-buttons/v2) | [v3·A](http://localhost:3000/form/angular/issue-fake-buttons/v3) | [v4·B](http://localhost:3000/form/angular/issue-fake-buttons/v4) | [v5·A](http://localhost:3000/form/angular/issue-fake-buttons/v5) | [v6·B](http://localhost:3000/form/angular/issue-fake-buttons/v6) | [v7·A](http://localhost:3000/form/angular/issue-fake-buttons/v7) | [v8·B](http://localhost:3000/form/angular/issue-fake-buttons/v8) | [v9·A](http://localhost:3000/form/angular/issue-fake-buttons/v9) | [v10·B](http://localhost:3000/form/angular/issue-fake-buttons/v10) |
| **issue-hidden-fields** | L7 | [v1·A](http://localhost:3000/form/angular/issue-hidden-fields/v1) | [v2·B](http://localhost:3000/form/angular/issue-hidden-fields/v2) | [v3·A](http://localhost:3000/form/angular/issue-hidden-fields/v3) | [v4·B](http://localhost:3000/form/angular/issue-hidden-fields/v4) | [v5·A](http://localhost:3000/form/angular/issue-hidden-fields/v5) | [v6·B](http://localhost:3000/form/angular/issue-hidden-fields/v6) | [v7·A](http://localhost:3000/form/angular/issue-hidden-fields/v7) | [v8·B](http://localhost:3000/form/angular/issue-hidden-fields/v8) | [v9·A](http://localhost:3000/form/angular/issue-hidden-fields/v9) | [v10·B](http://localhost:3000/form/angular/issue-hidden-fields/v10) |
| **issue-network-delay** | L7 | [v1·A](http://localhost:3000/form/angular/issue-network-delay/v1) | [v2·B](http://localhost:3000/form/angular/issue-network-delay/v2) | [v3·A](http://localhost:3000/form/angular/issue-network-delay/v3) | [v4·B](http://localhost:3000/form/angular/issue-network-delay/v4) | [v5·A](http://localhost:3000/form/angular/issue-network-delay/v5) | [v6·B](http://localhost:3000/form/angular/issue-network-delay/v6) | [v7·A](http://localhost:3000/form/angular/issue-network-delay/v7) | [v8·B](http://localhost:3000/form/angular/issue-network-delay/v8) | [v9·A](http://localhost:3000/form/angular/issue-network-delay/v9) | [v10·B](http://localhost:3000/form/angular/issue-network-delay/v10) |
| **issue-shadow-dom** | L7 | [v1·A](http://localhost:3000/form/angular/issue-shadow-dom/v1) | [v2·B](http://localhost:3000/form/angular/issue-shadow-dom/v2) | [v3·A](http://localhost:3000/form/angular/issue-shadow-dom/v3) | [v4·B](http://localhost:3000/form/angular/issue-shadow-dom/v4) | [v5·A](http://localhost:3000/form/angular/issue-shadow-dom/v5) | [v6·B](http://localhost:3000/form/angular/issue-shadow-dom/v6) | [v7·A](http://localhost:3000/form/angular/issue-shadow-dom/v7) | [v8·B](http://localhost:3000/form/angular/issue-shadow-dom/v8) | [v9·A](http://localhost:3000/form/angular/issue-shadow-dom/v9) | [v10·B](http://localhost:3000/form/angular/issue-shadow-dom/v10) |
| **level7-adversarial** | L7 | [v1·A](http://localhost:3000/form/angular/level7-adversarial/v1) | [v2·B](http://localhost:3000/form/angular/level7-adversarial/v2) | [v3·A](http://localhost:3000/form/angular/level7-adversarial/v3) | [v4·B](http://localhost:3000/form/angular/level7-adversarial/v4) | [v5·A](http://localhost:3000/form/angular/level7-adversarial/v5) | [v6·B](http://localhost:3000/form/angular/level7-adversarial/v6) | [v7·A](http://localhost:3000/form/angular/level7-adversarial/v7) | [v8·B](http://localhost:3000/form/angular/level7-adversarial/v8) | [v9·A](http://localhost:3000/form/angular/level7-adversarial/v9) | [v10·B](http://localhost:3000/form/angular/level7-adversarial/v10) |

### 💚 Vue.js — *Emerald Vue*

> Port: **3013** &nbsp;·&nbsp; Market Share: **10%** &nbsp;·&nbsp; Theme Color: `#059669`

| Scenario | Level | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 |
|----------|-------|----|----|----|----|----|----|----|----|----|-----|
| **baseline** | L0 | [v1·A](http://localhost:3000/form/vue/baseline/v1) | [v2·B](http://localhost:3000/form/vue/baseline/v2) | [v3·A](http://localhost:3000/form/vue/baseline/v3) | [v4·B](http://localhost:3000/form/vue/baseline/v4) | [v5·A](http://localhost:3000/form/vue/baseline/v5) | [v6·B](http://localhost:3000/form/vue/baseline/v6) | [v7·A](http://localhost:3000/form/vue/baseline/v7) | [v8·B](http://localhost:3000/form/vue/baseline/v8) | [v9·A](http://localhost:3000/form/vue/baseline/v9) | [v10·B](http://localhost:3000/form/vue/baseline/v10) |
| **level1-basic** | L1 | [v1·A](http://localhost:3000/form/vue/level1-basic/v1) | [v2·B](http://localhost:3000/form/vue/level1-basic/v2) | [v3·A](http://localhost:3000/form/vue/level1-basic/v3) | [v4·B](http://localhost:3000/form/vue/level1-basic/v4) | [v5·A](http://localhost:3000/form/vue/level1-basic/v5) | [v6·B](http://localhost:3000/form/vue/level1-basic/v6) | [v7·A](http://localhost:3000/form/vue/level1-basic/v7) | [v8·B](http://localhost:3000/form/vue/level1-basic/v8) | [v9·A](http://localhost:3000/form/vue/level1-basic/v9) | [v10·B](http://localhost:3000/form/vue/level1-basic/v10) |
| **level2-selection** | L2 | [v1·A](http://localhost:3000/form/vue/level2-selection/v1) | [v2·B](http://localhost:3000/form/vue/level2-selection/v2) | [v3·A](http://localhost:3000/form/vue/level2-selection/v3) | [v4·B](http://localhost:3000/form/vue/level2-selection/v4) | [v5·A](http://localhost:3000/form/vue/level2-selection/v5) | [v6·B](http://localhost:3000/form/vue/level2-selection/v6) | [v7·A](http://localhost:3000/form/vue/level2-selection/v7) | [v8·B](http://localhost:3000/form/vue/level2-selection/v8) | [v9·A](http://localhost:3000/form/vue/level2-selection/v9) | [v10·B](http://localhost:3000/form/vue/level2-selection/v10) |
| **level3-pickers** | L3 | [v1·A](http://localhost:3000/form/vue/level3-pickers/v1) | [v2·B](http://localhost:3000/form/vue/level3-pickers/v2) | [v3·A](http://localhost:3000/form/vue/level3-pickers/v3) | [v4·B](http://localhost:3000/form/vue/level3-pickers/v4) | [v5·A](http://localhost:3000/form/vue/level3-pickers/v5) | [v6·B](http://localhost:3000/form/vue/level3-pickers/v6) | [v7·A](http://localhost:3000/form/vue/level3-pickers/v7) | [v8·B](http://localhost:3000/form/vue/level3-pickers/v8) | [v9·A](http://localhost:3000/form/vue/level3-pickers/v9) | [v10·B](http://localhost:3000/form/vue/level3-pickers/v10) |
| **level4-dynamic** | L4 | [v1·A](http://localhost:3000/form/vue/level4-dynamic/v1) | [v2·B](http://localhost:3000/form/vue/level4-dynamic/v2) | [v3·A](http://localhost:3000/form/vue/level4-dynamic/v3) | [v4·B](http://localhost:3000/form/vue/level4-dynamic/v4) | [v5·A](http://localhost:3000/form/vue/level4-dynamic/v5) | [v6·B](http://localhost:3000/form/vue/level4-dynamic/v6) | [v7·A](http://localhost:3000/form/vue/level4-dynamic/v7) | [v8·B](http://localhost:3000/form/vue/level4-dynamic/v8) | [v9·A](http://localhost:3000/form/vue/level4-dynamic/v9) | [v10·B](http://localhost:3000/form/vue/level4-dynamic/v10) |
| **level5-complex** | L5 | [v1·A](http://localhost:3000/form/vue/level5-complex/v1) | [v2·B](http://localhost:3000/form/vue/level5-complex/v2) | [v3·A](http://localhost:3000/form/vue/level5-complex/v3) | [v4·B](http://localhost:3000/form/vue/level5-complex/v4) | [v5·A](http://localhost:3000/form/vue/level5-complex/v5) | [v6·B](http://localhost:3000/form/vue/level5-complex/v6) | [v7·A](http://localhost:3000/form/vue/level5-complex/v7) | [v8·B](http://localhost:3000/form/vue/level5-complex/v8) | [v9·A](http://localhost:3000/form/vue/level5-complex/v9) | [v10·B](http://localhost:3000/form/vue/level5-complex/v10) |
| **level6-frameworks** | L6 | [v1·A](http://localhost:3000/form/vue/level6-frameworks/v1) | [v2·B](http://localhost:3000/form/vue/level6-frameworks/v2) | [v3·A](http://localhost:3000/form/vue/level6-frameworks/v3) | [v4·B](http://localhost:3000/form/vue/level6-frameworks/v4) | [v5·A](http://localhost:3000/form/vue/level6-frameworks/v5) | [v6·B](http://localhost:3000/form/vue/level6-frameworks/v6) | [v7·A](http://localhost:3000/form/vue/level6-frameworks/v7) | [v8·B](http://localhost:3000/form/vue/level6-frameworks/v8) | [v9·A](http://localhost:3000/form/vue/level6-frameworks/v9) | [v10·B](http://localhost:3000/form/vue/level6-frameworks/v10) |
| **issue-combined** | L7 | [v1·A](http://localhost:3000/form/vue/issue-combined/v1) | [v2·B](http://localhost:3000/form/vue/issue-combined/v2) | [v3·A](http://localhost:3000/form/vue/issue-combined/v3) | [v4·B](http://localhost:3000/form/vue/issue-combined/v4) | [v5·A](http://localhost:3000/form/vue/issue-combined/v5) | [v6·B](http://localhost:3000/form/vue/issue-combined/v6) | [v7·A](http://localhost:3000/form/vue/issue-combined/v7) | [v8·B](http://localhost:3000/form/vue/issue-combined/v8) | [v9·A](http://localhost:3000/form/vue/issue-combined/v9) | [v10·B](http://localhost:3000/form/vue/issue-combined/v10) |
| **issue-duplicate-labels** | L7 | [v1·A](http://localhost:3000/form/vue/issue-duplicate-labels/v1) | [v2·B](http://localhost:3000/form/vue/issue-duplicate-labels/v2) | [v3·A](http://localhost:3000/form/vue/issue-duplicate-labels/v3) | [v4·B](http://localhost:3000/form/vue/issue-duplicate-labels/v4) | [v5·A](http://localhost:3000/form/vue/issue-duplicate-labels/v5) | [v6·B](http://localhost:3000/form/vue/issue-duplicate-labels/v6) | [v7·A](http://localhost:3000/form/vue/issue-duplicate-labels/v7) | [v8·B](http://localhost:3000/form/vue/issue-duplicate-labels/v8) | [v9·A](http://localhost:3000/form/vue/issue-duplicate-labels/v9) | [v10·B](http://localhost:3000/form/vue/issue-duplicate-labels/v10) |
| **issue-dynamic-ids** | L7 | [v1·A](http://localhost:3000/form/vue/issue-dynamic-ids/v1) | [v2·B](http://localhost:3000/form/vue/issue-dynamic-ids/v2) | [v3·A](http://localhost:3000/form/vue/issue-dynamic-ids/v3) | [v4·B](http://localhost:3000/form/vue/issue-dynamic-ids/v4) | [v5·A](http://localhost:3000/form/vue/issue-dynamic-ids/v5) | [v6·B](http://localhost:3000/form/vue/issue-dynamic-ids/v6) | [v7·A](http://localhost:3000/form/vue/issue-dynamic-ids/v7) | [v8·B](http://localhost:3000/form/vue/issue-dynamic-ids/v8) | [v9·A](http://localhost:3000/form/vue/issue-dynamic-ids/v9) | [v10·B](http://localhost:3000/form/vue/issue-dynamic-ids/v10) |
| **issue-fake-buttons** | L7 | [v1·A](http://localhost:3000/form/vue/issue-fake-buttons/v1) | [v2·B](http://localhost:3000/form/vue/issue-fake-buttons/v2) | [v3·A](http://localhost:3000/form/vue/issue-fake-buttons/v3) | [v4·B](http://localhost:3000/form/vue/issue-fake-buttons/v4) | [v5·A](http://localhost:3000/form/vue/issue-fake-buttons/v5) | [v6·B](http://localhost:3000/form/vue/issue-fake-buttons/v6) | [v7·A](http://localhost:3000/form/vue/issue-fake-buttons/v7) | [v8·B](http://localhost:3000/form/vue/issue-fake-buttons/v8) | [v9·A](http://localhost:3000/form/vue/issue-fake-buttons/v9) | [v10·B](http://localhost:3000/form/vue/issue-fake-buttons/v10) |
| **issue-hidden-fields** | L7 | [v1·A](http://localhost:3000/form/vue/issue-hidden-fields/v1) | [v2·B](http://localhost:3000/form/vue/issue-hidden-fields/v2) | [v3·A](http://localhost:3000/form/vue/issue-hidden-fields/v3) | [v4·B](http://localhost:3000/form/vue/issue-hidden-fields/v4) | [v5·A](http://localhost:3000/form/vue/issue-hidden-fields/v5) | [v6·B](http://localhost:3000/form/vue/issue-hidden-fields/v6) | [v7·A](http://localhost:3000/form/vue/issue-hidden-fields/v7) | [v8·B](http://localhost:3000/form/vue/issue-hidden-fields/v8) | [v9·A](http://localhost:3000/form/vue/issue-hidden-fields/v9) | [v10·B](http://localhost:3000/form/vue/issue-hidden-fields/v10) |
| **issue-network-delay** | L7 | [v1·A](http://localhost:3000/form/vue/issue-network-delay/v1) | [v2·B](http://localhost:3000/form/vue/issue-network-delay/v2) | [v3·A](http://localhost:3000/form/vue/issue-network-delay/v3) | [v4·B](http://localhost:3000/form/vue/issue-network-delay/v4) | [v5·A](http://localhost:3000/form/vue/issue-network-delay/v5) | [v6·B](http://localhost:3000/form/vue/issue-network-delay/v6) | [v7·A](http://localhost:3000/form/vue/issue-network-delay/v7) | [v8·B](http://localhost:3000/form/vue/issue-network-delay/v8) | [v9·A](http://localhost:3000/form/vue/issue-network-delay/v9) | [v10·B](http://localhost:3000/form/vue/issue-network-delay/v10) |
| **issue-shadow-dom** | L7 | [v1·A](http://localhost:3000/form/vue/issue-shadow-dom/v1) | [v2·B](http://localhost:3000/form/vue/issue-shadow-dom/v2) | [v3·A](http://localhost:3000/form/vue/issue-shadow-dom/v3) | [v4·B](http://localhost:3000/form/vue/issue-shadow-dom/v4) | [v5·A](http://localhost:3000/form/vue/issue-shadow-dom/v5) | [v6·B](http://localhost:3000/form/vue/issue-shadow-dom/v6) | [v7·A](http://localhost:3000/form/vue/issue-shadow-dom/v7) | [v8·B](http://localhost:3000/form/vue/issue-shadow-dom/v8) | [v9·A](http://localhost:3000/form/vue/issue-shadow-dom/v9) | [v10·B](http://localhost:3000/form/vue/issue-shadow-dom/v10) |
| **level7-adversarial** | L7 | [v1·A](http://localhost:3000/form/vue/level7-adversarial/v1) | [v2·B](http://localhost:3000/form/vue/level7-adversarial/v2) | [v3·A](http://localhost:3000/form/vue/level7-adversarial/v3) | [v4·B](http://localhost:3000/form/vue/level7-adversarial/v4) | [v5·A](http://localhost:3000/form/vue/level7-adversarial/v5) | [v6·B](http://localhost:3000/form/vue/level7-adversarial/v6) | [v7·A](http://localhost:3000/form/vue/level7-adversarial/v7) | [v8·B](http://localhost:3000/form/vue/level7-adversarial/v8) | [v9·A](http://localhost:3000/form/vue/level7-adversarial/v9) | [v10·B](http://localhost:3000/form/vue/level7-adversarial/v10) |

### 🐘 PHP Server-Rendered — *Indigo Violet*

> Port: **3014** &nbsp;·&nbsp; Market Share: **15%** &nbsp;·&nbsp; Theme Color: `#7c3aed`

| Scenario | Level | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 |
|----------|-------|----|----|----|----|----|----|----|----|----|-----|
| **baseline** | L0 | [v1·A](http://localhost:3000/form/php/baseline/v1) | [v2·B](http://localhost:3000/form/php/baseline/v2) | [v3·A](http://localhost:3000/form/php/baseline/v3) | [v4·B](http://localhost:3000/form/php/baseline/v4) | [v5·A](http://localhost:3000/form/php/baseline/v5) | [v6·B](http://localhost:3000/form/php/baseline/v6) | [v7·A](http://localhost:3000/form/php/baseline/v7) | [v8·B](http://localhost:3000/form/php/baseline/v8) | [v9·A](http://localhost:3000/form/php/baseline/v9) | [v10·B](http://localhost:3000/form/php/baseline/v10) |
| **level1-basic** | L1 | [v1·A](http://localhost:3000/form/php/level1-basic/v1) | [v2·B](http://localhost:3000/form/php/level1-basic/v2) | [v3·A](http://localhost:3000/form/php/level1-basic/v3) | [v4·B](http://localhost:3000/form/php/level1-basic/v4) | [v5·A](http://localhost:3000/form/php/level1-basic/v5) | [v6·B](http://localhost:3000/form/php/level1-basic/v6) | [v7·A](http://localhost:3000/form/php/level1-basic/v7) | [v8·B](http://localhost:3000/form/php/level1-basic/v8) | [v9·A](http://localhost:3000/form/php/level1-basic/v9) | [v10·B](http://localhost:3000/form/php/level1-basic/v10) |
| **level2-selection** | L2 | [v1·A](http://localhost:3000/form/php/level2-selection/v1) | [v2·B](http://localhost:3000/form/php/level2-selection/v2) | [v3·A](http://localhost:3000/form/php/level2-selection/v3) | [v4·B](http://localhost:3000/form/php/level2-selection/v4) | [v5·A](http://localhost:3000/form/php/level2-selection/v5) | [v6·B](http://localhost:3000/form/php/level2-selection/v6) | [v7·A](http://localhost:3000/form/php/level2-selection/v7) | [v8·B](http://localhost:3000/form/php/level2-selection/v8) | [v9·A](http://localhost:3000/form/php/level2-selection/v9) | [v10·B](http://localhost:3000/form/php/level2-selection/v10) |
| **level3-pickers** | L3 | [v1·A](http://localhost:3000/form/php/level3-pickers/v1) | [v2·B](http://localhost:3000/form/php/level3-pickers/v2) | [v3·A](http://localhost:3000/form/php/level3-pickers/v3) | [v4·B](http://localhost:3000/form/php/level3-pickers/v4) | [v5·A](http://localhost:3000/form/php/level3-pickers/v5) | [v6·B](http://localhost:3000/form/php/level3-pickers/v6) | [v7·A](http://localhost:3000/form/php/level3-pickers/v7) | [v8·B](http://localhost:3000/form/php/level3-pickers/v8) | [v9·A](http://localhost:3000/form/php/level3-pickers/v9) | [v10·B](http://localhost:3000/form/php/level3-pickers/v10) |
| **level4-dynamic** | L4 | [v1·A](http://localhost:3000/form/php/level4-dynamic/v1) | [v2·B](http://localhost:3000/form/php/level4-dynamic/v2) | [v3·A](http://localhost:3000/form/php/level4-dynamic/v3) | [v4·B](http://localhost:3000/form/php/level4-dynamic/v4) | [v5·A](http://localhost:3000/form/php/level4-dynamic/v5) | [v6·B](http://localhost:3000/form/php/level4-dynamic/v6) | [v7·A](http://localhost:3000/form/php/level4-dynamic/v7) | [v8·B](http://localhost:3000/form/php/level4-dynamic/v8) | [v9·A](http://localhost:3000/form/php/level4-dynamic/v9) | [v10·B](http://localhost:3000/form/php/level4-dynamic/v10) |
| **level5-complex** | L5 | [v1·A](http://localhost:3000/form/php/level5-complex/v1) | [v2·B](http://localhost:3000/form/php/level5-complex/v2) | [v3·A](http://localhost:3000/form/php/level5-complex/v3) | [v4·B](http://localhost:3000/form/php/level5-complex/v4) | [v5·A](http://localhost:3000/form/php/level5-complex/v5) | [v6·B](http://localhost:3000/form/php/level5-complex/v6) | [v7·A](http://localhost:3000/form/php/level5-complex/v7) | [v8·B](http://localhost:3000/form/php/level5-complex/v8) | [v9·A](http://localhost:3000/form/php/level5-complex/v9) | [v10·B](http://localhost:3000/form/php/level5-complex/v10) |
| **level6-frameworks** | L6 | [v1·A](http://localhost:3000/form/php/level6-frameworks/v1) | [v2·B](http://localhost:3000/form/php/level6-frameworks/v2) | [v3·A](http://localhost:3000/form/php/level6-frameworks/v3) | [v4·B](http://localhost:3000/form/php/level6-frameworks/v4) | [v5·A](http://localhost:3000/form/php/level6-frameworks/v5) | [v6·B](http://localhost:3000/form/php/level6-frameworks/v6) | [v7·A](http://localhost:3000/form/php/level6-frameworks/v7) | [v8·B](http://localhost:3000/form/php/level6-frameworks/v8) | [v9·A](http://localhost:3000/form/php/level6-frameworks/v9) | [v10·B](http://localhost:3000/form/php/level6-frameworks/v10) |
| **issue-combined** | L7 | [v1·A](http://localhost:3000/form/php/issue-combined/v1) | [v2·B](http://localhost:3000/form/php/issue-combined/v2) | [v3·A](http://localhost:3000/form/php/issue-combined/v3) | [v4·B](http://localhost:3000/form/php/issue-combined/v4) | [v5·A](http://localhost:3000/form/php/issue-combined/v5) | [v6·B](http://localhost:3000/form/php/issue-combined/v6) | [v7·A](http://localhost:3000/form/php/issue-combined/v7) | [v8·B](http://localhost:3000/form/php/issue-combined/v8) | [v9·A](http://localhost:3000/form/php/issue-combined/v9) | [v10·B](http://localhost:3000/form/php/issue-combined/v10) |
| **issue-duplicate-labels** | L7 | [v1·A](http://localhost:3000/form/php/issue-duplicate-labels/v1) | [v2·B](http://localhost:3000/form/php/issue-duplicate-labels/v2) | [v3·A](http://localhost:3000/form/php/issue-duplicate-labels/v3) | [v4·B](http://localhost:3000/form/php/issue-duplicate-labels/v4) | [v5·A](http://localhost:3000/form/php/issue-duplicate-labels/v5) | [v6·B](http://localhost:3000/form/php/issue-duplicate-labels/v6) | [v7·A](http://localhost:3000/form/php/issue-duplicate-labels/v7) | [v8·B](http://localhost:3000/form/php/issue-duplicate-labels/v8) | [v9·A](http://localhost:3000/form/php/issue-duplicate-labels/v9) | [v10·B](http://localhost:3000/form/php/issue-duplicate-labels/v10) |
| **issue-dynamic-ids** | L7 | [v1·A](http://localhost:3000/form/php/issue-dynamic-ids/v1) | [v2·B](http://localhost:3000/form/php/issue-dynamic-ids/v2) | [v3·A](http://localhost:3000/form/php/issue-dynamic-ids/v3) | [v4·B](http://localhost:3000/form/php/issue-dynamic-ids/v4) | [v5·A](http://localhost:3000/form/php/issue-dynamic-ids/v5) | [v6·B](http://localhost:3000/form/php/issue-dynamic-ids/v6) | [v7·A](http://localhost:3000/form/php/issue-dynamic-ids/v7) | [v8·B](http://localhost:3000/form/php/issue-dynamic-ids/v8) | [v9·A](http://localhost:3000/form/php/issue-dynamic-ids/v9) | [v10·B](http://localhost:3000/form/php/issue-dynamic-ids/v10) |
| **issue-fake-buttons** | L7 | [v1·A](http://localhost:3000/form/php/issue-fake-buttons/v1) | [v2·B](http://localhost:3000/form/php/issue-fake-buttons/v2) | [v3·A](http://localhost:3000/form/php/issue-fake-buttons/v3) | [v4·B](http://localhost:3000/form/php/issue-fake-buttons/v4) | [v5·A](http://localhost:3000/form/php/issue-fake-buttons/v5) | [v6·B](http://localhost:3000/form/php/issue-fake-buttons/v6) | [v7·A](http://localhost:3000/form/php/issue-fake-buttons/v7) | [v8·B](http://localhost:3000/form/php/issue-fake-buttons/v8) | [v9·A](http://localhost:3000/form/php/issue-fake-buttons/v9) | [v10·B](http://localhost:3000/form/php/issue-fake-buttons/v10) |
| **issue-hidden-fields** | L7 | [v1·A](http://localhost:3000/form/php/issue-hidden-fields/v1) | [v2·B](http://localhost:3000/form/php/issue-hidden-fields/v2) | [v3·A](http://localhost:3000/form/php/issue-hidden-fields/v3) | [v4·B](http://localhost:3000/form/php/issue-hidden-fields/v4) | [v5·A](http://localhost:3000/form/php/issue-hidden-fields/v5) | [v6·B](http://localhost:3000/form/php/issue-hidden-fields/v6) | [v7·A](http://localhost:3000/form/php/issue-hidden-fields/v7) | [v8·B](http://localhost:3000/form/php/issue-hidden-fields/v8) | [v9·A](http://localhost:3000/form/php/issue-hidden-fields/v9) | [v10·B](http://localhost:3000/form/php/issue-hidden-fields/v10) |
| **issue-network-delay** | L7 | [v1·A](http://localhost:3000/form/php/issue-network-delay/v1) | [v2·B](http://localhost:3000/form/php/issue-network-delay/v2) | [v3·A](http://localhost:3000/form/php/issue-network-delay/v3) | [v4·B](http://localhost:3000/form/php/issue-network-delay/v4) | [v5·A](http://localhost:3000/form/php/issue-network-delay/v5) | [v6·B](http://localhost:3000/form/php/issue-network-delay/v6) | [v7·A](http://localhost:3000/form/php/issue-network-delay/v7) | [v8·B](http://localhost:3000/form/php/issue-network-delay/v8) | [v9·A](http://localhost:3000/form/php/issue-network-delay/v9) | [v10·B](http://localhost:3000/form/php/issue-network-delay/v10) |
| **issue-shadow-dom** | L7 | [v1·A](http://localhost:3000/form/php/issue-shadow-dom/v1) | [v2·B](http://localhost:3000/form/php/issue-shadow-dom/v2) | [v3·A](http://localhost:3000/form/php/issue-shadow-dom/v3) | [v4·B](http://localhost:3000/form/php/issue-shadow-dom/v4) | [v5·A](http://localhost:3000/form/php/issue-shadow-dom/v5) | [v6·B](http://localhost:3000/form/php/issue-shadow-dom/v6) | [v7·A](http://localhost:3000/form/php/issue-shadow-dom/v7) | [v8·B](http://localhost:3000/form/php/issue-shadow-dom/v8) | [v9·A](http://localhost:3000/form/php/issue-shadow-dom/v9) | [v10·B](http://localhost:3000/form/php/issue-shadow-dom/v10) |
| **level7-adversarial** | L7 | [v1·A](http://localhost:3000/form/php/level7-adversarial/v1) | [v2·B](http://localhost:3000/form/php/level7-adversarial/v2) | [v3·A](http://localhost:3000/form/php/level7-adversarial/v3) | [v4·B](http://localhost:3000/form/php/level7-adversarial/v4) | [v5·A](http://localhost:3000/form/php/level7-adversarial/v5) | [v6·B](http://localhost:3000/form/php/level7-adversarial/v6) | [v7·A](http://localhost:3000/form/php/level7-adversarial/v7) | [v8·B](http://localhost:3000/form/php/level7-adversarial/v8) | [v9·A](http://localhost:3000/form/php/level7-adversarial/v9) | [v10·B](http://localhost:3000/form/php/level7-adversarial/v10) |

### 🐍 Flask / Python WTForms — *Amber Python*

> Port: **3015** &nbsp;·&nbsp; Market Share: **10%** &nbsp;·&nbsp; Theme Color: `#d97706`

| Scenario | Level | v1 | v2 | v3 | v4 | v5 | v6 | v7 | v8 | v9 | v10 |
|----------|-------|----|----|----|----|----|----|----|----|----|-----|
| **baseline** | L0 | [v1·A](http://localhost:3000/form/flask/baseline/v1) | [v2·B](http://localhost:3000/form/flask/baseline/v2) | [v3·A](http://localhost:3000/form/flask/baseline/v3) | [v4·B](http://localhost:3000/form/flask/baseline/v4) | [v5·A](http://localhost:3000/form/flask/baseline/v5) | [v6·B](http://localhost:3000/form/flask/baseline/v6) | [v7·A](http://localhost:3000/form/flask/baseline/v7) | [v8·B](http://localhost:3000/form/flask/baseline/v8) | [v9·A](http://localhost:3000/form/flask/baseline/v9) | [v10·B](http://localhost:3000/form/flask/baseline/v10) |
| **level1-basic** | L1 | [v1·A](http://localhost:3000/form/flask/level1-basic/v1) | [v2·B](http://localhost:3000/form/flask/level1-basic/v2) | [v3·A](http://localhost:3000/form/flask/level1-basic/v3) | [v4·B](http://localhost:3000/form/flask/level1-basic/v4) | [v5·A](http://localhost:3000/form/flask/level1-basic/v5) | [v6·B](http://localhost:3000/form/flask/level1-basic/v6) | [v7·A](http://localhost:3000/form/flask/level1-basic/v7) | [v8·B](http://localhost:3000/form/flask/level1-basic/v8) | [v9·A](http://localhost:3000/form/flask/level1-basic/v9) | [v10·B](http://localhost:3000/form/flask/level1-basic/v10) |
| **level2-selection** | L2 | [v1·A](http://localhost:3000/form/flask/level2-selection/v1) | [v2·B](http://localhost:3000/form/flask/level2-selection/v2) | [v3·A](http://localhost:3000/form/flask/level2-selection/v3) | [v4·B](http://localhost:3000/form/flask/level2-selection/v4) | [v5·A](http://localhost:3000/form/flask/level2-selection/v5) | [v6·B](http://localhost:3000/form/flask/level2-selection/v6) | [v7·A](http://localhost:3000/form/flask/level2-selection/v7) | [v8·B](http://localhost:3000/form/flask/level2-selection/v8) | [v9·A](http://localhost:3000/form/flask/level2-selection/v9) | [v10·B](http://localhost:3000/form/flask/level2-selection/v10) |
| **level3-pickers** | L3 | [v1·A](http://localhost:3000/form/flask/level3-pickers/v1) | [v2·B](http://localhost:3000/form/flask/level3-pickers/v2) | [v3·A](http://localhost:3000/form/flask/level3-pickers/v3) | [v4·B](http://localhost:3000/form/flask/level3-pickers/v4) | [v5·A](http://localhost:3000/form/flask/level3-pickers/v5) | [v6·B](http://localhost:3000/form/flask/level3-pickers/v6) | [v7·A](http://localhost:3000/form/flask/level3-pickers/v7) | [v8·B](http://localhost:3000/form/flask/level3-pickers/v8) | [v9·A](http://localhost:3000/form/flask/level3-pickers/v9) | [v10·B](http://localhost:3000/form/flask/level3-pickers/v10) |
| **level4-dynamic** | L4 | [v1·A](http://localhost:3000/form/flask/level4-dynamic/v1) | [v2·B](http://localhost:3000/form/flask/level4-dynamic/v2) | [v3·A](http://localhost:3000/form/flask/level4-dynamic/v3) | [v4·B](http://localhost:3000/form/flask/level4-dynamic/v4) | [v5·A](http://localhost:3000/form/flask/level4-dynamic/v5) | [v6·B](http://localhost:3000/form/flask/level4-dynamic/v6) | [v7·A](http://localhost:3000/form/flask/level4-dynamic/v7) | [v8·B](http://localhost:3000/form/flask/level4-dynamic/v8) | [v9·A](http://localhost:3000/form/flask/level4-dynamic/v9) | [v10·B](http://localhost:3000/form/flask/level4-dynamic/v10) |
| **level5-complex** | L5 | [v1·A](http://localhost:3000/form/flask/level5-complex/v1) | [v2·B](http://localhost:3000/form/flask/level5-complex/v2) | [v3·A](http://localhost:3000/form/flask/level5-complex/v3) | [v4·B](http://localhost:3000/form/flask/level5-complex/v4) | [v5·A](http://localhost:3000/form/flask/level5-complex/v5) | [v6·B](http://localhost:3000/form/flask/level5-complex/v6) | [v7·A](http://localhost:3000/form/flask/level5-complex/v7) | [v8·B](http://localhost:3000/form/flask/level5-complex/v8) | [v9·A](http://localhost:3000/form/flask/level5-complex/v9) | [v10·B](http://localhost:3000/form/flask/level5-complex/v10) |
| **level6-frameworks** | L6 | [v1·A](http://localhost:3000/form/flask/level6-frameworks/v1) | [v2·B](http://localhost:3000/form/flask/level6-frameworks/v2) | [v3·A](http://localhost:3000/form/flask/level6-frameworks/v3) | [v4·B](http://localhost:3000/form/flask/level6-frameworks/v4) | [v5·A](http://localhost:3000/form/flask/level6-frameworks/v5) | [v6·B](http://localhost:3000/form/flask/level6-frameworks/v6) | [v7·A](http://localhost:3000/form/flask/level6-frameworks/v7) | [v8·B](http://localhost:3000/form/flask/level6-frameworks/v8) | [v9·A](http://localhost:3000/form/flask/level6-frameworks/v9) | [v10·B](http://localhost:3000/form/flask/level6-frameworks/v10) |
| **issue-combined** | L7 | [v1·A](http://localhost:3000/form/flask/issue-combined/v1) | [v2·B](http://localhost:3000/form/flask/issue-combined/v2) | [v3·A](http://localhost:3000/form/flask/issue-combined/v3) | [v4·B](http://localhost:3000/form/flask/issue-combined/v4) | [v5·A](http://localhost:3000/form/flask/issue-combined/v5) | [v6·B](http://localhost:3000/form/flask/issue-combined/v6) | [v7·A](http://localhost:3000/form/flask/issue-combined/v7) | [v8·B](http://localhost:3000/form/flask/issue-combined/v8) | [v9·A](http://localhost:3000/form/flask/issue-combined/v9) | [v10·B](http://localhost:3000/form/flask/issue-combined/v10) |
| **issue-duplicate-labels** | L7 | [v1·A](http://localhost:3000/form/flask/issue-duplicate-labels/v1) | [v2·B](http://localhost:3000/form/flask/issue-duplicate-labels/v2) | [v3·A](http://localhost:3000/form/flask/issue-duplicate-labels/v3) | [v4·B](http://localhost:3000/form/flask/issue-duplicate-labels/v4) | [v5·A](http://localhost:3000/form/flask/issue-duplicate-labels/v5) | [v6·B](http://localhost:3000/form/flask/issue-duplicate-labels/v6) | [v7·A](http://localhost:3000/form/flask/issue-duplicate-labels/v7) | [v8·B](http://localhost:3000/form/flask/issue-duplicate-labels/v8) | [v9·A](http://localhost:3000/form/flask/issue-duplicate-labels/v9) | [v10·B](http://localhost:3000/form/flask/issue-duplicate-labels/v10) |
| **issue-dynamic-ids** | L7 | [v1·A](http://localhost:3000/form/flask/issue-dynamic-ids/v1) | [v2·B](http://localhost:3000/form/flask/issue-dynamic-ids/v2) | [v3·A](http://localhost:3000/form/flask/issue-dynamic-ids/v3) | [v4·B](http://localhost:3000/form/flask/issue-dynamic-ids/v4) | [v5·A](http://localhost:3000/form/flask/issue-dynamic-ids/v5) | [v6·B](http://localhost:3000/form/flask/issue-dynamic-ids/v6) | [v7·A](http://localhost:3000/form/flask/issue-dynamic-ids/v7) | [v8·B](http://localhost:3000/form/flask/issue-dynamic-ids/v8) | [v9·A](http://localhost:3000/form/flask/issue-dynamic-ids/v9) | [v10·B](http://localhost:3000/form/flask/issue-dynamic-ids/v10) |
| **issue-fake-buttons** | L7 | [v1·A](http://localhost:3000/form/flask/issue-fake-buttons/v1) | [v2·B](http://localhost:3000/form/flask/issue-fake-buttons/v2) | [v3·A](http://localhost:3000/form/flask/issue-fake-buttons/v3) | [v4·B](http://localhost:3000/form/flask/issue-fake-buttons/v4) | [v5·A](http://localhost:3000/form/flask/issue-fake-buttons/v5) | [v6·B](http://localhost:3000/form/flask/issue-fake-buttons/v6) | [v7·A](http://localhost:3000/form/flask/issue-fake-buttons/v7) | [v8·B](http://localhost:3000/form/flask/issue-fake-buttons/v8) | [v9·A](http://localhost:3000/form/flask/issue-fake-buttons/v9) | [v10·B](http://localhost:3000/form/flask/issue-fake-buttons/v10) |
| **issue-hidden-fields** | L7 | [v1·A](http://localhost:3000/form/flask/issue-hidden-fields/v1) | [v2·B](http://localhost:3000/form/flask/issue-hidden-fields/v2) | [v3·A](http://localhost:3000/form/flask/issue-hidden-fields/v3) | [v4·B](http://localhost:3000/form/flask/issue-hidden-fields/v4) | [v5·A](http://localhost:3000/form/flask/issue-hidden-fields/v5) | [v6·B](http://localhost:3000/form/flask/issue-hidden-fields/v6) | [v7·A](http://localhost:3000/form/flask/issue-hidden-fields/v7) | [v8·B](http://localhost:3000/form/flask/issue-hidden-fields/v8) | [v9·A](http://localhost:3000/form/flask/issue-hidden-fields/v9) | [v10·B](http://localhost:3000/form/flask/issue-hidden-fields/v10) |
| **issue-network-delay** | L7 | [v1·A](http://localhost:3000/form/flask/issue-network-delay/v1) | [v2·B](http://localhost:3000/form/flask/issue-network-delay/v2) | [v3·A](http://localhost:3000/form/flask/issue-network-delay/v3) | [v4·B](http://localhost:3000/form/flask/issue-network-delay/v4) | [v5·A](http://localhost:3000/form/flask/issue-network-delay/v5) | [v6·B](http://localhost:3000/form/flask/issue-network-delay/v6) | [v7·A](http://localhost:3000/form/flask/issue-network-delay/v7) | [v8·B](http://localhost:3000/form/flask/issue-network-delay/v8) | [v9·A](http://localhost:3000/form/flask/issue-network-delay/v9) | [v10·B](http://localhost:3000/form/flask/issue-network-delay/v10) |
| **issue-shadow-dom** | L7 | [v1·A](http://localhost:3000/form/flask/issue-shadow-dom/v1) | [v2·B](http://localhost:3000/form/flask/issue-shadow-dom/v2) | [v3·A](http://localhost:3000/form/flask/issue-shadow-dom/v3) | [v4·B](http://localhost:3000/form/flask/issue-shadow-dom/v4) | [v5·A](http://localhost:3000/form/flask/issue-shadow-dom/v5) | [v6·B](http://localhost:3000/form/flask/issue-shadow-dom/v6) | [v7·A](http://localhost:3000/form/flask/issue-shadow-dom/v7) | [v8·B](http://localhost:3000/form/flask/issue-shadow-dom/v8) | [v9·A](http://localhost:3000/form/flask/issue-shadow-dom/v9) | [v10·B](http://localhost:3000/form/flask/issue-shadow-dom/v10) |
| **level7-adversarial** | L7 | [v1·A](http://localhost:3000/form/flask/level7-adversarial/v1) | [v2·B](http://localhost:3000/form/flask/level7-adversarial/v2) | [v3·A](http://localhost:3000/form/flask/level7-adversarial/v3) | [v4·B](http://localhost:3000/form/flask/level7-adversarial/v4) | [v5·A](http://localhost:3000/form/flask/level7-adversarial/v5) | [v6·B](http://localhost:3000/form/flask/level7-adversarial/v6) | [v7·A](http://localhost:3000/form/flask/level7-adversarial/v7) | [v8·B](http://localhost:3000/form/flask/level7-adversarial/v8) | [v9·A](http://localhost:3000/form/flask/level7-adversarial/v9) | [v10·B](http://localhost:3000/form/flask/level7-adversarial/v10) |

---

## Flat URL List (All Central URLs)

All `900` central URLs in order (stack → scenario → variant):

- `http://localhost:3000/form/html/baseline/v1` · Profile A
- `http://localhost:3000/form/html/baseline/v2` · Profile B
- `http://localhost:3000/form/html/baseline/v3` · Profile A
- `http://localhost:3000/form/html/baseline/v4` · Profile B
- `http://localhost:3000/form/html/baseline/v5` · Profile A
- `http://localhost:3000/form/html/baseline/v6` · Profile B
- `http://localhost:3000/form/html/baseline/v7` · Profile A
- `http://localhost:3000/form/html/baseline/v8` · Profile B
- `http://localhost:3000/form/html/baseline/v9` · Profile A
- `http://localhost:3000/form/html/baseline/v10` · Profile B
- `http://localhost:3000/form/html/level1-basic/v1` · Profile A
- `http://localhost:3000/form/html/level1-basic/v2` · Profile B
- `http://localhost:3000/form/html/level1-basic/v3` · Profile A
- `http://localhost:3000/form/html/level1-basic/v4` · Profile B
- `http://localhost:3000/form/html/level1-basic/v5` · Profile A
- `http://localhost:3000/form/html/level1-basic/v6` · Profile B
- `http://localhost:3000/form/html/level1-basic/v7` · Profile A
- `http://localhost:3000/form/html/level1-basic/v8` · Profile B
- `http://localhost:3000/form/html/level1-basic/v9` · Profile A
- `http://localhost:3000/form/html/level1-basic/v10` · Profile B
- `http://localhost:3000/form/html/level2-selection/v1` · Profile A
- `http://localhost:3000/form/html/level2-selection/v2` · Profile B
- `http://localhost:3000/form/html/level2-selection/v3` · Profile A
- `http://localhost:3000/form/html/level2-selection/v4` · Profile B
- `http://localhost:3000/form/html/level2-selection/v5` · Profile A
- `http://localhost:3000/form/html/level2-selection/v6` · Profile B
- `http://localhost:3000/form/html/level2-selection/v7` · Profile A
- `http://localhost:3000/form/html/level2-selection/v8` · Profile B
- `http://localhost:3000/form/html/level2-selection/v9` · Profile A
- `http://localhost:3000/form/html/level2-selection/v10` · Profile B
- `http://localhost:3000/form/html/level3-pickers/v1` · Profile A
- `http://localhost:3000/form/html/level3-pickers/v2` · Profile B
- `http://localhost:3000/form/html/level3-pickers/v3` · Profile A
- `http://localhost:3000/form/html/level3-pickers/v4` · Profile B
- `http://localhost:3000/form/html/level3-pickers/v5` · Profile A
- `http://localhost:3000/form/html/level3-pickers/v6` · Profile B
- `http://localhost:3000/form/html/level3-pickers/v7` · Profile A
- `http://localhost:3000/form/html/level3-pickers/v8` · Profile B
- `http://localhost:3000/form/html/level3-pickers/v9` · Profile A
- `http://localhost:3000/form/html/level3-pickers/v10` · Profile B
- `http://localhost:3000/form/html/level4-dynamic/v1` · Profile A
- `http://localhost:3000/form/html/level4-dynamic/v2` · Profile B
- `http://localhost:3000/form/html/level4-dynamic/v3` · Profile A
- `http://localhost:3000/form/html/level4-dynamic/v4` · Profile B
- `http://localhost:3000/form/html/level4-dynamic/v5` · Profile A
- `http://localhost:3000/form/html/level4-dynamic/v6` · Profile B
- `http://localhost:3000/form/html/level4-dynamic/v7` · Profile A
- `http://localhost:3000/form/html/level4-dynamic/v8` · Profile B
- `http://localhost:3000/form/html/level4-dynamic/v9` · Profile A
- `http://localhost:3000/form/html/level4-dynamic/v10` · Profile B
- `http://localhost:3000/form/html/level5-complex/v1` · Profile A
- `http://localhost:3000/form/html/level5-complex/v2` · Profile B
- `http://localhost:3000/form/html/level5-complex/v3` · Profile A
- `http://localhost:3000/form/html/level5-complex/v4` · Profile B
- `http://localhost:3000/form/html/level5-complex/v5` · Profile A
- `http://localhost:3000/form/html/level5-complex/v6` · Profile B
- `http://localhost:3000/form/html/level5-complex/v7` · Profile A
- `http://localhost:3000/form/html/level5-complex/v8` · Profile B
- `http://localhost:3000/form/html/level5-complex/v9` · Profile A
- `http://localhost:3000/form/html/level5-complex/v10` · Profile B
- `http://localhost:3000/form/html/level6-frameworks/v1` · Profile A
- `http://localhost:3000/form/html/level6-frameworks/v2` · Profile B
- `http://localhost:3000/form/html/level6-frameworks/v3` · Profile A
- `http://localhost:3000/form/html/level6-frameworks/v4` · Profile B
- `http://localhost:3000/form/html/level6-frameworks/v5` · Profile A
- `http://localhost:3000/form/html/level6-frameworks/v6` · Profile B
- `http://localhost:3000/form/html/level6-frameworks/v7` · Profile A
- `http://localhost:3000/form/html/level6-frameworks/v8` · Profile B
- `http://localhost:3000/form/html/level6-frameworks/v9` · Profile A
- `http://localhost:3000/form/html/level6-frameworks/v10` · Profile B
- `http://localhost:3000/form/html/issue-combined/v1` · Profile A
- `http://localhost:3000/form/html/issue-combined/v2` · Profile B
- `http://localhost:3000/form/html/issue-combined/v3` · Profile A
- `http://localhost:3000/form/html/issue-combined/v4` · Profile B
- `http://localhost:3000/form/html/issue-combined/v5` · Profile A
- `http://localhost:3000/form/html/issue-combined/v6` · Profile B
- `http://localhost:3000/form/html/issue-combined/v7` · Profile A
- `http://localhost:3000/form/html/issue-combined/v8` · Profile B
- `http://localhost:3000/form/html/issue-combined/v9` · Profile A
- `http://localhost:3000/form/html/issue-combined/v10` · Profile B
- `http://localhost:3000/form/html/issue-duplicate-labels/v1` · Profile A
- `http://localhost:3000/form/html/issue-duplicate-labels/v2` · Profile B
- `http://localhost:3000/form/html/issue-duplicate-labels/v3` · Profile A
- `http://localhost:3000/form/html/issue-duplicate-labels/v4` · Profile B
- `http://localhost:3000/form/html/issue-duplicate-labels/v5` · Profile A
- `http://localhost:3000/form/html/issue-duplicate-labels/v6` · Profile B
- `http://localhost:3000/form/html/issue-duplicate-labels/v7` · Profile A
- `http://localhost:3000/form/html/issue-duplicate-labels/v8` · Profile B
- `http://localhost:3000/form/html/issue-duplicate-labels/v9` · Profile A
- `http://localhost:3000/form/html/issue-duplicate-labels/v10` · Profile B
- `http://localhost:3000/form/html/issue-dynamic-ids/v1` · Profile A
- `http://localhost:3000/form/html/issue-dynamic-ids/v2` · Profile B
- `http://localhost:3000/form/html/issue-dynamic-ids/v3` · Profile A
- `http://localhost:3000/form/html/issue-dynamic-ids/v4` · Profile B
- `http://localhost:3000/form/html/issue-dynamic-ids/v5` · Profile A
- `http://localhost:3000/form/html/issue-dynamic-ids/v6` · Profile B
- `http://localhost:3000/form/html/issue-dynamic-ids/v7` · Profile A
- `http://localhost:3000/form/html/issue-dynamic-ids/v8` · Profile B
- `http://localhost:3000/form/html/issue-dynamic-ids/v9` · Profile A
- `http://localhost:3000/form/html/issue-dynamic-ids/v10` · Profile B
- `http://localhost:3000/form/html/issue-fake-buttons/v1` · Profile A
- `http://localhost:3000/form/html/issue-fake-buttons/v2` · Profile B
- `http://localhost:3000/form/html/issue-fake-buttons/v3` · Profile A
- `http://localhost:3000/form/html/issue-fake-buttons/v4` · Profile B
- `http://localhost:3000/form/html/issue-fake-buttons/v5` · Profile A
- `http://localhost:3000/form/html/issue-fake-buttons/v6` · Profile B
- `http://localhost:3000/form/html/issue-fake-buttons/v7` · Profile A
- `http://localhost:3000/form/html/issue-fake-buttons/v8` · Profile B
- `http://localhost:3000/form/html/issue-fake-buttons/v9` · Profile A
- `http://localhost:3000/form/html/issue-fake-buttons/v10` · Profile B
- `http://localhost:3000/form/html/issue-hidden-fields/v1` · Profile A
- `http://localhost:3000/form/html/issue-hidden-fields/v2` · Profile B
- `http://localhost:3000/form/html/issue-hidden-fields/v3` · Profile A
- `http://localhost:3000/form/html/issue-hidden-fields/v4` · Profile B
- `http://localhost:3000/form/html/issue-hidden-fields/v5` · Profile A
- `http://localhost:3000/form/html/issue-hidden-fields/v6` · Profile B
- `http://localhost:3000/form/html/issue-hidden-fields/v7` · Profile A
- `http://localhost:3000/form/html/issue-hidden-fields/v8` · Profile B
- `http://localhost:3000/form/html/issue-hidden-fields/v9` · Profile A
- `http://localhost:3000/form/html/issue-hidden-fields/v10` · Profile B
- `http://localhost:3000/form/html/issue-network-delay/v1` · Profile A
- `http://localhost:3000/form/html/issue-network-delay/v2` · Profile B
- `http://localhost:3000/form/html/issue-network-delay/v3` · Profile A
- `http://localhost:3000/form/html/issue-network-delay/v4` · Profile B
- `http://localhost:3000/form/html/issue-network-delay/v5` · Profile A
- `http://localhost:3000/form/html/issue-network-delay/v6` · Profile B
- `http://localhost:3000/form/html/issue-network-delay/v7` · Profile A
- `http://localhost:3000/form/html/issue-network-delay/v8` · Profile B
- `http://localhost:3000/form/html/issue-network-delay/v9` · Profile A
- `http://localhost:3000/form/html/issue-network-delay/v10` · Profile B
- `http://localhost:3000/form/html/issue-shadow-dom/v1` · Profile A
- `http://localhost:3000/form/html/issue-shadow-dom/v2` · Profile B
- `http://localhost:3000/form/html/issue-shadow-dom/v3` · Profile A
- `http://localhost:3000/form/html/issue-shadow-dom/v4` · Profile B
- `http://localhost:3000/form/html/issue-shadow-dom/v5` · Profile A
- `http://localhost:3000/form/html/issue-shadow-dom/v6` · Profile B
- `http://localhost:3000/form/html/issue-shadow-dom/v7` · Profile A
- `http://localhost:3000/form/html/issue-shadow-dom/v8` · Profile B
- `http://localhost:3000/form/html/issue-shadow-dom/v9` · Profile A
- `http://localhost:3000/form/html/issue-shadow-dom/v10` · Profile B
- `http://localhost:3000/form/html/level7-adversarial/v1` · Profile A
- `http://localhost:3000/form/html/level7-adversarial/v2` · Profile B
- `http://localhost:3000/form/html/level7-adversarial/v3` · Profile A
- `http://localhost:3000/form/html/level7-adversarial/v4` · Profile B
- `http://localhost:3000/form/html/level7-adversarial/v5` · Profile A
- `http://localhost:3000/form/html/level7-adversarial/v6` · Profile B
- `http://localhost:3000/form/html/level7-adversarial/v7` · Profile A
- `http://localhost:3000/form/html/level7-adversarial/v8` · Profile B
- `http://localhost:3000/form/html/level7-adversarial/v9` · Profile A
- `http://localhost:3000/form/html/level7-adversarial/v10` · Profile B
- `http://localhost:3000/form/react/baseline/v1` · Profile A
- `http://localhost:3000/form/react/baseline/v2` · Profile B
- `http://localhost:3000/form/react/baseline/v3` · Profile A
- `http://localhost:3000/form/react/baseline/v4` · Profile B
- `http://localhost:3000/form/react/baseline/v5` · Profile A
- `http://localhost:3000/form/react/baseline/v6` · Profile B
- `http://localhost:3000/form/react/baseline/v7` · Profile A
- `http://localhost:3000/form/react/baseline/v8` · Profile B
- `http://localhost:3000/form/react/baseline/v9` · Profile A
- `http://localhost:3000/form/react/baseline/v10` · Profile B
- `http://localhost:3000/form/react/level1-basic/v1` · Profile A
- `http://localhost:3000/form/react/level1-basic/v2` · Profile B
- `http://localhost:3000/form/react/level1-basic/v3` · Profile A
- `http://localhost:3000/form/react/level1-basic/v4` · Profile B
- `http://localhost:3000/form/react/level1-basic/v5` · Profile A
- `http://localhost:3000/form/react/level1-basic/v6` · Profile B
- `http://localhost:3000/form/react/level1-basic/v7` · Profile A
- `http://localhost:3000/form/react/level1-basic/v8` · Profile B
- `http://localhost:3000/form/react/level1-basic/v9` · Profile A
- `http://localhost:3000/form/react/level1-basic/v10` · Profile B
- `http://localhost:3000/form/react/level2-selection/v1` · Profile A
- `http://localhost:3000/form/react/level2-selection/v2` · Profile B
- `http://localhost:3000/form/react/level2-selection/v3` · Profile A
- `http://localhost:3000/form/react/level2-selection/v4` · Profile B
- `http://localhost:3000/form/react/level2-selection/v5` · Profile A
- `http://localhost:3000/form/react/level2-selection/v6` · Profile B
- `http://localhost:3000/form/react/level2-selection/v7` · Profile A
- `http://localhost:3000/form/react/level2-selection/v8` · Profile B
- `http://localhost:3000/form/react/level2-selection/v9` · Profile A
- `http://localhost:3000/form/react/level2-selection/v10` · Profile B
- `http://localhost:3000/form/react/level3-pickers/v1` · Profile A
- `http://localhost:3000/form/react/level3-pickers/v2` · Profile B
- `http://localhost:3000/form/react/level3-pickers/v3` · Profile A
- `http://localhost:3000/form/react/level3-pickers/v4` · Profile B
- `http://localhost:3000/form/react/level3-pickers/v5` · Profile A
- `http://localhost:3000/form/react/level3-pickers/v6` · Profile B
- `http://localhost:3000/form/react/level3-pickers/v7` · Profile A
- `http://localhost:3000/form/react/level3-pickers/v8` · Profile B
- `http://localhost:3000/form/react/level3-pickers/v9` · Profile A
- `http://localhost:3000/form/react/level3-pickers/v10` · Profile B
- `http://localhost:3000/form/react/level4-dynamic/v1` · Profile A
- `http://localhost:3000/form/react/level4-dynamic/v2` · Profile B
- `http://localhost:3000/form/react/level4-dynamic/v3` · Profile A
- `http://localhost:3000/form/react/level4-dynamic/v4` · Profile B
- `http://localhost:3000/form/react/level4-dynamic/v5` · Profile A
- `http://localhost:3000/form/react/level4-dynamic/v6` · Profile B
- `http://localhost:3000/form/react/level4-dynamic/v7` · Profile A
- `http://localhost:3000/form/react/level4-dynamic/v8` · Profile B
- `http://localhost:3000/form/react/level4-dynamic/v9` · Profile A
- `http://localhost:3000/form/react/level4-dynamic/v10` · Profile B
- `http://localhost:3000/form/react/level5-complex/v1` · Profile A
- `http://localhost:3000/form/react/level5-complex/v2` · Profile B
- `http://localhost:3000/form/react/level5-complex/v3` · Profile A
- `http://localhost:3000/form/react/level5-complex/v4` · Profile B
- `http://localhost:3000/form/react/level5-complex/v5` · Profile A
- `http://localhost:3000/form/react/level5-complex/v6` · Profile B
- `http://localhost:3000/form/react/level5-complex/v7` · Profile A
- `http://localhost:3000/form/react/level5-complex/v8` · Profile B
- `http://localhost:3000/form/react/level5-complex/v9` · Profile A
- `http://localhost:3000/form/react/level5-complex/v10` · Profile B
- `http://localhost:3000/form/react/level6-frameworks/v1` · Profile A
- `http://localhost:3000/form/react/level6-frameworks/v2` · Profile B
- `http://localhost:3000/form/react/level6-frameworks/v3` · Profile A
- `http://localhost:3000/form/react/level6-frameworks/v4` · Profile B
- `http://localhost:3000/form/react/level6-frameworks/v5` · Profile A
- `http://localhost:3000/form/react/level6-frameworks/v6` · Profile B
- `http://localhost:3000/form/react/level6-frameworks/v7` · Profile A
- `http://localhost:3000/form/react/level6-frameworks/v8` · Profile B
- `http://localhost:3000/form/react/level6-frameworks/v9` · Profile A
- `http://localhost:3000/form/react/level6-frameworks/v10` · Profile B
- `http://localhost:3000/form/react/issue-combined/v1` · Profile A
- `http://localhost:3000/form/react/issue-combined/v2` · Profile B
- `http://localhost:3000/form/react/issue-combined/v3` · Profile A
- `http://localhost:3000/form/react/issue-combined/v4` · Profile B
- `http://localhost:3000/form/react/issue-combined/v5` · Profile A
- `http://localhost:3000/form/react/issue-combined/v6` · Profile B
- `http://localhost:3000/form/react/issue-combined/v7` · Profile A
- `http://localhost:3000/form/react/issue-combined/v8` · Profile B
- `http://localhost:3000/form/react/issue-combined/v9` · Profile A
- `http://localhost:3000/form/react/issue-combined/v10` · Profile B
- `http://localhost:3000/form/react/issue-duplicate-labels/v1` · Profile A
- `http://localhost:3000/form/react/issue-duplicate-labels/v2` · Profile B
- `http://localhost:3000/form/react/issue-duplicate-labels/v3` · Profile A
- `http://localhost:3000/form/react/issue-duplicate-labels/v4` · Profile B
- `http://localhost:3000/form/react/issue-duplicate-labels/v5` · Profile A
- `http://localhost:3000/form/react/issue-duplicate-labels/v6` · Profile B
- `http://localhost:3000/form/react/issue-duplicate-labels/v7` · Profile A
- `http://localhost:3000/form/react/issue-duplicate-labels/v8` · Profile B
- `http://localhost:3000/form/react/issue-duplicate-labels/v9` · Profile A
- `http://localhost:3000/form/react/issue-duplicate-labels/v10` · Profile B
- `http://localhost:3000/form/react/issue-dynamic-ids/v1` · Profile A
- `http://localhost:3000/form/react/issue-dynamic-ids/v2` · Profile B
- `http://localhost:3000/form/react/issue-dynamic-ids/v3` · Profile A
- `http://localhost:3000/form/react/issue-dynamic-ids/v4` · Profile B
- `http://localhost:3000/form/react/issue-dynamic-ids/v5` · Profile A
- `http://localhost:3000/form/react/issue-dynamic-ids/v6` · Profile B
- `http://localhost:3000/form/react/issue-dynamic-ids/v7` · Profile A
- `http://localhost:3000/form/react/issue-dynamic-ids/v8` · Profile B
- `http://localhost:3000/form/react/issue-dynamic-ids/v9` · Profile A
- `http://localhost:3000/form/react/issue-dynamic-ids/v10` · Profile B
- `http://localhost:3000/form/react/issue-fake-buttons/v1` · Profile A
- `http://localhost:3000/form/react/issue-fake-buttons/v2` · Profile B
- `http://localhost:3000/form/react/issue-fake-buttons/v3` · Profile A
- `http://localhost:3000/form/react/issue-fake-buttons/v4` · Profile B
- `http://localhost:3000/form/react/issue-fake-buttons/v5` · Profile A
- `http://localhost:3000/form/react/issue-fake-buttons/v6` · Profile B
- `http://localhost:3000/form/react/issue-fake-buttons/v7` · Profile A
- `http://localhost:3000/form/react/issue-fake-buttons/v8` · Profile B
- `http://localhost:3000/form/react/issue-fake-buttons/v9` · Profile A
- `http://localhost:3000/form/react/issue-fake-buttons/v10` · Profile B
- `http://localhost:3000/form/react/issue-hidden-fields/v1` · Profile A
- `http://localhost:3000/form/react/issue-hidden-fields/v2` · Profile B
- `http://localhost:3000/form/react/issue-hidden-fields/v3` · Profile A
- `http://localhost:3000/form/react/issue-hidden-fields/v4` · Profile B
- `http://localhost:3000/form/react/issue-hidden-fields/v5` · Profile A
- `http://localhost:3000/form/react/issue-hidden-fields/v6` · Profile B
- `http://localhost:3000/form/react/issue-hidden-fields/v7` · Profile A
- `http://localhost:3000/form/react/issue-hidden-fields/v8` · Profile B
- `http://localhost:3000/form/react/issue-hidden-fields/v9` · Profile A
- `http://localhost:3000/form/react/issue-hidden-fields/v10` · Profile B
- `http://localhost:3000/form/react/issue-network-delay/v1` · Profile A
- `http://localhost:3000/form/react/issue-network-delay/v2` · Profile B
- `http://localhost:3000/form/react/issue-network-delay/v3` · Profile A
- `http://localhost:3000/form/react/issue-network-delay/v4` · Profile B
- `http://localhost:3000/form/react/issue-network-delay/v5` · Profile A
- `http://localhost:3000/form/react/issue-network-delay/v6` · Profile B
- `http://localhost:3000/form/react/issue-network-delay/v7` · Profile A
- `http://localhost:3000/form/react/issue-network-delay/v8` · Profile B
- `http://localhost:3000/form/react/issue-network-delay/v9` · Profile A
- `http://localhost:3000/form/react/issue-network-delay/v10` · Profile B
- `http://localhost:3000/form/react/issue-shadow-dom/v1` · Profile A
- `http://localhost:3000/form/react/issue-shadow-dom/v2` · Profile B
- `http://localhost:3000/form/react/issue-shadow-dom/v3` · Profile A
- `http://localhost:3000/form/react/issue-shadow-dom/v4` · Profile B
- `http://localhost:3000/form/react/issue-shadow-dom/v5` · Profile A
- `http://localhost:3000/form/react/issue-shadow-dom/v6` · Profile B
- `http://localhost:3000/form/react/issue-shadow-dom/v7` · Profile A
- `http://localhost:3000/form/react/issue-shadow-dom/v8` · Profile B
- `http://localhost:3000/form/react/issue-shadow-dom/v9` · Profile A
- `http://localhost:3000/form/react/issue-shadow-dom/v10` · Profile B
- `http://localhost:3000/form/react/level7-adversarial/v1` · Profile A
- `http://localhost:3000/form/react/level7-adversarial/v2` · Profile B
- `http://localhost:3000/form/react/level7-adversarial/v3` · Profile A
- `http://localhost:3000/form/react/level7-adversarial/v4` · Profile B
- `http://localhost:3000/form/react/level7-adversarial/v5` · Profile A
- `http://localhost:3000/form/react/level7-adversarial/v6` · Profile B
- `http://localhost:3000/form/react/level7-adversarial/v7` · Profile A
- `http://localhost:3000/form/react/level7-adversarial/v8` · Profile B
- `http://localhost:3000/form/react/level7-adversarial/v9` · Profile A
- `http://localhost:3000/form/react/level7-adversarial/v10` · Profile B
- `http://localhost:3000/form/angular/baseline/v1` · Profile A
- `http://localhost:3000/form/angular/baseline/v2` · Profile B
- `http://localhost:3000/form/angular/baseline/v3` · Profile A
- `http://localhost:3000/form/angular/baseline/v4` · Profile B
- `http://localhost:3000/form/angular/baseline/v5` · Profile A
- `http://localhost:3000/form/angular/baseline/v6` · Profile B
- `http://localhost:3000/form/angular/baseline/v7` · Profile A
- `http://localhost:3000/form/angular/baseline/v8` · Profile B
- `http://localhost:3000/form/angular/baseline/v9` · Profile A
- `http://localhost:3000/form/angular/baseline/v10` · Profile B
- `http://localhost:3000/form/angular/level1-basic/v1` · Profile A
- `http://localhost:3000/form/angular/level1-basic/v2` · Profile B
- `http://localhost:3000/form/angular/level1-basic/v3` · Profile A
- `http://localhost:3000/form/angular/level1-basic/v4` · Profile B
- `http://localhost:3000/form/angular/level1-basic/v5` · Profile A
- `http://localhost:3000/form/angular/level1-basic/v6` · Profile B
- `http://localhost:3000/form/angular/level1-basic/v7` · Profile A
- `http://localhost:3000/form/angular/level1-basic/v8` · Profile B
- `http://localhost:3000/form/angular/level1-basic/v9` · Profile A
- `http://localhost:3000/form/angular/level1-basic/v10` · Profile B
- `http://localhost:3000/form/angular/level2-selection/v1` · Profile A
- `http://localhost:3000/form/angular/level2-selection/v2` · Profile B
- `http://localhost:3000/form/angular/level2-selection/v3` · Profile A
- `http://localhost:3000/form/angular/level2-selection/v4` · Profile B
- `http://localhost:3000/form/angular/level2-selection/v5` · Profile A
- `http://localhost:3000/form/angular/level2-selection/v6` · Profile B
- `http://localhost:3000/form/angular/level2-selection/v7` · Profile A
- `http://localhost:3000/form/angular/level2-selection/v8` · Profile B
- `http://localhost:3000/form/angular/level2-selection/v9` · Profile A
- `http://localhost:3000/form/angular/level2-selection/v10` · Profile B
- `http://localhost:3000/form/angular/level3-pickers/v1` · Profile A
- `http://localhost:3000/form/angular/level3-pickers/v2` · Profile B
- `http://localhost:3000/form/angular/level3-pickers/v3` · Profile A
- `http://localhost:3000/form/angular/level3-pickers/v4` · Profile B
- `http://localhost:3000/form/angular/level3-pickers/v5` · Profile A
- `http://localhost:3000/form/angular/level3-pickers/v6` · Profile B
- `http://localhost:3000/form/angular/level3-pickers/v7` · Profile A
- `http://localhost:3000/form/angular/level3-pickers/v8` · Profile B
- `http://localhost:3000/form/angular/level3-pickers/v9` · Profile A
- `http://localhost:3000/form/angular/level3-pickers/v10` · Profile B
- `http://localhost:3000/form/angular/level4-dynamic/v1` · Profile A
- `http://localhost:3000/form/angular/level4-dynamic/v2` · Profile B
- `http://localhost:3000/form/angular/level4-dynamic/v3` · Profile A
- `http://localhost:3000/form/angular/level4-dynamic/v4` · Profile B
- `http://localhost:3000/form/angular/level4-dynamic/v5` · Profile A
- `http://localhost:3000/form/angular/level4-dynamic/v6` · Profile B
- `http://localhost:3000/form/angular/level4-dynamic/v7` · Profile A
- `http://localhost:3000/form/angular/level4-dynamic/v8` · Profile B
- `http://localhost:3000/form/angular/level4-dynamic/v9` · Profile A
- `http://localhost:3000/form/angular/level4-dynamic/v10` · Profile B
- `http://localhost:3000/form/angular/level5-complex/v1` · Profile A
- `http://localhost:3000/form/angular/level5-complex/v2` · Profile B
- `http://localhost:3000/form/angular/level5-complex/v3` · Profile A
- `http://localhost:3000/form/angular/level5-complex/v4` · Profile B
- `http://localhost:3000/form/angular/level5-complex/v5` · Profile A
- `http://localhost:3000/form/angular/level5-complex/v6` · Profile B
- `http://localhost:3000/form/angular/level5-complex/v7` · Profile A
- `http://localhost:3000/form/angular/level5-complex/v8` · Profile B
- `http://localhost:3000/form/angular/level5-complex/v9` · Profile A
- `http://localhost:3000/form/angular/level5-complex/v10` · Profile B
- `http://localhost:3000/form/angular/level6-frameworks/v1` · Profile A
- `http://localhost:3000/form/angular/level6-frameworks/v2` · Profile B
- `http://localhost:3000/form/angular/level6-frameworks/v3` · Profile A
- `http://localhost:3000/form/angular/level6-frameworks/v4` · Profile B
- `http://localhost:3000/form/angular/level6-frameworks/v5` · Profile A
- `http://localhost:3000/form/angular/level6-frameworks/v6` · Profile B
- `http://localhost:3000/form/angular/level6-frameworks/v7` · Profile A
- `http://localhost:3000/form/angular/level6-frameworks/v8` · Profile B
- `http://localhost:3000/form/angular/level6-frameworks/v9` · Profile A
- `http://localhost:3000/form/angular/level6-frameworks/v10` · Profile B
- `http://localhost:3000/form/angular/issue-combined/v1` · Profile A
- `http://localhost:3000/form/angular/issue-combined/v2` · Profile B
- `http://localhost:3000/form/angular/issue-combined/v3` · Profile A
- `http://localhost:3000/form/angular/issue-combined/v4` · Profile B
- `http://localhost:3000/form/angular/issue-combined/v5` · Profile A
- `http://localhost:3000/form/angular/issue-combined/v6` · Profile B
- `http://localhost:3000/form/angular/issue-combined/v7` · Profile A
- `http://localhost:3000/form/angular/issue-combined/v8` · Profile B
- `http://localhost:3000/form/angular/issue-combined/v9` · Profile A
- `http://localhost:3000/form/angular/issue-combined/v10` · Profile B
- `http://localhost:3000/form/angular/issue-duplicate-labels/v1` · Profile A
- `http://localhost:3000/form/angular/issue-duplicate-labels/v2` · Profile B
- `http://localhost:3000/form/angular/issue-duplicate-labels/v3` · Profile A
- `http://localhost:3000/form/angular/issue-duplicate-labels/v4` · Profile B
- `http://localhost:3000/form/angular/issue-duplicate-labels/v5` · Profile A
- `http://localhost:3000/form/angular/issue-duplicate-labels/v6` · Profile B
- `http://localhost:3000/form/angular/issue-duplicate-labels/v7` · Profile A
- `http://localhost:3000/form/angular/issue-duplicate-labels/v8` · Profile B
- `http://localhost:3000/form/angular/issue-duplicate-labels/v9` · Profile A
- `http://localhost:3000/form/angular/issue-duplicate-labels/v10` · Profile B
- `http://localhost:3000/form/angular/issue-dynamic-ids/v1` · Profile A
- `http://localhost:3000/form/angular/issue-dynamic-ids/v2` · Profile B
- `http://localhost:3000/form/angular/issue-dynamic-ids/v3` · Profile A
- `http://localhost:3000/form/angular/issue-dynamic-ids/v4` · Profile B
- `http://localhost:3000/form/angular/issue-dynamic-ids/v5` · Profile A
- `http://localhost:3000/form/angular/issue-dynamic-ids/v6` · Profile B
- `http://localhost:3000/form/angular/issue-dynamic-ids/v7` · Profile A
- `http://localhost:3000/form/angular/issue-dynamic-ids/v8` · Profile B
- `http://localhost:3000/form/angular/issue-dynamic-ids/v9` · Profile A
- `http://localhost:3000/form/angular/issue-dynamic-ids/v10` · Profile B
- `http://localhost:3000/form/angular/issue-fake-buttons/v1` · Profile A
- `http://localhost:3000/form/angular/issue-fake-buttons/v2` · Profile B
- `http://localhost:3000/form/angular/issue-fake-buttons/v3` · Profile A
- `http://localhost:3000/form/angular/issue-fake-buttons/v4` · Profile B
- `http://localhost:3000/form/angular/issue-fake-buttons/v5` · Profile A
- `http://localhost:3000/form/angular/issue-fake-buttons/v6` · Profile B
- `http://localhost:3000/form/angular/issue-fake-buttons/v7` · Profile A
- `http://localhost:3000/form/angular/issue-fake-buttons/v8` · Profile B
- `http://localhost:3000/form/angular/issue-fake-buttons/v9` · Profile A
- `http://localhost:3000/form/angular/issue-fake-buttons/v10` · Profile B
- `http://localhost:3000/form/angular/issue-hidden-fields/v1` · Profile A
- `http://localhost:3000/form/angular/issue-hidden-fields/v2` · Profile B
- `http://localhost:3000/form/angular/issue-hidden-fields/v3` · Profile A
- `http://localhost:3000/form/angular/issue-hidden-fields/v4` · Profile B
- `http://localhost:3000/form/angular/issue-hidden-fields/v5` · Profile A
- `http://localhost:3000/form/angular/issue-hidden-fields/v6` · Profile B
- `http://localhost:3000/form/angular/issue-hidden-fields/v7` · Profile A
- `http://localhost:3000/form/angular/issue-hidden-fields/v8` · Profile B
- `http://localhost:3000/form/angular/issue-hidden-fields/v9` · Profile A
- `http://localhost:3000/form/angular/issue-hidden-fields/v10` · Profile B
- `http://localhost:3000/form/angular/issue-network-delay/v1` · Profile A
- `http://localhost:3000/form/angular/issue-network-delay/v2` · Profile B
- `http://localhost:3000/form/angular/issue-network-delay/v3` · Profile A
- `http://localhost:3000/form/angular/issue-network-delay/v4` · Profile B
- `http://localhost:3000/form/angular/issue-network-delay/v5` · Profile A
- `http://localhost:3000/form/angular/issue-network-delay/v6` · Profile B
- `http://localhost:3000/form/angular/issue-network-delay/v7` · Profile A
- `http://localhost:3000/form/angular/issue-network-delay/v8` · Profile B
- `http://localhost:3000/form/angular/issue-network-delay/v9` · Profile A
- `http://localhost:3000/form/angular/issue-network-delay/v10` · Profile B
- `http://localhost:3000/form/angular/issue-shadow-dom/v1` · Profile A
- `http://localhost:3000/form/angular/issue-shadow-dom/v2` · Profile B
- `http://localhost:3000/form/angular/issue-shadow-dom/v3` · Profile A
- `http://localhost:3000/form/angular/issue-shadow-dom/v4` · Profile B
- `http://localhost:3000/form/angular/issue-shadow-dom/v5` · Profile A
- `http://localhost:3000/form/angular/issue-shadow-dom/v6` · Profile B
- `http://localhost:3000/form/angular/issue-shadow-dom/v7` · Profile A
- `http://localhost:3000/form/angular/issue-shadow-dom/v8` · Profile B
- `http://localhost:3000/form/angular/issue-shadow-dom/v9` · Profile A
- `http://localhost:3000/form/angular/issue-shadow-dom/v10` · Profile B
- `http://localhost:3000/form/angular/level7-adversarial/v1` · Profile A
- `http://localhost:3000/form/angular/level7-adversarial/v2` · Profile B
- `http://localhost:3000/form/angular/level7-adversarial/v3` · Profile A
- `http://localhost:3000/form/angular/level7-adversarial/v4` · Profile B
- `http://localhost:3000/form/angular/level7-adversarial/v5` · Profile A
- `http://localhost:3000/form/angular/level7-adversarial/v6` · Profile B
- `http://localhost:3000/form/angular/level7-adversarial/v7` · Profile A
- `http://localhost:3000/form/angular/level7-adversarial/v8` · Profile B
- `http://localhost:3000/form/angular/level7-adversarial/v9` · Profile A
- `http://localhost:3000/form/angular/level7-adversarial/v10` · Profile B
- `http://localhost:3000/form/vue/baseline/v1` · Profile A
- `http://localhost:3000/form/vue/baseline/v2` · Profile B
- `http://localhost:3000/form/vue/baseline/v3` · Profile A
- `http://localhost:3000/form/vue/baseline/v4` · Profile B
- `http://localhost:3000/form/vue/baseline/v5` · Profile A
- `http://localhost:3000/form/vue/baseline/v6` · Profile B
- `http://localhost:3000/form/vue/baseline/v7` · Profile A
- `http://localhost:3000/form/vue/baseline/v8` · Profile B
- `http://localhost:3000/form/vue/baseline/v9` · Profile A
- `http://localhost:3000/form/vue/baseline/v10` · Profile B
- `http://localhost:3000/form/vue/level1-basic/v1` · Profile A
- `http://localhost:3000/form/vue/level1-basic/v2` · Profile B
- `http://localhost:3000/form/vue/level1-basic/v3` · Profile A
- `http://localhost:3000/form/vue/level1-basic/v4` · Profile B
- `http://localhost:3000/form/vue/level1-basic/v5` · Profile A
- `http://localhost:3000/form/vue/level1-basic/v6` · Profile B
- `http://localhost:3000/form/vue/level1-basic/v7` · Profile A
- `http://localhost:3000/form/vue/level1-basic/v8` · Profile B
- `http://localhost:3000/form/vue/level1-basic/v9` · Profile A
- `http://localhost:3000/form/vue/level1-basic/v10` · Profile B
- `http://localhost:3000/form/vue/level2-selection/v1` · Profile A
- `http://localhost:3000/form/vue/level2-selection/v2` · Profile B
- `http://localhost:3000/form/vue/level2-selection/v3` · Profile A
- `http://localhost:3000/form/vue/level2-selection/v4` · Profile B
- `http://localhost:3000/form/vue/level2-selection/v5` · Profile A
- `http://localhost:3000/form/vue/level2-selection/v6` · Profile B
- `http://localhost:3000/form/vue/level2-selection/v7` · Profile A
- `http://localhost:3000/form/vue/level2-selection/v8` · Profile B
- `http://localhost:3000/form/vue/level2-selection/v9` · Profile A
- `http://localhost:3000/form/vue/level2-selection/v10` · Profile B
- `http://localhost:3000/form/vue/level3-pickers/v1` · Profile A
- `http://localhost:3000/form/vue/level3-pickers/v2` · Profile B
- `http://localhost:3000/form/vue/level3-pickers/v3` · Profile A
- `http://localhost:3000/form/vue/level3-pickers/v4` · Profile B
- `http://localhost:3000/form/vue/level3-pickers/v5` · Profile A
- `http://localhost:3000/form/vue/level3-pickers/v6` · Profile B
- `http://localhost:3000/form/vue/level3-pickers/v7` · Profile A
- `http://localhost:3000/form/vue/level3-pickers/v8` · Profile B
- `http://localhost:3000/form/vue/level3-pickers/v9` · Profile A
- `http://localhost:3000/form/vue/level3-pickers/v10` · Profile B
- `http://localhost:3000/form/vue/level4-dynamic/v1` · Profile A
- `http://localhost:3000/form/vue/level4-dynamic/v2` · Profile B
- `http://localhost:3000/form/vue/level4-dynamic/v3` · Profile A
- `http://localhost:3000/form/vue/level4-dynamic/v4` · Profile B
- `http://localhost:3000/form/vue/level4-dynamic/v5` · Profile A
- `http://localhost:3000/form/vue/level4-dynamic/v6` · Profile B
- `http://localhost:3000/form/vue/level4-dynamic/v7` · Profile A
- `http://localhost:3000/form/vue/level4-dynamic/v8` · Profile B
- `http://localhost:3000/form/vue/level4-dynamic/v9` · Profile A
- `http://localhost:3000/form/vue/level4-dynamic/v10` · Profile B
- `http://localhost:3000/form/vue/level5-complex/v1` · Profile A
- `http://localhost:3000/form/vue/level5-complex/v2` · Profile B
- `http://localhost:3000/form/vue/level5-complex/v3` · Profile A
- `http://localhost:3000/form/vue/level5-complex/v4` · Profile B
- `http://localhost:3000/form/vue/level5-complex/v5` · Profile A
- `http://localhost:3000/form/vue/level5-complex/v6` · Profile B
- `http://localhost:3000/form/vue/level5-complex/v7` · Profile A
- `http://localhost:3000/form/vue/level5-complex/v8` · Profile B
- `http://localhost:3000/form/vue/level5-complex/v9` · Profile A
- `http://localhost:3000/form/vue/level5-complex/v10` · Profile B
- `http://localhost:3000/form/vue/level6-frameworks/v1` · Profile A
- `http://localhost:3000/form/vue/level6-frameworks/v2` · Profile B
- `http://localhost:3000/form/vue/level6-frameworks/v3` · Profile A
- `http://localhost:3000/form/vue/level6-frameworks/v4` · Profile B
- `http://localhost:3000/form/vue/level6-frameworks/v5` · Profile A
- `http://localhost:3000/form/vue/level6-frameworks/v6` · Profile B
- `http://localhost:3000/form/vue/level6-frameworks/v7` · Profile A
- `http://localhost:3000/form/vue/level6-frameworks/v8` · Profile B
- `http://localhost:3000/form/vue/level6-frameworks/v9` · Profile A
- `http://localhost:3000/form/vue/level6-frameworks/v10` · Profile B
- `http://localhost:3000/form/vue/issue-combined/v1` · Profile A
- `http://localhost:3000/form/vue/issue-combined/v2` · Profile B
- `http://localhost:3000/form/vue/issue-combined/v3` · Profile A
- `http://localhost:3000/form/vue/issue-combined/v4` · Profile B
- `http://localhost:3000/form/vue/issue-combined/v5` · Profile A
- `http://localhost:3000/form/vue/issue-combined/v6` · Profile B
- `http://localhost:3000/form/vue/issue-combined/v7` · Profile A
- `http://localhost:3000/form/vue/issue-combined/v8` · Profile B
- `http://localhost:3000/form/vue/issue-combined/v9` · Profile A
- `http://localhost:3000/form/vue/issue-combined/v10` · Profile B
- `http://localhost:3000/form/vue/issue-duplicate-labels/v1` · Profile A
- `http://localhost:3000/form/vue/issue-duplicate-labels/v2` · Profile B
- `http://localhost:3000/form/vue/issue-duplicate-labels/v3` · Profile A
- `http://localhost:3000/form/vue/issue-duplicate-labels/v4` · Profile B
- `http://localhost:3000/form/vue/issue-duplicate-labels/v5` · Profile A
- `http://localhost:3000/form/vue/issue-duplicate-labels/v6` · Profile B
- `http://localhost:3000/form/vue/issue-duplicate-labels/v7` · Profile A
- `http://localhost:3000/form/vue/issue-duplicate-labels/v8` · Profile B
- `http://localhost:3000/form/vue/issue-duplicate-labels/v9` · Profile A
- `http://localhost:3000/form/vue/issue-duplicate-labels/v10` · Profile B
- `http://localhost:3000/form/vue/issue-dynamic-ids/v1` · Profile A
- `http://localhost:3000/form/vue/issue-dynamic-ids/v2` · Profile B
- `http://localhost:3000/form/vue/issue-dynamic-ids/v3` · Profile A
- `http://localhost:3000/form/vue/issue-dynamic-ids/v4` · Profile B
- `http://localhost:3000/form/vue/issue-dynamic-ids/v5` · Profile A
- `http://localhost:3000/form/vue/issue-dynamic-ids/v6` · Profile B
- `http://localhost:3000/form/vue/issue-dynamic-ids/v7` · Profile A
- `http://localhost:3000/form/vue/issue-dynamic-ids/v8` · Profile B
- `http://localhost:3000/form/vue/issue-dynamic-ids/v9` · Profile A
- `http://localhost:3000/form/vue/issue-dynamic-ids/v10` · Profile B
- `http://localhost:3000/form/vue/issue-fake-buttons/v1` · Profile A
- `http://localhost:3000/form/vue/issue-fake-buttons/v2` · Profile B
- `http://localhost:3000/form/vue/issue-fake-buttons/v3` · Profile A
- `http://localhost:3000/form/vue/issue-fake-buttons/v4` · Profile B
- `http://localhost:3000/form/vue/issue-fake-buttons/v5` · Profile A
- `http://localhost:3000/form/vue/issue-fake-buttons/v6` · Profile B
- `http://localhost:3000/form/vue/issue-fake-buttons/v7` · Profile A
- `http://localhost:3000/form/vue/issue-fake-buttons/v8` · Profile B
- `http://localhost:3000/form/vue/issue-fake-buttons/v9` · Profile A
- `http://localhost:3000/form/vue/issue-fake-buttons/v10` · Profile B
- `http://localhost:3000/form/vue/issue-hidden-fields/v1` · Profile A
- `http://localhost:3000/form/vue/issue-hidden-fields/v2` · Profile B
- `http://localhost:3000/form/vue/issue-hidden-fields/v3` · Profile A
- `http://localhost:3000/form/vue/issue-hidden-fields/v4` · Profile B
- `http://localhost:3000/form/vue/issue-hidden-fields/v5` · Profile A
- `http://localhost:3000/form/vue/issue-hidden-fields/v6` · Profile B
- `http://localhost:3000/form/vue/issue-hidden-fields/v7` · Profile A
- `http://localhost:3000/form/vue/issue-hidden-fields/v8` · Profile B
- `http://localhost:3000/form/vue/issue-hidden-fields/v9` · Profile A
- `http://localhost:3000/form/vue/issue-hidden-fields/v10` · Profile B
- `http://localhost:3000/form/vue/issue-network-delay/v1` · Profile A
- `http://localhost:3000/form/vue/issue-network-delay/v2` · Profile B
- `http://localhost:3000/form/vue/issue-network-delay/v3` · Profile A
- `http://localhost:3000/form/vue/issue-network-delay/v4` · Profile B
- `http://localhost:3000/form/vue/issue-network-delay/v5` · Profile A
- `http://localhost:3000/form/vue/issue-network-delay/v6` · Profile B
- `http://localhost:3000/form/vue/issue-network-delay/v7` · Profile A
- `http://localhost:3000/form/vue/issue-network-delay/v8` · Profile B
- `http://localhost:3000/form/vue/issue-network-delay/v9` · Profile A
- `http://localhost:3000/form/vue/issue-network-delay/v10` · Profile B
- `http://localhost:3000/form/vue/issue-shadow-dom/v1` · Profile A
- `http://localhost:3000/form/vue/issue-shadow-dom/v2` · Profile B
- `http://localhost:3000/form/vue/issue-shadow-dom/v3` · Profile A
- `http://localhost:3000/form/vue/issue-shadow-dom/v4` · Profile B
- `http://localhost:3000/form/vue/issue-shadow-dom/v5` · Profile A
- `http://localhost:3000/form/vue/issue-shadow-dom/v6` · Profile B
- `http://localhost:3000/form/vue/issue-shadow-dom/v7` · Profile A
- `http://localhost:3000/form/vue/issue-shadow-dom/v8` · Profile B
- `http://localhost:3000/form/vue/issue-shadow-dom/v9` · Profile A
- `http://localhost:3000/form/vue/issue-shadow-dom/v10` · Profile B
- `http://localhost:3000/form/vue/level7-adversarial/v1` · Profile A
- `http://localhost:3000/form/vue/level7-adversarial/v2` · Profile B
- `http://localhost:3000/form/vue/level7-adversarial/v3` · Profile A
- `http://localhost:3000/form/vue/level7-adversarial/v4` · Profile B
- `http://localhost:3000/form/vue/level7-adversarial/v5` · Profile A
- `http://localhost:3000/form/vue/level7-adversarial/v6` · Profile B
- `http://localhost:3000/form/vue/level7-adversarial/v7` · Profile A
- `http://localhost:3000/form/vue/level7-adversarial/v8` · Profile B
- `http://localhost:3000/form/vue/level7-adversarial/v9` · Profile A
- `http://localhost:3000/form/vue/level7-adversarial/v10` · Profile B
- `http://localhost:3000/form/php/baseline/v1` · Profile A
- `http://localhost:3000/form/php/baseline/v2` · Profile B
- `http://localhost:3000/form/php/baseline/v3` · Profile A
- `http://localhost:3000/form/php/baseline/v4` · Profile B
- `http://localhost:3000/form/php/baseline/v5` · Profile A
- `http://localhost:3000/form/php/baseline/v6` · Profile B
- `http://localhost:3000/form/php/baseline/v7` · Profile A
- `http://localhost:3000/form/php/baseline/v8` · Profile B
- `http://localhost:3000/form/php/baseline/v9` · Profile A
- `http://localhost:3000/form/php/baseline/v10` · Profile B
- `http://localhost:3000/form/php/level1-basic/v1` · Profile A
- `http://localhost:3000/form/php/level1-basic/v2` · Profile B
- `http://localhost:3000/form/php/level1-basic/v3` · Profile A
- `http://localhost:3000/form/php/level1-basic/v4` · Profile B
- `http://localhost:3000/form/php/level1-basic/v5` · Profile A
- `http://localhost:3000/form/php/level1-basic/v6` · Profile B
- `http://localhost:3000/form/php/level1-basic/v7` · Profile A
- `http://localhost:3000/form/php/level1-basic/v8` · Profile B
- `http://localhost:3000/form/php/level1-basic/v9` · Profile A
- `http://localhost:3000/form/php/level1-basic/v10` · Profile B
- `http://localhost:3000/form/php/level2-selection/v1` · Profile A
- `http://localhost:3000/form/php/level2-selection/v2` · Profile B
- `http://localhost:3000/form/php/level2-selection/v3` · Profile A
- `http://localhost:3000/form/php/level2-selection/v4` · Profile B
- `http://localhost:3000/form/php/level2-selection/v5` · Profile A
- `http://localhost:3000/form/php/level2-selection/v6` · Profile B
- `http://localhost:3000/form/php/level2-selection/v7` · Profile A
- `http://localhost:3000/form/php/level2-selection/v8` · Profile B
- `http://localhost:3000/form/php/level2-selection/v9` · Profile A
- `http://localhost:3000/form/php/level2-selection/v10` · Profile B
- `http://localhost:3000/form/php/level3-pickers/v1` · Profile A
- `http://localhost:3000/form/php/level3-pickers/v2` · Profile B
- `http://localhost:3000/form/php/level3-pickers/v3` · Profile A
- `http://localhost:3000/form/php/level3-pickers/v4` · Profile B
- `http://localhost:3000/form/php/level3-pickers/v5` · Profile A
- `http://localhost:3000/form/php/level3-pickers/v6` · Profile B
- `http://localhost:3000/form/php/level3-pickers/v7` · Profile A
- `http://localhost:3000/form/php/level3-pickers/v8` · Profile B
- `http://localhost:3000/form/php/level3-pickers/v9` · Profile A
- `http://localhost:3000/form/php/level3-pickers/v10` · Profile B
- `http://localhost:3000/form/php/level4-dynamic/v1` · Profile A
- `http://localhost:3000/form/php/level4-dynamic/v2` · Profile B
- `http://localhost:3000/form/php/level4-dynamic/v3` · Profile A
- `http://localhost:3000/form/php/level4-dynamic/v4` · Profile B
- `http://localhost:3000/form/php/level4-dynamic/v5` · Profile A
- `http://localhost:3000/form/php/level4-dynamic/v6` · Profile B
- `http://localhost:3000/form/php/level4-dynamic/v7` · Profile A
- `http://localhost:3000/form/php/level4-dynamic/v8` · Profile B
- `http://localhost:3000/form/php/level4-dynamic/v9` · Profile A
- `http://localhost:3000/form/php/level4-dynamic/v10` · Profile B
- `http://localhost:3000/form/php/level5-complex/v1` · Profile A
- `http://localhost:3000/form/php/level5-complex/v2` · Profile B
- `http://localhost:3000/form/php/level5-complex/v3` · Profile A
- `http://localhost:3000/form/php/level5-complex/v4` · Profile B
- `http://localhost:3000/form/php/level5-complex/v5` · Profile A
- `http://localhost:3000/form/php/level5-complex/v6` · Profile B
- `http://localhost:3000/form/php/level5-complex/v7` · Profile A
- `http://localhost:3000/form/php/level5-complex/v8` · Profile B
- `http://localhost:3000/form/php/level5-complex/v9` · Profile A
- `http://localhost:3000/form/php/level5-complex/v10` · Profile B
- `http://localhost:3000/form/php/level6-frameworks/v1` · Profile A
- `http://localhost:3000/form/php/level6-frameworks/v2` · Profile B
- `http://localhost:3000/form/php/level6-frameworks/v3` · Profile A
- `http://localhost:3000/form/php/level6-frameworks/v4` · Profile B
- `http://localhost:3000/form/php/level6-frameworks/v5` · Profile A
- `http://localhost:3000/form/php/level6-frameworks/v6` · Profile B
- `http://localhost:3000/form/php/level6-frameworks/v7` · Profile A
- `http://localhost:3000/form/php/level6-frameworks/v8` · Profile B
- `http://localhost:3000/form/php/level6-frameworks/v9` · Profile A
- `http://localhost:3000/form/php/level6-frameworks/v10` · Profile B
- `http://localhost:3000/form/php/issue-combined/v1` · Profile A
- `http://localhost:3000/form/php/issue-combined/v2` · Profile B
- `http://localhost:3000/form/php/issue-combined/v3` · Profile A
- `http://localhost:3000/form/php/issue-combined/v4` · Profile B
- `http://localhost:3000/form/php/issue-combined/v5` · Profile A
- `http://localhost:3000/form/php/issue-combined/v6` · Profile B
- `http://localhost:3000/form/php/issue-combined/v7` · Profile A
- `http://localhost:3000/form/php/issue-combined/v8` · Profile B
- `http://localhost:3000/form/php/issue-combined/v9` · Profile A
- `http://localhost:3000/form/php/issue-combined/v10` · Profile B
- `http://localhost:3000/form/php/issue-duplicate-labels/v1` · Profile A
- `http://localhost:3000/form/php/issue-duplicate-labels/v2` · Profile B
- `http://localhost:3000/form/php/issue-duplicate-labels/v3` · Profile A
- `http://localhost:3000/form/php/issue-duplicate-labels/v4` · Profile B
- `http://localhost:3000/form/php/issue-duplicate-labels/v5` · Profile A
- `http://localhost:3000/form/php/issue-duplicate-labels/v6` · Profile B
- `http://localhost:3000/form/php/issue-duplicate-labels/v7` · Profile A
- `http://localhost:3000/form/php/issue-duplicate-labels/v8` · Profile B
- `http://localhost:3000/form/php/issue-duplicate-labels/v9` · Profile A
- `http://localhost:3000/form/php/issue-duplicate-labels/v10` · Profile B
- `http://localhost:3000/form/php/issue-dynamic-ids/v1` · Profile A
- `http://localhost:3000/form/php/issue-dynamic-ids/v2` · Profile B
- `http://localhost:3000/form/php/issue-dynamic-ids/v3` · Profile A
- `http://localhost:3000/form/php/issue-dynamic-ids/v4` · Profile B
- `http://localhost:3000/form/php/issue-dynamic-ids/v5` · Profile A
- `http://localhost:3000/form/php/issue-dynamic-ids/v6` · Profile B
- `http://localhost:3000/form/php/issue-dynamic-ids/v7` · Profile A
- `http://localhost:3000/form/php/issue-dynamic-ids/v8` · Profile B
- `http://localhost:3000/form/php/issue-dynamic-ids/v9` · Profile A
- `http://localhost:3000/form/php/issue-dynamic-ids/v10` · Profile B
- `http://localhost:3000/form/php/issue-fake-buttons/v1` · Profile A
- `http://localhost:3000/form/php/issue-fake-buttons/v2` · Profile B
- `http://localhost:3000/form/php/issue-fake-buttons/v3` · Profile A
- `http://localhost:3000/form/php/issue-fake-buttons/v4` · Profile B
- `http://localhost:3000/form/php/issue-fake-buttons/v5` · Profile A
- `http://localhost:3000/form/php/issue-fake-buttons/v6` · Profile B
- `http://localhost:3000/form/php/issue-fake-buttons/v7` · Profile A
- `http://localhost:3000/form/php/issue-fake-buttons/v8` · Profile B
- `http://localhost:3000/form/php/issue-fake-buttons/v9` · Profile A
- `http://localhost:3000/form/php/issue-fake-buttons/v10` · Profile B
- `http://localhost:3000/form/php/issue-hidden-fields/v1` · Profile A
- `http://localhost:3000/form/php/issue-hidden-fields/v2` · Profile B
- `http://localhost:3000/form/php/issue-hidden-fields/v3` · Profile A
- `http://localhost:3000/form/php/issue-hidden-fields/v4` · Profile B
- `http://localhost:3000/form/php/issue-hidden-fields/v5` · Profile A
- `http://localhost:3000/form/php/issue-hidden-fields/v6` · Profile B
- `http://localhost:3000/form/php/issue-hidden-fields/v7` · Profile A
- `http://localhost:3000/form/php/issue-hidden-fields/v8` · Profile B
- `http://localhost:3000/form/php/issue-hidden-fields/v9` · Profile A
- `http://localhost:3000/form/php/issue-hidden-fields/v10` · Profile B
- `http://localhost:3000/form/php/issue-network-delay/v1` · Profile A
- `http://localhost:3000/form/php/issue-network-delay/v2` · Profile B
- `http://localhost:3000/form/php/issue-network-delay/v3` · Profile A
- `http://localhost:3000/form/php/issue-network-delay/v4` · Profile B
- `http://localhost:3000/form/php/issue-network-delay/v5` · Profile A
- `http://localhost:3000/form/php/issue-network-delay/v6` · Profile B
- `http://localhost:3000/form/php/issue-network-delay/v7` · Profile A
- `http://localhost:3000/form/php/issue-network-delay/v8` · Profile B
- `http://localhost:3000/form/php/issue-network-delay/v9` · Profile A
- `http://localhost:3000/form/php/issue-network-delay/v10` · Profile B
- `http://localhost:3000/form/php/issue-shadow-dom/v1` · Profile A
- `http://localhost:3000/form/php/issue-shadow-dom/v2` · Profile B
- `http://localhost:3000/form/php/issue-shadow-dom/v3` · Profile A
- `http://localhost:3000/form/php/issue-shadow-dom/v4` · Profile B
- `http://localhost:3000/form/php/issue-shadow-dom/v5` · Profile A
- `http://localhost:3000/form/php/issue-shadow-dom/v6` · Profile B
- `http://localhost:3000/form/php/issue-shadow-dom/v7` · Profile A
- `http://localhost:3000/form/php/issue-shadow-dom/v8` · Profile B
- `http://localhost:3000/form/php/issue-shadow-dom/v9` · Profile A
- `http://localhost:3000/form/php/issue-shadow-dom/v10` · Profile B
- `http://localhost:3000/form/php/level7-adversarial/v1` · Profile A
- `http://localhost:3000/form/php/level7-adversarial/v2` · Profile B
- `http://localhost:3000/form/php/level7-adversarial/v3` · Profile A
- `http://localhost:3000/form/php/level7-adversarial/v4` · Profile B
- `http://localhost:3000/form/php/level7-adversarial/v5` · Profile A
- `http://localhost:3000/form/php/level7-adversarial/v6` · Profile B
- `http://localhost:3000/form/php/level7-adversarial/v7` · Profile A
- `http://localhost:3000/form/php/level7-adversarial/v8` · Profile B
- `http://localhost:3000/form/php/level7-adversarial/v9` · Profile A
- `http://localhost:3000/form/php/level7-adversarial/v10` · Profile B
- `http://localhost:3000/form/flask/baseline/v1` · Profile A
- `http://localhost:3000/form/flask/baseline/v2` · Profile B
- `http://localhost:3000/form/flask/baseline/v3` · Profile A
- `http://localhost:3000/form/flask/baseline/v4` · Profile B
- `http://localhost:3000/form/flask/baseline/v5` · Profile A
- `http://localhost:3000/form/flask/baseline/v6` · Profile B
- `http://localhost:3000/form/flask/baseline/v7` · Profile A
- `http://localhost:3000/form/flask/baseline/v8` · Profile B
- `http://localhost:3000/form/flask/baseline/v9` · Profile A
- `http://localhost:3000/form/flask/baseline/v10` · Profile B
- `http://localhost:3000/form/flask/level1-basic/v1` · Profile A
- `http://localhost:3000/form/flask/level1-basic/v2` · Profile B
- `http://localhost:3000/form/flask/level1-basic/v3` · Profile A
- `http://localhost:3000/form/flask/level1-basic/v4` · Profile B
- `http://localhost:3000/form/flask/level1-basic/v5` · Profile A
- `http://localhost:3000/form/flask/level1-basic/v6` · Profile B
- `http://localhost:3000/form/flask/level1-basic/v7` · Profile A
- `http://localhost:3000/form/flask/level1-basic/v8` · Profile B
- `http://localhost:3000/form/flask/level1-basic/v9` · Profile A
- `http://localhost:3000/form/flask/level1-basic/v10` · Profile B
- `http://localhost:3000/form/flask/level2-selection/v1` · Profile A
- `http://localhost:3000/form/flask/level2-selection/v2` · Profile B
- `http://localhost:3000/form/flask/level2-selection/v3` · Profile A
- `http://localhost:3000/form/flask/level2-selection/v4` · Profile B
- `http://localhost:3000/form/flask/level2-selection/v5` · Profile A
- `http://localhost:3000/form/flask/level2-selection/v6` · Profile B
- `http://localhost:3000/form/flask/level2-selection/v7` · Profile A
- `http://localhost:3000/form/flask/level2-selection/v8` · Profile B
- `http://localhost:3000/form/flask/level2-selection/v9` · Profile A
- `http://localhost:3000/form/flask/level2-selection/v10` · Profile B
- `http://localhost:3000/form/flask/level3-pickers/v1` · Profile A
- `http://localhost:3000/form/flask/level3-pickers/v2` · Profile B
- `http://localhost:3000/form/flask/level3-pickers/v3` · Profile A
- `http://localhost:3000/form/flask/level3-pickers/v4` · Profile B
- `http://localhost:3000/form/flask/level3-pickers/v5` · Profile A
- `http://localhost:3000/form/flask/level3-pickers/v6` · Profile B
- `http://localhost:3000/form/flask/level3-pickers/v7` · Profile A
- `http://localhost:3000/form/flask/level3-pickers/v8` · Profile B
- `http://localhost:3000/form/flask/level3-pickers/v9` · Profile A
- `http://localhost:3000/form/flask/level3-pickers/v10` · Profile B
- `http://localhost:3000/form/flask/level4-dynamic/v1` · Profile A
- `http://localhost:3000/form/flask/level4-dynamic/v2` · Profile B
- `http://localhost:3000/form/flask/level4-dynamic/v3` · Profile A
- `http://localhost:3000/form/flask/level4-dynamic/v4` · Profile B
- `http://localhost:3000/form/flask/level4-dynamic/v5` · Profile A
- `http://localhost:3000/form/flask/level4-dynamic/v6` · Profile B
- `http://localhost:3000/form/flask/level4-dynamic/v7` · Profile A
- `http://localhost:3000/form/flask/level4-dynamic/v8` · Profile B
- `http://localhost:3000/form/flask/level4-dynamic/v9` · Profile A
- `http://localhost:3000/form/flask/level4-dynamic/v10` · Profile B
- `http://localhost:3000/form/flask/level5-complex/v1` · Profile A
- `http://localhost:3000/form/flask/level5-complex/v2` · Profile B
- `http://localhost:3000/form/flask/level5-complex/v3` · Profile A
- `http://localhost:3000/form/flask/level5-complex/v4` · Profile B
- `http://localhost:3000/form/flask/level5-complex/v5` · Profile A
- `http://localhost:3000/form/flask/level5-complex/v6` · Profile B
- `http://localhost:3000/form/flask/level5-complex/v7` · Profile A
- `http://localhost:3000/form/flask/level5-complex/v8` · Profile B
- `http://localhost:3000/form/flask/level5-complex/v9` · Profile A
- `http://localhost:3000/form/flask/level5-complex/v10` · Profile B
- `http://localhost:3000/form/flask/level6-frameworks/v1` · Profile A
- `http://localhost:3000/form/flask/level6-frameworks/v2` · Profile B
- `http://localhost:3000/form/flask/level6-frameworks/v3` · Profile A
- `http://localhost:3000/form/flask/level6-frameworks/v4` · Profile B
- `http://localhost:3000/form/flask/level6-frameworks/v5` · Profile A
- `http://localhost:3000/form/flask/level6-frameworks/v6` · Profile B
- `http://localhost:3000/form/flask/level6-frameworks/v7` · Profile A
- `http://localhost:3000/form/flask/level6-frameworks/v8` · Profile B
- `http://localhost:3000/form/flask/level6-frameworks/v9` · Profile A
- `http://localhost:3000/form/flask/level6-frameworks/v10` · Profile B
- `http://localhost:3000/form/flask/issue-combined/v1` · Profile A
- `http://localhost:3000/form/flask/issue-combined/v2` · Profile B
- `http://localhost:3000/form/flask/issue-combined/v3` · Profile A
- `http://localhost:3000/form/flask/issue-combined/v4` · Profile B
- `http://localhost:3000/form/flask/issue-combined/v5` · Profile A
- `http://localhost:3000/form/flask/issue-combined/v6` · Profile B
- `http://localhost:3000/form/flask/issue-combined/v7` · Profile A
- `http://localhost:3000/form/flask/issue-combined/v8` · Profile B
- `http://localhost:3000/form/flask/issue-combined/v9` · Profile A
- `http://localhost:3000/form/flask/issue-combined/v10` · Profile B
- `http://localhost:3000/form/flask/issue-duplicate-labels/v1` · Profile A
- `http://localhost:3000/form/flask/issue-duplicate-labels/v2` · Profile B
- `http://localhost:3000/form/flask/issue-duplicate-labels/v3` · Profile A
- `http://localhost:3000/form/flask/issue-duplicate-labels/v4` · Profile B
- `http://localhost:3000/form/flask/issue-duplicate-labels/v5` · Profile A
- `http://localhost:3000/form/flask/issue-duplicate-labels/v6` · Profile B
- `http://localhost:3000/form/flask/issue-duplicate-labels/v7` · Profile A
- `http://localhost:3000/form/flask/issue-duplicate-labels/v8` · Profile B
- `http://localhost:3000/form/flask/issue-duplicate-labels/v9` · Profile A
- `http://localhost:3000/form/flask/issue-duplicate-labels/v10` · Profile B
- `http://localhost:3000/form/flask/issue-dynamic-ids/v1` · Profile A
- `http://localhost:3000/form/flask/issue-dynamic-ids/v2` · Profile B
- `http://localhost:3000/form/flask/issue-dynamic-ids/v3` · Profile A
- `http://localhost:3000/form/flask/issue-dynamic-ids/v4` · Profile B
- `http://localhost:3000/form/flask/issue-dynamic-ids/v5` · Profile A
- `http://localhost:3000/form/flask/issue-dynamic-ids/v6` · Profile B
- `http://localhost:3000/form/flask/issue-dynamic-ids/v7` · Profile A
- `http://localhost:3000/form/flask/issue-dynamic-ids/v8` · Profile B
- `http://localhost:3000/form/flask/issue-dynamic-ids/v9` · Profile A
- `http://localhost:3000/form/flask/issue-dynamic-ids/v10` · Profile B
- `http://localhost:3000/form/flask/issue-fake-buttons/v1` · Profile A
- `http://localhost:3000/form/flask/issue-fake-buttons/v2` · Profile B
- `http://localhost:3000/form/flask/issue-fake-buttons/v3` · Profile A
- `http://localhost:3000/form/flask/issue-fake-buttons/v4` · Profile B
- `http://localhost:3000/form/flask/issue-fake-buttons/v5` · Profile A
- `http://localhost:3000/form/flask/issue-fake-buttons/v6` · Profile B
- `http://localhost:3000/form/flask/issue-fake-buttons/v7` · Profile A
- `http://localhost:3000/form/flask/issue-fake-buttons/v8` · Profile B
- `http://localhost:3000/form/flask/issue-fake-buttons/v9` · Profile A
- `http://localhost:3000/form/flask/issue-fake-buttons/v10` · Profile B
- `http://localhost:3000/form/flask/issue-hidden-fields/v1` · Profile A
- `http://localhost:3000/form/flask/issue-hidden-fields/v2` · Profile B
- `http://localhost:3000/form/flask/issue-hidden-fields/v3` · Profile A
- `http://localhost:3000/form/flask/issue-hidden-fields/v4` · Profile B
- `http://localhost:3000/form/flask/issue-hidden-fields/v5` · Profile A
- `http://localhost:3000/form/flask/issue-hidden-fields/v6` · Profile B
- `http://localhost:3000/form/flask/issue-hidden-fields/v7` · Profile A
- `http://localhost:3000/form/flask/issue-hidden-fields/v8` · Profile B
- `http://localhost:3000/form/flask/issue-hidden-fields/v9` · Profile A
- `http://localhost:3000/form/flask/issue-hidden-fields/v10` · Profile B
- `http://localhost:3000/form/flask/issue-network-delay/v1` · Profile A
- `http://localhost:3000/form/flask/issue-network-delay/v2` · Profile B
- `http://localhost:3000/form/flask/issue-network-delay/v3` · Profile A
- `http://localhost:3000/form/flask/issue-network-delay/v4` · Profile B
- `http://localhost:3000/form/flask/issue-network-delay/v5` · Profile A
- `http://localhost:3000/form/flask/issue-network-delay/v6` · Profile B
- `http://localhost:3000/form/flask/issue-network-delay/v7` · Profile A
- `http://localhost:3000/form/flask/issue-network-delay/v8` · Profile B
- `http://localhost:3000/form/flask/issue-network-delay/v9` · Profile A
- `http://localhost:3000/form/flask/issue-network-delay/v10` · Profile B
- `http://localhost:3000/form/flask/issue-shadow-dom/v1` · Profile A
- `http://localhost:3000/form/flask/issue-shadow-dom/v2` · Profile B
- `http://localhost:3000/form/flask/issue-shadow-dom/v3` · Profile A
- `http://localhost:3000/form/flask/issue-shadow-dom/v4` · Profile B
- `http://localhost:3000/form/flask/issue-shadow-dom/v5` · Profile A
- `http://localhost:3000/form/flask/issue-shadow-dom/v6` · Profile B
- `http://localhost:3000/form/flask/issue-shadow-dom/v7` · Profile A
- `http://localhost:3000/form/flask/issue-shadow-dom/v8` · Profile B
- `http://localhost:3000/form/flask/issue-shadow-dom/v9` · Profile A
- `http://localhost:3000/form/flask/issue-shadow-dom/v10` · Profile B
- `http://localhost:3000/form/flask/level7-adversarial/v1` · Profile A
- `http://localhost:3000/form/flask/level7-adversarial/v2` · Profile B
- `http://localhost:3000/form/flask/level7-adversarial/v3` · Profile A
- `http://localhost:3000/form/flask/level7-adversarial/v4` · Profile B
- `http://localhost:3000/form/flask/level7-adversarial/v5` · Profile A
- `http://localhost:3000/form/flask/level7-adversarial/v6` · Profile B
- `http://localhost:3000/form/flask/level7-adversarial/v7` · Profile A
- `http://localhost:3000/form/flask/level7-adversarial/v8` · Profile B
- `http://localhost:3000/form/flask/level7-adversarial/v9` · Profile A
- `http://localhost:3000/form/flask/level7-adversarial/v10` · Profile B

---

## Verification API

After filling any form, POST to verify:

```
POST http://localhost:3000/api/verify-submission
Content-Type: application/json

{
  "scenarioId": "baseline",
  "variantId":  "baseline-v1",
  "data": { ...form fields... }
}
```

Response includes a `score` (0–100) and per-field accuracy report.
