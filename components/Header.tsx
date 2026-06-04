'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NAV = [
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 900); };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50,
        background:'#1A3A5C', height:'60px',
        display:'flex', alignItems:'center',
        boxShadow:'0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          width:'100%', maxWidth:'1200px', margin:'0 auto',
          padding:'0 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <Link href="/" onClick={() => setOpen(false)} style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0 }}>
            <Image src="/logo.png" alt="2M Construction" width={38} height={38} style={{ objectFit:'contain' }} />
            {!isMobile && (
              <div>
                <div style={{ color:'#fff', fontWeight:700, fontSize:15, lineHeight:1.1 }}>2M Construction</div>
                <div style={{ color:'#F5C518', fontSize:10, fontWeight:500 }}>Quality · Service · Affordable</div>
              </div>
            )}
          </Link>

          {!isMobile && (
            <nav style={{ display:'flex', gap:16, alignItems:'center' }}>
              {NAV.map(([l, h]) => (
                <Link key={h} href={h} style={{ color:'#CBD5E1', fontSize:13, fontWeight:500, textDecoration:'none' }}>{l}</Link>
              ))}
            </nav>
          )}

          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {isMobile ? (
              <a href="tel:+12565551234" style={{
                background:'#F5C518', color:'#1A3A5C', fontWeight:700,
                width:38, height:38, borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:16, textDecoration:'none',
              }}>📞</a>
            ) : (
              <a href="tel:+12565551234" style={{
                background:'#F5C518', color:'#1A3A5C', fontWeight:700, fontSize:13,
                padding:'8px 16px', borderRadius:20,
                display:'flex', alignItems:'center', gap:6, textDecoration:'none',
              }}>📞 (256) 555-1234</a>
            )}
            {isMobile && (
              <button onClick={() => setOpen(!open)} style={{
                background:'none', border:'none', cursor:'pointer',
                padding:6, display:'flex', flexDirection:'column', gap:5,
              }} aria-label="Menu">
                <span style={{ display:'block', width:22, height:2, background:'#fff', borderRadius:2, transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none', transition:'transform 0.2s' }} />
                <span style={{ display:'block', width:22, height:2, background:'#fff', borderRadius:2, opacity: open ? 0 : 1, transition:'opacity 0.2s' }} />
                <span style={{ display:'block', width:22, height:2, background:'#fff', borderRadius:2, transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none', transition:'transform 0.2s' }} />
              </button>
            )}
          </div>
        </div>
      </header>

      {isMobile && open && (
        <div style={{ position:'fixed', top:60, left:0, right:0, zIndex:49, background:'#0F2542', boxShadow:'0 8px 24px rgba(0,0,0,0.3)' }}>
          {NAV.map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)} style={{
              display:'block', padding:'16px 24px',
              color:'#CBD5E1', fontSize:15, fontWeight:500,
              textDecoration:'none', borderBottom:'1px solid rgba(255,255,255,0.08)',
            }}>{l}</Link>
          ))}
          <div style={{ padding:'16px 24px' }}>
            <a href="tel:+12565551234" style={{
              display:'block', textAlign:'center',
              background:'#F5C518', color:'#0F2542',
              padding:12, borderRadius:8, fontWeight:700, fontSize:15, textDecoration:'none',
            }}>📞 (256) 555-1234</a>
          </div>
        </div>
      )}
    </>
  );
}
