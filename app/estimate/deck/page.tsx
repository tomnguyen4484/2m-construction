'use client';
import { useState } from 'react';
import Link from 'next/link';

type Material = 'pt_pine' | 'composite';
type Railing  = 'none' | 'wood' | 'cable';

const MATERIALS: Record<Material, { label: string; icon: string; perSqft: number; desc: string }> = {
  pt_pine:   { label: 'Pressure-Treated Pine', icon: '🌲', perSqft: 20, desc: 'Budget-friendly, durable, needs stain every 2–3 yrs' },
  composite: { label: 'Composite',             icon: '⬜', perSqft: 31, desc: 'Low maintenance, no painting, 25-yr warranty' },
};

const RAILINGS: Record<Railing, { label: string; perLft: number }> = {
  none:  { label: 'No Railing',    perLft: 0  },
  wood:  { label: 'Wood Railing',  perLft: 22 },
  cable: { label: 'Cable Railing', perLft: 90 },
};

const STAIR_COST = 550;

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function DeckEstimator() {
  const [mat, setMat]             = useState<Material>('pt_pine');
  const [length, setLength]       = useState('');
  const [width, setWidth]         = useState('');
  const [railing, setRailing]     = useState<Railing>('wood');
  const [stairs, setStairs]       = useState<'0'|'1'|'2'>('1');
  const [demo, setDemo]           = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]           = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]           = useState(false);

  const l          = Number(length) || 0;
  const w          = Number(width)  || 0;
  const sqft       = l * w;
  // 3 open sides (deck attached to house on one long side)
  const railingLft = railing !== 'none' ? (l + w * 2) : 0;

  const deckCost    = sqft * MATERIALS[mat].perSqft;
  const railingCost = railingLft * RAILINGS[railing].perLft;
  const stairCost   = Number(stairs) * STAIR_COST;
  const demoCost    = demo === 'yes' ? sqft * 3.6 : 0;
  const total       = deckCost + railingCost + stairCost + demoCost;
  const hasResult   = sqft > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Deck & Patio', estimate: fmt(total), note: form.note }),
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
        🏗️ Deck & Patio Estimator
      </h1>

      <div style={{ background:'#FFFBEB', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'20px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:700 }}>Estimated Prices — Not Final Quote</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0', lineHeight:1.5 }}>
            Market estimates for Huntsville, AL · 2026. Final quote confirmed on-site.
          </p>
        </div>
      </div>

      {/* Custom shape note */}
      <div style={{ background:'#F0FDF4', border:'1px solid #86EFAC', borderRadius:'10px', padding:'12px 14px', marginBottom:'24px', display:'flex', gap:'8px' }}>
        <span style={{ fontSize:'16px' }}>💬</span>
        <p style={{ fontSize:'12px', color:'#166534', margin:0, lineHeight:1.5 }}>
          <strong>Custom / non-rectangular shapes?</strong> L-shape, multi-level, curved — these require an on-site visit.{' '}
          <a href="tel:+19383026795" style={{ color:'#15803D', fontWeight:700 }}>Call (938) 302-6795</a> for a free custom quote.
        </p>
      </div>

      {/* Material */}
      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Material</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(MATERIALS) as [Material, typeof MATERIALS[Material]][]).map(([key, info]) => (
            <button key={key} onClick={() => setMat(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: mat===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: mat===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontSize:'20px', marginBottom:'4px' }}>{info.icon}</div>
              <div style={{ fontWeight:700, fontSize:'13px', color: mat===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px', lineHeight:1.4 }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: mat===key ? '#1A3A5C' : '#94A3B8', fontWeight:700, marginTop:'6px' }}>~{fmt(info.perSqft)}/sq ft</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>
          Deck Size (rectangular)
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          <div>
            <label style={{ display:'block', fontSize:'12px', color:'#64748B', marginBottom:'6px' }}>Length (ft)</label>
            <input type="number" inputMode="numeric" value={length} onChange={e => setLength(e.target.value)}
              style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 14px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
              placeholder="e.g. 20" />
          </div>
          <div>
            <label style={{ display:'block', fontSize:'12px', color:'#64748B', marginBottom:'6px' }}>Width (ft)</label>
            <input type="number" inputMode="numeric" value={width} onChange={e => setWidth(e.target.value)}
              style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 14px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
              placeholder="e.g. 12" />
          </div>
        </div>
        {sqft > 0 && (
          <p style={{ fontSize:'12px', color:'#1A3A5C', fontWeight:700, margin:'8px 0 0' }}>
            = {sqft} sq ft
          </p>
        )}
      </div>

      {/* Railing */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Railing</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
          {(Object.entries(RAILINGS) as [Railing, typeof RAILINGS[Railing]][]).map(([key, info]) => (
            <button key={key} onClick={() => setRailing(key)}
              style={{ padding:'11px 8px', borderRadius:'10px', textAlign:'center', cursor:'pointer',
                border: railing===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: railing===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: railing===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              {info.perLft > 0 && <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>~{fmt(info.perLft)}/lft</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Stairs */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>
          Stairs <span style={{ fontWeight:400, color:'#64748B' }}>(+${STAIR_COST}/set)</span>
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
          {(['0','1','2'] as const).map(n => (
            <button key={n} onClick={() => setStairs(n)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:700, cursor:'pointer',
                border: stairs===n ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: stairs===n ? '#EFF6FF' : '#fff',
                color: stairs===n ? '#1A3A5C' : '#64748B' }}>
              {n === '0' ? 'None' : `${n} set${n==='2'?'s':''}`}
            </button>
          ))}
        </div>
      </div>

      {/* Demo */}
      <div style={{ marginBottom:'28px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Remove Existing Structure? <span style={{ fontWeight:400, color:'#64748B' }}>(+$3.60/sq ft)</span>
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setDemo(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: demo===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: demo===v ? '#EFF6FF' : '#fff',
                color: demo===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 8px' }}>Estimate Breakdown</h2>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', margin:'0 0 16px' }}>
            {MATERIALS[mat].label} · {l} ft × {w} ft ({sqft} sq ft)
          </p>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>Deck ({sqft} sq ft × {fmt(MATERIALS[mat].perSqft)}/sq ft)</span>
            <span>{fmt(deckCost)}</span>
          </div>
          {railing !== 'none' && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>{RAILINGS[railing].label} ({Math.round(railingLft)} lft)</span>
              <span>{fmt(railingCost)}</span>
            </div>
          )}
          {Number(stairs) > 0 && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Stairs ({stairs} set{stairs==='2'?'s':''})</span>
              <span>{fmt(stairCost)}</span>
            </div>
          )}
          {demo === 'yes' && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Demo & Removal</span>
              <span>{fmt(demoCost)}</span>
            </div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span>
            <span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>

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
            * Estimate based on Huntsville, AL market rates 2026. Permit fees not included. Final quote confirmed on-site.
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
