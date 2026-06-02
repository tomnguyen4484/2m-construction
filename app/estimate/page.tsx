import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Construction Estimates – Fencing, Roofing, Decks & More',
  description: 'Get instant construction cost estimates for fencing, decks, roofing, painting, flooring, bathroom & kitchen remodels in Huntsville, AL.',
};

const services = [
  { name: 'Fence',    slug: 'fence',    icon: '🪵', desc: 'Wood, vinyl, chain-link & more' },
  { name: 'Deck',     slug: 'deck',     icon: '🏗️', desc: 'Composite, cedar, pressure-treated' },
  { name: 'Painting', slug: 'painting', icon: '🎨', desc: 'Interior, exterior & cabinets' },
  { name: 'Flooring', slug: 'flooring', icon: '🏠', desc: 'LVP, hardwood, tile & carpet' },
  { name: 'Bathroom', slug: 'bathroom', icon: '🚿', desc: 'Full remodel, cosmetic & more' },
  { name: 'Kitchen',  slug: 'kitchen',  icon: '🍳', desc: 'Cabinets, counters & full gut' },
  { name: 'Drywall',  slug: 'drywall',  icon: '🧱', desc: 'Repair, new install & finishing' },
  { name: 'Roofing',  slug: 'roofing',  icon: '🏘️', desc: 'Shingles, metal & flat roofs' },
  { name: 'Concrete', slug: 'concrete', icon: '⬜', desc: 'Driveways, patios & slabs' },
  { name: 'Handyman', slug: 'handyman', icon: '🔧', desc: 'Doors, outlets, repairs & more' },
];

export default function EstimatePage() {
  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'24px 16px' }}>
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>
        Free Construction Estimates
      </h1>
      <p style={{ color:'#64748B', fontSize:'14px', margin:'0 0 24px' }}>
        Select a service to get an instant price estimate for your project in Huntsville, AL.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'12px' }}>
        {services.map((s) => (
          <Link key={s.slug} href={'/estimate/' + s.slug}
            style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:'12px', padding:'16px', display:'block' }}>
            <div style={{ fontSize:'26px', marginBottom:'8px' }}>{s.icon}</div>
            <div style={{ fontWeight:600, color:'#1E293B', fontSize:'14px' }}>{s.name}</div>
            <div style={{ color:'#64748B', fontSize:'12px', marginTop:'3px' }}>{s.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
