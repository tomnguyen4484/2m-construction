'use client';

const SERVICES = [
  {
    name: 'Fence Installation',
    items: ['Wood privacy fence', 'Vinyl fence', 'Chain-link fence', 'Aluminum fence', 'Gate installation & repair'],
  },
  {
    name: 'Deck & Patio',
    items: ['Pressure-treated wood deck', 'Composite deck', 'Covered patio', 'Pergola', 'Deck repair & refinishing'],
  },
  {
    name: 'Roofing',
    items: ['Asphalt shingle replacement', 'Metal roofing', 'Roof repair', 'Gutter installation', 'Fascia & soffit repair'],
  },
  {
    name: 'Painting',
    items: ['Interior painting', 'Exterior painting', 'Cabinet painting', 'Trim & door painting', 'Staining & sealing'],
  },
  {
    name: 'Flooring',
    items: ['LVP / luxury vinyl plank', 'Laminate flooring', 'Hardwood installation', 'Tile flooring', 'Subfloor repair'],
  },
  {
    name: 'Bathroom Remodel',
    items: ['Full bathroom renovation', 'Shower & tub replacement', 'Tile work', 'Vanity & fixture install', 'Waterproofing'],
  },
  {
    name: 'Kitchen Remodel',
    items: ['Cabinet installation', 'Countertop replacement', 'Backsplash tile', 'Kitchen layout changes', 'Fixture & appliance install'],
  },
  {
    name: 'Drywall',
    items: ['Drywall installation', 'Drywall repair & patching', 'Texture matching', 'Ceiling repair', 'Water damage repair'],
  },
  {
    name: 'Concrete & Flatwork',
    items: ['Driveway installation', 'Patio slab', 'Sidewalk & walkway', 'Garage floor', 'Rebar-reinforced pours'],
  },
  {
    name: 'Handyman Services',
    items: ['Door & window installation', 'Trim & molding', 'Small repairs', 'Fixture replacement', 'General maintenance'],
  },
];

export default function ServicesPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', color: '#1a1a1a' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)',
        color: '#fff',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', margin: '0 0 16px' }}>
          What We Do
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
          Our Services
        </h1>
        <p style={{ fontSize: 17, color: '#cbd5e1', maxWidth: 540, margin: '0 auto' }}>
          Licensed & insured contractor serving Huntsville and North Alabama.
          Free estimates on all projects.
        </p>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '64px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {SERVICES.map((s) => (
            <div key={s.name} style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '28px 24px',
              borderTop: '4px solid #F5C518',
            }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0F2542', margin: '0 0 16px' }}>
                {s.name}
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {s.items.map((item) => (
                  <li key={item} style={{
                    fontSize: 14,
                    color: '#4b5563',
                    padding: '5px 0',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <span style={{ color: '#F5C518', fontWeight: 700, fontSize: 16 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#0F2542',
        color: '#fff',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, margin: '0 0 16px' }}>
          Not sure what you need?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: 16, margin: '0 0 32px' }}>
          Get a free estimate and we will walk you through the options.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/estimate" style={{
            background: '#F5C518', color: '#0F2542',
            padding: '14px 32px', borderRadius: 8,
            fontWeight: 700, fontSize: 15, textDecoration: 'none',
          }}>Get Free Estimate</a>
          <a href="/contact" style={{
            background: 'transparent', color: '#fff',
            padding: '14px 32px', borderRadius: 8,
            fontWeight: 700, fontSize: 15, textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.4)',
          }}>Contact Us</a>
        </div>
      </section>

    </main>
  );
}
