'use client';
import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function PaintingEstimator() {
  const [ptype, setPtype] = useState("interior");
  const [sqft, setSqft] = useState("");
  const [coats, setCoats] = useState("2");
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [sent, setSent] = useState(false);

  const RATE: Record<string,number> = { interior:2.5, exterior:3, both:5 };
  const sf    = Number(sqft)||0;
  const paint = sf * 0.4 * Number(coats);
  const lab   = sf * (RATE[ptype]||2.5);
  const prep  = sf * 0.3;
  const total = paint + lab + prep;

  const hasResult = sqft !== '' && Number(sqft) > 0;

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
      <Link href="/estimate" style={{ fontSize:'13px', color:'#64748B', marginBottom:'16px', display:'block' }}>
        ← All Services
      </Link>
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>
        🎨 Painting Estimator
      </h1>
      <p style={{ color:'#64748B', fontSize:'13px', margin:'0 0 24px' }}>
        Prices based on current market rates in Huntsville, AL
      </p>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Type</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
          <button onClick={() => setPtype('interior')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: ptype === 'interior' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: ptype === 'interior' ? '#EFF6FF' : '#fff', color: ptype === 'interior' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            Interior
          </button>
          <button onClick={() => setPtype('exterior')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: ptype === 'exterior' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: ptype === 'exterior' ? '#EFF6FF' : '#fff', color: ptype === 'exterior' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            Exterior
          </button>
          <button onClick={() => setPtype('both')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: ptype === 'both' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: ptype === 'both' ? '#EFF6FF' : '#fff', color: ptype === 'both' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            Both
          </button>
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Square Footage (sq ft)</label>
        <input type="number" inputMode="numeric" value={sqft} onChange={e => setSqft(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 1500" />
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Coats</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
          <button onClick={() => setCoats('1')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: coats === '1' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: coats === '1' ? '#EFF6FF' : '#fff', color: coats === '1' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            1 Coat
          </button>
          <button onClick={() => setCoats('2')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: coats === '2' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: coats === '2' ? '#EFF6FF' : '#fff', color: coats === '2' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            2 Coats
          </button>
          <button onClick={() => setCoats('3')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: coats === '3' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: coats === '3' ? '#EFF6FF' : '#fff', color: coats === '3' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            3 Coats
          </button>
        </div>
      </div>

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', marginBottom:'16px', margin:'0 0 16px' }}>
            Estimate Breakdown
          </h2>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{color:'rgba(255,255,255,0.7)'}}>Paint & Supplies</span><span>{fmt(paint)}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{color:'rgba(255,255,255,0.7)'}}>Labor</span><span>{fmt(lab)}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{color:'rgba(255,255,255,0.7)'}}>Prep & Primer</span><span>{fmt(prep)}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span>
            <span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', marginTop:'12px', margin:'12px 0 0' }}>
            * Final price varies by site conditions and material choices
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
          <button onClick={() => setSent(true)}
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
