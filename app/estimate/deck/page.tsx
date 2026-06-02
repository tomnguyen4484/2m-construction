'use client';
import { useState } from 'react';
import Link from 'next/link';

type DeckMat = 'pt_pine' | 'cedar' | 'composite_std' | 'composite_prem' | 'pvc' | 'ipe';
type RailingMat = 'none' | 'wood' | 'aluminum' | 'cable' | 'glass';

const MATERIALS: Record<DeckMat, { label: string; materialPer: number; laborPer: number; desc: string }> = {
  pt_pine:        { label: 'Pressure-Treated Pine', materialPer: 8,  laborPer: 14, desc: 'Budget option, needs sealing every 2 yrs' },
  cedar:          { label: 'Cedar',                 materialPer: 14, laborPer: 14, desc: 'Rot-resistant, beautiful grain' },
  composite_std:  { label: 'Composite – Standard',  materialPer: 22, laborPer: 12, desc: 'Low maintenance, 25-yr warranty' },
  composite_prem: { label: 'Composite – Premium',   materialPer: 32, laborPer: 12, desc: 'Capped boards, premium look & feel' },
  pvc:            { label: 'PVC / Cellular',        materialPer: 28, laborPer: 12, desc: 'Fully waterproof, no fading' },
  ipe:            { label: 'Ipe Hardwood',          materialPer: 42, laborPer: 18, desc: 'Most durable, 40+ year lifespan' },
};

const RAILINGS: Record<RailingMat, { label: string; costPerLF: number; desc: string }> = {
  none:     { label: 'No Railing',          costPerLF: 0,   desc: 'Ground-level deck' },
  wood:     { label: 'Wood Railing',        costPerLF: 18,  desc: 'Classic look, needs maintenance' },
  aluminum: { label: 'Aluminum Railing',    costPerLF: 28,  desc: 'Low maintenance, powder coated' },
  cable:    { label: 'Cable Railing',       costPerLF: 55,  desc: 'Modern look, unobstructed views' },
  glass:    { label: 'Glass Panel Railing', costPerLF: 85,  desc: 'Premium, panoramic views' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function DeckEstimator() {
  const [mat, setMat]       = useState<DeckMat>('composite_std');
  const [railing, setRailing] = useState<RailingMat>('aluminum');
  const [sqft, setSqft]     = useState('');
  const [stairs, setStairs] = useState('0');
  const [demo, setDemo]     = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]     = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]     = useState(false);

  const sf  = Number(sqft) || 0;
  const m   = MATERIALS[mat];
  const perim = Math.sqrt(sf) * 4;

  const materialCost = sf * m.materialPer;
  const laborCost    = sf * m.laborPer;
  const railingCost  = RAILINGS[railing].costPerLF * perim;
  const stairCost    = Number(stairs) * 350;
  const demoCost     = demo === 'yes' ? sf * 4 : 0;
  const total        = materialCost + laborCost + railingCost + stairCost + demoCost;
  const hasResult    = sf > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Deck', estimate: fmt(total) }),
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
    <div style={{ maxWidth:'680px', margin:'0 auto', padding:'20px 16px' }}>
      <Link href="/estimate" style={{ fontSize:'13px', color:'#64748B', marginBottom:'16px', display:'block' }}>← All Services</Link>
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🏗️ Deck Estimator</h1>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'12px 14px', marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', color:'#92400E', margin:'0 0 4px', fontWeight:700 }}>⚠️ Estimated Prices — Not a Final Quote</p>
        <p style={{ fontSize:'12px', color:'#92400E', margin:0, lineHeight:1.6 }}>Prices based on Huntsville, AL market rates (2026). Actual cost depends on site conditions. Related items needing repair or replacement may add to the total. A final quote is confirmed after an on-site inspection.</p>
      </div>

      {/* Home Depot material pricing badge */}
      <div style={{ display:'flex', alignItems:'center', gap:'6px', background:'#FFF7ED', border:'1px solid #FDBA74', borderRadius:'8px', padding:'8px 12px', marginBottom:'24px' }}>
        <span style={{ fontSize:'13px' }}>📦</span>
        <span style={{ fontSize:'11px', color:'#9A3412', fontWeight:600 }}>Material prices sourced from</span>
        <a href="https://www.homedepot.com" target="_blank" rel="noopener noreferrer"
          style={{ fontSize:'11px', color:'#EA580C', fontWeight:700, textDecoration:'none' }}>
          The Home Depot
        </a>
        <span style={{ fontSize:'10px', color:'#9A3412' }}>· Huntsville, AL · Updated quarterly</span>
      </div>
      {/* Material */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Decking Material</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(MATERIALS) as [DeckMat, typeof MATERIALS[DeckMat]][]).map(([key, info]) => (
            <button key={key} onClick={() => setMat(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: mat===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: mat===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: mat===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: mat===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>~{fmt(info.materialPer)}/sq ft material</div>
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Deck Size (square feet)</label>
        <input type="number" inputMode="numeric" value={sqft} onChange={e => setSqft(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 300" />
        <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>Typical deck: 200–400 sq ft · 12×20 = 240 sq ft</p>
      </div>

      {/* Railing */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Railing Type</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(RAILINGS) as [RailingMat, typeof RAILINGS[RailingMat]][]).map(([key, info]) => (
            <button key={key} onClick={() => setRailing(key)}
              style={{ padding:'10px 12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: railing===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: railing===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:600, fontSize:'13px', color: railing===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stairs */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Number of Stair Sections (+$350 each)</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }}>
          {['0','1','2','3'].map(n => (
            <button key={n} onClick={() => setStairs(n)}
              style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: stairs===n ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: stairs===n ? '#EFF6FF' : '#fff', color: stairs===n ? '#1A3A5C' : '#64748B' }}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Demo */}
      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Remove Existing Deck? (+$4/sq ft)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setDemo(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: demo===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: demo===v ? '#EFF6FF' : '#fff', color: demo===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{MATERIALS[mat].label} · {sqft} sq ft</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Materials</span><span>{fmt(materialCost)}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Labor</span><span>{fmt(laborCost)}</span></div>
          {railing !== 'none' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Railing</span><span>{fmt(railingCost)}</span></div>}
          {Number(stairs) > 0 && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Stairs ({stairs}x)</span><span>{fmt(stairCost)}</span></div>}
          {demo === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Demo & Removal</span><span>{fmt(demoCost)}</span></div>}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>* Estimate only. Does not include costs for issues discovered during construction.</p>
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
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const }} placeholder="Full name *" />
          <input type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const }} placeholder="Phone number *" />
          <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})}
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const }} placeholder="Email (optional)" />
          <button onClick={submitQuote}
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
