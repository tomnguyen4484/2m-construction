'use client';
import { useState } from 'react';
import Link from 'next/link';

type FenceStyle = 'privacy' | 'picket' | 'ranch' | 'shadowbox';
type FenceMat   = 'pine' | 'cedar' | 'vinyl_std' | 'vinyl_prem' | 'chain_galv' | 'chain_coated' | 'aluminum' | 'iron';

interface MatInfo { label: string; materialPer: number; laborPer: number; desc: string; }

const MATERIALS: Record<FenceMat, MatInfo> = {
  pine:         { label: 'Pine Wood',           materialPer: 7,  laborPer: 11, desc: 'Budget-friendly, needs staining' },
  cedar:        { label: 'Cedar Wood',           materialPer: 12, laborPer: 11, desc: 'Naturally rot-resistant' },
  vinyl_std:    { label: 'Vinyl – Standard',     materialPer: 16, laborPer: 10, desc: 'Low maintenance, 20-yr warranty' },
  vinyl_prem:   { label: 'Vinyl – Premium',      materialPer: 24, laborPer: 10, desc: 'Thicker walls, premium look' },
  chain_galv:   { label: 'Chain Link – Galvanized', materialPer: 5, laborPer: 9, desc: 'Economy option, silver finish' },
  chain_coated: { label: 'Chain Link – Coated',  materialPer: 7,  laborPer: 9,  desc: 'Black/green coating, cleaner look' },
  aluminum:     { label: 'Aluminum',             materialPer: 20, laborPer: 14, desc: 'Rust-free, ornamental look' },
  iron:         { label: 'Wrought Iron',         materialPer: 28, laborPer: 16, desc: 'Maximum durability & security' },
};

const STYLES: Record<FenceStyle, { label: string; mult: number; note: string }> = {
  privacy:   { label: 'Privacy (solid panels)', mult: 1.0, note: 'Full privacy, no gaps' },
  picket:    { label: 'Picket',                 mult: 0.8, note: 'Classic look, partial open' },
  ranch:     { label: 'Ranch / Split Rail',     mult: 0.6, note: 'Open farm-style, minimal material' },
  shadowbox: { label: 'Shadow Box',             mult: 1.1, note: 'Semi-privacy, good airflow' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function FenceEstimator() {
  const [mat, setMat]       = useState<FenceMat>('cedar');
  const [style, setStyle]   = useState<FenceStyle>('privacy');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('6');
  const [gates, setGates]   = useState('1');
  const [demo, setDemo]     = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]     = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]     = useState(false);

  const ft  = Number(length) || 0;
  const gt  = Number(gates)  || 0;
  const ht  = Number(height);
  const m   = MATERIALS[mat];
  const s   = STYLES[style];

  const materialCost = ft * ht * m.materialPer * s.mult;
  const laborCost    = ft * m.laborPer;
  const gateCost     = gt * (mat.startsWith('chain') ? 200 : 400);
  const demoCost     = demo === 'yes' ? ft * 3 : 0;
  const total        = materialCost + laborCost + gateCost + demoCost;
  const hasResult    = ft > 0;

  if (sent) return (
    <div style={{ maxWidth:'680px', margin:'0 auto', padding:'60px 16px', textAlign:'center' }}>
      <div style={{ fontSize:'56px', marginBottom:'16px' }}>✅</div>
      <h2 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', marginBottom:'8px' }}>Request Sent!</h2>
      <p style={{ color:'#64748B', marginBottom:'24px' }}>We will call you back within 24 hours.</p>
      <Link href="/" style={{ color:'#1A3A5C', fontWeight:700 }}>← Back to Home</Link>
    </div>
  );

  return (
    <div style={{ maxWidth:'680px', margin:'0 auto', padding:'20px 16px' }}>
      <Link href="/estimate" style={{ fontSize:'13px', color:'#64748B', marginBottom:'16px', display:'block' }}>
        ← All Services
      </Link>
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>
        🪵 Fence Estimator
      </h1>

      {/* Pricing disclaimer */}
      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'24px', display:'flex', gap:'8px', alignItems:'flex-start' }}>
        <span style={{ fontSize:'16px' }}>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:600 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0' }}>
            Prices are market estimates for Huntsville, AL. Live Home Depot pricing coming in Phase 3.
            Final quote confirmed on-site.
          </p>
        </div>
      </div>

      {/* Material */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>
          Material
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(MATERIALS) as [FenceMat, MatInfo][]).map(([key, info]) => (
            <button key={key} onClick={() => setMat(key)}
              style={{
                padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: mat === key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: mat === key ? '#EFF6FF' : '#fff',
              }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: mat===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: mat===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>
                ~{fmt(info.materialPer)}/lin ft material
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Style */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>
          Fence Style
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(STYLES) as [FenceStyle, typeof STYLES[FenceStyle]][]).map(([key, info]) => (
            <button key={key} onClick={() => setStyle(key)}
              style={{
                padding:'10px 12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: style === key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: style === key ? '#EFF6FF' : '#fff',
              }}>
              <div style={{ fontWeight:600, fontSize:'13px', color: style===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.note}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Total Length (linear feet)
        </label>
        <input type="number" inputMode="numeric" value={length} onChange={e => setLength(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 150" />
      </div>

      {/* Height */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Height</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }}>
          {['4','5','6','8'].map(h => (
            <button key={h} onClick={() => setHeight(h)}
              style={{
                padding:'11px 8px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: height===h ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: height===h ? '#EFF6FF' : '#fff',
                color: height===h ? '#1A3A5C' : '#64748B',
              }}>
              {h} ft
            </button>
          ))}
        </div>
      </div>

      {/* Gates */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Number of Gates
        </label>
        <input type="number" inputMode="numeric" value={gates} onChange={e => setGates(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="0" />
      </div>

      {/* Demo */}
      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Remove Existing Fence?
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes (+$3/ft)']].map(([v,l]) => (
            <button key={v} onClick={() => setDemo(v)}
              style={{
                padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: demo===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: demo===v ? '#EFF6FF' : '#fff',
                color: demo===v ? '#1A3A5C' : '#64748B',
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>
            {MATERIALS[mat].label} · {STYLES[style].label} · {length} ft · {height} ft tall
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>Materials</span><span>{fmt(materialCost)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>Labor</span><span>{fmt(laborCost)}</span>
          </div>
          {gt > 0 && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Gates ({gates}x)</span><span>{fmt(gateCost)}</span>
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
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>
            * Estimate only. Live Home Depot pricing integration coming soon.
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
            placeholder="Any additional details about your project..." />
          <button onClick={() => setSent(true)}
            style={{ width:'100%', background:'#F5C518', color:'#1A3A5C', fontWeight:800, fontSize:'16px', padding:'14px', borderRadius:'12px', border:'none', cursor:'pointer' }}>
            Submit Request
          </button>
        </div>
      )}

      <a href="tel:+12565551234"
        style={{ display:'block', width:'100%', textAlign:'center', border:'2px solid #1A3A5C', color:'#1A3A5C', fontWeight:700, fontSize:'15px', padding:'13px', borderRadius:'12px', boxSizing:'border-box' as const }}>
        📞 Call for Exact Quote
      </a>
    </div>
  );
}
