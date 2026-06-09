'use client';
import { useState } from 'react';
import Image from 'next/image';

const FLOORING = [
  { file: 'luxury-travertine-tile-installation-huntsville-al.jpg', alt: 'Luxury travertine tile flooring installation in open-concept home — 2M Construction Huntsville AL', title: 'Luxury Travertine Tile — Open Concept Home', location: 'Huntsville, AL', caption: 'Large-format travertine tile installed throughout a high-end open-concept living and kitchen area. Precision layout with diagonal pattern across the full floor plan. A showpiece finish built to last.', tags: ['Tile Installation', 'Luxury Flooring', 'Huntsville AL'] },
  { file: 'travertine-floor-luxury-home-living-room-huntsville-al.jpg', alt: 'Polished travertine tile flooring in two-story luxury living room with pool view — 2M Construction Huntsville AL', title: 'Travertine Tile — Two-Story Luxury Home', location: 'Huntsville, AL', caption: 'Full first-floor travertine tile installation in a two-story luxury residence. High-gloss finish reflects natural light throughout the open living space. One of our most premium flooring projects to date.', tags: ['Tile Installation', 'Luxury Flooring', 'High-End Remodel', 'Huntsville AL'] },
  { file: 'hardwood-floor-installation-open-living-room-huntsville-al.jpg', alt: 'Light hardwood flooring installation in spacious living room with large windows — 2M Construction Huntsville AL', title: 'Hardwood Flooring — New Construction Home', location: 'Huntsville, AL', caption: 'Light natural hardwood installed throughout a bright, open living area in a new construction home. Clean lines, tight seams, and a smooth finish from wall to wall. Completed in 3 days.', tags: ['Hardwood Flooring', 'New Construction', 'Huntsville AL'] },
  { file: 'lvp-flooring-installation-living-room-huntsville-al.jpg', alt: 'Luxury vinyl plank flooring installed in living room — 2M Construction Huntsville AL', title: 'Luxury Vinyl Plank (LVP) — Residential Remodel', location: 'Huntsville, AL', caption: 'Warm-tone luxury vinyl plank flooring installed in a full living room and adjoining spaces. Durable, water-resistant, and beautiful — LVP is one of our most popular upgrades for North Alabama homeowners.', tags: ['LVP Flooring', 'Vinyl Plank', 'Home Remodel', 'Huntsville AL'] },
  { file: 'large-format-marble-tile-installation-process-huntsville-al.jpg', alt: 'Large format dark marble tile installation with leveling system in progress — 2M Construction Huntsville AL', title: 'Large Format Marble Tile — Full Room Installation', location: 'Huntsville, AL', caption: 'Large-format dark marble porcelain tile installation using a professional leveling clip system — guaranteeing a perfectly flat, lippage-free surface across the entire room.', tags: ['Tile Installation', 'Marble Tile', 'Large Format', 'Huntsville AL'] },
];

const KITCHEN = [
  { file: 'kitchen-remodel-navy-cabinets-quartz-countertop-huntsville-al.jpg', alt: 'Kitchen remodel with navy blue lower cabinets, white quartz island, and marble backsplash — 2M Construction Huntsville AL', title: 'Navy & White Kitchen Remodel — Huntsville, AL', location: 'Huntsville, AL', caption: 'Full kitchen remodel featuring navy blue lower cabinets, crisp white uppers, calacatta quartz countertops, and a full-height marble backsplash. Stainless steel appliances complete the bold, modern look.', tags: ['Kitchen Remodel', 'Cabinet Installation', 'Quartz Countertop', 'Huntsville AL'] },
  { file: 'kitchen-remodel-gray-shaker-cabinets-quartz-island-huntsville-al.jpg', alt: 'Kitchen remodel with gray shaker cabinets, white quartz island, and subway tile backsplash — 2M Construction Huntsville AL', title: 'Gray Shaker Kitchen with Quartz Island — Huntsville, AL', location: 'Huntsville, AL', caption: 'Modern kitchen renovation featuring gray shaker cabinets, white quartz island with decorative legs, subway tile backsplash, and full stainless steel appliance package.', tags: ['Kitchen Remodel', 'Shaker Cabinets', 'Kitchen Island', 'Subway Tile', 'Huntsville AL'] },
  { file: 'kitchen-renovation-white-cabinets-gray-quartz-island-huntsville-al.jpg', alt: 'Open concept kitchen with white shaker cabinets, gray quartz island, and subway tile backsplash — 2M Construction Huntsville AL', title: 'White Shaker Open-Concept Kitchen — Huntsville, AL', location: 'Huntsville, AL', caption: 'Open-concept kitchen renovation with floor-to-ceiling white shaker cabinets, gray quartz waterfall island with undermount sink, and classic subway tile backsplash.', tags: ['Kitchen Renovation', 'White Cabinets', 'Open Concept', 'Quartz Island', 'Huntsville AL'] },
  { file: 'kitchen-remodel-navy-calacatta-quartz-pendant-lights-huntsville-al.jpg', alt: 'Kitchen remodel with navy cabinets, calacatta quartz countertops, pendant lights and hardwood flooring — 2M Construction Huntsville AL', title: 'Navy Kitchen Full Remodel with Pendant Lighting — Huntsville, AL', location: 'Huntsville, AL', caption: 'Full kitchen remodel including navy base cabinets, white upper cabinets, calacatta quartz countertops, custom pendant lighting, and new hardwood flooring throughout. Finished in under 3 weeks.', tags: ['Kitchen Remodel', 'Full Renovation', 'Pendant Lighting', 'Calacatta Quartz', 'Huntsville AL'] },
  { file: 'kitchen-remodel-white-cabinets-black-granite-diamond-backsplash-huntsville-al.jpg', alt: 'Kitchen with white raised-panel cabinets, black granite countertops, and diamond tile backsplash — 2M Construction Huntsville AL', title: 'Classic White & Black Granite Kitchen — Huntsville, AL', location: 'Huntsville, AL', caption: 'Classic kitchen featuring white raised-panel cabinets, black granite countertops, and a diamond-pattern tile backsplash. A timeless combination that adds lasting value to any North Alabama home.', tags: ['Kitchen Remodel', 'White Cabinets', 'Granite Countertop', 'Classic Design', 'Huntsville AL'] },
  { file: 'kitchen-renovation-white-shaker-granite-recessed-lighting-huntsville-al.webp', alt: 'Kitchen renovation with white shaker cabinets, granite countertops, and recessed lighting — 2M Construction Huntsville AL', title: 'White Shaker Kitchen Renovation with Recessed Lighting — Huntsville, AL', location: 'Huntsville, AL', caption: 'Kitchen renovation featuring white shaker cabinets with crown molding, granite countertops, stainless steel appliances, and new recessed lighting throughout.', tags: ['Kitchen Renovation', 'White Shaker', 'Granite', 'Recessed Lighting', 'Huntsville AL'] },
];

const BATHROOM = [
  { file: 'bathroom-remodel-marble-tile-black-fixtures-glass-enclosure-huntsville-al.jpg', alt: 'Bathroom remodel with marble tile, black matte fixtures, frameless glass shower enclosure — 2M Construction Huntsville AL', title: 'Marble Tile Shower with Black Matte Fixtures — Huntsville, AL', location: 'Huntsville, AL', caption: 'Full shower remodel featuring large-format calacatta marble wall tiles, matte black rain shower system with hand wand, built-in niche, and frameless glass corner enclosure. Hex mosaic floor tile completes the luxury look.', tags: ['Bathroom Remodel', 'Marble Tile', 'Black Fixtures', 'Glass Enclosure', 'Huntsville AL'] },
  { file: 'luxury-bathroom-remodel-freestanding-tub-glass-shower-huntsville-al.jpg', alt: 'Luxury bathroom remodel with freestanding soaking tub, frameless glass shower, and white large-format tile — 2M Construction Huntsville AL', title: 'Luxury Master Bath — Freestanding Tub & Glass Shower, Huntsville, AL', location: 'Huntsville, AL', caption: 'Full master bathroom remodel featuring a freestanding soaking tub with floor-mount filler, frameless glass shower enclosure, large-format white wall tile, hex mosaic shower floor, and custom tile niche.', tags: ['Bathroom Remodel', 'Freestanding Tub', 'Master Bath', 'Luxury', 'Huntsville AL'] },
  { file: 'shower-remodel-gray-linear-tile-black-rain-shower-madison-al.jpg', alt: 'Shower remodel with gray linear tile walls, black rain shower system, hexagon mosaic floor — 2M Construction Madison AL', title: 'Gray Linear Tile Shower with Black Rain Shower — Madison, AL', location: 'Madison, AL', caption: 'Walk-in shower remodel with floor-to-ceiling gray linear porcelain tile, built-in recessed niche with black trim, matte black dual rain shower system, and hexagon mosaic floor tile.', tags: ['Shower Remodel', 'Linear Tile', 'Rain Shower', 'Black Trim', 'Madison AL'] },
  { file: 'master-bathroom-oval-tub-gray-tile-surround-black-trim-madison-al.jpg', alt: 'Master bathroom with oval drop-in soaking tub, gray tile surround, and black trim detail — 2M Construction Madison AL', title: 'Master Bath — Oval Soaking Tub with Tile Surround, Madison, AL', location: 'Madison, AL', caption: 'Master bathroom featuring a drop-in oval soaking tub set within a custom tile platform, gray linear tile surround continuing from floor to wall, black accent trim, and hexagon mosaic shower floor visible in background.', tags: ['Master Bathroom', 'Soaking Tub', 'Tile Surround', 'Madison AL'] },
  { file: 'full-bathroom-remodel-floating-vanity-led-mirror-glass-shower-huntsville-al.jpg', alt: 'Full bathroom remodel with floating vanity, LED mirror, frameless glass shower, and white large-format floor tile — 2M Construction Huntsville AL', title: 'Full Bathroom Remodel — Floating Vanity & LED Mirror, Huntsville, AL', location: 'Huntsville, AL', caption: 'Complete bathroom remodel from floor to ceiling — large-format white porcelain floor tile, frameless sliding glass shower with hex mosaic floor, modern floating vanity with vessel sink, and backlit LED mirror.', tags: ['Full Bathroom Remodel', 'Floating Vanity', 'LED Mirror', 'Glass Shower', 'Huntsville AL'] },
  { file: 'shower-remodel-barn-door-glass-white-tile-hex-marble-floor-huntsville-al.jpg', alt: 'Shower remodel with barn-style sliding glass door, white large-format tile, marble hex floor, and recessed niche — 2M Construction Huntsville AL', title: 'Barn Door Glass Shower — White Tile & Marble Hex Floor, Huntsville, AL', location: 'Huntsville, AL', caption: 'Shower remodel featuring a barn-style frameless sliding glass door, white large-format wall tile, custom recessed niche with hex marble accent insert, marble hexagon floor tile, and rain shower with handheld system.', tags: ['Shower Remodel', 'Barn Door Glass', 'Sliding Door', 'Marble Hex', 'Huntsville AL'] },
  { file: 'bathtub-surround-calacatta-marble-tile-built-in-niche-huntsville-al.jpg', alt: 'Bathtub surround remodel with calacatta marble porcelain tile and built-in niche — 2M Construction Huntsville AL', title: 'Calacatta Marble Bathtub Surround with Built-In Niche — Huntsville, AL', location: 'Huntsville, AL', caption: 'Full bathtub surround remodel with large-format calacatta marble porcelain tile floor to ceiling, built-in recessed niche, new soaking tub, and matching floor tile.', tags: ['Bathtub Surround', 'Calacatta Marble', 'Tile Remodel', 'Huntsville AL'] },
];

const FENCE = [
  { file: 'cedar-wood-fence-corner-install-cap-rail-huntsville-al.jpg', alt: 'Cedar wood privacy fence corner installation with cap rail detail — 2M Construction Huntsville AL', title: 'Cedar Wood Fence — Corner Install with Cap Rail, Huntsville, AL', location: 'Huntsville, AL', caption: 'Cedar wood privacy fence showing corner post construction and cap rail detail. Tight board spacing, level top line, and clean corner finish demonstrate the craftsmanship 2M brings to every fence installation across North Alabama.', tags: ['Fence Installation', 'Wood Fence', 'Cedar', 'Corner Detail', 'Huntsville AL'] },
  { file: 'cedar-wood-fence-installation-cap-rail-gate-huntsville-al.jpg', alt: 'Cedar wood privacy fence with cap rail and gate installed along brick home — 2M Construction Huntsville AL', title: 'Cedar Wood Privacy Fence with Cap Rail & Gate — Huntsville, AL', location: 'Huntsville, AL', caption: 'Full cedar wood privacy fence installation with flat cap rail, black hardware gate latch, and clean board-on-board construction. Fresh cedar grain, tight spacing, and level top line from end to end. Built to last and stain-ready for any finish.', tags: ['Fence Installation', 'Wood Fence', 'Cedar Fence', 'Privacy Fence', 'Huntsville AL'] },
  { file: 'vinyl-fence-installation-white-lattice-top-huntsville-al.jpg', alt: 'White vinyl privacy fence with lattice top installed in backyard — 2M Construction Huntsville AL', title: 'White Vinyl Privacy Fence with Lattice Top — Huntsville, AL', location: 'Huntsville, AL', caption: 'Full backyard vinyl privacy fence installation featuring classic white panels with decorative lattice top detail. Clean lines, low maintenance, and built to last through North Alabama weather. Gate and corner posts finished to match throughout.', tags: ['Fence Installation', 'Vinyl Fence', 'Privacy Fence', 'Lattice Top', 'Huntsville AL'] },
];

const DECK = [
  { file: 'large-composite-deck-dual-pergola-redwood-huntsville-al.jpg', alt: 'Large composite deck with two redwood pergolas and open sky view — 2M Construction Huntsville AL', title: 'Large Composite Deck with Dual Redwood Pergola — Huntsville, AL', location: 'Huntsville, AL', caption: 'Full backyard transformation featuring a large composite deck with two custom redwood pergolas. Clean composite decking, stained redwood timber framing, and an unobstructed open-sky view. One of our largest and most complete outdoor living builds to date.', tags: ['Deck Build', 'Composite Deck', 'Pergola', 'Outdoor Living', 'Huntsville AL'] },
  { file: 'composite-deck-redwood-pergola-open-view-huntsville-al.jpg', alt: 'Composite deck with redwood pergola and panoramic open field view — 2M Construction Huntsville AL', title: 'Composite Deck & Redwood Pergola with Panoramic View — Huntsville, AL', location: 'Huntsville, AL', caption: 'Elevated composite deck with custom redwood pergola, wood baluster railing, and sweeping panoramic views. Premium composite decking in warm brown tone pairs beautifully with the rich redwood stain. Built for outdoor entertaining and built to last.', tags: ['Deck Build', 'Composite Deck', 'Pergola', 'Elevated Deck', 'Huntsville AL'] },
  { file: 'redwood-pergola-deck-craftsmanship-detail-huntsville-al.jpg', alt: 'Custom redwood pergola detail with angled rafters and open hill view — 2M Construction Huntsville AL', title: 'Custom Redwood Pergola — Timber Frame Detail, Huntsville, AL', location: 'Huntsville, AL', caption: 'Close-up of custom redwood pergola showing angled rafter tails, double beam construction, and black hardware detail against an open Alabama sky. This is the craftsmanship that sets 2M apart — every joint precise, every beam level, every detail intentional.', tags: ['Pergola', 'Redwood', 'Timber Frame', 'Custom Build', 'Huntsville AL'] },
  { file: 'composite-deck-platform-stone-facade-home-huntsville-al.jpg', alt: 'Low-profile composite deck platform with corner detail against stone facade home — 2M Construction Huntsville AL', title: 'Composite Deck Platform — Stone Facade Home, Huntsville, AL', location: 'Huntsville, AL', caption: 'Low-profile composite deck platform installed flush against a stone facade home. Clean corner mitering, consistent board spacing, and a warm brown composite that complements the natural stone exterior perfectly. A simple, elegant outdoor living upgrade.', tags: ['Deck Build', 'Composite Deck', 'Platform Deck', 'Huntsville AL'] },
  { file: 'wood-gazebo-gable-roof-concrete-patio-madison-al.jpg', alt: 'Completed wood gazebo with gable roof and metal roofing on concrete patio — 2M Construction Madison AL', title: 'Custom Wood Gazebo with Gable Roof — Madison, AL', location: 'Madison, AL', caption: 'Custom timber frame gazebo with gable roof and corrugated metal roofing panels installed over an existing concrete patio. Heavy timber posts with decorative knee braces, fully weatherproofed and ready for year-round outdoor entertaining.', tags: ['Gazebo', 'Patio Cover', 'Timber Frame', 'Gable Roof', 'Madison AL'] },
  { file: 'deck-framing-concrete-footings-construction-process-huntsville-al.jpg', alt: 'Deck framing with pressure treated lumber and concrete tube footings — 2M Construction Huntsville AL', title: 'Deck Framing & Foundation — Built Right from the Ground Up, Huntsville, AL', location: 'Huntsville, AL', caption: 'Pressure-treated deck framing with properly spaced joists and poured concrete tube footings — the foundation of every deck 2M builds. No shortcuts where it matters most. Solid structure, correct spacing, built to code from day one.', tags: ['Deck Build', 'Deck Framing', 'Construction Process', 'Huntsville AL'] },
];

const TABS = [
  { id: 'flooring',  label: 'Flooring',            count: FLOORING.length,  projects: FLOORING,  category: 'Flooring' },
  { id: 'kitchen',   label: 'Kitchen Remodeling',   count: KITCHEN.length,   projects: KITCHEN,   category: 'Kitchen Remodeling' },
  { id: 'bathroom',  label: 'Bathroom Remodeling',  count: BATHROOM.length,  projects: BATHROOM,  category: 'Bathroom Remodeling' },
  { id: 'fence',     label: 'Fence Installation',   count: FENCE.length,     projects: FENCE,     category: 'Fence Installation' },
  { id: 'deck',      label: 'Deck & Patio',         count: DECK.length,      projects: DECK,      category: 'Deck & Patio' },
];

type Project = { file: string; alt: string; title: string; location: string; caption: string; tags: string[] };

function ProjectCard({ p, category }: { p: Project; category: string }) {
  return (
    <article style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Image src={'/portfolio/' + p.file} alt={p.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      </div>
      <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>{category}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>📍 {p.location}</span>
        </div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F2542', margin: 0, lineHeight: 1.3 }}>{p.title}</h2>
        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: 0, flex: 1 }}>{p.caption}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {p.tags.map(tag => <span key={tag} style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, padding: '3px 8px', borderRadius: 8, fontWeight: 500 }}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('flooring');
  const current = TABS.find(t => t.id === activeTab)!;

  return (
    <main style={{ fontFamily: 'sans-serif', color: '#1a1a1a' }}>
      <section style={{ background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)', color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', margin: '0 0 16px' }}>Our Work</p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Project Portfolio</h1>
        <p style={{ fontSize: 16, color: '#cbd5e1', margin: '0 auto', maxWidth: 560 }}>Real projects. Real craftsmanship. Serving Huntsville and North Alabama.</p>
      </section>

      <section style={{ background: '#fff', borderBottom: '2px solid #f1f5f9', padding: '0 24px', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0, minWidth: 'max-content' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '18px 24px', background: 'transparent', border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #F5C518' : '3px solid transparent',
              cursor: 'pointer', fontWeight: activeTab === tab.id ? 700 : 500, fontSize: 14,
              color: activeTab === tab.id ? '#0F2542' : '#64748b',
              display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}>
              {tab.label}
              <span style={{ background: activeTab === tab.id ? '#F5C518' : '#f1f5f9', color: activeTab === tab.id ? '#0F2542' : '#94a3b8', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>{tab.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section style={{ background: '#f8fafc', padding: '40px 24px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
          {current.projects.map(p => <ProjectCard key={p.file} p={p} category={current.category} />)}
        </div>
      </section>

      <section style={{ background: '#0F2542', color: '#fff', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, margin: '0 0 16px' }}>Ready to start your project?</h2>
        <p style={{ color: '#cbd5e1', fontSize: 16, margin: '0 0 32px' }}>Get a free estimate — no obligation.</p>
        <a href="/estimate" style={{ background: '#F5C518', color: '#0F2542', padding: '14px 36px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>Get Free Estimate</a>
      </section>
    </main>
  );
}
