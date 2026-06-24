# System Overview

Last updated: 2026-06-24

## Flow
1. Visitor opens the single-page site (`app/page.tsx`, client component).
2. CTA reveals the form. Submit posts `{ name, phone, email, role }` to `/api/waitlist`.
3. `app/api/waitlist/route.ts` validates all four fields, refreshes a Google access token from `GOOGLE_WORKSPACE_CLI_CREDENTIALS_JSON`, and appends a row to the Submissions sheet.
4. Visitor is redirected to Blossom's WhatsApp.

## External services
- **Google Sheets** lead store. Sheet `1gm8eB2CJmSe-ABTuDnwk1jGsnoW9EwpkAC768va80sE`, tab `Submissions`.
- **WhatsApp** redirect to `2347037649904`.
- **GHL** (planned) Blossom's sub-account `ld6RKqi9ZSXAtErW5WTJ`, for contact + tag + workflow email.
- **Vercel** hosting, scope `blossom-afs-projects`.
- **GitHub** `Blossom-AF/ebook-website`, branch `master`, Actions deploy.

## Design principle
Each integration is best-effort and isolated. A failure in the sheet write, GHL, or email must never block the WhatsApp redirect or the other integrations.
