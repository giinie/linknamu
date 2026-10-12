# Workflow Orchestration

> Planning, execution, and verification rules for AI-assisted development workflows.
> Subagent usage, task tracking, bug fixing, and code quality standards.

**Session Start**: If your checkout has a personal work log at `tasks/lessons.md`,
read it and apply relevant rules before proceeding.

## Planning
- Enter plan mode for **cross-file changes or architectural decisions** — not every multi-step task
- Write the plan as checkable items before implementing (in `tasks/todo.md` if your
  checkout keeps that personal log)
- Check official documentation for platform-feature limits (Team, Agent, MCP, etc.)
  before designing around them — experimental features change most. Check SDK and
  framework docs (via a docs-lookup MCP when available) rather than relying on memory
- Check in with the user before starting implementation on non-trivial plans
- If execution goes sideways, stop and re-plan rather than pushing forward
- When the session is in "work without stopping for clarifying questions" mode
  (set via system reminder or explicit user instruction):
  - Record the assumption inline in the response, then proceed
  - **Irreversible actions still require explicit confirmation**: DB schema migrations,
    network calls with external side effects, destructive shell commands
    (`rm -rf`, `git reset --hard`, `git push --force`), production/staging deploys,
    secret/credential changes

## Recall Before Proposing (Audit / Review Gate)

For any audit, review, drift-check, or improvement-proposal task on harness /
config / instruction docs:
- **Recall first, scan second.** Before assembling any findings or proposal list,
  read the project's durable records of settled decisions: this file, `AGENTS.md`,
  `CLAUDE.md`, and your personal `tasks/lessons.md` if your checkout has one.
  Then scan disk. Then build proposals.
- **Drop, don't re-raise.** A finding that contradicts a recorded "standing NO" /
  "already at correct shape" decision is dropped — unless new evidence overrides the
  prior call, in which case cite that evidence and state explicitly that you are
  reopening a settled decision.
- Recorded decisions reflect what was true when written; if one names a file / flag /
  path, re-verify before acting.

## Subagent Usage

> Overrides any delegation defaults your personal agent configuration sets
> (project instructions win).

- Spawn subagents **only when context isolation is explicitly needed**:
  - Parallel independent analysis (e.g., reviewing multiple modules simultaneously)
  - Research/exploration that would pollute the main context window
  - Adversarial review — **security-sensitive changes only**, meaning the
    triggers listed under Skill Policy in `CLAUDE.md`, where review is already
    MANDATORY (that list is stack-specific and lives there, not here): one
    subagent implements, a separate reviewer subagent critiques. Outside that
    carve-out, do NOT use a subagent to verify or double-check your own work —
    see § Verification
- One focused task per subagent — never multiplex unrelated concerns in a single subagent
- Do NOT spawn subagents for simple sequential tasks; keep the main context clean instead
- Prefer 2–3 targeted subagents over large swarms
- **Targeted search → direct tools first**: For known file paths, specific patterns,
  or directory exploration, use Glob/Grep/Read directly. Explore subagents are for
  broad, open-ended codebase questions only.

## Task Execution
- Track progress by marking plan items complete as you go (in `tasks/todo.md` if kept)
- Add a review section to the plan when the task is complete

## Verification
- Verify with the repo's real checks — the test/lint commands in `AGENTS.md`
  § Common Commands — and report their actual output
- For a long-running or unattended task, set the completion check as a `/goal`
  condition instead of only asserting it at the end — a separate evaluator
  re-checks it after every turn. A Stop hook is the deterministic alternative.
  Stop hook: not used — the project has no test suite yet; revisit once one
  exists and is reliably green.
- Do NOT layer a reflexive self-review or verifier pass on top of that for
  routine work: current models verify their own work unprompted (verify this
  holds for your session's active model). Real verification — actually running
  the tests/commands and reporting the results — is unaffected.

## Bug Fixing
- When given a bug report: just fix it — no hand-holding required for localized fixes.
- If the fix requires cross-file changes or architectural decisions, escalate to Planning first.
- Fix failing tests without waiting to be told how

## Lessons & Self-Improvement

> **Where to record**: project-specific patterns (this codebase's file paths, repo
> conventions, gotchas) go first to your personal `tasks/lessons.md` (not committed),
> then get promoted into the committed docs once confirmed: command/build facts →
> `AGENTS.md` § Project-Specific Gotchas; workflow rules → this file.

- After a user correction that reveals a **non-obvious or recurring pattern**,
  append it to `tasks/lessons.md`.
- Format for `tasks/lessons.md`: `[date] Pattern: <what went wrong> → Rule: <how to prevent it>`
- Keep `tasks/lessons.md` concise — prune entries that no longer apply
- Promote rules into the committed docs when violated 3+ times across sessions, OR
  when a single violation has high blast radius (e.g., security, data loss,
  irreversible state changes)

## Code Quality

- **Simplicity First**: minimum code that solves the problem. No features beyond what
  was asked, no abstractions for single-use code, no unrequested configurability, no
  error handling for impossible scenarios.
- **Surgical Changes**: touch only what you must. Don't "improve" adjacent code,
  comments, or formatting; match existing style; remove only the orphans your own
  change created — mention unrelated dead code instead of deleting it.
- No temporary fixes — find and address root causes
- See also: Bug Fixing
