# Contributing to KYC Form Hub

Thanks for your interest in making KYC Form Hub better! This document covers the basics for contributors.

## Getting Started

1. Fork the repository and clone your fork.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and adjust if needed.
4. Start the central orchestrator: `npm run dev`
5. Start the stack servers: `npm run stacks`
6. Run smoke tests: `npm run test:all`

## How to Contribute

- **Bug reports:** Open an issue with a clear description, reproduction steps, and expected vs actual behavior.
- **Feature requests:** Open an issue describing the use case and the proposed change.
- **Issue templates:** Run `node setup-templates.js` to create `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md`.
- **Pull requests:**
  1. Create a branch for your change.
  2. Make focused, minimal changes.
  3. Add or update documentation where relevant.
  4. Run `npm run test:all` against a running server.
  5. Open a pull request with a concise description and reference any related issue.

## Project Values

- **Keep it simple:** Avoid introducing new dependencies or heavy frameworks unless necessary.
- **Stay focused:** Each PR should address one concern.
- **Document intent:** If a change is not obvious, add a short comment or update the relevant markdown file.
- **Don't break agents:** The public API surface (manifest, profiles, verify-submission, benchmark) should remain stable. Deprecate before removing.

## Code Style

- Use 2 spaces for indentation.
- Prefer clear variable names over clever shortcuts.
- Handle errors explicitly and log them with `console.error`.
- Centralise configuration in `server/config.js`.

## Testing

- Use `npm test` for the baseline scenario.
- Use `npm run test:scenario <scenario-id>` for a specific scenario.
- Use `npm run test:all` to verify every variant returns a 100% score with its own ground truth.

## Questions?

Open a discussion issue or reach out via the project issue tracker.
