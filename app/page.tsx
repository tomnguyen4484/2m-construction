import Link from 'next/link';

const services = [
  { name: 'Fence',    slug: 'fence',    icon: '🪵', desc: 'Wood, vinyl and chain-link fencing' },
  { name: 'Deck',     slug: 'deck',     icon: '🏗️', desc: 'Custom deck design and build' },
  { name: 'Painting', slug: 'painting', icon: '🎨', desc: 'Interior and exterior painting' },
  { name: 'Flooring', slug: 'flooring', icon: '🏠', desc: 'Hardwood, tile and vinyl floors' },
  { name: 'Bathroom', slug: 'bathroom', icon: '🚿', desc: 'Full bathroom remodeling' },
  { name: 'Kitchen',  slug: 'kitchen',  icon: '🍳', desc: 'Kitchen renovation and cabinets' },
  { name: 'Drywall',  slug: 'drywall',  icon: '🧱', desc: 'Drywall repair and installation' },
  { name: 'Roofing',  slug: 'roofing',  icon: '🏘️', desc: 'Roof repair and replacement' },
  { name: 'Concrete', slug: 'concrete', icon: '⬜', desc: 'Driveways, patios and sidewalks' },
  { name: 'Handyman', slug: 'handyman', icon: '🔧', desc: 'General repairs and maintenance' },
];

export default function HomePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="bg-[#1A3A5C] rounded-2xl p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Get Your Free Estimate</h1>
        <p className="text-gray-300 text-sm mb-4">
          Serving Huntsville, Madison, Athens and surrounding areas
        </p>
        <Link
          href="/estimate"
          className="inline-block bg-[#EA580C] text-white font-semibold px-6 py-3 rounded-xl text-sm"
        >
          Calculate My Price
        </Link>
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-3">Our Services</h2>
      <div className="grid grid-cols-2 gap-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={'/estimate/' + s.slug}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-semibold text-gray-800 text-sm">{s.name}</div>
            <div className="text-gray-500 text-xs mt-0.5">{s.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
