'use client';
import { useState } from 'react';
import Link from 'next/link';

type HandyJob = 'door_install' | 'window_install' | 'outlet_add' | 'faucet' | 'gutter_clean' | 'deck_repair' | 'fence_repair' | 'caulking' | 'carpentry' | 'misc';

const JOBS: Record<HandyJob, { label: string; icon: string; desc: string; flatCost?: number; hourly?: number; unit?: string }> = {
  door_install:   { label: 'Door Installation',    icon: '🚪', desc: 'Interior or exterior door hang', flatCost: 280 },
  window_install: { label: 'Window Install/Replace', icon: '🪟', desc: 'Single window replacement',    flatCost: 350 },
  outlet_add:     { label: 'Outlet/Switch Add',    icon: '🔌', desc: 'Add or replace electrical outlet', flatCost: 220 },
  faucet:         { label: 'Faucet/Toilet Replace', icon: '🚿', desc: 'Kitchen or bath fixture swap',    flatCost: 180 },
  gutter_clean:   { label: 'Gutter Cleaning',      icon: '🏠', desc: 'Clean & flush gutters',           flatCost: 180 },
  deck_repair:    { label: 'Deck Repair',           icon: '🏗️', desc: 'Replace boards, fix railings',   hourly: 75, unit: 'hours' },
  fence_repair:   { label: 'Fence Repair',          icon: '🪵', desc: 'Fix panels, posts, gates',       hourly: 65, unit: 'hours' },
  caulking:       { label: 'Caulking / Weatherstrip', icon: '🔧', desc: 'Windows, doors, bathtubs',     hourly: 55, unit: 'hours' },
  carpentry:      { label: 'General Carpentry',    icon: '🪚', desc: 'Shelves, trim, minor repairs',    hourly: 70, unit: 'hours' },
  misc:           { label: 'General Handyman',     icon: '🔨', desc: 'Misc tasks, tell us what you need', hourly: 65, unit: 'hours' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function HandymanEstimator() {
  const [job, setJob]       = useState<HandyJob>('door_install');
  const [qty, setQty]       = useState('1');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]     = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]     = useState(false);

  const j = JOBS[job];
  const q = Number(qty) || 1;
  const total = j.flatCost ? j.flatCost * q : (j.hourly || 65) * q;
  const isHourly = !!j.hourly;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, note: form.note, service: 'Handyman: ' + j.label, estimate: isHourly ? (fmt(j.hourly || 65) + '/hr') : fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🔧 Handyman Estimator</h1>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'24px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:600 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0' }}>Flat-rate and hourly estimates for Huntsville, AL. Final quote confirmed before work begins.</p>
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>What do you need done?</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(JOBS) as [HandyJob, typeof JOBS[HandyJob]][]).map(([key, info]) => (
            <button key={key} onClick={() => setJob(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: job===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: job===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: job===key ? '#1A3A5C' : '#1E293B' }}>{info.icon} {info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: job===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>
                {info.flatCost ? fmt(info.flatCost) + '/unit' : fmt(info.hourly || 65) + '/hr'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          {isHourly ? 'Estimated Hours Needed' : 'Quantity'}
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }}>
          {(isHourly ? ['1','2','4','8'] : ['1','2','3','4']).map(n => (
            <button key={n} onClick={() => setQty(n)}
              style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: qty===n ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: qty===n ? '#EFF6FF' : '#fff', color: qty===n ? '#1A3A5C' : '#64748B' }}>
              {n}{isHourly ? ' hr' : 'x'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
        <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate</h2>
        <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{JOBS[job].label} · {qty} {isHourly ? 'hours' : 'unit(s)'}</div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
          <span style={{ color:'rgba(255,255,255,0.7)' }}>{isHourly ? 'Labor (' + qty + ' hrs × ' + fmt(j.hourly || 65) + ')' : 'Per Unit × ' + qty}</span>
          <span>{fmt(total)}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
          <span>{isHourly ? 'Estimated Total' : 'Total Estimate'}</span>
          <span style={{ color:'#F5C518' }}>{fmt(total)}</span>
        </div>
        <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>* {isHourly ? 'Actual hours may vary. Estimate confirmed before work begins.' : 'Materials not included if special-order items needed.'}</p>
      </div>

      {!showContact && (
        <button onClick={() => setShowContact(true)}
          style={{ width:'100%', background:'#F5C518', color:'#1A3A5C', fontWeight:800, fontSize:'16px', padding:'14px', borderRadius:'12px', border:'none', cursor:'pointer', marginBottom:'10px' }}>
          Request This Service →
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
            placeholder="Describe what you need done..." />
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
