import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/logo.png" alt="2M Construction" width={44} height={44}
            style={{ objectFit: 'contain' }} />
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', lineHeight: 1.1 }}>
              2M Construction
            </div>
            <div style={{ color: '#F5C518', fontSize: '11px', fontWeight: 500 }}>
              Quality · Service · Affordable
            </div>
          </div>
        </Link>

        {/* Desktop nav + phone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <nav style={{ display: 'flex', gap: '20px' }}>
            {[['Home','/'],['Estimates','/estimate'],['Contact','/contact']].map(([l,h]) => (
              <Link key={h} href={h} style={{ color: '#CBD5E1', fontSize: '14px', fontWeight: 500 }}>{l}</Link>
            ))}
          </nav>
          <a href="tel:+12565551234" style={{
            background: '#F5C518', color: '#1A3A5C', fontWeight: 700, fontSize: '13px',
            padding: '8px 16px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            📞 (256) 555-1234
          </a>
        </div>
      </div>
    </header>
  );
}
