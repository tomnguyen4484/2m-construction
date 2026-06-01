'use client';
import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function FlooringEstimator() {
  const [fmat, setFmat] = useState("lvp");
  const [sqft, setSqft] = useState("");
  const [removal, setRemoval] = useState("yes");
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [sent, setSent] = useState(false);

  const MAT: Record<string,number> = { lvp:3.5, hardwood:8, tile:5, carpet:3 };
  const LAB: Record<string,number> = { lvp:3, hardwood:5, tile:6, carpet:2.5 };
  const sf   = Number(sqft)||0;
  const mat  = sf * (MAT[fmat]||3.5);
  const lab  = sf * (LAB[fmat]||3);
  const rem  = removal==='yes' ? sf * 1.5 : 0;
  const total = mat + lab + rem;

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
        🏠 Flooring Estimator
      </h1>
      <p style={{ color:'#64748B', fontSize:'13px', margin:'0 0 24px' }}>
        Prices based on current market rates in Huntsville, AL
      </p>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Flooring Type</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }}>
          <button onClick={() => setFmat('lvp')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: fmat === 'lvp' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: fmat === 'lvp' ? '#EFF6FF' : '#fff', color: fmat === 'lvp' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            LVP
          </button>
          <button onClick={() => setFmat('hardwood')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: fmat === 'hardwood' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: fmat === 'hardwood' ? '#EFF6FF' : '#fff', color: fmat === 'hardwood' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            Hardwood
          </button>
          <button onClick={() => setFmat('tile')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: fmat === 'tile' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: fmat === 'tile' ? '#EFF6FF' : '#fff', color: fmat === 'tile' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            Tile
          </button>
          <button onClick={() => setFmat('carpet')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: fmat === 'carpet' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: fmat === 'carpet' ? '#EFF6FF' : '#fff', color: fmat === 'carpet' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            Carpet
          </button>
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Square Footage</label>
        <input type="number" inputMode="numeric" value={sqft} onChange={e => setSqft(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 800" />
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Remove Old Flooring?</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px' }}>
          <button onClick={() => setRemoval('yes')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: removal === 'yes' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: removal === 'yes' ? '#EFF6FF' : '#fff', color: removal === 'yes' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            Yes
          </button>
          <button onClick={() => setRemoval('no')}
            style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border: removal === 'no' ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0', background: removal === 'no' ? '#EFF6FF' : '#fff', color: removal === 'no' ? '#1A3A5C' : '#64748B', cursor:'pointer' }}>
            No
          </button>
        </div>
      </div>

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', marginBottom:'16px', margin:'0 0 16px' }}>
            Estimate Breakdown
          </h2>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{color:'rgba(255,255,255,0.7)'}}>Materials</span><span>{fmt(mat)}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{color:'rgba(255,255,255,0.7)'}}>Installation Labor</span><span>{fmt(lab)}</span></div>
          {removal==='yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{color:'rgba(255,255,255,0.7)'}}>Removal & Disposal</span><span>{fmt(rem)}</span></div>}
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
