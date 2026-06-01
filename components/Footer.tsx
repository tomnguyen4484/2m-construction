export default function Footer() {
  return (
    <footer style={{
      background: '#0F2542', color: '#FFFFFF',
      padding: '40px 16px 32px', marginBottom: '60px'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px', height: '36px', background: '#FFFFFF',
                borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ color: '#1A3A5C', fontWeight: 800, fontSize: '14px' }}>2M</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>2M Construction</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: 1.6 }}>
              Professional construction and remodeling services in Huntsville, AL and surrounding areas.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px', color: '#CBD5E1' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Fence','Deck','Painting','Flooring','Bathroom','Kitchen'].map(s => (
                <a key={s} href={'/estimate/'+s.toLowerCase()} style={{ color: '#94A3B8', fontSize: '13px' }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px', color: '#CBD5E1' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#94A3B8', fontSize: '13px' }}>
              <span>(256) 555-1234</span>
              <span>info@2mconstruction.com</span>
              <span>Huntsville, AL</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: '20px', color: '#475569', fontSize: '12px', textAlign: 'center' }}>
          2026 2M Construction. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
