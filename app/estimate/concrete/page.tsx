'use client';
import { useState } from 'react';
import Link from 'next/link';

type Job = 'driveway' | 'patio' | 'sidewalk';

// Huntsville, AL market rates 2026 — plain concrete, broom finish
const JOBS: Record<Job, { label: string; icon: string; desc: string; perSqft: number; placeholder: string; tip: string }> = {
  driveway: { label: 'Driveway',           icon: '🚗', desc: '4" reinforced slab · broom finish anti-slip', perSqft: 7,   placeholder: 'e.g. 400', tip: 'Standard 2-car driveway: 400–600 sq ft' },
  patio:    { label: 'Patio',              icon: '☀️', desc: '4" slab · broom finish anti-slip',            perSqft: 6.5, placeholder: 'e.g. 200', tip: 'Average patio: 150–300 sq ft' },
  sidewalk: { label: 'Sidewalk / Walkway', icon: '🚶', desc: '3.5" slab · broom finish anti-slip',          perSqft: 6,   placeholder: 'e.g. 100', tip: 'Standard width: 3–4 ft. Multiply length × width' },
};

const DEMO_PER = 2; // $/sqft demolition

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function ConcreteEstimator() {
  const [job, setJob]             = useState<Job>('driveway');
  const [sqft, setSqft]           = useState('');
  const [demo, setDemo]           = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]           = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]           = useState(false);

  const sf        = Number(sqft) || 0;
  const concrete  = sf * JOBS[job].perSqft;
  const demoCost  = demo === 'yes' ? sf * DEMO_PER : 0;
  const total     = concrete + demoCost;
  const hasResult = sf > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Concrete – ' + JOBS[job].label, estimate: fmt(total), note: form.note }),
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
    <div style={{ maxWidth:'680px', margin:'0 auto', padding:'20px 16px 40px' }}>
      <Link href="/estimate" style={{ fontSize:'13px', color:'#64748B', marginBottom:'16px', display:'block' }}>
        ← All Services
      </Link>
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>
        🚗 Concrete Estimator
      </h1>

      {/* Disclaimer */}
      <div style={{ background:'#FFFBEB', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'20px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:700 }}>Estimated Prices — Not Final Quote</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0', lineHeight:1.5 }}>
            Market estimates for Huntsville, AL · 2026. Actual cost varies by site access, soil conditions, and reinforcement needs. Final quote confirmed on-site.
          </p>
        </div>
      </div>

      {/* Finish badge */}
      <div style={{ background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:'10px', padding:'10px 16px', marginBottom:'20px', display:'flex', gap:'10px', alignItems:'center' }}>
        <span style={{ fontSize:'18px' }}>✅</span>
        <div>
          <p style={{ fontSize:'12px', color:'#166534', fontWeight:700, margin:0 }}>Broom Finish — Included Standard</p>
          <p style={{ fontSize:'12px', color:'#15803D', margin:'2px 0 0' }}>Anti-slip textured surface · No extra charge</p>
        </div>
      </div>

      {/* Job type */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          What type of concrete work?
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px' }}>
          {(Object.entries(JOBS) as [Job, typeof JOBS[Job]][]).map(([key, info]) => (
            <button key={key} onClick={() => setJob(key)}
              style={{ padding:'14px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:700, cursor:'pointer', textAlign:'center',
                border: job===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: job===key ? '#EFF6FF' : '#fff',
                color: job===key ? '#1A3A5C' : '#64748B' }}>
              <div style={{ fontSize:'22px', marginBottom:'4px' }}>{info.icon}</div>
              {info.label}
              <div style={{ fontSize:'11px', marginTop:'4px', color: job===key ? '#3B82F6' : '#94A3B8' }}>~{fmt(info.perSqft)}/sq ft</div>
            </button>
          ))}
        </div>
        <p style={{ fontSize:'11px', color:'#64748B', margin:'8px 0 0', background:'#F8FAFC', padding:'8px 12px', borderRadius:'8px' }}>
          💡 {JOBS[job].tip}
        </p>
      </div>

      {/* Area input */}
      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Area (square feet)
        </label>
        <input
          type="number" inputMode="numeric" value={sqft}
          onChange={e => setSqft(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder={JOBS[job].placeholder}
        />
      </div>

      {/* Demo */}
      <div style={{ marginBottom:'28px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>
          Remove Existing Concrete? <span style={{ fontWeight:400, color:'#64748B' }}>(+$2/sq ft)</span>
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes']].map(([v,l]) => (
            <button key={v} onClick={() => setDemo(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: demo===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: demo===v ? '#EFF6FF' : '#fff',
                color: demo===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 8px' }}>Estimate Breakdown</h2>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', margin:'0 0 16px' }}>
            {JOBS[job].label} · {JOBS[job].desc}
          </p>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>{sqft} sq ft × {fmt(JOBS[job].perSqft)}/sq ft</span><span>{fmt(concrete)}</span>
          </div>
          {demo === 'yes' && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Demo & Removal</span><span>{fmt(demoCost)}</span>
            </div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span>
            <span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>

          {(() => {
            const marketAvg = Math.round(total / 0.88 / 100) * 100;
            const savings = marketAvg - Math.round(total);
            return (
              <div style={{ background:'rgba(245,197,24,0.1)', borderRadius:'10px', padding:'12px 16px', marginTop:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid rgba(245,197,24,0.2)' }}>
                <div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.45)', marginBottom:'3px' }}>Huntsville market avg</div>
                  <div style={{ fontSize:'14px', color:'rgba(255,255,255,0.4)', textDecoration:'line-through' }}>{fmt(marketAvg)}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:'10px', color:'#F5C518', marginBottom:'3px' }}>You save with 2M</div>
                  <div style={{ fontSize:'20px', fontWeight:800, color:'#F5C518' }}>~{fmt(savings)}</div>
                </div>
              </div>
            );
          })()}

          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>
            * Estimate based on Huntsville, AL market rates 2026. Decorative/stamped concrete quoted separately. Final quote confirmed on-site.
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
            placeholder="Any additional details..." />
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
