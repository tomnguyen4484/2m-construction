'use client';
import { useState } from 'react';
import Link from 'next/link';

type PaintType = 'interior_walls' | 'interior_full' | 'exterior' | 'cabinets' | 'trim' | 'epoxy_floor';
type PaintQuality = 'standard' | 'premium' | 'luxury';

const TYPES: Record<PaintType, { label: string; icon: string; basePer: number; desc: string }> = {
  interior_walls: { label: 'Interior Walls Only',   icon: '🏠', basePer: 2.5,  desc: 'Walls only, 2 coats' },
  interior_full:  { label: 'Interior Full Room',    icon: '🛋️', basePer: 4.0,  desc: 'Walls, ceiling & trim' },
  exterior:       { label: 'Exterior Painting',     icon: '🏡', basePer: 3.5,  desc: 'All exterior surfaces' },
  cabinets:       { label: 'Cabinet Painting',      icon: '🚪', basePer: 85,   desc: 'Per door/drawer face' },
  trim:           { label: 'Trim & Baseboards',     icon: '📐', basePer: 3.0,  desc: 'Per linear foot' },
  epoxy_floor:    { label: 'Epoxy Floor Coating',   icon: '⬜', basePer: 5.0,  desc: 'Garage/basement floors' },
};

const QUALITY: Record<PaintQuality, { label: string; mult: number; desc: string }> = {
  standard: { label: 'Standard',  mult: 1.0, desc: 'Sherwin-Williams SuperPaint' },
  premium:  { label: 'Premium',   mult: 1.3, desc: 'SW Emerald / Duration' },
  luxury:   { label: 'Luxury',    mult: 1.6, desc: 'Benjamin Moore Aura' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function PaintingEstimator() {
  const [type, setType]       = useState<PaintType>('interior_walls');
  const [quality, setQuality] = useState<PaintQuality>('standard');
  const [size, setSize]       = useState('');
  const [coats, setCoats]     = useState('2');
  const [ceilings, setCeilings] = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]       = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]       = useState(false);

  const s = Number(size) || 0;
  const t = TYPES[type];
  const q = QUALITY[quality];
  const coatMult = Number(coats) > 2 ? 1.25 : 1;
  const ceilCost = ceilings === 'yes' ? s * 1.5 : 0;
  const laborBase = s * t.basePer * q.mult * coatMult;
  const total = laborBase + ceilCost;
  const hasResult = s > 0;

  const unitLabel = type === 'cabinets' ? 'cabinet faces' : type === 'trim' ? 'linear feet' : 'square feet';

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Painting', estimate: fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🎨 Painting Estimator</h1>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'12px 14px', marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', color:'#92400E', margin:'0 0 4px', fontWeight:700 }}>⚠️ Estimated Prices — Not a Final Quote</p>
        <p style={{ fontSize:'12px', color:'#92400E', margin:0, lineHeight:1.6 }}>Prices based on Huntsville, AL market rates (2026). Actual cost depends on site conditions. Related items needing repair or replacement may add to the total. A final quote is confirmed after an on-site inspection.</p>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>What needs painting?</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(TYPES) as [PaintType, typeof TYPES[PaintType]][]).map(([key, info]) => (
            <button key={key} onClick={() => setType(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: type===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: type===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: type===key ? '#1A3A5C' : '#1E293B' }}>{info.icon} {info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Size ({unitLabel})</label>
        <input type="number" inputMode="numeric" value={size} onChange={e => setSize(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder={type === 'cabinets' ? 'e.g. 20' : type === 'trim' ? 'e.g. 200' : 'e.g. 1200'} />
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Paint Quality</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px' }}>
          {(Object.entries(QUALITY) as [PaintQuality, typeof QUALITY[PaintQuality]][]).map(([key, info]) => (
            <button key={key} onClick={() => setQuality(key)}
              style={{ padding:'10px 8px', borderRadius:'10px', textAlign:'center', cursor:'pointer',
                border: quality===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: quality===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: quality===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'10px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Number of Coats</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
          {['1','2','3'].map(n => (
            <button key={n} onClick={() => setCoats(n)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: coats===n ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: coats===n ? '#EFF6FF' : '#fff', color: coats===n ? '#1A3A5C' : '#64748B' }}>
              {n} coat{n !== '1' ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      {(type === 'interior_walls' || type === 'interior_full') && (
        <div style={{ marginBottom:'24px' }}>
          <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Include Ceilings? (+$1.50/sq ft)</label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
            {[['no','No'],['yes','Yes']].map(([v,l]) => (
              <button key={v} onClick={() => setCeilings(v)}
                style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                  border: ceilings===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                  background: ceilings===v ? '#EFF6FF' : '#fff', color: ceilings===v ? '#1A3A5C' : '#64748B' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{TYPES[type].label} · {QUALITY[quality].label} paint · {size} {unitLabel}</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Labor & Materials</span><span>{fmt(laborBase)}</span></div>
          {ceilings === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Ceiling Add-on</span><span>{fmt(ceilCost)}</span></div>}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>* Estimate only. Does not include costs if surfaces require special preparation before painting.</p>
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
