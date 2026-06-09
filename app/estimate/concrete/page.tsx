'use client';
import { useState } from 'react';
import Link from 'next/link';

type ConcreteJob = 'driveway' | 'patio' | 'sidewalk' | 'slab' | 'steps' | 'retaining';
type ConcreteFinish = 'broom' | 'stamped' | 'exposed' | 'stained' | 'polished';

const JOBS: Record<ConcreteJob, { label: string; icon: string; desc: string; basePer: number }> = {
  driveway:   { label: 'Driveway',           icon: '🚗', desc: '4" slab, standard mix',          basePer: 9  },
  patio:      { label: 'Patio',              icon: '☀️', desc: '4" slab, standard mix',          basePer: 8  },
  sidewalk:   { label: 'Sidewalk / Walkway', icon: '🚶', desc: '3.5" slab, smooth finish',       basePer: 7  },
  slab:       { label: 'Foundation Slab',    icon: '🏗️', desc: '4–6" with vapor barrier & rebar', basePer: 11 },
  steps:      { label: 'Concrete Steps',     icon: '🪜', desc: 'Per linear foot of stair width', basePer: 350 },
  retaining:  { label: 'Retaining Wall',     icon: '🧱', desc: 'Per sq ft of wall face',         basePer: 35  },
};

const FINISHES: Record<ConcreteFinish, { label: string; addPer: number; desc: string }> = {
  broom:    { label: 'Broom Finish',    addPer: 0,    desc: 'Standard, non-slip texture' },
  stamped:  { label: 'Stamped Pattern', addPer: 8,    desc: 'Brick, stone, or slate look' },
  exposed:  { label: 'Exposed Aggregate', addPer: 3,  desc: 'Pebble texture, skid-resistant' },
  stained:  { label: 'Acid Stained',    addPer: 4,    desc: 'Earthy tones, unique look' },
  polished: { label: 'Polished',        addPer: 6,    desc: 'Smooth, glossy — for patios' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function ConcreteEstimator() {
  const [job, setJob]         = useState<ConcreteJob>('driveway');
  const [finish, setFinish]   = useState<ConcreteFinish>('broom');
  const [size, setSize]       = useState('');
  const [removal, setRemoval] = useState('no');
  const [sealer, setSealer]   = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]       = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]       = useState(false);

  const s  = Number(size) || 0;
  const j  = JOBS[job];
  const f  = FINISHES[finish];
  const concreteCost = s * (j.basePer + f.addPer);
  const removalCost  = removal === 'yes' ? s * 3 : 0;
  const sealerCost   = sealer === 'yes' ? s * 1.5 : 0;
  const total        = concreteCost + removalCost + sealerCost;
  const hasResult    = s > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Concrete', estimate: fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>⬜ Concrete Estimator</h1>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'24px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:600 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0' }}>Market estimates for Huntsville, AL. Includes concrete, rebar, and labor.</p>
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
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Type of Project</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(JOBS) as [ConcreteJob, typeof JOBS[ConcreteJob]][]).map(([key, info]) => (
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
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Size ({job === 'steps' ? 'linear feet' : job === 'retaining' ? 'sq ft of wall' : 'square feet'})</label>
        <input type="number" inputMode="numeric" value={size} onChange={e => setSize(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder={job === 'driveway' ? 'e.g. 500' : job === 'steps' ? 'e.g. 8' : 'e.g. 300'} />
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Finish</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(FINISHES) as [ConcreteFinish, typeof FINISHES[ConcreteFinish]][]).map(([key, info]) => (
            <button key={key} onClick={() => setFinish(key)}
              style={{ padding:'10px 12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: finish===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: finish===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:600, fontSize:'13px', color: finish===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              {info.addPer > 0 && <div style={{ fontSize:'11px', color: finish===key ? '#1A3A5C' : '#94A3B8', marginTop:'2px', fontWeight:600 }}>+{'$'}{info.addPer}/sq ft</div>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Remove Existing Concrete? (+$3/sq ft)</label>
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
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Add Concrete Sealer? (+$1.50/sq ft)</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes – Recommended']].map(([v,l]) => (
            <button key={v} onClick={() => setSealer(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'13px', fontWeight:600, cursor:'pointer',
                border: sealer===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: sealer===v ? '#EFF6FF' : '#fff', color: sealer===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{JOBS[job].label} · {FINISHES[finish].label} · {size} {job === 'steps' ? 'lf' : 'sq ft'}</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Concrete & Labor</span><span>{fmt(concreteCost)}</span></div>
          {removal === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Demo & Removal</span><span>{fmt(removalCost)}</span></div>}
          {sealer === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Concrete Sealer</span><span>{fmt(sealerCost)}</span></div>}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>* Estimate only. Does not include additional costs due to soil conditions or site access.</p>
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

      <a href="tel:+19383026795"
        style={{ display:'block', width:'100%', textAlign:'center', border:'2px solid #1A3A5C', color:'#1A3A5C', fontWeight:700, fontSize:'15px', padding:'13px', borderRadius:'12px', boxSizing:'border-box' as const }}>
        📞 Call for Exact Quote
      </a>
    </div>
  );
}
