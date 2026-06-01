import Link from 'next/link';

const services = [
  { name: 'Fence',    slug: 'fence',    icon: '🪵', desc: 'Wood, vinyl & chain-link' },
  { name: 'Deck',     slug: 'deck',     icon: '🏗️', desc: 'Custom deck build' },
  { name: 'Painting', slug: 'painting', icon: '🎨', desc: 'Interior & exterior' },
  { name: 'Flooring', slug: 'flooring', icon: '🏠', desc: 'Hardwood, tile & vinyl' },
  { name: 'Bathroom', slug: 'bathroom', icon: '🚿', desc: 'Full remodel' },
  { name: 'Kitchen',  slug: 'kitchen',  icon: '🍳', desc: 'Renovation & cabinets' },
  { name: 'Drywall',  slug: 'drywall',  icon: '🧱', desc: 'Repair & installation' },
  { name: 'Roofing',  slug: 'roofing',  icon: '🏘️', desc: 'Repair & replacement' },
  { name: 'Concrete', slug: 'concrete', icon: '⬜', desc: 'Driveways & patios' },
  { name: 'Handyman', slug: 'handyman', icon: '🔧', desc: 'General repairs' },
];

export default function EstimatePage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontWeight: 800, fontSize: '22px', color: '#1E293B', marginBottom: '4px' }}>
        Get an Estimate
      </h1>
      <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px' }}>
        Choose a service to calculate your price instantly
      </p>
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
