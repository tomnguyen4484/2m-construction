import Link from 'next/link';

const ESTIMATORS = [
  {
    href: '/estimate/fence',
    icon: '🪵',
    title: 'Fence Installation',
    desc: 'Wood, vinyl, or chain-link — get a price per linear foot.',
    popular: true,
  },
  {
    href: '/estimate/deck',
    icon: '🏡',
    title: 'Deck & Patio',
    desc: 'Pressure-treated or composite deck with railing options.',
    popular: true,
  },
  {
    href: '/estimate/roofing',
    icon: '🏠',
    title: 'Roofing',
    desc: 'Asphalt shingles or metal roofing — full replacement estimate.',
    popular: true,
  },
  {
    href: '/estimate/painting',
    icon: '🎨',
    title: 'Painting',
    desc: 'Interior or exterior painting, primed and finish coats.',
    popular: false,
  },
  {
    href: '/estimate/bathroom',
    icon: '🚿',
    title: 'Bathroom Remodel',
    desc: 'Tile, vanity, fixtures — full or partial bathroom update.',
    popular: true,
  },
  {
    href: '/estimate/flooring',
    icon: '🪵',
    title: 'Flooring',
    desc: 'LVP, laminate, or hardwood installed over your subfloor.',
    popular: true,
  },
];

export default function EstimatePage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '60px',
      background: '#0F2542', color: '#E2E8F0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', background: '#F5C518', color: '#1A3A5C',
            fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '20px',
            marginBottom: '14px', letterSpacing: '0.5px' }}>
            FREE INSTANT ESTIMATE
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF',
            margin: '0 0 12px', lineHeight: 1.2 }}>
            How Much Will Your Project Cost?
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '520px',
            margin: '0 auto', lineHeight: 1.6 }}>
            Get an instant ballpark estimate in under 2 minutes.
            Then connect with us for an exact on-site quote — free of charge.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px', marginBottom: '48px' }}>
          {ESTIMATORS.map(e => (
            <Link key={e.href} href={e.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#1A3A5C', borderRadius: '14px', padding: '24px',
                border: '1px solid #2D4F73', cursor: 'pointer',
                transition: 'border-color 0.2s',
                position: 'relative', overflow: 'hidden',
              }}>
                {e.popular && (
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: '#F5C518', color: '#1A3A5C',
                    fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px',
                  }}>
                    POPULAR
                  </div>
                )}
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{e.icon}</div>
                <h2 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700,
                  margin: '0 0 8px' }}>{e.title}</h2>
                <p style={{ color: '#94A3B8', fontSize: '13px', margin: '0 0 16px',
                  lineHeight: 1.5 }}>{e.desc}</p>
                <div style={{ color: '#F5C518', fontSize: '13px', fontWeight: 700 }}>
                  Estimate now →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ background: '#1A3A5C', borderRadius: '16px', padding: '32px',
          textAlign: 'center', border: '1px solid #2D4F73' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, margin: '0 0 10px' }}>
            Not sure which service you need?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: '0 0 20px' }}>
            Call or message us — we&apos;ll assess your project and give you a free quote on-site.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+12565551234" style={{
              background: '#F5C518', color: '#1A3A5C', fontWeight: 800, fontSize: '15px',
              padding: '12px 28px', borderRadius: '10px', textDecoration: 'none',
            }}>📞 Call (256) 555-1234</a>
            <Link href="/contact" style={{
              background: 'transparent', color: '#F5C518', fontWeight: 700, fontSize: '15px',
              padding: '12px 28px', borderRadius: '10px', textDecoration: 'none',
              border: '2px solid #F5C518',
            }}>📩 Send a Message</Link>
          </div>
        </div>

      </div>
    </main>
  );
}
