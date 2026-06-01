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
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-[#1A3A5C] rounded-2xl p-8 mb-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Get Your Free Estimate</h1>
          <p className="text-gray-300 text-sm md:text-base">
            Serving Huntsville, Madison, Athens and surrounding areas
          </p>
        </div>
        <Link href="/estimate"
          className="inline-block bg-[#EA580C] text-white font-semibold px-8 py-3 rounded-xl text-sm md:text-base whitespace-nowrap">
          Calculate My Price
        </Link>
      </div>

      {/* Services */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Our Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {services.map((s) => (
          <Link key={s.slug} href={'/estimate/' + s.slug}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#EA580C] hover:shadow-md transition-all">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-semibold text-gray-800 text-sm">{s.name}</div>
            <div className="text-gray-500 text-xs mt-0.5">{s.desc}</div>
          </Link>
        ))}
      </div>

      {/* Why Us — desktop only */}
      <div className="hidden md:grid grid-cols-3 gap-6 mt-10">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-bold text-gray-800 mb-1">Instant Estimates</h3>
          <p className="text-gray-500 text-sm">Get a price in under 60 seconds — no waiting</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
          <div className="text-3xl mb-3">📍</div>
          <h3 className="font-bold text-gray-800 mb-1">Local Pricing</h3>
          <p className="text-gray-500 text-sm">Prices reflect real material costs in your area</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="font-bold text-gray-800 mb-1">No Commitment</h3>
          <p className="text-gray-500 text-sm">Get your estimate free — contact us only if you want</p>
        </div>
      </div>
    </div>
  );
}
