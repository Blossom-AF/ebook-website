# Lessons Learned

Reusable insights and gotchas. Format: `[YYYY-MM-DD] lesson`

[2026-06-24] The Google Sheets write uses the gws OAuth refresh-token pattern (refresh token exchanged for an access token at request time), not a service account. Creds come from `GOOGLE_WORKSPACE_CLI_CREDENTIALS_JSON`. Same pattern as Tomide's other lead-capture sites.

[2026-06-24] Production env vars must be set in the Vercel project, not only in `.env.local`. A var that works locally will fail on the deployed API if it is missing in Vercel.

[2026-06-24] GHL emails landing in spam (vs promotions on another account) is a sender authentication and reputation problem, not content. Fix: in GHL, set up a dedicated sending domain on a subdomain of the brand domain that matches the public site (blossomaffia.site, since the waitlist is playbook.blossomaffia.site). Add the SPF, DKIM, and tracking DNS records GHL gives, plus a DMARC record, and confirm all show verified. Send the From address on that authenticated domain, never from a @gmail.com address (that fails DMARC and gets spammed). Then warm up the new domain with gradual volume. The account that lands in promotions already has an authenticated, reputable domain; that is the whole difference.
