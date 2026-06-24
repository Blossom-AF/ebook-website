# Workflow Library

Repeatable how-to steps for common tasks on this project.

## Wire GHL into the waitlist API
1. Create a Private Integration in Blossom's GHL sub-account (`ld6RKqi9ZSXAtErW5WTJ`). Scopes: `contacts.readonly`, `contacts.write`, `workflows.readonly`.
2. Add `GHL_PIT_TOKEN` and `GHL_LOCATION_ID` to `.env.local` and to the Vercel project env vars.
3. In `app/api/waitlist/route.ts`, after the sheet append, call `https://services.leadconnectorhq.com/contacts/` (POST, `Version: 2021-07-28`, bearer token) with firstName, email, phone, locationId, and `tags: ['10k-message-ebook']`. Wrap it best-effort so a GHL failure never blocks the response.
4. Reference implementation: `addToGHL` in the master-ai landing app (`projects/tomide-content/books/master-ai-like-a-baby/ebook-landing-app/api/subscribe.js` in the assistant repo).

## Deploy a change
1. Commit and push to `master`.
2. GitHub Actions builds and deploys to Vercel automatically. No manual step.
3. If the deployed API misbehaves, check Vercel env vars first.
