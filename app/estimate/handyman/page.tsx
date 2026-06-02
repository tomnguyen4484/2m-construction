'use client';
import { useState } from 'react';
import Link from 'next/link';

type HandyJob =
  | 'door_install' | 'window_install' | 'outlet_add' | 'faucet' | 'ceiling_fan'
  | 'gutter_clean' | 'pressure_wash' | 'deck_stain' | 'fence_stain'
  | 'deck_repair' | 'fence_repair' | 'tile_repair' | 'caulking'
  | 'carpentry' | 'drywall_patch' | 'misc';

const JOBS: Record<HandyJob, { label: string; icon: string; desc: string; flatCost?: number; hourly?: number }> = {
  door_install:    { label: 'Door Installation',       icon: '🚪', desc: 'Interior or exterior door hang',      flatCost: 300  },
  window_install:  { label: 'Window Replace',          icon: '🪟', desc: 'Single window replacement',          flatCost: 375  },
  outlet_add:      { label: 'Outlet / Switch',         icon: '🔌', desc: 'Add or replace outlet/switch',       flatCost: 230  },
  faucet:          { label: 'Faucet / Toilet',         icon: '🚿', desc: 'Kitchen or bath fixture swap',       flatCost: 200  },
  ceiling_fan:     { label: 'Ceiling Fan Install',     icon: '💨', desc: 'Supply & install ceiling fan',       flatCost: 280  },
  gutter_clean:    { label: 'Gutter Cleaning',         icon: '🏠', desc: 'Clean & flush gutters',             flatCost: 190  },
  pressure_wash:   { label: 'Pressure Washing',        icon: '💧', desc: 'House, driveway or deck',           hourly: 62     },
  deck_stain:      { label: 'Deck Staining/Sealing',   icon: '🪵', desc: 'Clean, sand & stain deck surface',  hourly: 62     },
  fence_stain:     { label: 'Fence Staining',          icon: '🎨', desc: 'Stain/seal wood fence',             hourly: 58     },
  deck_repair:     { label: 'Deck Repair',             icon: '🏗️', desc: 'Replace boards, fix railings',     hourly: 75     },
  fence_repair:    { label: 'Fence Repair',            icon: '🔨', desc: 'Fix panels, posts, gates',          hourly: 65     },
  tile_repair:     { label: 'Tile Repair',             icon: '⬜', desc: 'Replace cracked/loose tiles',       hourly: 70     },
  caulking:        { label: 'Caulking / Weatherstrip', icon: '🔧', desc: 'Windows, doors, bathtubs',         hourly: 55     },
  carpentry:       { label: 'General Carpentry',       icon: '🪚', desc: 'Shelves, trim, minor repairs',     hourly: 70     },
  drywall_patch:   { label: 'Drywall Patch',           icon: '🧱', desc: 'Patch holes, texture match',       hourly: 65     },
  misc:            { label: 'General Handyman',        icon: '🛠️', desc: 'Tell us what you need',           hourly: 62     },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function HandymanEstimator() {
  const [job, setJob]   = useState<HandyJob>('door_install');
  const [qty, setQty]   = useState('1');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent] = useState(false);

  const j = JOBS[job];
  const q = Number(qty) || 1;
  const isHourly = !!j.hourly;
  const total = isHourly ? (j.hourly || 62) * q : (j.flatCost || 200) * q;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, note: form.note, service: 'Handyman: ' + j.label, estimate: isHourly ? (fmt(j.hourly || 62) + '/hr') : fmt(total) }),
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
      <p style={{ color:'#64748B', fontSize:'13px', margin:'0 0 16px' }}>Huntsville, AL — avg $50–$80/hr (2026)</p>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'12px 14px', marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', color:'#92400E', margin:'0 0 4px', fontWeight:700 }}>⚠️ Estimated Prices — Not a Final Quote</p>
        <p style={{ fontSize:'12px', color:'#92400E', margin:0, lineHeight:1.6 }}>Prices based on Huntsville, AL market rates (2026). Actual cost depends on site conditions. Related items needing repair or replacement may add to the total. A final quote is confirmed after an on-site inspection.</p>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>What do you need done?</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(JOBS) as [HandyJob, typeof JOBS[HandyJob]][]).map(([key, info]) => (
            <button key={key} onClick={() => { setJob(key); setQty('1'); }}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: job===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: job===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: job===key ? '#1A3A5C' : '#1E293B' }}>{info.icon} {info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: job===key ? '#1A3A5C' : '#64748B', fontWeight:600, marginTop:'4px' }}>
                {info.flatCost ? fmt(info.flatCost) + '/job' : fmt(info.hourly || 62) + '/hr'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          {isHourly ? 'Estimated Hours' : 'Quantity'}
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
        <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{j.label} · {qty} {isHourly ? 'hours' : 'unit(s)'}</div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
          <span style={{ color:'rgba(255,255,255,0.7)' }}>{isHourly ? qty + ' hrs × ' + fmt(j.hourly || 62) + '/hr' : qty + ' × ' + fmt(j.flatCost || 200)}</span>
          <span>{fmt(total)}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
          <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
        </div>
        <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>
          * Estimate only. {isHourly ? 'Actual hours may vary. Confirmed before work begins.' : 'Special materials not included if required.'}
        </p>
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
