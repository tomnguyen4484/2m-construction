'use client';
import { useState } from 'react';

type Tab = 'business' | 'prices' | 'homepage' | 'leads';

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid #334155', background: '#1E3A5F', color: '#E2E8F0',
  fontSize: '14px', boxSizing: 'border-box', outline: 'none',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: '12px', fontWeight: 600,
  color: '#94A3B8', marginBottom: '5px',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [token, setToken]       = useState('');
  const [authErr, setAuthErr]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [authed, setAuthed]     = useState(false);

  const [tab, setTab]       = useState<Tab>('business');
  const [data, setData]     = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setAuthErr('');
    const res = await fetch('/api/admin/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      const d = await res.json();
      setToken(d.token);
      setAuthed(true);
      loadData(d.token);
    } else {
      const d = await res.json();
      setAuthErr(d.error ?? 'Invalid password');
    }
  }

  async function loadData(t: string) {
    try {
      const res = await fetch('/api/admin/config', { headers: { 'x-admin-token': t } });
      if (res.ok) setData(await res.json());
      else setData({ siteConfig: {}, hdPrices: { products: {}, lastUpdated: 'N/A' } });
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
    setSaveMsg(res.ok ? '✅ Saved!' : '❌ Save failed');
    setTimeout(() => setSaveMsg(''), 3000);
  }

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', background: '#0F2542', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={submitPassword} style={{
          background: '#1A3A5C', borderRadius: '16px', padding: '40px 36px',
          width: '100%', maxWidth: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔐</div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: 0 }}>Admin Login</h1>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inp}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {authErr && <p style={{ color: '#F87171', fontSize: '13px', margin: '0 0 16px' }}>{authErr}</p>}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px', borderRadius: '8px',
            background: '#F5C518', color: '#0F2542', fontWeight: 700,
            fontSize: '15px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>
      </main>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  const TABS: { id: Tab; label: string }[] = [
    { id: 'business', label: 'Business Info' },
    { id: 'prices',   label: 'HD Prices' },
    { id: 'leads',    label: 'Leads' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#0F2542', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: 0 }}>2M Admin Dashboard</h1>
          <button onClick={() => { setAuthed(false); setToken(''); setPassword(''); }} style={{
            background: 'transparent', border: '1px solid #334155', color: '#94A3B8',
            padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
          }}>Logout</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: 600,
              background: tab === t.id ? '#F5C518' : '#1A3A5C',
              color: tab === t.id ? '#0F2542' : '#94A3B8',
            }}>{t.label}</button>
          ))}
        </div>

        {!data ? (
          <p style={{ color: '#94A3B8' }}>Loading...</p>
        ) : (
          <div style={{ background: '#1A3A5C', borderRadius: '12px', padding: '24px' }}>
            {tab === 'business' && (
              <div>
                <h2 style={{ color: '#fff', fontSize: '16px', marginTop: 0 }}>Business Info</h2>
                {['businessName','phone','email','address'].map(field => (
                  <div key={field} style={{ marginBottom: '16px' }}>
                    <label style={lbl}>{field}</label>
                    <input
                      style={inp}
                      value={data.siteConfig?.[field] ?? ''}
                      onChange={e => setData({ ...data, siteConfig: { ...data.siteConfig, [field]: e.target.value } })}
                    />
                  </div>
                ))}
              </div>
            )}

            {tab === 'prices' && (
              <div>
                <h2 style={{ color: '#fff', fontSize: '16px', marginTop: 0 }}>
                  HD Prices — Last updated: {data.hdPrices?.lastUpdated ?? 'N/A'}
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '13px' }}>
                  {Object.keys(data.hdPrices?.products ?? {}).length} products loaded
                </p>
              </div>
            )}

            {tab === 'leads' && (
              <div>
                <h2 style={{ color: '#fff', fontSize: '16px', marginTop: 0 }}>Leads</h2>
                <p style={{ color: '#94A3B8', fontSize: '13px' }}>Contact form submissions will appear here.</p>
              </div>
            )}

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={handleSave} disabled={saving} style={{
                background: '#F5C518', color: '#0F2542', fontWeight: 700,
                padding: '10px 24px', borderRadius: '8px', border: 'none',
                cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px',
              }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saveMsg && <span style={{ color: saveMsg.includes('✅') ? '#4ADE80' : '#F87171', fontSize: '13px' }}>{saveMsg}</span>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
