# Review workflow

When the user asks to review, check, audit, inspect, analyze, or assess something:

- Treat the request as read-only.
- Inspect the relevant files and report the findings.
- Do not edit files, install or update dependencies, run migrations, or otherwise implement fixes.
- Wait for the user to decide which findings should be fixed and explicitly confirm the implementation.

Non-mutating commands may be used to gather evidence for the review.
