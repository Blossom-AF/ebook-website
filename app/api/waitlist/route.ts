import { NextResponse } from 'next/server'

const SHEET_ID = '1gm8eB2CJmSe-ABTuDnwk1jGsnoW9EwpkAC768va80sE'

// Tag applied to every waitlist lead in GHL.
// Build the welcome-email workflow on this exact tag so it fires the moment the tag is added.
const GHL_TAG = '10k-message-ebook'

type Lead = { name: string; phone: string; email: string; role: string }

// Adds (or updates) the contact in Blossom's GHL sub-account and applies the tag.
// Best-effort: a GHL failure must never lose the lead or block the response.
async function addToGHL(lead: Lead): Promise<void> {
  const pit = process.env.GHL_PIT_TOKEN
  const locationId = process.env.GHL_LOCATION_ID

  if (!pit || !locationId) {
    console.warn('GHL not configured (missing GHL_PIT_TOKEN or GHL_LOCATION_ID), skipping sync')
    return
  }

  // upsert: creates a new contact or updates an existing one, and applies the tag either way.
  // Using upsert (not create) means repeat submissions do not error on duplicate.
  const res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pit}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId,
      firstName: lead.name,
      email: lead.email,
      phone: lead.phone,
      tags: [GHL_TAG],
      source: 'The $10K Message waitlist',
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`GHL upsert failed (${res.status}): ${JSON.stringify(err)}`)
  }
}

async function getAccessToken(): Promise<string> {
  const creds = JSON.parse(process.env.GOOGLE_WORKSPACE_CLI_CREDENTIALS_JSON || '{}')
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: creds.refresh_token,
      grant_type: 'refresh_token',
    }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`Token refresh failed: ${JSON.stringify(json)}`)
  return json.access_token
}

export async function POST(req: Request) {
  try {
    const { name, phone, email, role } = await req.json()

    if (!name || !phone || !email || !role) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const token = await getAccessToken()

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Submissions!A:E:append?valueInputOption=RAW&insertDataOption=OVERWRITE`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [[timestamp, name, phone, email, role]] }),
      }
    )

    const appendJson = await appendRes.json()
    if (!appendRes.ok) throw new Error(`Sheet append failed: ${JSON.stringify(appendJson)}`)

    // Best-effort GHL sync. Logged on failure, never blocks the lead capture or the redirect.
    try {
      await addToGHL({ name, phone, email, role })
    } catch (ghlErr) {
      console.error('GHL sync error:', ghlErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
