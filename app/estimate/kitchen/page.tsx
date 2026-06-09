'use client';
import { useState } from 'react';
import Link from 'next/link';

type KitchenScope = 'cosmetic' | 'mid' | 'full' | 'luxury';
type KitchenSize  = 'small' | 'medium' | 'large';
type CabinetType  = 'reface' | 'stock' | 'semi' | 'custom';

const SCOPES: Record<KitchenScope, { label: string; desc: string }> = {
  cosmetic: { label: 'Cosmetic Update',   desc: 'Paint, hardware, backsplash, fixtures' },
  mid:      { label: 'Mid-Range Remodel', desc: 'New cabinets, counters, appliances' },
  full:     { label: 'Full Gut Remodel',  desc: 'Layout change, all new everything' },
  luxury:   { label: 'Luxury Remodel',    desc: 'Custom cabinets, high-end appliances' },
};

const SIZES: Record<KitchenSize, { label: string; sqft: string; baseMult: number }> = {
  small:  { label: 'Small (under 150 sq ft)',  sqft: '<150 sq ft', baseMult: 0.7 },
  medium: { label: 'Medium (150–300 sq ft)',   sqft: '150–300',    baseMult: 1.0 },
  large:  { label: 'Large (300+ sq ft)',       sqft: '300+',       baseMult: 1.5 },
};

const CABINETS: Record<CabinetType, { label: string; cost: number; desc: string }> = {
  reface: { label: 'Cabinet Reface',    cost: 3500,  desc: 'New doors/drawer fronts, keep boxes' },
  stock:  { label: 'Stock Cabinets',    cost: 6000,  desc: 'In-stock at Home Depot/Lowes' },
  semi:   { label: 'Semi-Custom',       cost: 11000, desc: 'More sizes & finishes available' },
  custom: { label: 'Custom Cabinets',   cost: 22000, desc: 'Built to spec, unlimited options' },
};

const COUNTER_COSTS: Record<string, number> = {
  laminate: 1800, butcher: 2800, granite: 4500, quartz: 5500, marble: 7000,
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function KitchenEstimator() {
  const [scope, setScope]     = useState<KitchenScope>('mid');
  const [size, setSize]       = useState<KitchenSize>('medium');
  const [cabinet, setCabinet] = useState<CabinetType>('stock');
  const [counter, setCounter] = useState('quartz');
  const [island, setIsland]   = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]       = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]       = useState(false);

  const scopeBase: Record<KitchenScope, number> = { cosmetic: 4000, mid: 8000, full: 18000, luxury: 45000 };
  const laborBase = scopeBase[scope] * SIZES[size].baseMult;
  const cabinetCost = CABINETS[cabinet].cost * SIZES[size].baseMult;
  const counterCost = (COUNTER_COSTS[counter] || 4500) * SIZES[size].baseMult;
  const islandCost  = island === 'yes' ? 3500 : 0;
  const total = laborBase + cabinetCost + counterCost + islandCost;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Kitchen Remodel', estimate: fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🍳 Kitchen Remodel Estimator</h1>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'24px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:600 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0' }}>Market estimates for Huntsville, AL. Appliances not included.</p>
        </div>
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

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Remodel Scope</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(SCOPES) as [KitchenScope, typeof SCOPES[KitchenScope]][]).map(([key, info]) => (
            <button key={key} onClick={() => setScope(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: scope===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: scope===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: scope===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Kitchen Size</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8px' }}>
          {(Object.entries(SIZES) as [KitchenSize, typeof SIZES[KitchenSize]][]).map(([key, info]) => (
            <button key={key} onClick={() => setSize(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: size===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: size===key ? '#EFF6FF' : '#fff', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontWeight:700, fontSize:'13px', color: size===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</span>
              <span style={{ fontSize:'11px', color:'#64748B' }}>{info.sqft}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Cabinets</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(CABINETS) as [CabinetType, typeof CABINETS[CabinetType]][]).map(([key, info]) => (
            <button key={key} onClick={() => setCabinet(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: cabinet===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: cabinet===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: cabinet===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: cabinet===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>from {fmt(info.cost)}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Countertop Material</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['laminate','Laminate','$'],['butcher','Butcher Block','$$'],['granite','Granite','$$$'],['quartz','Quartz','$$$'],['marble','Marble','$$$$']].map(([v,l,price]) => (
            <button key={v} onClick={() => setCounter(v)}
              style={{ padding:'10px 12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: counter===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: counter===v ? '#EFF6FF' : '#fff', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontWeight:600, fontSize:'13px', color: counter===v ? '#1A3A5C' : '#1E293B' }}>{l}</span>
              <span style={{ fontSize:'12px', color:'#F5C518', fontWeight:700 }}>{price}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Add Kitchen Island? (+$3,500)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setIsland(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: island===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: island===v ? '#EFF6FF' : '#fff', color: island===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
        <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
        <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{SCOPES[scope].label} · {SIZES[size].label}</div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Labor & Demo</span><span>{fmt(laborBase)}</span></div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Cabinets ({CABINETS[cabinet].label})</span><span>{fmt(cabinetCost)}</span></div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Countertops</span><span>{fmt(counterCost)}</span></div>
        {island === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Kitchen Island</span><span>{fmt(islandCost)}</span></div>}
        <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
          <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
        </div>
        <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>* Appliances not included. Final price confirmed after on-site consult.</p>
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
