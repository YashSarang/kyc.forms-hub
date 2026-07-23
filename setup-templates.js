const fs = require("fs");
const path = require("path");

const baseDir = "C:\\Code\\kyc-form-hub";
const templateDir = path.join(baseDir, ".github", "ISSUE_TEMPLATE");

// Create directory with recursive option
fs.mkdirSync(templateDir, { recursive: true });
console.log(`✓ Created directory: ${templateDir}`);

// Bug report content
const bugReportContent = `---
name: Bug report
about: Report a problem with KYC Form Hub
title: '[BUG] '
labels: bug
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Start servers with \`...\`
2. Visit \`...\`
3. Submit \`...\`
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Environment**
- OS:
- Node version:
- Browser (if relevant):

**Additional context**
Add any other context, logs, or screenshots here.`;

// Feature request content
const featureRequestContent = `---
name: Feature request
about: Suggest an idea for KYC Form Hub
title: '[FEATURE] '
labels: enhancement
---

**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
What should happen?

**Describe alternatives you've considered**
Any alternative approaches or workarounds.

**Additional context**
Add any other context or screenshots here.`;

// Write files
const bugReportPath = path.join(templateDir, "bug_report.md");
const featureRequestPath = path.join(templateDir, "feature_request.md");

fs.writeFileSync(bugReportPath, bugReportContent);
console.log(`✓ Created file: ${bugReportPath}`);

fs.writeFileSync(featureRequestPath, featureRequestContent);
console.log(`✓ Created file: ${featureRequestPath}`);

// Verify by reading back
console.log("\n--- Verification ---");
const bugContent = fs.readFileSync(bugReportPath, "utf-8");
console.log(`✓ bug_report.md verified (${bugContent.length} bytes)`);

const featureContent = fs.readFileSync(featureRequestPath, "utf-8");
console.log(`✓ feature_request.md verified (${featureContent.length} bytes)`);

console.log("\n✓ All files created and verified successfully!");
