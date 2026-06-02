'use client';
import { useState } from 'react';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────
type MatKey = 'pine' | 'cedar' | 'vinyl_std' | 'vinyl_prem' | 'chain_galv' | 'chain_coated' | 'aluminum' | 'iron';
type StyleKey =
  | 'dog_ear' | 'flatboard_cap' | 'flatboard_scalloped' | 'flatboard_convex'
  | 'picket' | 'shadow_box' | 'classic' | 'diagonal_lattice'
  | 'square_lattice' | 'highland_picket' | 'pagoda' | 'scalloped'
  | 'chain_std' | 'aluminum_flat' | 'iron_spear';

// ── Material data ─────────────────────────────────────────────────────────────
const MATERIALS: Record<MatKey, { label: string; matPer: number; laborPer: number; desc: string; styles: StyleKey[] }> = {
  pine:         { label: 'Pine Wood',              matPer: 7,  laborPer: 11, desc: 'Budget-friendly, pressure-treated, needs staining every 2-3 yrs',
                  styles: ['dog_ear','flatboard_cap','flatboard_scalloped','flatboard_convex','picket','shadow_box','classic','diagonal_lattice','square_lattice','highland_picket','pagoda','scalloped'] },
  cedar:        { label: 'Cedar Wood',             matPer: 12, laborPer: 11, desc: 'Naturally rot & insect resistant, lasts 15-20 yrs',
                  styles: ['dog_ear','flatboard_cap','flatboard_scalloped','flatboard_convex','picket','shadow_box','classic','diagonal_lattice','square_lattice','highland_picket','pagoda','scalloped'] },
  vinyl_std:    { label: 'Vinyl – Standard',       matPer: 16, laborPer: 10, desc: 'No painting, low maintenance, 20-yr warranty',
                  styles: ['dog_ear','flatboard_cap','picket','shadow_box','classic'] },
  vinyl_prem:   { label: 'Vinyl – Premium',        matPer: 24, laborPer: 10, desc: 'Thicker walls, UV-resistant, lifetime warranty',
                  styles: ['dog_ear','flatboard_cap','picket','shadow_box','classic'] },
  chain_galv:   { label: 'Chain Link – Galvanized',matPer: 5,  laborPer: 9,  desc: 'Economy, silver finish, 15-20 yr lifespan',
                  styles: ['chain_std'] },
  chain_coated: { label: 'Chain Link – Coated',    matPer: 7,  laborPer: 9,  desc: 'Black or green PVC coating, cleaner look',
                  styles: ['chain_std'] },
  aluminum:     { label: 'Aluminum',               matPer: 20, laborPer: 14, desc: 'Rust-free, ornamental, low maintenance',
                  styles: ['aluminum_flat','picket'] },
  iron:         { label: 'Wrought Iron',           matPer: 28, laborPer: 16, desc: 'Maximum security & curb appeal, lasts 50+ yrs',
                  styles: ['iron_spear','aluminum_flat'] },
};

// ── Style data ────────────────────────────────────────────────────────────────
const STYLES: Record<StyleKey, { label: string; mult: number; note: string }> = {
  dog_ear:           { label: 'Dog Ear',                    mult: 1.0,  note: 'Most popular privacy fence — flat top with cut corners' },
  flatboard_cap:     { label: 'Flatboard with Cap',         mult: 1.05, note: 'Clean flat top with protective cap board' },
  flatboard_scalloped:{ label:'Flatboard Scalloped',        mult: 1.0,  note: 'Curved scalloped bottom edge, elegant look' },
  flatboard_convex:  { label: 'Flatboard Convex',           mult: 1.0,  note: 'Arched top profile, decorative' },
  picket:            { label: 'Picket',                     mult: 0.75, note: 'Classic open picket fence, semi-privacy' },
  shadow_box:        { label: 'Shadow Box',                 mult: 1.1,  note: 'Alternating boards on both sides, wind-resistant' },
  classic:           { label: 'Classic / Board on Board',   mult: 1.05, note: 'Overlapping boards, full privacy' },
  diagonal_lattice:  { label: 'Board + Diagonal Lattice Top',mult:1.15, note: 'Privacy bottom + decorative diagonal lattice top' },
  square_lattice:    { label: 'Board + Square Lattice Top', mult: 1.15, note: 'Privacy bottom + square lattice top pattern' },
  highland_picket:   { label: 'Board + Highland Picket Top',mult: 1.1,  note: 'Privacy bottom + pointed picket top accent' },
  pagoda:            { label: 'Pagoda Board with Cap',      mult: 1.2,  note: 'Asian-inspired curved pagoda top, premium look' },
  scalloped:         { label: 'Scalloped',                  mult: 1.0,  note: 'Wave-pattern top edge, decorative appeal' },
  chain_std:         { label: 'Standard Chain Link',        mult: 1.0,  note: 'Standard woven wire mesh panel' },
  aluminum_flat:     { label: 'Flat Top Aluminum',          mult: 1.0,  note: 'Clean modern lines, rust-proof' },
  iron_spear:        { label: 'Spear Top Wrought Iron',     mult: 1.1,  note: 'Classic pointed spear tops, maximum security' },
};

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

export default function FenceEstimator() {
  const [mat, setMat]       = useState<MatKey>('cedar');
  const [style, setStyle]   = useState<StyleKey>('dog_ear');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('6');
  const [gates, setGates]   = useState('1');
  const [demo, setDemo]     = useState('no');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]     = useState({ name: '', phone: '', email: '', note: '' });
  const [sent, setSent]     = useState(false);

  const matInfo    = MATERIALS[mat];
  const styleInfo  = STYLES[style];
  const availStyles = matInfo.styles;

  // Auto-switch style if current not available for selected material
  const activeStyle: StyleKey = availStyles.includes(style) ? style : availStyles[0];

  const ft        = Number(length) || 0;
  const gt        = Number(gates)  || 0;
  const ht        = Number(height);
  const matCost   = ft * ht * matInfo.matPer * styleInfo.mult;
  const laborCost = ft * matInfo.laborPer;
  const gateCost  = gt * (mat.startsWith('chain') ? 200 : 420);
  const demoCost  = demo === 'yes' ? ft * 3 : 0;
  const total     = matCost + laborCost + gateCost + demoCost;
  const hasResult = ft > 0;

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
        🪵 Fence Estimator
      </h1>

      {/* Disclaimer */}
      <div style={{ background:'#FFFBEB', border:'1px solid #F5C518', borderRadius:'10px', padding:'10px 14px', marginBottom:'28px', display:'flex', gap:'8px' }}>
        <span>⚠️</span>
        <div>
          <p style={{ fontSize:'12px', color:'#92400E', margin:0, fontWeight:700 }}>Estimated Prices — Not Live Data</p>
          <p style={{ fontSize:'12px', color:'#92400E', margin:'2px 0 0' }}>
            Market estimates for Huntsville, AL area. Live Home Depot pricing integration coming in Phase 3. Final price confirmed on-site.
          </p>
        </div>
      </div>

      {/* STEP 1: Material */}
      <div style={{ marginBottom:'28px' }}>
        <div style={{ fontSize:'11px', fontWeight:700, color:'#1A3A5C', letterSpacing:'0.8px', marginBottom:'8px' }}>STEP 1 — MATERIAL</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {(Object.entries(MATERIALS) as [MatKey, typeof MATERIALS[MatKey]][]).map(([key, info]) => (
            <button key={key} onClick={() => { setMat(key); if (!info.styles.includes(activeStyle)) setStyle(info.styles[0]); }}
              style={{
                padding:'12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                border: mat===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: mat===key ? '#EFF6FF' : '#fff',
              }}>
              <div style={{ fontWeight:700, fontSize:'13px', color: mat===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
              <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px', lineHeight:1.4 }}>{info.desc}</div>
              <div style={{ fontSize:'12px', color: mat===key ? '#1A3A5C' : '#94A3B8', fontWeight:600, marginTop:'6px' }}>
                ~{fmt(info.matPer)}/lin ft
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2: Style */}
      <div style={{ marginBottom:'28px' }}>
        <div style={{ fontSize:'11px', fontWeight:700, color:'#1A3A5C', letterSpacing:'0.8px', marginBottom:'8px' }}>STEP 2 — FENCE STYLE</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {availStyles.map((key) => {
            const info = STYLES[key];
            return (
              <button key={key} onClick={() => setStyle(key)}
                style={{
                  padding:'10px 12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                  border: activeStyle===key ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                  background: activeStyle===key ? '#EFF6FF' : '#fff',
                }}>
                <div style={{ fontWeight:600, fontSize:'13px', color: activeStyle===key ? '#1A3A5C' : '#1E293B' }}>{info.label}</div>
                <div style={{ fontSize:'11px', color:'#64748B', marginTop:'2px', lineHeight:1.4 }}>{info.note}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: Dimensions */}
      <div style={{ fontSize:'11px', fontWeight:700, color:'#1A3A5C', letterSpacing:'0.8px', marginBottom:'16px' }}>STEP 3 — DIMENSIONS</div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Total Length (linear feet)</label>
        <input type="number" inputMode="numeric" value={length} onChange={e => setLength(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="e.g. 150" />
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Height</label>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px' }}>
          {['4','5','6','8'].map(h => (
            <button key={h} onClick={() => setHeight(h)}
              style={{ padding:'11px 8px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer',
                border: height===h ? '2px solid #1A3A5C' : '1.5px solid #E2E8F0',
                background: height===h ? '#EFF6FF' : '#fff',
                color: height===h ? '#1A3A5C' : '#64748B' }}>
              {h} ft
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:'20px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Number of Gates</label>
        <input type="number" inputMode="numeric" value={gates} onChange={e => setGates(e.target.value)}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const }}
          placeholder="0" />
      </div>

      <div style={{ marginBottom:'28px' }}>
        <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'8px' }}>Remove Existing Fence?</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[['no','No'],['yes','Yes (+$3/ft)']].map(([v,l]) => (
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
            {MATERIALS[mat].label} · {STYLES[activeStyle].label} · {length} ft · {height} ft tall
          </p>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>Materials</span><span>{fmt(matCost)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
            <span style={{ color:'rgba(255,255,255,0.7)' }}>Labor & Installation</span><span>{fmt(laborCost)}</span>
          </div>
          {gt > 0 && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Gates ({gates}x)</span><span>{fmt(gateCost)}</span>
            </div>
          )}
          {demo === 'yes' && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'10px' }}>
              <span style={{ color:'rgba(255,255,255,0.7)' }}>Demo & Removal</span><span>{fmt(demoCost)}</span>
            </div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'18px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'12px', marginTop:'4px' }}>
            <span>Total Estimate</span>
            <span style={{ color:'#F5C518' }}>{fmt(total)}</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', margin:'12px 0 0' }}>
            * Prices are estimates. Live Home Depot pricing coming in Phase 3.
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
