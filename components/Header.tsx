'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Estimates', '/estimate'],
  ['Portfolio', '/portfolio'],
  ['Reviews', '/reviews'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: '#1A3A5C', height: '60px',
        display: 'flex', alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          width: '100%', maxWidth: '1100px', margin: '0 auto',
          padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <Image src="/logo.png" alt="2M Construction" width={38} height={38} style={{ objectFit: 'contain' }} />
            {!isMobile && (
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', lineHeight: 1.1 }}>2M Construction</div>
                <div style={{ color: '#F5C518', fontSize: '10px', fontWeight: 500 }}>Quality · Service · Affordable</div>
              </div>
            )}
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
              {NAV_LINKS.map(([l, h]) => (
                <Link key={h} href={h} style={{
                  color: '#CBD5E1', fontSize: '13px',
                  fontWeight: 500, textDecoration: 'none',
                }}>{l}</Link>
              ))}
            </nav>
          )}

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Phone button */}
            {isMobile ? (
              <a href="tel:+12565551234" style={{
                background: '#F5C518', color: '#1A3A5C', fontWeight: 700,
                width: '38px', height: '38px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', textDecoration: 'none',
              }}>📞</a>
            ) : (
              <a href="tel:+12565551234" style={{
                background: '#F5C518', color: '#1A3A5C', fontWeight: 700, fontSize: '13px',
                padding: '8px 16px', borderRadius: '20px',
                display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none',
              }}>📞 (256) 555-1234</a>
            )}

            {/* Hamburger button — mobile only */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px', display: 'flex', flexDirection: 'column',
                  gap: '5px', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="Toggle menu"
              >
                <span style={{
                  display: 'block', width: 22, height: 2,
                  background: '#fff', borderRadius: 2,
                  transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                  transition: 'transform 0.2s',
                }} />
                <span style={{
                  display: 'block', width: 22, height: 2,
                  background: '#fff', borderRadius: 2,
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 0.2s',
                }} />
                <span style={{
                  display: 'block', width: 22, height: 2,
                  background: '#fff', borderRadius: 2,
                  transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                  transition: 'transform 0.2s',
                }} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 49,
          background: '#0F2542',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          {NAV_LINKS.map(([l, h]) => (
            <Link
              key={h}
              href={h}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '16px 24px',
                color: '#CBD5E1',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {l}
            </Link>
          ))}
          <div style={{ padding: '16px 24px' }}>
            <a href="tel:+12565551234" style={{
              display: 'block', textAlign: 'center',
              background: '#F5C518', color: '#0F2542',
              padding: '12px', borderRadius: 8,
              fontWeight: 700, fontSize: '15px', textDecoration: 'none',
            }}>📞 (256) 555-1234</a>
          </div>
        </div>
      )}
    </>
  );
}
