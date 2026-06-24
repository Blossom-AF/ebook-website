# Decision Log

Append-only. Format: `[YYYY-MM-DD] DECISION | REASONING | CONTEXT`

[2026-06-24] DECISION: GHL integration lives in this project, under Blossom's own GitHub and Vercel, not in Tomide's assistant project. | REASONING: It is Blossom's site and must push to her repo and her hosting with her accounts. | CONTEXT: Set up while documenting the project.

[2026-06-24] DECISION: GHL credentials are passed only as env vars (`GHL_PIT_TOKEN`, `GHL_LOCATION_ID`), never committed. | REASONING: Committing a bearer token to GitHub leaks it. | CONTEXT: Repo pushes to a remote and auto-deploys.

[2026-06-24] DECISION: Welcome email to be sent by a GHL workflow triggered off a tag, not from the API directly (pending confirmation). | REASONING: Smaller token scope, less code, Blossom controls the email in GHL. | CONTEXT: PIT scope kept to contacts plus workflows.readonly.
