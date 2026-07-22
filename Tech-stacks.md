# Tech Stacks

To test agent robustness, forms are rendered across 6 web stacks in market-representative ratios. Each stack has its own server process so agents can be benchmarked against independent endpoints.

| Category                 | Share | Port | Server File |
| ------------------------ | ----: | ---: | --- |
| Plain HTML/jQuery forms  |   20% | 3010 | `server/stack-server-html.js` |
| React / Next.js          |   30% | 3011 | `server/stack-server-react.js` |
| Angular                  |   15% | 3012 | `server/stack-server-angular.js` |
| Vue.js                   |   10% | 3013 | `server/stack-server-vue.js` |
| PHP Server-Rendered      |   15% | 3014 | `server/stack-server-php.js` |
| Flask / Python WTForms   |   10% | 3015 | `server/stack-server-flask.js` |

## Implementation Approach

The server uses a single set of scenario definitions in `forms/scenarios/` and renders each scenario into the idioms of the target stack:

- **HTML / jQuery**: Plain HTML5 inputs, jQuery event handling, accordion sections.
- **React**: Functional components, `useState` controlled inputs, conditional rendering.
- **Angular**: AngularJS 1.x `ng-model` two-way binding.
- **Vue.js**: Vue 3 `v-model` with Composition API.
- **PHP**: Server-rendered fieldsets, CSRF token mimic.
- **Flask**: Jinja2-style card blocks, CSRF token mimic.

Forms can be rendered on-demand at `/form/{stack}/{scenarioId}` (central orchestrator) or `/form/{scenarioId}/v{n}` (stack server). All variants can be materialized to disk with `npm run generate`.

## Difficult Features

| Feature                     | Difficulty  | Scenario IDs |
| --------------------------- | ----------- | ------------ |
| Custom dropdowns            | Medium      | level2-selection |
| React controlled components | Medium      | react stack on all scenarios |
| Searchable comboboxes       | Medium–High | level3-pickers |
| Date pickers                | High        | level3-pickers, level4-dynamic |
| File uploads                | High        | level3-pickers, baseline |
| Dynamic conditional fields  | High        | level4-dynamic |
| Shadow DOM                  | High        | level6-frameworks, issue-shadow-dom |
| Nested iframes              | High        | level5-complex |
| Virtualized lists           | High        | level6-frameworks |
| Canvas-based UIs            | Very High   | future work |
| Fake buttons / honeypots    | High        | level7-adversarial, issue-* |
| Dynamic IDs                 | High        | issue-dynamic-ids, issue-combined |
| Network latency             | High        | issue-network-delay, level7-adversarial |