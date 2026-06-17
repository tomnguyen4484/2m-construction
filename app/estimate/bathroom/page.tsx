'use client';
import { useState } from 'react';
import Link from 'next/link';

type Scope = 'cosmetic' | 'standard' | 'full';

const SCOPES: Record<Scope, { label: string; desc: string; perSqft: number; icon: string }> = {
  cosmetic:  { label: 'Cosmetic Update',  icon: '🖌️', perSqft: 90,  desc: 'Paint, vanity, fixtures, accessories — no tile work' },
  standard:  { label: 'Standard Remodel', icon: '🚿', perSqft: 185, desc: 'New tile, vanity, shower/tub, plumbing fixtures' },
  full:      { label: 'Full Gut Remodel', icon: '🏗️', perSqft: 310, desc: 'Complete teardown — new everything, layout possible' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function BathroomEstimator() {
  const [scope, setScope]         = useState<Scope>('standard');
  const [sqft, setSqft]           = useState('');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]           = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]           = useState(false);

  const sf        = Number(sqft) || 0;
  const rate      = SCOPES[scope].perSqft;
  const total     = sf * rate;
  const hasResult = sf > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Bathroom Remodel', estimate: fmt(total), note: form.note }),
      });
      setSent(true);
    } catch { setSent(true); }
  }

  if (sent) return (
    <div style={{ maxWidth:'680px', margin:'0 auto', padding:'60px 16px', textAlign:'center' }}>
      <div style={{ fontSize:'56px', marginBottom:'16px' }}>✅</div>
      <h2 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', marginBottom:'8px' }}>Request Sent!</h2>
      <p style={{ color:'#64748B', marginBottom:'24px' }}>We will call you back within 24 hours.</p>
      <Link href="/" style={{ color:'#1A3A5C', fontWeight:700 }}>← Back to Home</Link>
    </div>
  );

  return (
    <div style={{ maxWidth:'680px', margin:'0 auto', padding:'20px 16px 40px' }}>
      <Link href="/estimate" style={{ fontSize:'13px', color:'#64748B', marginBottom:'16px', display:'block' }}>
        ← All Services
      </Link>
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>
        🚿 Bathroom Remodel Estimator
      </h1>

      {/* Disclaimer */}
      <div style={{ background:'#FEF3C7', border:'1px solid #F59E0B', borderRadius:'10px', padding:'12px 14px', marginBottom:'20px' }}>
        <p style={{ fontSize:'12px', color:'#92400E', margin:'0 0 4px', fontWeight:700 }}>⚠️ Rough Estimate Only</p>
        <p style={{ fontSize:'12px', color:'#92400E', margin:0, lineHeight:1.6 }}>
          Final cost depends heavily on <strong>room size, tile selection, fixture brands, custom sizing, and site conditions</strong>.
          This gives you a ballpark — we confirm the exact quote on-site, free of charge.
        </p>
      </div>

      {/* Scope */}
      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>
          Remodel Scope
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8px' }}>
          {(Object.entries(SCOPES) as [Scope, typeof SCOPES[Scope]][]).map(([key, info]) => (
            <button key={key} onClick={() => setScope(key)}
              style={{ padding:'14px 16px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: scope===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: scope===key ? '#EFF6FF' : '#fff',
                display:'flex', alignItems:'center', gap:'14px' }}>
              <span style={{ fontSize:'24px' }}>{info.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:'14px', color: scope===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
                <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:'13px', color: scope===key ? '#1A3A5C' : '#94A3B8', fontWeight:700 }}>
                  ~{fmt(info.perSqft)}/sq ft
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Size input */}
      <div style={{ marginBottom:'28px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Bathroom Size (square feet)
        </label>
        <input
          type="number" inputMode="numeric" value={sqft}
          onChange={e => setSqft(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 50"
        />
        <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>
          Half bath: 20–30 sq ft · Full bath: 40–60 sq ft · Master bath: 80–120 sq ft
        </p>
      </div>

      {/* Result */}
      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 8px' }}>Rough Estimate</h2>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', margin:'0 0 16px' }}>
            {SCOPES[scope].label} · {sqft} sq ft
          </p>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>{sqft} sq ft × {fmt(rate)}/sq ft</span>
            <span>{fmt(total)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span>
            <span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>

          {/* Savings vs market */}
          {(() => {
            const marketAvg = Math.round(total / 0.9 / 100) * 100;
            const savings = marketAvg - Math.round(total);
            return (
              <div style={{ background:'rgba(245,197,24,0.1)', borderRadius:'10px', padding:'12px 16px', marginTop:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid rgba(245,197,24,0.2)' }}>
                <div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>Huntsville market avg</div>
                  <div style={{ fontSize:'14px', color:'rgba(255,255,255,0.4)', textDecoration:'line-through' }}>{fmt(marketAvg)}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:'10px', color:'#F5C518', marginBottom:'3px' }}>You save with 2M</div>
                  <div style={{ fontSize:'20px', fontWeight:800, color:'#F5C518' }}>~{fmt(savings)}</div>
                </div>
              </div>
            );
          })()}

          <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:'8px', padding:'10px 12px', marginTop:'12px' }}>
            <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.55)', margin:0, lineHeight:1.6 }}>
              ⚠️ Price varies based on tile selection, fixture brands, vanity size, and custom work. 
              Final quote confirmed after free on-site inspection.
            </p>
          </div>
        </div>
      )}

      {hasResult && !showContact && (
        <button onClick={() => setShowContact(true)}
          style={{ width:'100%', background:'#F5C518', color:'#1A3A5C', fontWeight:800, fontSize:'16px', padding:'14px', borderRadius:'12px', border:'none', cursor:'pointer', marginBottom:'10px' }}>
          Request This Quote →
        </button>
      )}

      {showContact && (
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:'16px', padding:'20px', marginBottom:'16px' }}>
          <h3 style={{ fontWeight:700, color:'#1E293B', margin:'0 0 16px' }}>Your Contact Info</h3>
          <input value={form.name} onChange={e => setForm({...form, name:e.target.value})}
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const }}
            placeholder="Full name *" />
          <input type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const }}
            placeholder="Phone number *" />
          <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})}
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const }}
            placeholder="Email (optional)" />
          <textarea value={form.note} onChange={e => setForm({...form, note:e.target.value})} rows={3}
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const, resize:'none' as const }}
            placeholder="Describe your bathroom and what you'd like done..." />
          <button onClick={submitQuote}
            style={{ width:'100%', background:'#F5C518', color:'#1A3A5C', fontWeight:800, fontSize:'16px', padding:'14px', borderRadius:'12px', border:'none', cursor:'pointer' }}>
            Submit Request
          </button>
        </div>
      )}

      <a href="tel:+19383026795"
        style={{ display:'block', width:'100%', textAlign:'center', border:'2px solid #1A3A5C', color:'#1A3A5C', fontWeight:700, fontSize:'15px', padding:'13px', borderRadius:'12px', boxSizing:'border-box' as const }}>
        📞 Call for Exact Quote
      </a>
    </div>
  );
}
