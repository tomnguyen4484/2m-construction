'use client';
import { useState } from 'react';
import Link from 'next/link';

type PaintType = 'interior_walls' | 'exterior' | 'epoxy_floor';

const TYPES: Record<PaintType, { label: string; icon: string; basePer: number; desc: string; placeholder: string }> = {
  interior_walls: { label: 'Interior Walls',     icon: '🏠', basePer: 2.25, desc: 'Walls only · Standard paint · 2 coats', placeholder: 'e.g. 1200' },
  exterior:       { label: 'Exterior Painting',   icon: '🏡', basePer: 3.15, desc: 'All exterior surfaces · 2 coats',         placeholder: 'e.g. 2000' },
  epoxy_floor:    { label: 'Epoxy Floor Coating', icon: '⬜', basePer: 4.50, desc: 'Garage / basement floors · 2 coats',       placeholder: 'e.g. 500'  },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function PaintingEstimator() {
  const [type, setType]           = useState<PaintType>('interior_walls');
  const [size, setSize]           = useState('');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]           = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]           = useState(false);

  const s         = Number(size) || 0;
  const total     = s * TYPES[type].basePer;
  const hasResult = s > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Painting', estimate: fmt(total), note: form.note }),
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
        🎨 Painting Estimator
      </h1>

      {/* Disclaimer */}
      <div style={{ background:'#FFFBEB', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'20px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:700 }}>Estimated Prices — Not Final Quote</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0', lineHeight:1.5 }}>
            Market estimates for Huntsville, AL · 2026. Actual cost depends on surface condition. Final quote confirmed on-site.
          </p>
        </div>
      </div>

      {/* Spec badge */}
      <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:'10px', padding:'12px 16px', marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', color:'#1E40AF', fontWeight:700, margin:'0 0 6px' }}>📋 Included in all estimates</p>
        <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
          <span style={{ fontSize:'13px', color:'#1D4ED8' }}>🎨 Standard quality paint</span>
          <span style={{ fontSize:'13px', color:'#1D4ED8' }}>🖌️ 2 coats (1 base + 1 color)</span>
          <span style={{ fontSize:'13px', color:'#1D4ED8' }}>🧹 Prep & clean-up included</span>
        </div>
      </div>

      {/* Service type */}
      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>
          What needs painting?
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8px' }}>
          {(Object.entries(TYPES) as [PaintType, typeof TYPES[PaintType]][]).map(([key, info]) => (
            <button key={key} onClick={() => { setType(key); setSize(''); }}
              style={{ padding:'14px 16px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: type===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: type===key ? '#EFF6FF' : '#fff',
                display:'flex', alignItems:'center', gap:'14px' }}>
              <span style={{ fontSize:'26px' }}>{info.icon}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'14px', color: type===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
                <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
                <div style={{ fontSize:'12px', color: type===key ? '#1A3A5C' : '#94A3B8', fontWeight:600, marginTop:'4px' }}>
                  ~{fmt(info.basePer)}/sq ft
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Size input */}
      <div style={{ marginBottom:'28px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Area (square feet)
        </label>
        <input
          type="number" inputMode="numeric" value={size}
          onChange={e => setSize(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder={TYPES[type].placeholder}
        />
        {type === 'interior_walls' && (
          <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>Tip: wall width × height for each room, add together. Average bedroom ≈ 400–500 sq ft walls</p>
        )}
        {type === 'exterior' && (
          <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>Tip: perimeter × wall height. Average 1,500 sq ft home ≈ 2,000 sq ft exterior</p>
        )}
        {type === 'epoxy_floor' && (
          <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>Tip: standard 2-car garage ≈ 400–500 sq ft</p>
        )}
      </div>

      {/* Result */}
      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 8px' }}>Estimate Breakdown</h2>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', margin:'0 0 16px' }}>
            {TYPES[type].label} · Standard paint · 2 coats · {size} sq ft
          </p>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>{size} sq ft × {fmt(TYPES[type].basePer)}/sq ft</span>
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

          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>
            * Estimate based on Huntsville, AL market rates 2026. Final quote confirmed on-site.
          </p>
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
            placeholder="Any additional details..." />
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
