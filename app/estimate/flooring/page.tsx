'use client';
import { useState } from 'react';
import Link from 'next/link';

type FloorMat = 'lvp_std' | 'lvp_prem' | 'hardwood_oak' | 'hardwood_maple' | 'tile_ceramic' | 'tile_porcelain' | 'carpet_std' | 'carpet_prem' | 'laminate';

const MATERIALS: Record<FloorMat, { label: string; materialPer: number; laborPer: number; desc: string }> = {
  lvp_std:        { label: 'LVP – Standard',        materialPer: 2.5, laborPer: 3,   desc: '6 mil wear layer, waterproof' },
  lvp_prem:       { label: 'LVP – Premium',         materialPer: 4.5, laborPer: 3,   desc: '12+ mil wear layer, lifetime warranty' },
  hardwood_oak:   { label: 'Hardwood – Oak',        materialPer: 6,   laborPer: 5,   desc: 'Classic 3/4" solid oak, can refinish' },
  hardwood_maple: { label: 'Hardwood – Maple',      materialPer: 8,   laborPer: 5,   desc: 'Hard, durable, light color' },
  tile_ceramic:   { label: 'Tile – Ceramic',        materialPer: 2,   laborPer: 7,   desc: 'Budget tile, great for bathrooms' },
  tile_porcelain: { label: 'Tile – Porcelain',      materialPer: 4,   laborPer: 8,   desc: 'Durable, low moisture absorption' },
  carpet_std:     { label: 'Carpet – Standard',     materialPer: 2,   laborPer: 2.5, desc: 'Good for bedrooms, soft underfoot' },
  carpet_prem:    { label: 'Carpet – Premium',      materialPer: 4,   laborPer: 2.5, desc: 'Thick pile, stain-resistant' },
  laminate:       { label: 'Laminate',              materialPer: 2,   laborPer: 3,   desc: 'Looks like hardwood, budget-friendly' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function FlooringEstimator() {
  const [mat, setMat]         = useState<FloorMat>('lvp_std');
  const [sqft, setSqft]       = useState('');
  const [removal, setRemoval] = useState('no');
  const [subfloor, setSubfloor] = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]       = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]       = useState(false);

  const sf = Number(sqft) || 0;
  const m  = MATERIALS[mat];
  const materialCost = sf * m.materialPer * 1.1; // 10% waste factor
  const laborCost    = sf * m.laborPer;
  const removalCost  = removal === 'yes' ? sf * 2 : 0;
  const subfloorCost = subfloor === 'yes' ? sf * 3 : 0;
  const total        = materialCost + laborCost + removalCost + subfloorCost;
  const hasResult    = sf > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Flooring', estimate: fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🏠 Flooring Estimator</h1>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'24px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:600 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0' }}>Market estimates for Huntsville, AL. Material price includes 10% waste factor.</p>
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Flooring Material</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(MATERIALS) as [FloorMat, typeof MATERIALS[FloorMat]][]).map(([key, info]) => (
            <button key={key} onClick={() => setMat(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: mat===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: mat===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: mat===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: mat===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>~{fmt(info.materialPer + info.laborPer)}/sq ft installed</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Area (square feet)</label>
        <input type="number" inputMode="numeric" value={sqft} onChange={e => setSqft(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 800" />
        <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>Average home: 1,200–2,000 sq ft · Single room: 150–300 sq ft</p>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Remove Old Flooring? (+$2/sq ft)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setRemoval(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: removal===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: removal===v ? '#EFF6FF' : '#fff', color: removal===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Subfloor Repair Needed? (+$3/sq ft)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No / Unknown'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setSubfloor(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: subfloor===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: subfloor===v ? '#EFF6FF' : '#fff', color: subfloor===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{MATERIALS[mat].label} · {sqft} sq ft</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Materials (w/ 10% waste)</span><span>{fmt(materialCost)}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Labor / Installation</span><span>{fmt(laborCost)}</span></div>
          {removal === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Old Floor Removal</span><span>{fmt(removalCost)}</span></div>}
          {subfloor === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Subfloor Repair</span><span>{fmt(subfloorCost)}</span></div>}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>* Giá tham khảo. Chưa bao gồm phát sinh nếu có vấn đề phát hiện trong quá trình thi công.</p>
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
