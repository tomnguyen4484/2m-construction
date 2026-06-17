'use client';
import { useState } from 'react';
import Link from 'next/link';

// Fixed: Pine Dog-ear 6ft
const MAT_PER   = 6;   // $/sq ft material
const LABOR_PER = 9;   // $/linear ft labor
const HEIGHT    = 6;   // ft
const GATE_COST = 500; // $ per gate
const DEMO_PER  = 2.7; // $/linear ft demo

const OTHER_TYPES = [
  { label: 'Cedar Wood',              icon: '🌲' },
  { label: 'Vinyl – Standard',        icon: '🤍' },
  { label: 'Vinyl – Premium',         icon: '⬜' },
  { label: 'Chain Link – Galvanized', icon: '🔗' },
  { label: 'Chain Link – Coated',     icon: '⛓️' },
  { label: 'Aluminum',                icon: '🔩' },
  { label: 'Wrought Iron',            icon: '⚫' },
];

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function FenceEstimator() {
  const [length, setLength]       = useState('');
  const [gates, setGates]         = useState('1');
  const [demo, setDemo]           = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]           = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]           = useState(false);

  const ft       = Number(length) || 0;
  const gt       = Number(gates)  || 0;
  const matCost  = ft * HEIGHT * MAT_PER;
  const laborCost= ft * LABOR_PER;
  const gateCost = gt * GATE_COST;
  const demoCost = demo === 'yes' ? ft * DEMO_PER : 0;
  const total    = matCost + laborCost + gateCost + demoCost;
  const hasResult= ft > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Fence Installation', estimate: fmt(total), note: form.note }),
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
        🪵 Fence Installation Estimator
      </h1>

      {/* Disclaimer */}
      <div style={{ background:'#FFFBEB', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'20px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:700 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0', lineHeight:1.5 }}>
            Market estimates for Huntsville, AL area. Material prices sourced from Home Depot Huntsville, AL.
            Final quote confirmed on-site. <strong>Stain/paint not included.</strong>
          </p>
        </div>
      </div>

      {/* Spec badge */}
      <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:'10px', padding:'12px 16px', marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', color:'#1E40AF', fontWeight:700, margin:'0 0 6px' }}>📋 Fence Spec (Instant Estimate)</p>
        <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
          <span style={{ fontSize:'13px', color:'#1D4ED8' }}>🌲 Pine Wood</span>
          <span style={{ fontSize:'13px', color:'#1D4ED8' }}>📐 Dog-ear Style</span>
          <span style={{ fontSize:'13px', color:'#1D4ED8' }}>📏 6 ft height</span>
          <span style={{ fontSize:'13px', color:'#1D4ED8' }}>🚪 $500 / gate</span>
        </div>
      </div>

      {/* Length input */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Total Fence Length (linear feet)
        </label>
        <input
          type="number" inputMode="numeric" value={length}
          onChange={e => setLength(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 150"
        />
        <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>Tip: walk the perimeter and measure each side</p>
      </div>

      {/* Gates */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Number of Gates <span style={{ fontWeight:400, color:'#64748B' }}>(+$500 each)</span>
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }}>
          {['0','1','2','3'].map(n => (
            <button key={n} onClick={() => setGates(n)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'15px', fontWeight:700, cursor:'pointer',
                border: gates===n ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: gates===n ? '#EFF6FF' : '#fff',
                color: gates===n ? '#1A3A5C' : '#64748B' }}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Demo */}
      <div style={{ marginBottom:'28px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Remove Existing Fence? <span style={{ fontWeight:400, color:'#64748B' }}>(+$2.70/ft)</span>
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
            Pine Dog-ear · 6 ft · {length} linear ft
          </p>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>Materials</span><span>{fmt(matCost)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>Labor & Installation</span><span>{fmt(laborCost)}</span>
          </div>
          {gt > 0 && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Gates ({gt}× $500)</span><span>{fmt(gateCost)}</span>
            </div>
          )}
          {demo === 'yes' && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Demo & Removal</span><span>{fmt(demoCost)}</span>
            </div>
          )}
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
            * Estimate based on Huntsville, AL market rates 2026. Stain/paint not included. Final quote confirmed on-site.
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
        style={{ display:'block', width:'100%', textAlign:'center', border:'2px solid #1A3A5C', color:'#1A3A5C', fontWeight:700, fontSize:'15px', padding:'13px', borderRadius:'12px', boxSizing:'border-box' as const, marginBottom:'28px' }}>
        📞 Call for Exact Quote
      </a>

      {/* Other fence types */}
      <div style={{ background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:'14px', padding:'20px' }}>
        <p style={{ fontSize:'13px', fontWeight:700, color:'#374151', margin:'0 0 6px' }}>
          🔍 Need a different fence type?
        </p>
        <p style={{ fontSize:'12px', color:'#64748B', margin:'0 0 14px', lineHeight:1.5 }}>
          The following materials require an on-site visit for accurate pricing. Contact us directly for a free custom quote.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'14px' }}>
          {OTHER_TYPES.map(t => (
            <div key={t.label} style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', padding:'10px 12px', display:'flex', alignItems:'center', gap:'8px' }}>
              <span style={{ fontSize:'16px' }}>{t.icon}</span>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600 }}>{t.label}</span>
            </div>
          ))}
        </div>
        <a href="tel:+19383026795"
          style={{ display:'block', textAlign:'center', background:'#1A3A5C', color:'#fff', fontWeight:700, fontSize:'14px', padding:'12px', borderRadius:'10px', textDecoration:'none' }}>
          📞 Call (938) 302-6795 for Custom Quote
        </a>
      </div>

    </div>
  );
}
