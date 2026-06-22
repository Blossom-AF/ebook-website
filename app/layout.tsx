import type { Metadata } from 'next'
import { Syne, Outfit } from 'next/font/google'

const syne   = Syne({ subsets: ['latin'], variable: '--font-syne',   display: 'swap' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })

export const metadata: Metadata = {
  title: 'The $10K Message — Blossom Affia',
  description: 'How I closed $10,000 in LinkedIn clients in 5 days. Join the waitlist for the free ebook.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body style={{ margin: 0, padding: 0, background: '#D4B200' }}>{children}</body>
    </html>
  )
}
