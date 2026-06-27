import Link from 'next/link';

const SERVICES = [
  {
    href: '/estimate/flooring',
    icon: '🪟',
    title: 'Flooring & Tile Installation',
    sub: 'Tile · LVP · Hardwood · Carpet',
    from: 'From $750',
    note: '150 sq ft room',
  },
  {
    href: '/estimate/fence',
    icon: '🪵',
    title: 'Fence Installation',
    sub: 'Wood · Vinyl · Chain-link · Aluminum',
    from: 'From $1,350',
    note: '150 ft chain-link',
  },
  {
    href: '/estimate/painting',
    icon: '🎨',
    title: 'Painting',
    sub: 'Interior · Exterior · Cabinets',
    from: 'From $850',
    note: 'Single room',
  },
  {
    href: '/estimate/bathroom',
    icon: '🚿',
    title: 'Bathroom Remodel',
    sub: 'Cosmetic · Partial · Full · Luxury',
    from: 'From $4,000',
    note: 'Cosmetic update',
  },
  {
    href: '/estimate/deck',
    icon: '🏗️',
    title: 'Deck & Patio',
    sub: 'Pressure-treated · Composite · PVC',
    from: 'From $2,800',
    note: '150 sq ft deck',
  },
  {
    href: '/estimate/kitchen',
    icon: '🍳',
    title: 'Kitchen Remodel',
    sub: 'Cosmetic · Mid-Range · Full · Luxury',
    from: 'From $3,500',
    note: 'Cabinet reface',
  },
  {
    href: '/estimate/drywall',
    icon: '🔲',
    title: 'Drywall',
    sub: 'Repair · New Install · Ceiling · Texture',
    from: 'From $180',
    note: 'Single patch repair',
  },
  {
    href: '/estimate/concrete',
    icon: '🚗',
    title: 'Concrete',
    sub: 'Driveway · Patio · Sidewalk · Slab',
    from: 'From $630',
    note: '90 sq ft patio',
  },
];

export default function EstimatePage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '60px', color: '#E2E8F0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ color: '#F5C518', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px' }}>
            FREE INSTANT ESTIMATE
          </p>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            What project are you planning?
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
            Get a ballpark price in under 2 minutes — based on real Huntsville, AL market data.
            We confirm the exact quote on-site, free of charge.
          </p>
        </div>

        {/* Trust bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {['✓ Licensed & Insured', '✓ Free On-Site Quote', '✓ 150+ Huntsville Projects'].map((t) => (
            <span key={t} style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>{t}</span>
          ))}
        </div>

        {/* Service cards */}
        <div style={{ display: 'grid', gap: '10px', marginBottom: '40px' }}>
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(26,58,92,0.85)', borderRadius: '12px', padding: '16px 20px',
                border: '1px solid #2D4F73', borderLeft: '3px solid #F5C518',
                transition: 'background 0.15s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '24px', minWidth: '32px', textAlign: 'center' }}>{s.icon}</span>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>
                      {s.title}
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '12px' }}>{s.sub}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#F5C518', fontSize: '14px', fontWeight: 800 }}>{s.from}</div>
                    <div style={{ color: '#64748B', fontSize: '11px' }}>{s.note}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#F5C518" strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ background: 'rgba(26,58,92,0.85)', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '1px solid #2D4F73' }}>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: '0 0 6px', fontWeight: 600 }}>
            Need help figuring out costs?
          </p>
          <p style={{ color: '#94A3B8', fontSize: '13px', margin: '0 0 16px' }}>
            Call or message us — we&apos;ll walk you through the estimate and visit your property at no charge.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+19383026795" style={{ background: '#F5C518', color: '#1A3A5C', fontWeight: 800, fontSize: '14px', padding: '11px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              Call (938) 302-6795
            </a>
            <Link href="/contact" style={{ background: 'transparent', color: '#F5C518', fontWeight: 700, fontSize: '14px', padding: '11px 24px', borderRadius: '8px', textDecoration: 'none', border: '2px solid #F5C518' }}>
              Send a Message
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
