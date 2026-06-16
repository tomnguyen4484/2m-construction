'use client';
import { useState, useEffect, useCallback } from 'react';

type Tab = 'business' | 'prices' | 'leads' | 'traffic';

const TOKEN_KEY = '2m_admin_token';

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid #334155', background: '#1E3A5F', color: '#E2E8F0',
  fontSize: '14px', boxSizing: 'border-box', outline: 'none',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: '12px', fontWeight: 600,
  color: '#94A3B8', marginBottom: '5px',
};

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, delta }: { label: string; value: string; sub?: string; delta?: number }) {
  return (
    <div style={{ background: '#1E3A5F', borderRadius: 12, padding: '20px 24px', flex: '1 1 160px' }}>
      <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
      <p style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub  && <p style={{ color: '#64748b', fontSize: 11, margin: '4px 0 0' }}>{sub}</p>}
      {delta !== undefined && (
        <p style={{ color: delta >= 0 ? '#4ADE80' : '#F87171', fontSize: 12, margin: '6px 0 0', fontWeight: 600 }}>
          {delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}% vs prev 30d
        </p>
      )}
    </div>
  );
}

// ── Mini bar chart ────────────────────────────────────────────────────────────
function MiniBar({ rows, metricIdx = 0 }: { rows: any[]; metricIdx?: number }) {
  if (!rows?.length) return null;
  const vals = rows.map(r => parseFloat(r.metricValues?.[metricIdx]?.value ?? '0'));
  const max = Math.max(...vals, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60, marginTop: 16 }}>
      {vals.map((v, i) => (
        <div key={i} title={rows[i].dimensionValues?.[0]?.value} style={{
          flex: 1, background: '#F5C518', borderRadius: '3px 3px 0 0',
          height: `${Math.max(4, (v / max) * 100)}%`, opacity: 0.7 + (v / max) * 0.3,
        }} />
      ))}
    </div>
  );
}

// ── Traffic Tab ───────────────────────────────────────────────────────────────
function TrafficTab({ token }: { token: string }) {
  const [data, setData]     = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr]       = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/analytics', { headers: { 'x-admin-token': token } })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setErr('Không tải được dữ liệu.'); setLoading(false); });
  }, [token]);

  if (loading) return <p style={{ color: '#94A3B8' }}>Đang tải dữ liệu GA4…</p>;
  if (err)     return <p style={{ color: '#F87171' }}>{err}</p>;

  // Chưa cấu hình
  if (!data?.configured) {
    return (
      <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
        <h3 style={{ color: '#F5C518', margin: '0 0 12px' }}>⚙️ Cần cấu hình GA4</h3>
        <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 20px' }}>
          Website đã gắn GA4 (<code style={{ color: '#F5C518' }}>G-EY3HHXZTKE</code>).
          Để hiện dữ liệu traffic tại đây, thêm 2 biến vào <strong>Vercel → Settings → Environment Variables</strong>:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { name: 'GA4_PROPERTY_ID', desc: 'ID số của GA4 property (vd: 123456789). Tìm ở GA4 → Admin → Property Settings.' },
            { name: 'GOOGLE_SA_JSON',  desc: 'JSON của Service Account có quyền "Viewer" trên GA4 property. Tạo ở Google Cloud Console → IAM → Service Accounts.' },
          ].map(v => (
            <div key={v.name} style={{ background: '#0F2542', borderRadius: 8, padding: '14px 18px' }}>
              <code style={{ color: '#F5C518', fontWeight: 700 }}>{v.name}</code>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: '6px 0 0', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ color: '#64748b', fontSize: 12, marginTop: 20 }}>
          Sau khi thêm env vars, Redeploy trên Vercel → Traffic tab sẽ hiện dữ liệu thực.
        </p>
      </div>
    );
  }

  // Parse overview
  const last = data.overview?.rows?.[0];
  const prev = data.overview?.rows?.[1];
  function metVal(row: any, i: number) { return parseFloat(row?.metricValues?.[i]?.value ?? '0'); }
  function delta(i: number) {
    const l = metVal(last, i), p = metVal(prev, i);
    return p === 0 ? 0 : ((l - p) / p) * 100;
  }
  function fmt(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(Math.round(n));
  }
  function fmtDur(secs: number) {
    const m = Math.floor(secs / 60), s = Math.round(secs % 60);
    return `${m}m ${s}s`;
  }

  const sessions  = metVal(last, 0);
  const users     = metVal(last, 1);
  const pageviews = metVal(last, 2);
  const duration  = metVal(last, 3);
  const bounce    = metVal(last, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Stat cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        <StatCard label="Sessions"   value={fmt(sessions)}  delta={delta(0)} sub="30 ngày qua" />
        <StatCard label="Users"      value={fmt(users)}     delta={delta(1)} />
        <StatCard label="Pageviews"  value={fmt(pageviews)} delta={delta(2)} />
        <StatCard label="Avg session" value={fmtDur(duration)} />
        <StatCard label="Bounce rate" value={`${(bounce * 100).toFixed(1)}%`} />
      </div>

      {/* Daily trend chart */}
      {data.trend?.rows?.length > 0 && (
        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: '20px 24px' }}>
          <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', margin: '0 0 4px', letterSpacing: 0.5 }}>Sessions — 30 ngày</p>
          <MiniBar rows={data.trend.rows} metricIdx={0} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ color: '#475569', fontSize: 11 }}>{data.trend.rows[0]?.dimensionValues?.[0]?.value?.replace(/(\d{4})(\d{2})(\d{2})/, '$2/$3')}</span>
            <span style={{ color: '#475569', fontSize: 11 }}>Hôm nay</span>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Top pages */}
        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: '20px 24px' }}>
          <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', margin: '0 0 14px', letterSpacing: 0.5 }}>Top trang</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(data.pages?.rows ?? []).map((r: any, i: number) => {
              const path  = r.dimensionValues?.[0]?.value ?? '/';
              const views = parseInt(r.metricValues?.[0]?.value ?? '0');
              const total = parseInt(data.pages?.rows?.[0]?.metricValues?.[0]?.value ?? '1');
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${(views / total) * 100}%`,
                      background: '#F5C51820', borderRadius: 4,
                    }} />
                    <span style={{ position: 'relative', color: '#CBD5E1', fontSize: 13, padding: '2px 6px', display: 'block' }}>
                      {path === '/' ? 'Home' : path.replace('/estimate/', '').replace('/service-area/', '').replace('/', '')}
                    </span>
                  </div>
                  <span style={{ color: '#F5C518', fontSize: 13, fontWeight: 700, minWidth: 40, textAlign: 'right' }}>{views}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic sources */}
        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: '20px 24px' }}>
          <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', margin: '0 0 14px', letterSpacing: 0.5 }}>Nguồn traffic</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(data.sources?.rows ?? []).map((r: any, i: number) => {
              const src    = r.dimensionValues?.[0]?.value ?? 'Unknown';
              const count  = parseInt(r.metricValues?.[0]?.value ?? '0');
              const total  = (data.sources?.rows ?? []).reduce((acc: number, x: any) => acc + parseInt(x.metricValues?.[0]?.value ?? '0'), 0);
              const pct    = total > 0 ? Math.round((count / total) * 100) : 0;
              const colors: Record<string, string> = { 'Organic Search': '#4ADE80', 'Direct': '#60A5FA', 'Referral': '#F59E0B', 'Organic Social': '#A78BFA', 'Paid Search': '#F87171' };
              const color  = colors[src] ?? '#94A3B8';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ color: '#CBD5E1', fontSize: 13, flex: 1 }}>{src}</span>
                  <span style={{ color: color, fontSize: 13, fontWeight: 700 }}>{pct}%</span>
                  <span style={{ color: '#64748b', fontSize: 11 }}>({count})</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p style={{ color: '#475569', fontSize: 12, margin: 0, textAlign: 'right' }}>
        Dữ liệu từ Google Analytics 4 · Property: {process.env.NEXT_PUBLIC_GA4_ID ?? 'G-EY3HHXZTKE'}
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [token, setToken]       = useState('');
  const [authErr, setAuthErr]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [authed, setAuthed]     = useState(false);
  const [checking, setChecking] = useState(true); // checking localStorage on mount

  const [tab, setTab]       = useState<Tab>('traffic');
  const [data, setData]     = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // ── Auto-login from localStorage ──────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
      setAuthed(true);
      loadData(stored);
    }
    setChecking(false);
  }, []);

  const loadData = useCallback(async (t: string) => {
    try {
      const res = await fetch('/api/admin/config', { headers: { 'x-admin-token': t } });
      if (res.ok) setData(await res.json());
      else setData({ siteConfig: {}, hdPrices: { products: {}, lastUpdated: 'N/A' } });
    } catch {
      setData({ siteConfig: {}, hdPrices: { products: {}, lastUpdated: 'N/A' } });
    }
  }, []);

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
      if (remember) localStorage.setItem(TOKEN_KEY, d.token);
      loadData(d.token);
    } else {
      const d = await res.json();
      setAuthErr(d.error ?? 'Sai mật khẩu');
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setAuthed(false); setToken(''); setPassword(''); setData(null);
  }

  async function handleSave() {
    setSaving(true); setSaveMsg('');
    const res = await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaveMsg(res.ok ? '✅ Đã lưu!' : '❌ Lưu thất bại');
    setTimeout(() => setSaveMsg(''), 3000);
  }

  // ── Checking localStorage ─────────────────────────────────────────────────
  if (checking) {
    return (
      <main style={{ minHeight: '100vh', background: '#0F2542', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94A3B8' }}>Đang kiểm tra phiên đăng nhập…</p>
      </main>
    );
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', background: '#0F2542', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={submitPassword} style={{
          background: '#1A3A5C', borderRadius: '16px', padding: '40px 36px',
          width: '100%', maxWidth: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔐</div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: 0 }}>2M Admin</h1>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inp}
              placeholder="Nhập mật khẩu admin"
              autoFocus
            />
          </div>

          {/* Remember device */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
            <div
              onClick={() => setRemember(!remember)}
              style={{
                width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                border: `2px solid ${remember ? '#F5C518' : '#334155'}`,
                background: remember ? '#F5C518' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {remember && <span style={{ color: '#0F2542', fontWeight: 900, fontSize: 13 }}>✓</span>}
            </div>
            <span style={{ color: '#CBD5E1', fontSize: 13 }}>Nhớ thiết bị này</span>
          </label>

          {authErr && <p style={{ color: '#F87171', fontSize: '13px', margin: '0 0 16px' }}>{authErr}</p>}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px', borderRadius: '8px',
            background: '#F5C518', color: '#0F2542', fontWeight: 700,
            fontSize: '15px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Đang kiểm tra...' : 'Đăng nhập'}
          </button>
        </form>
      </main>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'traffic',  label: 'Traffic',       icon: '📊' },
    { id: 'business', label: 'Business Info',  icon: '🏢' },
    { id: 'prices',   label: 'HD Prices',      icon: '💰' },
    { id: 'leads',    label: 'Leads',          icon: '📋' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#0F2542', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: 0 }}>2M Admin Dashboard</h1>
          <button onClick={logout} style={{
            background: 'transparent', border: '1px solid #334155', color: '#94A3B8',
            padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
          }}>Đăng xuất</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: 600,
              background: tab === t.id ? '#F5C518' : '#1A3A5C',
              color: tab === t.id ? '#0F2542' : '#94A3B8',
            }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* Traffic tab */}
        {tab === 'traffic' && <TrafficTab token={token} />}

        {/* Other tabs */}
        {tab !== 'traffic' && (
          !data ? (
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
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
                {saveMsg && <span style={{ color: saveMsg.includes('✅') ? '#4ADE80' : '#F87171', fontSize: '13px' }}>{saveMsg}</span>}
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
