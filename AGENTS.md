# AGENTS.md

Engine-independent project core for **링크나무 (linknamu)**.
A link-in-bio web app on Next.js 16 (App Router) / React 19 / TypeScript / Tailwind CSS 4,
with MongoDB Atlas planned for click counts, deployed to Vercel.

This file is the **canonical home** for the facts every coding agent needs (project
context, build/test commands, architecture, gotchas). Claude Code reads it via the
`AGENTS.md` import in `CLAUDE.md`; other agents read it directly.
**Claude-specific runtime instructions** (skill routing, hooks, delegation policy)
live in `CLAUDE.md`'s "## Claude Code" overlay, **not here** — keep that boundary clean.

## Project Context

링크나무 is a Linktree-style service: a single public page that gathers all of a
user's links and is shared through one URL. Target users are individual creators,
developers, and freelancers who share multiple links on social media. Release scope
is a mobile-responsive web service.

Core features (from `PRD.md`):

- Profile: name, one-line bio, profile photo
- Link cards: SNS / blog links rendered as clickable cards
- Dark mode: light / dark toggle
- Click counting: per-link click totals stored in MongoDB Atlas

Layout reference: `wireframe.png`.

## Common Commands

Package manager: **pnpm** (`pnpm-lock.yaml`; `package.json` `packageManager` pins
`pnpm@12.10.1`). Verified 2026-10-12 on Node.js 24.21.0.

```bash
# Install dependencies
pnpm install

# Build — verified green (routes / and /_not-found, both static)
pnpm build

# Run locally (http://localhost:3000)
# verified: Turbopack, ready in ~3s, GET / 200
pnpm dev

# Run the full test suite
# none — no test framework is installed yet

# Run a single test file / single test
# none

# Lint (ESLint 9 flat config, eslint-config-next core-web-vitals + typescript)
# verified: 0 errors
pnpm lint
```

### Environment

- Runtime: Node.js — no `engines` pin; verified on 24.21.0.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching` (scaffold
  defaults) and routes `*.css` through the `@tailwindcss/turbopack` loader.
- `pnpm-workspace.yaml` sets `allowBuilds` false for `sharp` and `unrs-resolver`
  (their install scripts do not run).
- Local config: environment variables live in `.env.local`, which must **never** be
  committed (`.gitignore` ignores `.env*`). It will hold the MongoDB Atlas connection
  string.
- Infrastructure: MongoDB Atlas (click counts); deploy target Vercel. No internal
  registry or network constraints.

## Architecture — Big Picture

Conventions fixed by the product brief:

- TypeScript only.
- UI components go under `src/components/` (not created yet).
- Mobile-first responsive design (Tailwind breakpoints scale up from mobile).
- Data access: MongoDB Atlas, used only for per-link click counts; profile and link
  data storage is not yet decided.

## Project-Specific Gotchas

(none yet)

## Code Quality

**Priority** (engine-independent; full rules in `WORKFLOW_ORCHESTRATION.md` § Code Quality):
`Correctness > Simplicity > Elegance > Speed`.

- Fix root causes, not temporary patches.
- Write the simplest change that solves the problem; match existing style; touch only what you must.

## References

- `PRD.md` — product requirements (Korean).
- `wireframe.png` — page layout wireframe.
- Issue tracker / design docs: none yet.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
