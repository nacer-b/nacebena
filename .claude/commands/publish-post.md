# /publish-post

Publish or update a blog post from Notion to the site.

## What this does
1. Reads the Notion Content DB for entries where **Type = Blog post** and **Status = Ready**
2. Lists them so the user can pick one (or uses the URL/title passed as an argument)
3. Fetches the full page content from Notion
4. **Detects new vs. update:** checks whether `src/pages/blog/<slug>.md` already exists
   - **New post:** creates the `posts.ts` entry and the page file
   - **Update:** overwrites the page file with the new content; updates the `posts.ts` entry only if title, description, tags, or date changed
5. Creates a branch, commits, opens a PR
6. Marks the Notion entry **Published** and pastes the PR link on the card

## Triggering an update
Set the Notion entry back to **Status = Ready** after editing. The command detects the
existing file and switches to update mode automatically.

## Step-by-step

### 1. Fetch ready posts
Call `mcp__claude_ai_Notion__notion-search` on the Content DB
(`collection://190de4fb-ca77-433a-809a-3d947157ac8e`) filtering for Status = Ready and
Type = Blog post. List the results and ask the user which one to publish (skip this step
if a Notion URL or unambiguous title was passed as an argument).

### 2. Fetch the full post
Call `mcp__claude_ai_Notion__notion-fetch` on the chosen page. Extract:
- **title** — the page Title property
- **tags** — the Tags multi-select (map to site tag strings; "Product & Data" → "Product")
- **date** — Target date property; format as "Mon D, YYYY" (e.g. "Jun 14, 2026"). If not set, ask the user: "What date should appear on this post?" before continuing.
- **description** — first paragraph of the page body (1–2 sentences, used in the post list)
- **body** — full page content in Notion enhanced markdown

### 3. Derive the slug
Lowercase the title, replace spaces with hyphens, strip non-alphanumeric characters
(except hyphens). Example: "FX Liberalisation in Morocco" → `fx-liberalisation-in-morocco`.

### 4. Detect new vs. update
Check whether `src/pages/blog/<slug>.md` exists.
- **Does not exist → new post.** Proceed with steps 5 and 6 as a create.
- **Exists → update.** Use branch name `update/<slug>` and commit message `Update: <title>`.
  In step 5, find and replace the existing `posts.ts` entry for this slug instead of
  inserting. In step 6, overwrite the existing file. Tell the user what changed before
  committing.

### 5. Create the branch
- New post: `git checkout master && git pull && git checkout -b publish/<slug>`
- Update: `git checkout master && git pull && git checkout -b update/<slug>`

### 6. Add or update posts.ts
**New post:** insert a new entry at the **top** of the `posts` array in `src/data/posts.ts`:
```ts
{
  title: "<title>",
  href: "/blog/<slug>",
  date: "<formatted date>",
  description: "<description>",
  tags: [<tags>],
},
```
**Update:** find the existing entry whose `href` matches `/blog/<slug>` and replace only
the fields that changed. Leave unchanged fields as-is.

### 7. Write the page file
**New post:** create `src/pages/blog/<slug>.md`.
**Update:** overwrite `src/pages/blog/<slug>.md`.

Template:

```md
---
layout: ../../layouts/Layout.astro
title: "<title> — Nacer Benallou"
description: "<description>"
---

<a href="/blog" class="back-link">← Blog</a>

<header class="article-head">
  <div class="article-kicker"><tags joined by " · "> · <date></div>
  <h1><title></h1>
</header>

<article class="article-body">

[converted body here]

</article>
```

**Content conversion rules:**
- Notion `$...$` and `$$...$$` math → kept as-is (remark-math handles them)
- Notion callouts → blockquote (`> text`)
- Notion code blocks → fenced code blocks with language hint
- Notion dividers → `---`
- Everything else is standard markdown — headings, bold, italic, links, lists

### 8. Build check
Run `npm run build` and confirm it passes before committing.

### 9. Commit and open PR
```
git add src/data/posts.ts src/pages/blog/<slug>.md
git commit -m "Publish: <title>"   # or "Update: <title>" for updates
git push -u origin publish/<slug>   # or update/<slug>
gh pr create --title "Publish: <title>" --body "..."
```

### 10. Update Notion
- Set the Content DB entry **Status → Published**
- Paste the PR URL into a comment or the Notes field

### Conventions (remind the user if violated)
- Math must be written as `$...$` (inline) or `$$...$$` (display) in the Notion page body
- Images are not yet supported (no image pipeline in v1) — flag any image blocks and skip them
- If Target date is missing, the command will ask for it before writing any files
