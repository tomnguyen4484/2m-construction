'use client';
import { useState } from 'react';
import Link from 'next/link';

type RoofMat = 'architectural_30' | 'architectural_50' | 'metal_rib' | 'metal_standing' | 'tile_concrete' | 'flat_tpo';
type RoofPitch = 'low' | 'medium' | 'steep';

const MATERIALS: Record<RoofMat, { label: string; costPerSq: number; desc: string; lifespan: string }> = {
  architectural_30: { label: 'Architectural Shingle 30-yr', costPerSq: 450, desc: 'Most popular, good value',        lifespan: '25–30 yrs' },
  architectural_50: { label: 'Architectural Shingle 50-yr', costPerSq: 580, desc: 'Thicker, impact-resistant',      lifespan: '40–50 yrs' },
  metal_rib:        { label: 'Metal – Ribbed Panel',        costPerSq: 700, desc: 'Durable, energy efficient',      lifespan: '40–60 yrs' },
  metal_standing:   { label: 'Metal – Standing Seam',       costPerSq: 950, desc: 'Premium, concealed fasteners',   lifespan: '50+ yrs'   },
  tile_concrete:    { label: 'Concrete Tile',               costPerSq: 850, desc: 'Heavy, fire-resistant, durable', lifespan: '50+ yrs'   },
  flat_tpo:         { label: 'Flat Roof – TPO',             costPerSq: 500, desc: 'For low-slope/flat roofs',       lifespan: '15–25 yrs' },
};

const PITCHES: Record<RoofPitch, { label: string; mult: number; desc: string }> = {
  low:    { label: 'Low Pitch (under 4/12)',   mult: 1.0, desc: 'Easiest to work on' },
  medium: { label: 'Medium (4/12 – 7/12)',     mult: 1.15, desc: 'Standard residential' },
  steep:  { label: 'Steep (8/12 and above)',   mult: 1.35, desc: 'Requires extra safety' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function RoofingEstimator() {
  const [mat, setMat]         = useState<RoofMat>('architectural_30');
  const [pitch, setPitch]     = useState<RoofPitch>('medium');
  const [sqft, setSqft]       = useState('');
  const [layers, setLayers]   = useState('1');
  const [gutters, setGutters] = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]       = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]       = useState(false);

  const sf  = Number(sqft) || 0;
  const squares = sf / 100; // roofing measured in "squares" (100 sq ft)
  const m   = MATERIALS[mat];
  const p   = PITCHES[pitch];
  const materialCost = squares * m.costPerSq * p.mult;
  const tearoffCost  = Number(layers) > 1 ? squares * 80 : 0;
  const gutterCost   = gutters === 'yes' ? Math.sqrt(sf) * 4 * 12 : 0;
  const total        = materialCost + tearoffCost + gutterCost;
  const hasResult    = sf > 0;

  async function submitQuote() {
    if (!form.name || !form.phone) return;
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: 'Roofing', estimate: fmt(total) }),
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
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>🏘️ Roofing Estimator</h1>

      <div style={{ background:'#FFF9E6', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'24px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:600 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0' }}>Market estimates for Huntsville, AL. Includes material & labor. Final quote after inspection.</p>
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Roofing Material</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(MATERIALS) as [RoofMat, typeof MATERIALS[RoofMat]][]).map(([key, info]) => (
            <button key={key} onClick={() => setMat(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: mat===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: mat===key ? '#EFF6FF' : '#fff' }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: mat===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                <span style={{ fontSize:'12px', color: mat===key ? '#1A3A5C' : '#64748B', fontWeight:600 }}>{fmt(info.costPerSq)}/square</span>
                <span style={{ fontSize:'11px', color:'#94A3B8' }}>{info.lifespan}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Roof Area (square feet)</label>
        <input type="number" inputMode="numeric" value={sqft} onChange={e => setSqft(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 2000" />
        <p style={{ fontSize:'11px', color:'#94A3B8', margin:'4px 0 0' }}>Avg home: 1,700–2,800 sq ft (roof area ≈ house footprint × 1.3 for slope)</p>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'10px' }}>Roof Pitch</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8px' }}>
          {(Object.entries(PITCHES) as [RoofPitch, typeof PITCHES[RoofPitch]][]).map(([key, info]) => (
            <button key={key} onClick={() => setPitch(key)}
              style={{ padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: pitch===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: pitch===key ? '#EFF6FF' : '#fff', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:700, fontSize:'13px', color: pitch===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
                <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px' }}>{info.desc}</div>
              </div>
              {info.mult > 1 && <div style={{ fontSize:'12px', color:'#64748B', fontWeight:600 }}>+{Math.round((info.mult-1)*100)}%</div>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Existing Layers of Shingles</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['1','1 layer (standard)'],['2','2 layers (tear-off needed +$80/sq)']].map(([v,l]) => (
            <button key={v} onClick={() => setLayers(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'13px', fontWeight:600, cursor:'pointer',
                border: layers===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: layers===v ? '#EFF6FF' : '#fff', color: layers===v ? '#1A3A5C' : '#64748B', textAlign:'left' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'24px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'8px' }}>Replace Gutters?</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes (6" aluminum)']].map(([v,l]) => (
            <button key={v} onClick={() => setGutters(v)}
              style={{ padding:'11px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: gutters===v ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: gutters===v ? '#EFF6FF' : '#fff', color: gutters===v ? '#1A3A5C' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {hasResult && (
        <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'20px', color:'#fff' }}>
          <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 16px' }}>Estimate Breakdown</h2>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'14px' }}>{MATERIALS[mat].label} · {sqft} sq ft · {Math.round(squares)} squares</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Material & Labor</span><span>{fmt(materialCost)}</span></div>
          {Number(layers) > 1 && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Tear-Off (2nd layer)</span><span>{fmt(tearoffCost)}</span></div>}
          {gutters === 'yes' && <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}><span style={{ color:'rgba(255,255,255,0.7)' }}>Gutters</span><span>{fmt(gutterCost)}</span></div>}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span><span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>* Giá tham khảo. Chưa bao gồm thay ván mái (decking) nếu cần sau kiểm tra.</p>
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
