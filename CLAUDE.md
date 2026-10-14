# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The engine-independent project core — Project Context, Common Commands, Environment,
Architecture, Project-Specific Gotchas — lives in `AGENTS.md` (imported below) and is
shared with other coding agents. The sections under "## Claude Code" are the
Claude-specific overlay; everything engine-independent belongs in `AGENTS.md`, not here.

@AGENTS.md

## Claude Code

### Rules

Workflow orchestration: @WORKFLOW_ORCHESTRATION.md

### Precedence

Rules in `AGENTS.md`, this file, and `WORKFLOW_ORCHESTRATION.md` override any
delegation defaults your personal agent configuration sets.

### Skill Policy

Project-specific skill usage:

- **Security-related changes**: Review is MANDATORY. Use `/security-review` (built-in)
  for the change scan, or delegate to a subagent given that skill's checklist.
  Triggers for this stack:
  - secrets — the MongoDB connection string, anything read from `.env.local`;
  - the click-count write endpoint — input validation and count-inflation abuse;
  - user-supplied link URLs rendered as `href` (block `javascript:` and similar schemes);
  - new dependencies.
- **New business logic**: write tests first manually using the project's test framework.
  None is installed yet — before the first business-logic change, propose one to the
  user (adding it is a new dependency, so the security review above applies).
- **Code review**: use built-in `/code-review`. External AI CLIs (code leaves the
  machine) are not used in this project.
- **Doc sync**: The engine-independent core lives in `AGENTS.md`. Update **`AGENTS.md`**
  (not this file) when any of these change:
  - files: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `next.config.ts`,
    `tsconfig.json`, `eslint.config.mjs`, `.env.example` (if added), `.gitignore`, `PRD.md`;
  - directories (an addition can falsify the Architecture section with no quoted
    file changing): `src/app/`, `src/components/`, and any new top-level `src/`
    directory.

### Instruction File Boundary (`AGENTS.md` ↔ `CLAUDE.md`)

The split exists so other coding agents can read the project core directly.
Keep the boundary clean — it is itself an audit surface:

- **Engine-independent facts** (project context, build/test commands, architecture,
  gotchas, the code-quality priority) → `AGENTS.md` **only**.
- **Claude-specific runtime instructions** (skill routing, hooks, delegation policy)
  → this `CLAUDE.md` overlay **only**.
- `WORKFLOW_ORCHESTRATION.md` is **shared workflow policy**, not a Claude-only
  bucket. It holds how-we-work rules (planning, verification, subagent gating,
  the recall gate, code quality) rather than project facts, and it is written to
  be readable by whatever agent is running — some passages may name a specific
  engine or model, and that is a detail of the rule, not a change of ownership.
  `AGENTS.md` may reference it — that is not a boundary violation.
- When auditing instruction docs, check all four surfaces: (1) `AGENTS.md` content,
  (2) this overlay's content, (3) the `AGENTS.md` import link is live, (4) no
  engine-independent fact has leaked into the overlay and no Claude-specific
  instruction has leaked into `AGENTS.md`.

### Mandatory Reading

- `WORKFLOW_ORCHESTRATION.md` — auto-loaded via the `### Rules` import.
- Personal work log (optional, not committed): if your checkout has
  `tasks/lessons.md`, read it at session start; if it has `tasks/todo.md`, append
  checkable plan items there for cross-file or architectural changes before implementing.
