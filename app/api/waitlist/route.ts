import { NextResponse } from 'next/server'

const SHEET_ID = '1gm8eB2CJmSe-ABTuDnwk1jGsnoW9EwpkAC768va80sE'

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

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
