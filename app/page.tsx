'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'

const SHEET_ID = '1gm8eB2CJmSe-ABTuDnwk1jGsnoW9EwpkAC768va80sE'
const WA_NUMBER = '2347037649904'
const WA_MSG    = encodeURIComponent('Hi Blossom, I would like to join the waitlist for your free $10K Framework ebook. I will save your contact as Blossom now.')
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`

const BlossomIcon = ({ size = 36, fill = '#0D0B08' }: { size?: number; fill?: string }) => (
  <svg viewBox="0 0 89.37 89.37" width={size} height={size} aria-hidden style={{ display: 'block', flexShrink: 0 }}>
    <path fill={fill} d="M44.92,27.61c-1.89-1.89-4.41-2.94-7.08-2.94H15.07v20.04h22.76c3.31,0,6.4-1.63,8.27-4.37,1.14-1.67,1.75-3.62,1.75-5.65,0-2.68-1.04-5.19-2.94-7.09ZM39.23,38.39c-.45.17-.92.26-1.4.26h-16.69v-7.91h16.69c2.18,0,3.95,1.77,3.95,3.95,0,1.63-1.03,3.11-2.55,3.7Z"/>
    <path fill={fill} d="M81.35,62.67h-1.31l-19.79-.02-3.64-4.97-1.09-1.49h13.08s-16.6-22.63-16.6-22.63c-.17-.22-.39-.26-.51-.26s-.34.04-.51.26l-1.66,2.27c.04-.37.06-.75.06-1.14,0-2.49-.78-4.85-2.23-6.82l1.18-1.6c.74-1.02,1.9-1.6,3.16-1.6h0c1.27,0,2.42.58,3.17,1.61l.39.53,25.54,34.82.77,1.05Z"/>
    <path fill={fill} d="M44.68,0C20.05,0,0,20.05,0,44.68s20.05,44.69,44.68,44.69,44.69-20.05,44.69-44.69S69.32,0,44.68,0ZM44.68,82.57c-13.83,0-26.74-7.76-33.33-19.89h30.81c4.06,0,7.67-1.97,9.89-4.98.35-.47.66-.97.94-1.49.88-1.66,1.38-3.54,1.38-5.54,0-4.43-2.46-8.46-6.36-10.55-.2.37-.41.74-.66,1.09-1.18,1.72-2.78,3.07-4.62,3.93,2.88.28,5.1,2.66,5.1,5.53,0,3.06-2.54,5.56-5.67,5.56H8.61c-1.2-3.74-1.81-7.61-1.81-11.54,0-6.64,1.71-12.89,4.73-18.32.61-1.1,1.27-2.17,1.99-3.21C20.37,13.28,31.78,6.8,44.68,6.8c20.89,0,37.89,16.99,37.89,37.88,0,6.09-1.45,11.85-4.01,16.95-.17.35-.35.7-.55,1.05-6.41,11.84-18.95,19.89-33.33,19.89Z"/>
  </svg>
)

const SYNE:   CSSProperties = { fontFamily: 'var(--font-syne), sans-serif' }
const OUTFIT: CSSProperties = { fontFamily: 'var(--font-outfit), sans-serif' }

function Counter({ target, fmt }: { target: number; fmt: (v: number) => string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf: number
    const delay = window.setTimeout(() => {
      const t0 = performance.now()
      const run = (now: number) => {
        const p = Math.min((now - t0) / 1600, 1)
        const e = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(e * target))
        if (p < 1) raf = requestAnimationFrame(run)
      }
      raf = requestAnimationFrame(run)
    }, 300)
    return () => { clearTimeout(delay); cancelAnimationFrame(raf) }
  }, [target])
  return <>{fmt(val)}</>
}

const ROLES = [
  'Freelancer',
  'Executive',
  'Coach',
  'Consultant',
  'Business Owner',
  'Career Professional',
  'Student',
  'Other',
]

export default function WaitlistPage() {
  const statsRef  = useRef<HTMLDivElement>(null)
  const cardsRef  = useRef<HTMLDivElement>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const count = window.innerWidth < 600 ? 10 : 20
    const container = document.getElementById('wl-particles')
    if (!container) return
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 4 + 2
      p.style.cssText = `
        position:absolute;border-radius:50%;
        background:#D4B200;opacity:0;
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        animation:wlDrift linear infinite;
        animation-duration:${7 + Math.random() * 9}s;
        animation-delay:${Math.random() * 9}s;
      `
      container.appendChild(p)
    }
  }, [])

  const stats = [
    { target: 100, fmt: (v: number) => `${v}K+`,  label: 'LinkedIn followers', gold: true  },
    { target: 50,  fmt: (v: number) => `${v}+`,   label: 'Weekly leads generated', gold: false },
    { target: 45,  fmt: (v: number) => `${v}+`,   label: 'High-ticket clients', gold: false },
    { target: 50,  fmt: (v: number) => `${v}+`,   label: 'Countries reached',   gold: false },
  ]

  const features = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      title: 'The $10K Framework',
      desc: 'The exact message structure Blossom used to close $10,000 in LinkedIn clients in 5 days — broken down step by step so you can copy it.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
      title: 'Profile to Pipeline',
      desc: 'How to position your LinkedIn profile so that the right people reach out to you first — before you even send a single DM.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      title: '25 Word-for-Word DM Scripts',
      desc: 'Real messages you can send today. Each one is designed to start a real conversation and move it towards a paid engagement — without feeling salesy.',
    },
  ]

  return (
    <>
      <style suppressHydrationWarning>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes wlDrift {
          0%   { transform: translateY(100vh) scale(0); opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        @keyframes wlSlideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

        .wl-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 0;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .wl-nav.scrolled {
          background: #D4B200;
          box-shadow: 0 1px 0 rgba(0,0,0,0.1);
          padding: 14px 0;
        }
        .wl-nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 48px;
          display: flex; align-items: center; gap: 32px;
        }
        @media (max-width: 600px) { .wl-nav-inner { padding: 0 24px; } }

        .wl-logo { display:flex; align-items:center; gap:10px; text-decoration:none; margin-right:auto; }
        .wl-logo-text { font-family:var(--font-syne),sans-serif; font-size:17px; font-weight:700; letter-spacing:-0.01em; color:#0D0B08; }

        .wl-enrol-btn {
          font-family:var(--font-outfit),sans-serif; font-size:13px; font-weight:700;
          padding: 9px 20px; border-radius: 100px; border: none; cursor: pointer;
          background: #0D0B08; color: #D4B200;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .wl-enrol-btn:hover { opacity: 0.85; transform: scale(1.02); }
        @media (max-width: 400px) { .wl-nav-enrol { display: none; } }

        .wl-hero {
          background: #D4B200;
          padding: 160px 0 100px;
          position: relative; overflow: hidden;
        }
        @media (max-width: 600px) { .wl-hero { padding: 120px 0 72px; } }

        .wl-hero-title {
          font-size: clamp(44px, 6.5vw, 84px);
          font-weight: 800; line-height: 1.0;
          letter-spacing: -0.03em; color: #0D0B08;
          margin: 0 0 28px;
          animation: wlSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }
        .wl-hero-sub {
          font-size: 17px; line-height: 1.65;
          color: rgba(13,11,8,0.65);
          max-width: 500px; margin: 0 0 0;
          animation: wlSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both;
        }

        .wl-stats-section { background: #0D0B08; padding: 96px 0; }
        .wl-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        @media (max-width: 600px) { .wl-stats-grid { grid-template-columns: 1fr; } }

        .wl-stat-card {
          background: #161210; padding: 32px 28px;
          border-left: 3px solid #2A2520;
          display: flex; flex-direction: column; gap: 10px;
          transition: border-color 0.2s;
        }
        .wl-stat-card:hover { border-color: #D4B200; }
        .wl-stat-card.gold  { border-color: #D4B200; background: #1A1500; }
        .wl-stat-num { font-size: clamp(36px, 4vw, 52px); font-weight: 800; line-height: 1; color: #D4B200; }
        .wl-stat-lbl { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.4); }

        .wl-features-section { background: #0D0B08; padding: 0 0 96px; }
        .wl-section-title {
          font-size: clamp(28px, 3.5vw, 44px); font-weight: 700;
          line-height: 1.12; color: #fff; margin: 0 0 48px;
          letter-spacing: -0.02em;
        }
        .wl-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2px; }
        .wl-card {
          background: #161210; padding: 36px 32px;
          border-left: 3px solid #2A2520;
          transition: border-color 0.2s, background 0.2s;
        }
        .wl-card:hover { border-color: #D4B200; background: #1A1500; }
        .wl-card-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(212,178,0,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #D4B200; margin-bottom: 20px;
        }
        .wl-card-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .wl-card-desc  { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.45); }

        .wl-footer { background: #0D0B08; border-top: 1px solid rgba(255,255,255,0.06); padding: 40px 0; }
        .wl-footer-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 48px;
          display: flex; flex-wrap: wrap; gap: 16px;
          align-items: center; justify-content: space-between;
        }
        @media (max-width: 600px) { .wl-footer-inner { padding: 0 24px; flex-direction: column; } }

        .wl-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        @media (max-width: 600px) { .wl-inner { padding: 0 24px; } }

        @media (max-width: 600px) {
          .wl-stats-section { padding: 64px 0; }
          .wl-features-section { padding: 0 0 64px; }
          .wl-section-title { margin: 0 0 32px; }
          .wl-stat-card { padding: 24px 20px; }
          .wl-card { padding: 28px 20px; }
        }
        .wl-footer-link { font-size:13px; color:rgba(255,255,255,0.35); text-decoration:none; transition:color 0.2s; }
        .wl-footer-link:hover { color:#D4B200; }

        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, select:focus { border-color: rgba(212,178,0,0.5) !important; }
      `}</style>

      <div id="wl-particles" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} />

      {showForm && <WaitlistModal onClose={() => setShowForm(false)} />}

      <NavBar />

      <section className="wl-hero">
        <div className="wl-inner" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="wl-hero-title" style={{ ...SYNE }}>
            The $10K<br />Message.
          </h1>
          <p className="wl-hero-sub" style={{ ...OUTFIT }}>
            How I closed $10,000 in LinkedIn clients in 5 days using one simple framework. The gap between 2 impressions and #1 in the world is not talent or luck — it is a system.
          </p>
          <div style={{ marginTop: 36, animation: 'wlSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}>
            <button onClick={() => setShowForm(true)} className="wl-enrol-btn" style={{ fontSize: 15, padding: '13px 28px' }}>
              Join the Waitlist &rarr;
            </button>
          </div>
        </div>
      </section>

      <section className="wl-stats-section">
        <div className="wl-inner">
          <div ref={statsRef}>
            <h2 className="wl-section-title" style={{ ...SYNE }}>Results that speak.</h2>
            <div className="wl-stats-grid">
              {stats.map(({ target, fmt, label, gold }) => (
                <div key={label} className={`wl-stat-card${gold ? ' gold' : ''}`}>
                  <span className="wl-stat-num" style={{ ...SYNE }}><Counter target={target} fmt={fmt} /></span>
                  <span className="wl-stat-lbl" style={{ ...OUTFIT }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wl-features-section">
        <div className="wl-inner">
          <div ref={cardsRef}>
            <h2 className="wl-section-title" style={{ ...SYNE }}>What you will learn.</h2>
            <div className="wl-cards-grid">
              {features.map(({ icon, title, desc }) => (
                <div key={title} className="wl-card">
                  <div className="wl-card-icon">{icon}</div>
                  <div className="wl-card-title" style={{ ...SYNE }}>{title}</div>
                  <div className="wl-card-desc"  style={{ ...OUTFIT }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="wl-footer">
        <div className="wl-footer-inner">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <BlossomIcon size={24} fill="#D4B200" />
            <span style={{ ...SYNE, fontWeight: 700, fontSize: 15, color: '#D4B200' }}>Blossom Affia</span>
          </a>
          <span style={{ ...OUTFIT, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            &copy; 2025 Blossom Affia. All Rights Reserved.
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" className="wl-footer-link" style={{ ...OUTFIT }}>Privacy</a>
            <a href="#" className="wl-footer-link" style={{ ...OUTFIT }}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={`wl-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wl-nav-inner">
        <a href="/" className="wl-logo">
          <BlossomIcon size={32} fill="#0D0B08" />
          <span className="wl-logo-text" style={{ ...SYNE }}>Blossom Affia</span>
        </a>
      </div>
    </nav>
  )
}

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [name,  setName]  = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [role,  setRole]  = useState('')
  const [busy,  setBusy]  = useState(false)
  const [err,   setErr]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, role }),
      })
      if (!res.ok) throw new Error('Failed')
      window.location.href = WA_URL
    } catch {
      setErr('Something went wrong. Please try again.')
      setBusy(false)
    }
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{
        background: '#0D0B08', borderRadius: 16,
        border: '1px solid rgba(212,178,0,0.2)',
        padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)',
        width: '100%', maxWidth: 480,
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 20,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.35)', fontSize: 22, lineHeight: 1,
        }}>&#x2715;</button>

        <h2 style={{ ...SYNE, fontSize: 22, fontWeight: 700, color: '#D4B200', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Join the Waitlist
        </h2>
        <p style={{ ...OUTFIT, fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 28px', lineHeight: 1.6 }}>
          Get early access to The $10K Message free ebook.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Full Name"      type="text"  value={name}  onChange={setName}  placeholder="e.g. Amara Obi"            required />
          <Field label="WhatsApp Number" type="tel"   value={phone} onChange={setPhone} placeholder="e.g. +234 801 234 5678"    required />
          <Field label="Email Address"  type="email" value={email} onChange={setEmail} placeholder="e.g. amara@email.com"      required />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ ...OUTFIT, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              What best describes you
            </label>
            <select
              required value={role} onChange={e => setRole(e.target.value)}
              style={{
                ...OUTFIT, fontSize: 15, color: role ? '#fff' : 'rgba(255,255,255,0.3)',
                background: '#161210', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '12px 14px', outline: 'none', cursor: 'pointer',
              }}
            >
              <option value="" disabled style={{ color: 'rgba(255,255,255,0.3)', background: '#161210' }}>Select one</option>
              {['Freelancer','Executive','Coach','Consultant','Business Owner','Student','Other'].map(r => (
                <option key={r} value={r} style={{ color: '#fff', background: '#161210' }}>{r}</option>
              ))}
            </select>
          </div>

          {err && <p style={{ ...OUTFIT, fontSize: 13, color: '#ff6b6b', margin: 0 }}>{err}</p>}

          <button type="submit" disabled={busy} style={{
            ...OUTFIT, fontSize: 15, fontWeight: 700,
            background: '#D4B200', color: '#0D0B08',
            border: 'none', borderRadius: 100, padding: '14px 0',
            cursor: busy ? 'not-allowed' : 'pointer',
            opacity: busy ? 0.7 : 1, marginTop: 4,
            transition: 'opacity 0.2s',
          }}>
            {busy ? 'Submitting...' : 'Join Waitlist →'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, type, value, onChange, placeholder, required }: {
  label: string; type: string; value: string
  onChange: (v: string) => void; placeholder: string; required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ ...OUTFIT, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type={type} value={value} required={required} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{
          ...OUTFIT, fontSize: 15, color: '#fff',
          background: '#161210', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: '12px 14px', outline: 'none',
        }}
      />
    </div>
  )
}
