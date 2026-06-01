import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A3A5C] h-14 flex items-center justify-between px-4 shadow-md">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#EA580C] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">2M</span>
          </div>
          <span className="text-white font-bold text-lg">2M Construction</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-300 hover:text-white text-sm font-medium">Home</Link>
            <Link href="/estimate" className="text-gray-300 hover:text-white text-sm font-medium">Estimates</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white text-sm font-medium">Contact</Link>
          </div>
          <a href="tel:+12565551234"
            className="text-[#EA580C] font-semibold text-sm border border-[#EA580C] px-3 py-1 rounded-full">
            Call Us
          </a>
        </div>
      </div>
    </header>
  );
}
