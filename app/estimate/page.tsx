import Link from 'next/link';

const services = [
  { name: 'Fence',    slug: 'fence',    icon: '🪵', desc: 'Wood, vinyl and chain-link' },
  { name: 'Deck',     slug: 'deck',     icon: '🏗️', desc: 'Custom deck build' },
  { name: 'Painting', slug: 'painting', icon: '🎨', desc: 'Interior and exterior' },
  { name: 'Flooring', slug: 'flooring', icon: '🏠', desc: 'Hardwood, tile and vinyl' },
  { name: 'Bathroom', slug: 'bathroom', icon: '🚿', desc: 'Full remodel' },
  { name: 'Kitchen',  slug: 'kitchen',  icon: '🍳', desc: 'Renovation and cabinets' },
  { name: 'Drywall',  slug: 'drywall',  icon: '🧱', desc: 'Repair and installation' },
  { name: 'Roofing',  slug: 'roofing',  icon: '🏘️', desc: 'Repair and replacement' },
  { name: 'Concrete', slug: 'concrete', icon: '⬜', desc: 'Driveways and patios' },
  { name: 'Handyman', slug: 'handyman', icon: '🔧', desc: 'General repairs' },
];

export default function EstimatePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Get an Estimate</h1>
      <p className="text-gray-500 text-sm mb-5">Choose a service to calculate your price</p>
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
