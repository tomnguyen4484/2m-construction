'use client';

export default function Page() {
  return (
    <main style={{ fontFamily: 'sans-serif' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)',
        color: '#fff', padding: '80px 24px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 16px' }}>
          Blog
        </h1>
        <p style={{ fontSize: 17, color: '#cbd5e1', margin: 0 }}>
          Articles and guides coming soon.
        </p>
      </section>

      {/* Placeholder content */}
      <section style={{ background: '#ffffff', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          maxWidth: 500, margin: '0 auto',
          padding: '48px 32px',
          border: '2px dashed #e2e8f0',
          borderRadius: 12,
        }}>
          <p style={{ fontSize: 15, color: '#94a3b8', margin: '0 0 24px' }}>
            Content will be updated soon.
          </p>
          <a href="/contact" style={{
            background: '#F5C518', color: '#0F2542',
            padding: '12px 28px', borderRadius: 8,
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
            display: 'inline-block',
          }}>Contact Us</a>
        </div>
      </section>

    </main>
  );
}
