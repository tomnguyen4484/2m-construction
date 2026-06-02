'use client';
import { useState } from 'react';
import Link from 'next/link';

type BathScope  = 'cosmetic' | 'partial' | 'full' | 'luxury';
type BathSize   = 'half' | 'standard' | 'master';
type VanityType = 'keep' | 'stock_single' | 'stock_double' | 'semi_custom' | 'custom';

const SCOPES: Record<BathScope, { label: string; desc: string; baseCost: number }> = {
  cosmetic: { label: 'Cosmetic Update',    desc: 'Paint, fixtures, light, mirror, accessories',     baseCost: 4500  },
  partial:  { label: 'Partial Remodel',    desc: 'Vanity, toilet, tile floor, new fixtures',        baseCost: 9000  },
  full:     { label: 'Full Remodel',       desc: 'New shower, tile walls, plumbing, all fixtures',  baseCost: 14000 },
  luxury:   { label: 'Luxury Remodel',     desc: 'Custom tile, frameless glass, premium fixtures',  baseCost: 26000 },
};

const SIZES: Record<BathSize, { label: string; mult: number; sqft: string }> = {
  half:     { label: 'Half Bath (toilet + sink)', mult: 0.55, sqft: '20–40 sq ft' },
  standard: { label: 'Full Bath (tub/shower)',    mult: 1.0,  sqft: '40–70 sq ft' },
  master:   { label: 'Master Bath',               mult: 1.65, sqft: '70–120 sq ft' },
};

const VANITIES: Record<VanityType, { label: string; cost: number; desc: string }> = {
  keep:         { label: 'Keep Existing Vanity',   cost: 0,     desc: 'Reface or paint existing' },
  stock_single: { label: 'Stock – Single Sink',    cost: 850,   desc: '30"–48", Home Depot/Lowe's' },
  stock_double: { label: 'Stock – Double Sink',    cost: 1400,  desc: '60"–72", two sinks' },
  semi_custom:  { label: 'Semi-Custom',            cost: 2800,  desc: 'More sizes & finish options' },
  custom:       { label: 'Custom Built-In',        cost: 5500,  desc: 'Built to spec, unlimited options' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function BathroomEstimator() {
  const [scope, setScope]   = useState<BathScope>('partial');
  const [size, setSize]     = useState<BathSize>('standard');
  const [vanity, setVanity] = useState<VanityType>('stock_single');
  const [shower, setShower] = useState('no');
  const [heated, setHeated] = useState('no');
  const [toilet, setToilet] = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]     = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]     = useState(false);

  const baseRemodel = SCOPES[scope].baseCost * SIZES[size].mult;
  const vanityCost  = VANITIES[vanity].cost;
  const showerCost  = shower === 'yes' ? (scope === 'luxury' ? 4500 : 2800) : 0;
  const heatedCost  = heated === 'yes' ? 1100 : 0;
  const toiletCost  = toilet === 'yes' ? 450 : 0;
  const total       = baseRemodel + vanityCost + showerCost + heatedCost + toiletCost;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, note: form.note, service: 'Bathroom Remodel', estimate: fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🚿 Bathroom Remodel Estimator</h1>
      <p style={{ color:'#64748B', fontSize:'13px', margin:'0 0 16px' }}>Huntsville, AL market rates 2026</p>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'12px 14px', marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', color:'#92400E', margin:'0 0 4px', fontWeight:700 }}>⚠️ Giá Tham Khảo — Chưa Phải Giá Cuối Cùng</p>
        <p style={{ fontSize:'12px', color:'#92400E', margin:0, lineHeight:1.6 }}>Giá dựa theo thị trường Huntsville, AL (2026). Giá thực tế phụ thuộc hiện trạng công trình. Các hạng mục liên quan cần sửa chữa hoặc thay thế sẽ phát sinh thêm chi phí. Báo giá chính xác sau khảo sát tại chỗ.</p>
      </div>

      {/* Scope */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Remodel Scope</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(SCOPES) as [BathScope, typeof SCOPES[BathScope]][]).map(([key, info]) => (
            <button key={key} onClick={() => setScope(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: scope===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: scope===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: scope===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: scope===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>from {fmt(info.baseCost)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Bathroom Size</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8px' }}>
          {(Object.entries(SIZES) as [BathSize, typeof SIZES[BathSize]][]).map(([key, info]) => (
            <button key={key} onClick={() => setSize(key)}
              style={{ padding:'12px', borderRadius:'10px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center',
                border: size===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: size===key ? '#EFF6FF' : '#fff' }}>
              <span style={{ fontWeight:700, fontSize:'13px', color: size===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</span>
              <span style={{ fontSize:'11px', color:'#64748B' }}>{info.sqft}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vanity */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Vanity</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(VANITIES) as [VanityType, typeof VANITIES[VanityType]][]).map(([key, info]) => (
            <button key={key} onClick={() => setVanity(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: vanity===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: vanity===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: vanity===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              {info.cost > 0 && <div style={{ fontSize:'12px', color: vanity===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>+{fmt(info.cost)}</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Custom Tile Shower/Tub Surround? (+{scope === 'luxury' ? '$4,500' : '$2,800'})</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No / Already included'],['yes','Yes, add custom tile']].map(([v,l]) => (
            <button key={v} onClick={() => setShower(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'13px', fontWeight:600, cursor:'pointer',
                border: shower===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: shower===v ? '#EFF6FF' : '#fff', color: shower===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Replace Toilet? (+$450 supply & install)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setToilet(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: toilet===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: toilet===v ? '#EFF6FF' : '#fff', color: toilet===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Heated Floor? (+$1,100)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setHeated(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: heated===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: heated===v ? '#EFF6FF' : '#fff', color: heated===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
        <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
        <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{SCOPES[scope].label} · {SIZES[size].label}</div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Base Remodel</span><span>{fmt(baseRemodel)}</span></div>
        {vanity !== 'keep' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Vanity ({VANITIES[vanity].label})</span><span>{fmt(vanityCost)}</span></div>}
        {shower === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Custom Tile Shower</span><span>{fmt(showerCost)}</span></div>}
        {toilet === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Toilet Replacement</span><span>{fmt(toiletCost)}</span></div>}
        {heated === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Heated Floor</span><span>{fmt(heatedCost)}</span></div>}
        <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
          <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
        </div>
        <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>
          * Giá tham khảo. Chưa bao gồm phát sinh nếu có vấn đề ở plumbing/subfloor hiện tại.
        </p>
      </div>

      {!showContact && (
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
          <textarea value={form.note} onChange={e => setForm({...form, note:e.target.value})} rows={3}
            style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', marginBottom:'10px', boxSizing:'border-box' as const, resize:'none' as const }}
            placeholder="Describe your bathroom project..." />
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
