import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: '#1A3A5C', height: '56px',
      display: 'flex', alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <div style={{
        width: '100%', maxWidth: '1100px', margin: '0 auto',
        padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', background: '#FFFFFF',
            borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: '#1A3A5C', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.5px' }}>2M</span>
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', lineHeight: 1.1 }}>2M Construction</div>
            <div style={{ color: '#94A3B8', fontSize: '11px' }}>Huntsville, AL</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'none' }} className="desktop-nav-links">
            <Link href="/" style={{ color: '#CBD5E1', fontSize: '14px', fontWeight: 500 }}>Home</Link>
            <Link href="/estimate" style={{ color: '#CBD5E1', fontSize: '14px', fontWeight: 500 }}>Estimates</Link>
            <Link href="/contact" style={{ color: '#CBD5E1', fontSize: '14px', fontWeight: 500 }}>Contact</Link>
          </div>
          <a href="tel:+12565551234" style={{
            color: '#FFFFFF', fontWeight: 600, fontSize: '13px',
            border: '1.5px solid rgba(255,255,255,0.4)',
            padding: '6px 14px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <span>📞</span> (256) 555-1234
          </a>
        </nav>
      </div>
    </header>
  );
}
