'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Home',     href: '/',        icon: '🏠' },
  { label: 'Estimate', href: '/estimate', icon: '🔨' },
  { label: 'Contact',  href: '/contact',  icon: '📞' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 h-16 flex items-center">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full text-xs font-medium transition-colors
              ${active ? 'text-[#EA580C]' : 'text-gray-500'}`}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
