'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Header() {
  // Default false (desktop) — useEffect sẽ detect mobile sau khi render
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); // chạy ngay lần đầu
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: '#1A3A5C', height: '60px',
      display: 'flex', alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <div style={{
        width: '100%', maxWidth: '1100px', margin: '0 auto',
        padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>

        {/* Logo + tên */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <Image src="/logo.png" alt="2M Construction" width={38} height={38} style={{ objectFit: 'contain' }} />
          {!isMobile && (
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', lineHeight: 1.1 }}>2M Construction</div>
              <div style={{ color: '#F5C518', fontSize: '10px', fontWeight: 500 }}>Quality · Service · Affordable</div>
            </div>
          )}
        </Link>

        {/* Nav links — luôn hiển thị */}
        <nav style={{ display: 'flex', gap: isMobile ? '14px' : '20px', alignItems: 'center' }}>
          {[['Home', '/'], ['Estimates', '/estimate'], ['Contact', '/contact']].map(([l, h]) => (
            <Link key={h} href={h} style={{
              color: '#CBD5E1', fontSize: isMobile ? '13px' : '14px',
              fontWeight: 500, textDecoration: 'none'
            }}>{l}</Link>
          ))}
        </nav>

        {/* Phone */}
        {isMobile ? (
          <a href="tel:+12565551234" style={{
            background: '#F5C518', color: '#1A3A5C', fontWeight: 700,
            width: '38px', height: '38px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', textDecoration: 'none', flexShrink: 0
          }}>📞</a>
        ) : (
          <a href="tel:+12565551234" style={{
            background: '#F5C518', color: '#1A3A5C', fontWeight: 700, fontSize: '13px',
            padding: '8px 16px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none'
          }}>📞 (256) 555-1234</a>
        )}
      </div>
    </header>
  );
}
