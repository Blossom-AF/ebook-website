# Changelog

Newest first. Format: `[YYYY-MM-DD] what changed`

[2026-06-27] Added an email-consent opt-in checkbox to the waitlist form. Default checked, not required to submit. State `emailOptIn` in `WaitlistModal`, posted as `emailConsent`. API stores it as Yes/No in Submissions column F (added "Email Consent" header to F1), append range widened A:E to A:F. Consenting leads also get GHL tag `email-opt-in` (in addition to `10k-message-ebook`) so newsletter workflows only target people who opted in. Build passes.
[2026-06-24] Wired GHL into the waitlist API: after the sheet append, `addToGHL` upserts the contact in Blossom's sub-account and applies tag `10k-message-ebook`. Best-effort, never blocks the response. Token via `GHL_PIT_TOKEN` env var. Email handled by a GHL workflow Blossom builds on the tag (Route A).
[2026-06-24] Added CLAUDE.md (project guide + self-learning protocol) and seeded project-memory structure.
