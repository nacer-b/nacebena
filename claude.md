# Personal Website

Static personal site — portfolio, blog (math-heavy), CV — built partly to learn modern
web development. Solo project: velocity is not the constraint; understanding the
primitives is.

## Stack (v1, locked)
- **Framework:** Astro (static site; no backend in v1)
- **Styling:** vanilla CSS with custom properties as design tokens — NOT Tailwind
- **Math:** KaTeX via remark-math + rehype-katex, rendered at build time
- **Hosting:** private S3 + CloudFront (OAC) + ACM cert (us-east-1) + Route 53 — all AWS
- **CI/CD:** GitHub Actions (build → sync to S3 → invalidate CloudFront) via OIDC
- **Dev environment:** Claude Code in VS Code

## Scope
v1 = home, CV/About, Projects, and a Blog with working math rendering, plus one or two
real posts, live at the custom domain over HTTPS.

Out of scope — deferred to v2 as separate services: the two apps (FXMM rebuilt, Personal
Finance app for Couples). **Do not build these in v1.**

## Project hub (Notion)
The plan, decisions, and content live in Notion, reachable via the Notion MCP. This file
is the canonical context; Notion is the human-facing plan/status/content layer.
- Hub page: https://app.notion.com/p/206c8fec6eab80999626caa07e005c37
- Tasks (kanban): https://app.notion.com/p/f7894240eb7747ce8ed753c47839527e
- Decisions (ADR log — read this for the *why* behind every choice below):
  https://app.notion.com/p/3cd40b22ed3847ed9f9365032a20bf55
- Content (blog/CV drafts): https://app.notion.com/p/75d906dbde7940458fc3421f7bb06983

## Working conventions
- Branch per task; open a PR; review the diff before merging to `main`.
- **Task status lifecycle in Notion Tasks DB:**
  - Mark **In Progress** as soon as a task is picked up.
  - Mark **In Review** when coding or decision-making work is ready to review (PR open,
    or a decision/config change is ready for your eyes).
  - Mark **Done** when complete; paste the commit/PR link on the card.
- Commit messages reference the task name.

## Guardrails (already decided — do not relitigate)
- **No backend in v1.** Math, charts, and data are all client-side.
- **S3 bucket stays private**, served only through CloudFront with Origin Access Control.
  Never use public S3 website hosting.
- **ACM certificate must be in us-east-1** (CloudFront requirement), validated via DNS.
- Infrastructure is **console-first** for v1; IaC (CDK/SST) is a deferred v2 refactor —
  don't reach for it now.
- **Don't over-tool.** No observability platforms, agent orchestration, or sync pipelines
  for v1. The lean manual MO is intentional.
- Full rationale for all of the above is in the Notion Decisions DB (linked above).

## Commands
- `npm run dev` — local dev server (http://localhost:4321)
- `npm run build` — production build to `dist/`

_Update this file as the project grows — keep it lean; bloated context gets ignored._