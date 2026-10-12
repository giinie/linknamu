# AGENTS.md

Engine-independent project core for **링크나무 (linknamu)**.
A link-in-bio web app planned on Next.js 16 (App Router) / TypeScript / Tailwind CSS /
MongoDB Atlas, deployed to Vercel. Status: pre-scaffold — the repo holds only the
product brief, no application code or manifest yet.

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

None yet — there is no `package.json`, lockfile, or source tree. Build, run, test,
single-test, and lint commands are all **absent**. Record each one here, verified by
running it, when the project is scaffolded.

Package manager: undecided — no lockfile exists. Whichever tool scaffolds the project
writes the lockfile, and that lockfile then decides the package manager for everyone.

### Environment

- Runtime: Next.js 16 (App Router) + TypeScript is the stated stack (product brief);
  no Node.js or framework version is pinned in any manifest yet.
- Local config: environment variables live in `.env.local`, which must **never** be
  committed. It will hold the MongoDB Atlas connection string. No `.gitignore` exists
  yet — add `.env*.local` to it when scaffolding.
- Infrastructure: MongoDB Atlas (click counts); deploy target Vercel. No internal
  registry or network constraints.

## Architecture — Big Picture

No source code exists yet. Conventions fixed by the product brief:

- Next.js App Router project, TypeScript only.
- UI components go under `src/components/`.
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
- TODO(init): issue tracker / design docs — none exist yet.
