# Changelog

Newest first. Format: `[YYYY-MM-DD] what changed`

[2026-06-24] Wired GHL into the waitlist API: after the sheet append, `addToGHL` upserts the contact in Blossom's sub-account and applies tag `10k-message-ebook`. Best-effort, never blocks the response. Token via `GHL_PIT_TOKEN` env var. Email handled by a GHL workflow Blossom builds on the tag (Route A).
[2026-06-24] Added CLAUDE.md (project guide + self-learning protocol) and seeded project-memory structure.
