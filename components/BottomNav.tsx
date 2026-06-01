'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Home',     href: '/',        icon: '🏠' },
  { label: 'Estimate', href: '/estimate', icon: '📋' },
  { label: 'Contact',  href: '/contact',  icon: '📞' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: '#FFFFFF', borderTop: '1px solid #E2E8F0',
      height: '60px', display: 'flex', alignItems: 'stretch'
    }}>
      {tabs.map((tab) => {
        const active = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        return (
          <Link key={tab.href} href={tab.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '2px',
            color: active ? '#1A3A5C' : '#94A3B8',
            fontWeight: active ? 700 : 400, fontSize: '11px',
            borderTop: active ? '3px solid #F5C518' : '3px solid transparent',
            background: active ? '#FEFCE8' : 'transparent'
          }}>
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
