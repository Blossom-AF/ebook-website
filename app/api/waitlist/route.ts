import { exec } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'

const run = promisify(exec)

const SHEET_ID = '1gm8eB2CJmSe-ABTuDnwk1jGsnoW9EwpkAC768va80sE'

export async function POST(req: Request) {
  try {
    const { name, phone, email, role } = await req.json()

    if (!name || !phone || !email || !role) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const values = [timestamp, name, phone, email, role]
      .map(v => String(v).replace(/,/g, ' '))
      .join(',')

    await run(`gws sheets +append --spreadsheet "${SHEET_ID}" --values "${values}"`)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
