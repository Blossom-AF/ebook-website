# Current State

Last updated: 2026-06-24

## Status
Live waitlist site for Blossom Affia's ebook "The $10K Message" at playbook.blossomaffia.site.

## Working now
- Next.js 14 single-page waitlist (`app/page.tsx`) with animated UI, Syne and Outfit fonts, gold `#D4B200` brand.
- Form posts name, phone, email, role to `/api/waitlist`.
- Lead saved to Google Sheet `1gm8eB2CJmSe-ABTuDnwk1jGsnoW9EwpkAC768va80sE`, tab `Submissions`, cols A:E.
- Visitor redirected to Blossom's WhatsApp `2347037649904`.
- Ebook served from `public/10k-message-ebook.html` and `.pdf`.
- Auto-deploy to Vercel (scope `blossom-afs-projects`) on push to `master` via GitHub Actions.
- GHL wired: every lead is upserted into Blossom's sub-account (`ld6RKqi9ZSXAtErW5WTJ`) and tagged `10k-message-ebook`. Best-effort, runs after the sheet append.

## Pending (manual, on Blossom's side)
- Add `GHL_PIT_TOKEN` and `GHL_LOCATION_ID` to the Vercel project env vars (currently only in local `.env.local`). Without them the deployed API skips GHL silently.
- Build the GHL workflow triggered by the `10k-message-ebook` tag so the welcome email fires immediately on tag add (Route A).
- Email deliverability: authenticate a sending domain in GHL and send from that domain so emails stop landing in spam (see lessons-learned).
