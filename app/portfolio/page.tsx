import Image from 'next/image';

const PROJECTS = [
  {
    file: 'luxury-travertine-tile-installation-huntsville-al.jpg',
    alt: 'Luxury travertine tile flooring installation in open-concept home — 2M Construction Huntsville AL',
    title: 'Luxury Travertine Tile — Open Concept Home',
    location: 'Huntsville, AL',
    caption: 'Large-format travertine tile installed throughout a high-end open-concept living and kitchen area. Precision layout with diagonal pattern across the full floor plan. A showpiece finish built to last.',
    tags: ['Tile Installation', 'Luxury Flooring', 'Huntsville AL'],
    category: 'Flooring',
  },
  {
    file: 'travertine-floor-luxury-home-living-room-huntsville-al.jpg',
    alt: 'Polished travertine tile flooring in two-story luxury living room with pool view — 2M Construction Huntsville AL',
    title: 'Travertine Tile — Two-Story Luxury Home',
    location: 'Huntsville, AL',
    caption: 'Full first-floor travertine tile installation in a two-story luxury residence. High-gloss finish reflects natural light throughout the open living space. One of our most premium flooring projects to date.',
    tags: ['Tile Installation', 'Luxury Flooring', 'High-End Remodel', 'Huntsville AL'],
    category: 'Flooring',
  },
  {
    file: 'hardwood-floor-installation-open-living-room-huntsville-al.jpg',
    alt: 'Light hardwood flooring installation in spacious living room with large windows — 2M Construction Huntsville AL',
    title: 'Hardwood Flooring — New Construction Home',
    location: 'Huntsville, AL',
    caption: 'Light natural hardwood installed throughout a bright, open living area in a new construction home. Clean lines, tight seams, and a smooth finish from wall to wall. Completed in 3 days.',
    tags: ['Hardwood Flooring', 'New Construction', 'Huntsville AL'],
    category: 'Flooring',
  },
  {
    file: 'lvp-flooring-installation-living-room-huntsville-al.jpg',
    alt: 'Luxury vinyl plank flooring installed in living room — 2M Construction Huntsville AL',
    title: 'Luxury Vinyl Plank (LVP) — Residential Remodel',
    location: 'Huntsville, AL',
    caption: 'Warm-tone luxury vinyl plank flooring installed in a full living room and adjoining spaces. Durable, water-resistant, and beautiful — LVP is one of our most popular upgrades for North Alabama homeowners.',
    tags: ['LVP Flooring', 'Vinyl Plank', 'Home Remodel', 'Huntsville AL'],
    category: 'Flooring',
  },
  {
    file: 'large-format-marble-tile-installation-process-huntsville-al.jpg',
    alt: 'Large format dark marble tile installation with leveling system in progress — 2M Construction Huntsville AL',
    title: 'Large Format Marble Tile — Full Room Installation',
    location: 'Huntsville, AL',
    caption: 'Large-format dark marble porcelain tile installation using a professional leveling clip system — guaranteeing a perfectly flat, lippage-free surface across the entire room. This is the detail work that separates a quality install from an average one.',
    tags: ['Tile Installation', 'Marble Tile', 'Large Format', 'Professional Process', 'Huntsville AL'],
    category: 'Flooring',
  },
];

export default function PortfolioPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', color: '#1a1a1a' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)',
        color: '#fff', padding: '80px 24px', textAlign: 'center',
      }}>
        <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', margin: '0 0 16px' }}>
          Our Work
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
          Project Portfolio
        </h1>
        <p style={{ fontSize: 16, color: '#cbd5e1', margin: '0 auto', maxWidth: 560 }}>
          Real projects. Real craftsmanship. Serving Huntsville and North Alabama.
        </p>
      </section>

      {/* Category badge */}
      <section style={{ background: '#f8fafc', padding: '32px 24px 8px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '2px solid #F5C518', borderRadius: 24,
            padding: '6px 18px', marginBottom: 8 }}>
            <span style={{ color: '#F5C518', fontWeight: 700, fontSize: 13 }}>●</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#0F2542' }}>Flooring</span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{PROJECTS.length} projects</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ background: '#f8fafc', padding: '16px 24px 64px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 32,
        }}>
          {PROJECTS.map((p) => (
            <article key={p.file} style={{
              background: '#fff', borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image
                  src={'/portfolio/' + p.file}
                  alt={p.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    background: '#FEF3C7', color: '#92400E',
                    fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12,
                  }}>{p.category}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>📍 {p.location}</span>
                </div>

                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F2542', margin: 0, lineHeight: 1.3 }}>
                  {p.title}
                </h2>

                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {p.caption}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      background: '#f1f5f9', color: '#475569',
                      fontSize: 11, padding: '3px 8px', borderRadius: 8, fontWeight: 500,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0F2542', color: '#fff', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, margin: '0 0 16px' }}>
          Ready to start your project?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: 16, margin: '0 0 32px' }}>
          Get a free estimate — no obligation.
        </p>
        <a href="/estimate" style={{
          background: '#F5C518', color: '#0F2542',
          padding: '14px 36px', borderRadius: 8,
          fontWeight: 700, fontSize: 15, textDecoration: 'none',
          display: 'inline-block',
        }}>Get Free Estimate</a>
      </section>

    </main>
  );
}
