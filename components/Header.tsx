import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A3A5C] h-14 flex items-center justify-between px-4 shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#EA580C] rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">2M</span>
        </div>
        <span className="text-white font-bold text-lg">2M Construction</span>
      </Link>
      <a
        href="tel:+12565551234"
        className="text-[#EA580C] font-semibold text-sm border border-[#EA580C] px-3 py-1 rounded-full"
      >
        Call Us
      </a>
    </header>
  );
}
