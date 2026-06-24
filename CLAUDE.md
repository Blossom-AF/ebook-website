# CLAUDE.md

Project guide and self-learning memory for the **$10K Message** ebook waitlist site.
Read this file fully at the start of every session before making changes.

---

## 1. What this project is

A single-page waitlist website for **Blossom Affia's** free ebook, **The $10K Message** (how she closed $10,000 in LinkedIn clients in 5 days).

A visitor lands on the page, fills a short form (name, phone, email, role), the lead is saved, and the visitor is redirected to Blossom's WhatsApp to request the ebook.

- **Client / owner:** Blossom Affia (LinkedIn coach and ebook creator)
- **Built and maintained by:** Tomide Williams
- **Live domain:** playbook.blossomaffia.site
- **This is Blossom's project, not Tomide's.** It lives in her GitHub org and her Vercel scope. Keep her branding, her accounts, and her credentials. Never mix in Tomide's GHL, sheets, or brand.

---

## 2. Stack and structure

- **Framework:** Next.js 14.2.3 (App Router)
- **Language:** TypeScript, React 18
- **Hosting:** Vercel (scope `blossom-afs-projects`)
- **Source control:** GitHub `Blossom-AF/ebook-website`, default branch `master`
- **Fonts:** Syne (display) and Outfit (body) via `next/font/google`
- **Brand colours:** gold `#D4B200`, near-black `#0D0B08`

```
app/
  layout.tsx              Root layout, fonts, metadata, gold body background
  page.tsx                The full waitlist page (client component, ~440 lines)
  api/waitlist/route.ts   POST endpoint, saves lead to Google Sheet
public/
  10k-message-ebook.html  The ebook (HTML)
  10k-message-ebook.pdf   The ebook (PDF)
  favicon.svg             Blossom mark
.github/workflows/deploy.yml   GitHub Actions deploy to Vercel
project-memory/           Self-learning memory (see section 7)
```

### Commands

- `npm run dev` local dev server
- `npm run build` production build
- `npm run start` serve production build

---

## 3. Lead capture flow

1. Visitor opens `app/page.tsx`, clicks the CTA, the form reveals.
2. On submit, the form POSTs `{ name, phone, email, role }` to `/api/waitlist`.
3. `app/api/waitlist/route.ts` validates all four fields, then appends a row to the Google Sheet.
4. The visitor is redirected to WhatsApp.

### Google Sheet

- **Sheet ID:** `1gm8eB2CJmSe-ABTuDnwk1jGsnoW9EwpkAC768va80sE`
- **Tab:** `Submissions`, columns A:E = timestamp, name, phone, email, role
- Auth uses a Google Workspace OAuth refresh token exchanged for an access token at request time. See `GOOGLE_WORKSPACE_CLI_CREDENTIALS_JSON` in section 5.

### WhatsApp redirect

- **Number:** `2347037649904` (Blossom)
- Pre-filled message asks the visitor to save her contact as "Blossom" and request the $10K Framework ebook.

---

## 4. GHL integration (Blossom's sub-account)

**Status: planned, not yet wired into `app/api/waitlist/route.ts`.**

Blossom has her own GoHighLevel sub-account. The waitlist should also create the lead in her GHL, tag it, and let a GHL workflow send the welcome email.

- **GHL Location ID:** `ld6RKqi9ZSXAtErW5WTJ`
- **PIT token:** stored as an env var only, never in the repo (see section 5)
- **Intended scope of the token:** add contacts, tag contacts, send email. Nothing else.
- **PIT scopes to tick when creating the token in her sub-account:** `contacts.readonly`, `contacts.write`, and `workflows.readonly` (so a tag can trigger her welcome-email workflow). Add `locations/tags.write` only if the token must create new tags.
- **Pattern to copy:** the `addToGHL` function in Tomide's master-ai landing app (`projects/tomide-content/books/master-ai-like-a-baby/ebook-landing-app/api/subscribe.js` in the assistant repo). Same REST call to `https://services.leadconnectorhq.com/contacts/`, version header `2021-07-28`, with Blossom's token and Location ID, and a tag like `10k-message-ebook`.

When wired, the GHL call should be best-effort (wrapped so a GHL failure never blocks the sheet write or the WhatsApp redirect).

---

## 5. Secrets and environment variables

**Never commit a secret. `.env` and `.env.local` are gitignored. Keep them that way.**

The repo references variable names only. Real values live in two places: `.env.local` for local dev, and the Vercel project Environment Variables for production.

| Variable | Purpose |
|---|---|
| `GOOGLE_WORKSPACE_CLI_CREDENTIALS_JSON` | Google OAuth creds (client_id, client_secret, refresh_token) for the Sheets write |
| `GHL_PIT_TOKEN` | Blossom's GHL Private Integration token (when GHL is wired) |
| `GHL_LOCATION_ID` | `ld6RKqi9ZSXAtErW5WTJ` |
| `VERCEL_TOKEN` | GitHub Actions deploy token, stored as a GitHub Actions **secret**, not in code |

If a secret is ever pasted into a tracked file, treat it as leaked: rotate it and scrub history.

---

## 6. Deployment

- Push to `master` triggers `.github/workflows/deploy.yml`.
- The workflow pulls, builds, and deploys to Vercel using `VERCEL_TOKEN` and scope `blossom-afs-projects`.
- Production env vars must be set in the Vercel project, not only in `.env.local`, or the deployed API will fail.

---

## 7. Self-learning protocol (read and follow every session)

This project keeps its own memory in `project-memory/`. The point is that each session gets smarter without Tomide re-explaining. Treat these files as living and update them as part of the work, not as an afterthought.

### At the start of a session
1. Read this `CLAUDE.md`.
2. Read `project-memory/context/current-state.md` to see where things stand.
3. Skim `project-memory/decisions/decision-log.md` and `project-memory/lessons/lessons-learned.md` so you do not repeat a settled decision or a known mistake.

### During the session
- When you hit a non-obvious fact, constraint, or gotcha, capture it immediately in the right file rather than trusting memory.

### At the end of a session, update memory when any of these happened
- **Shipped or changed something** logged in `project-memory/changelogs/changelog.md` and reflected in `current-state.md`.
- **Made a real decision** (a choice with trade-offs) appended to `decisions/decision-log.md`.
- **Hit a failure or dead end** recorded in `failures/failure-log.md` with the cause.
- **Learned a lesson or a reusable trick** added to `lessons/lessons-learned.md` or `workflows/workflow-library.md`.

### Memory rules
- One fact per entry, dated, plain English. British English spelling.
- Convert "today / next week" into absolute dates.
- Do not record what the code already makes obvious. Record the *why*, the constraint, the thing a fresh session would get wrong.
- Never write a secret into memory. Reference the env-var name instead.
- If a memory turns out to be wrong, fix or delete it. Stale memory is worse than none.

---

## 8. Working rules

- This is Blossom's site. Keep her brand voice, her accounts, her data separate from Tomide's other projects.
- Keep the waitlist resilient: a failure in any one integration (sheet, GHL, email) must never block the others or the WhatsApp redirect.
- No secrets in the repo, ever.
- Before changing the lead flow, check `current-state.md` and the decision log first.
