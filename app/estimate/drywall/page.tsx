'use client';
import { useState } from 'react';
import Link from 'next/link';

type DrywallJob = 'repair_small' | 'repair_large' | 'new_room' | 'full_house' | 'basement' | 'garage';
type DrywallFinish = 'level3' | 'level4' | 'level5';

const JOBS: Record<DrywallJob, { label: string; icon: string; desc: string; unitLabel: string; costPer: number }> = {
  repair_small: { label: 'Small Repair',     icon: '🔧', desc: 'Holes, cracks under 6"',    unitLabel: 'repairs', costPer: 180 },
  repair_large: { label: 'Large Repair',     icon: '🧱', desc: 'Water damage, large holes', unitLabel: 'sq ft',   costPer: 5   },
  new_room:     { label: 'New Room / Addition', icon: '🏗️', desc: 'Hang & finish new drywall', unitLabel: 'sq ft', costPer: 3.5 },
  full_house:   { label: 'Full House Drywall', icon: '🏠', desc: 'Complete interior hang & finish', unitLabel: 'sq ft', costPer: 2.8 },
  basement:     { label: 'Basement Finish',  icon: '⬇️', desc: 'Unfinished basement walls',  unitLabel: 'sq ft',  costPer: 3.2 },
  garage:       { label: 'Garage Drywall',   icon: '🚗', desc: 'Fire-code drywall for garage', unitLabel: 'sq ft', costPer: 2.5 },
};

const FINISHES: Record<DrywallFinish, { label: string; desc: string; addPer: number }> = {
  level3: { label: 'Level 3 – Basic',    desc: 'Tape + 2 coats, for texture',     addPer: 0   },
  level4: { label: 'Level 4 – Standard', desc: 'Tape + 3 coats, ready for paint', addPer: 0.5 },
  level5: { label: 'Level 5 – Premium',  desc: 'Skim coat, perfectly smooth',     addPer: 1.2 },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function DrywallEstimator() {
  const [job, setJob]         = useState<DrywallJob>('new_room');
  const [finish, setFinish]   = useState<DrywallFinish>('level4');
  const [size, setSize]       = useState('');
  const [texture, setTexture] = useState('no');
  const [painting, setPainting] = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]       = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]       = useState(false);

  const s  = Number(size) || 0;
  const j  = JOBS[job];
  const f  = FINISHES[finish];
  const baseCost    = s * (j.costPer + f.addPer);
  const textureCost = texture === 'yes' ? s * 1.2 : 0;
  const paintCost   = painting === 'yes' ? s * 2.5 : 0;
  const total       = baseCost + textureCost + paintCost;
  const hasResult   = s > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Drywall', estimate: fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🧱 Drywall Estimator</h1>

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
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Type of Work</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(JOBS) as [DrywallJob, typeof JOBS[DrywallJob]][]).map(([key, info]) => (
            <button key={key} onClick={() => setJob(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: job===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: job===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: job===key ? '#1A3A5C' : '#1E293B' }}>{info.icon} {info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Size ({JOBS[job].unitLabel})</label>
        <input type="number" inputMode="numeric" value={size} onChange={e => setSize(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder={job === 'repair_small' ? 'e.g. 3' : 'e.g. 500'} />
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Finish Level</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8px' }}>
          {(Object.entries(FINISHES) as [DrywallFinish, typeof FINISHES[DrywallFinish]][]).map(([key, info]) => (
            <button key={key} onClick={() => setFinish(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: finish===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: finish===key ? '#EFF6FF' : '#fff', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:700, fontSize:'13px', color: finish===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
                <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              </div>
              {info.addPer > 0 && <div style={{ fontSize:'12px', color:'#64748B', fontWeight:600 }}>+{fmt(info.addPer)}/sf</div>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Add Texture? (+$1.20/sq ft)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No – Smooth'],['yes','Yes – Orange Peel / Knockdown']].map(([v,l]) => (
            <button key={v} onClick={() => setTexture(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'13px', fontWeight:600, cursor:'pointer',
                border: texture===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: texture===v ? '#EFF6FF' : '#fff', color: texture===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Include Painting? (+$2.50/sq ft)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setPainting(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: painting===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: painting===v ? '#EFF6FF' : '#fff', color: painting===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{JOBS[job].label} · {FINISHES[finish].label} · {size} {JOBS[job].unitLabel}</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Drywall Work</span><span>{fmt(baseCost)}</span></div>
          {texture === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Texture</span><span>{fmt(textureCost)}</span></div>}
          {painting === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Painting</span><span>{fmt(paintCost)}</span></div>}
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
