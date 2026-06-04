import Link from 'next/link';
import Image from 'next/image';

const services = [
  { name: 'Fence',    slug: 'fence',    icon: '', desc: 'Wood, vinyl & chain-link' },
  { name: 'Deck',     slug: 'deck',     icon: '', desc: 'Custom deck build' },
  { name: 'Painting', slug: 'painting', icon: '', desc: 'Interior & exterior' },
  { name: 'Flooring', slug: 'flooring', icon: '', desc: 'Hardwood, tile & vinyl' },
  { name: 'Bathroom', slug: 'bathroom', icon: '', desc: 'Full remodel' },
  { name: 'Kitchen',  slug: 'kitchen',  icon: '', desc: 'Renovation & cabinets' },
  { name: 'Drywall',  slug: 'drywall',  icon: '', desc: 'Repair & installation' },
  { name: 'Roofing',  slug: 'roofing',  icon: '', desc: 'Repair & replacement' },
  { name: 'Concrete', slug: 'concrete', icon: '', desc: 'Driveways & patios' },
  { name: 'Handyman', slug: 'handyman', icon: '', desc: 'General repairs' },
];

const trust = [
  { icon: '', label: '5-Star Rated', sub: 'Google & BBB verified' },
  { icon: '', label: 'Local Company', sub: 'Serving North Alabama' },
  { icon: '', label: 'Licensed & Insured', sub: 'AL Contractor License' },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1A3A5C 0%, #0F2542 100%)',
        borderRadius: '16px', padding: '40px 32px', marginBottom: '28px',
        display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }}>
          <Image src="/logo.png" alt="" width={180} height={180} style={{ objectFit: 'contain' }} />
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)',
          borderRadius: '20px', padding: '4px 12px', width: 'fit-content'
        }}>
          <span style={{ fontSize: '12px', color: '#F5C518' }}> Huntsville · Madison · Athens · Decatur</span>
        </div>
        <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Get Your Free<br />Construction Estimate
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0, maxWidth: '480px' }}>
          Fill in your project details — see a price breakdown in seconds. No sign-up required.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/estimate" style={{
            background: '#F5C518', color: '#1A3A5C', fontWeight: 800,
            padding: '13px 28px', borderRadius: '10px', fontSize: '15px',
            display: 'inline-block', letterSpacing: '0.2px'
          }}>
            Calculate My Price →
          </Link>
          <a href="tel:+12565551234" style={{
            border: '1.5px solid rgba(255,255,255,0.3)', color: '#FFFFFF',
            padding: '13px 24px', borderRadius: '10px', fontSize: '15px',
            display: 'inline-block'
          }}>
             Call Us Now
          </a>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px', marginBottom: '28px'
      }}>
        {trust.map(t => (
          <div key={t.label} style={{
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            borderRadius: '12px', padding: '16px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{t.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#1E293B' }}>{t.label}</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{t.sub}</div>
          </div>
        ))}
      </div>

      {/* Services */}
      <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#1E293B', marginBottom: '16px' }}>
        Our Services
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px'
      }}>
        {services.map((s) => (
          <Link key={s.slug} href={'/estimate/' + s.slug} style={{
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            borderRadius: '12px', padding: '16px', display: 'block'
          }}>
            <div style={{ fontSize: '26px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '14px' }}>{s.name}</div>
            <div style={{ color: '#64748B', fontSize: '12px', marginTop: '3px' }}>{s.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
