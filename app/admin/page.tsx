'use client';
import { useState } from 'react';

type Tab = 'business' | 'prices' | 'homepage' | 'leads';
type AuthStep = 'password' | 'otp' | 'authed';

const inp: object = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid #334155', background: '#1E3A5F', color: '#E2E8F0',
  fontSize: '14px', boxSizing: 'border-box', outline: 'none',
};
const lbl: object = {
  display: 'block', fontSize: '12px', fontWeight: 600,
  color: '#94A3B8', marginBottom: '5px',
};

export default function AdminPage() {
  const [step, setStep]         = useState<AuthStep>('password');
  const [password, setPassword] = useState('');
  const [otp, setOtp]           = useState('');
  const [pendingToken, setPendingToken] = useState('');
  const [token, setToken]       = useState('');
  const [authErr, setAuthErr]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [tab, setTab]           = useState<Tab>('business');
  const [data, setData]         = useState<any>(null);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState('');

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setAuthErr('');
    const res = await fetch('/api/admin/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'send_otp', password }),
    });
    setLoading(false);
    if (res.ok) { const d = await res.json(); setOtpToken(d.token ?? ''); setPendingToken(data.pendingToken ?? '');
        setStep('otp'); }
    else { const d = await res.json(); setAuthErr(d.error ?? 'Error'); }
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setAuthErr('');
    const res = await fetch('/api/admin/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify_otp', code: otp, pendingToken, token: otpToken }),
    });
    setLoading(false);
    if (res.ok) {
      const d = await res.json();
      setToken(d.token);
      setStep('authed');
      loadData(d.token);
    } else {
      const d = await res.json();
      setAuthErr(d.error ?? 'Invalid code');
    }
  }

  async function loadData(t: string) {
    try {
      const res = await fetch('/api/admin/config', { headers: { 'x-admin-token': t } });
      if (res.ok) {
        setData(await res.json());
      } else {
        // Show dashboard even if config load fails
        setData({ siteConfig: {}, hdPrices: { products: {}, lastUpdated: 'N/A' } });
      }
    } catch {
      setData({ siteConfig: {}, hdPrices: { products: {}, lastUpdated: 'N/A' } });
    }
  }

  async function handleSave() {
    setSaving(true); setSaveMsg('');
    const res = await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaveMsg(res.ok ? '✅ Saved!' : '❌ Failed');
    setTimeout(() => setSaveMsg(''), 4000);
  }

  // ── Login screens ───────────────────────────────────────────────────────────
  if (step !== 'authed') return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center', background:'#0F2542' }}>
      <div style={{ background:'#1A3A5C', borderRadius:'16px', padding:'40px',
        width:'100%', maxWidth:'360px', border:'1px solid #2D4F73' }}>
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontSize:'32px', marginBottom:'8px' }}>🔐</div>
          <h1 style={{ color:'#FFFFFF', fontSize:'20px', fontWeight:700, margin:0 }}>Admin Login</h1>
          <p style={{ color:'#64748B', fontSize:'13px', margin:'6px 0 0' }}>
            {step === 'password' ? 'Enter your password' : 'Enter the 6-digit code sent to your email'}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
          {[0,1].map(i => (
            <div key={i} style={{ flex:1, height:'3px', borderRadius:'2px',
              background: (step === 'otp' && i === 0) || (i === 0 && step === 'password') ? '#F5C518' : (step === 'otp' && i === 1) ? '#F5C518' : '#2D4F73' }} />
          ))}
        </div>

        {step === 'password' ? (
          <form onSubmit={submitPassword}>
            <div style={{ marginBottom:'20px' }}>
              <label style={lbl}>Password</label>
              <input type="password" required style={inp as any}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Admin password" autoFocus />
            </div>
            {authErr && <p style={{ color:'#F87171', fontSize:'13px', marginBottom:'12px' }}>{authErr}</p>}
            <button type="submit" disabled={loading} style={{
              width:'100%', padding:'12px', borderRadius:'8px',
              background: loading ? '#334155' : '#F5C518',
              color:'#1A3A5C', fontWeight:800, fontSize:'15px',
              border:'none', cursor: loading ? 'not-allowed' : 'pointer',
            }}>
              {loading ? 'Sending SMS...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={submitOtp}>
            <div style={{ marginBottom:'20px' }}>
              <label style={lbl}>SMS Code</label>
              <input required style={{ ...inp, textAlign:'center', fontSize:'22px',
                letterSpacing:'6px', fontWeight:700 } as any}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                placeholder="000000" maxLength={6} autoFocus />
              <p style={{ color:'#64748B', fontSize:'11px', margin:'6px 0 0' }}>
                Check your phone — code expires in 5 minutes.
              </p>
            </div>
            {authErr && <p style={{ color:'#F87171', fontSize:'13px', marginBottom:'12px' }}>{authErr}</p>}
            <button type="submit" disabled={loading || otp.length !== 6} style={{
              width:'100%', padding:'12px', borderRadius:'8px',
              background: (loading || otp.length !== 6) ? '#334155' : '#F5C518',
              color:'#1A3A5C', fontWeight:800, fontSize:'15px',
              border:'none', cursor: (loading || otp.length !== 6) ? 'not-allowed' : 'pointer',
            }}>
              {loading ? 'Verifying...' : 'Login'}
            </button>
            <button type="button"
              onClick={() => { setStep('password'); setOtp(''); setAuthErr(''); }}
              style={{ width:'100%', marginTop:'10px', padding:'10px', borderRadius:'8px',
                background:'transparent', color:'#94A3B8', fontSize:'13px',
                border:'1px solid #334155', cursor:'pointer' }}>
              ← Back
            </button>
          </form>
        )}
      </div>
    </main>
  );

  // ── Dashboard ───────────────────────────────────────────────────────────────
  if (!data) return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center', background:'#0F2542', color:'#E2E8F0' }}>
      Loading...
    </main>
  );

  const cfg = data.siteConfig ?? {};
  const hdp = data.hdPrices?.products ?? {};
  const tabs: { id: Tab; label: string }[] = [
    { id:'business', label:'Business Info' },
    { id:'prices',   label:'HD Prices' },
    { id:'homepage', label:'Homepage' },
    { id:'leads',    label:'Leads' },
  ];

  return (
    <main style={{ minHeight:'100vh', paddingTop:'80px', paddingBottom:'60px',
      background:'#0F2542', color:'#E2E8F0' }}>
      <div style={{ maxWidth:'860px', margin:'0 auto', padding:'0 16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
          <h1 style={{ color:'#FFFFFF', fontSize:'22px', fontWeight:800, margin:0 }}>Admin Dashboard</h1>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            {saveMsg && <span style={{ fontSize:'13px' }}>{saveMsg}</span>}
            <button onClick={handleSave} disabled={saving} style={{
              background: saving ? '#334155' : '#F5C518', color:'#1A3A5C',
              fontWeight:800, fontSize:'13px', padding:'8px 20px',
              borderRadius:'8px', border:'none', cursor:'pointer' }}>
              {saving ? 'Saving...' : 'Save & Deploy'}
            </button>
            <button onClick={() => { setStep('password'); setToken(''); setData(null); }}
              style={{ background:'transparent', color:'#94A3B8', fontSize:'12px',
                padding:'8px 14px', border:'1px solid #334155', borderRadius:'8px', cursor:'pointer' }}>
              Logout
            </button>
          </div>
        </div>

        <div style={{ display:'flex', gap:'6px', marginBottom:'24px' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:'8px 16px', borderRadius:'8px', border:'none', cursor:'pointer',
              fontSize:'13px', fontWeight:600,
              background: tab === t.id ? '#F5C518' : '#1E3A5F',
              color: tab === t.id ? '#1A3A5C' : '#94A3B8',
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ background:'#1A3A5C', borderRadius:'16px', padding:'28px', border:'1px solid #2D4F73' }}>
          {tab === 'business' && (
            <div style={{ display:'grid', gap:'16px' }}>
              {([['phone','Phone'],['email','Email'],['address','Address']] as [string,string][]).map(([k,l]) => (
                <div key={k}>
                  <label style={lbl}>{l}</label>
                  <input style={inp as any} value={cfg[k] ?? ''}
                    onChange={e => setData({ ...data, siteConfig: { ...cfg, [k]: e.target.value } })} />
                </div>
              ))}
            </div>
          )}
          {tab === 'prices' && (
            <div>
              <p style={{ color:'#94A3B8', fontSize:'13px', marginTop:0 }}>
                Last updated: {data.hdPrices?.lastUpdated}
              </p>
              <div style={{ display:'grid', gap:'12px' }}>
                {Object.entries(hdp).map(([id, prod]: any) => (
                  <div key={id} style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                    <div style={{ flex:1, color:'#CBD5E1', fontSize:'13px' }}>{prod.name}</div>
                    <input type="number" step="0.01" style={{ ...inp, width:'100px' } as any}
                      value={prod.price}
                      onChange={e => setData({ ...data, hdPrices: { ...data.hdPrices,
                        products: { ...hdp, [id]: { ...prod, price: parseFloat(e.target.value) } } } })} />
                    <span style={{ color:'#64748B', fontSize:'12px', width:'40px' }}>$/unit</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'homepage' && (
            <div style={{ display:'grid', gap:'16px' }}>
              <div>
                <label style={lbl}>Hero Tagline</label>
                <input style={inp as any} value={cfg.heroTagline ?? ''}
                  onChange={e => setData({ ...data, siteConfig: { ...cfg, heroTagline: e.target.value } })} />
              </div>
              <div>
                <label style={lbl}>Hero Subtext</label>
                <textarea style={{ ...inp, height:'80px', resize:'vertical' } as any}
                  value={cfg.heroSubtext ?? ''}
                  onChange={e => setData({ ...data, siteConfig: { ...cfg, heroSubtext: e.target.value } })} />
              </div>
            </div>
          )}
          {tab === 'leads' && (
            <div style={{ textAlign:'center', padding:'24px 0', color:'#64748B' }}>
              <p>Lead tracking coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
