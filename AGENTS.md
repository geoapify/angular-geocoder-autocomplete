# Review workflow

When the user asks to review, check, audit, inspect, analyze, or assess something:

- Treat the request as read-only.
- Inspect the relevant files and report the findings.
- Do not edit files, install or update dependencies, run migrations, or otherwise implement fixes.
- Wait for the user to decide which findings should be fixed and explicitly confirm the implementation.

Non-mutating commands may be used to gather evidence for the review.

# Publishing workflow

When guiding the user through publishing the library:

- Give exactly one step at a time.
- Include only the commands and explanation required for the current step.
- Wait for the user to report the result or explicitly confirm completion before giving the next step.
- Stop when a check fails and resolve that failure before continuing.
- Treat `npm publish`, creating or pushing a Git tag, and pushing commits as separate steps that each require explicit user confirmation.
- Never run `npm publish` on the user's behalf unless they explicitly authorize that exact publish action.
