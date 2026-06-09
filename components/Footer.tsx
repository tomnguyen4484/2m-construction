import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background:'#1A3A5C', color:'#94A3B8', padding:'32px 16px 24px', marginTop:'40px' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'24px', marginBottom:'24px' }}>
          <div>
            <div style={{ color:'#fff', fontWeight:700, fontSize:'14px', marginBottom:'12px' }}>2M Construction</div>
            <p style={{ fontSize:'12px', lineHeight:1.7, margin:0 }}>Licensed & insured contractor serving North Alabama.</p>
            <p style={{ fontSize:'12px', margin:'8px 0 0' }}>📞 <a href="tel:+19383026795" style={{ color:'#F5C518' }}>(938) 302-6795</a></p>
          </div>
          <div>
            <div style={{ color:'#fff', fontWeight:700, fontSize:'13px', marginBottom:'12px' }}>Services</div>
            {['fence','deck','painting','flooring','bathroom','kitchen','drywall','roofing','concrete','handyman'].map(s => (
              <div key={s} style={{ marginBottom:'6px' }}>
                <Link href={'/estimate/'+s} style={{ color:'#94A3B8', fontSize:'12px', textTransform:'capitalize' }}>{s}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:'#fff', fontWeight:700, fontSize:'13px', marginBottom:'12px' }}>Service Areas</div>
            {[['huntsville','Huntsville'],['madison','Madison'],['athens','Athens'],['decatur','Decatur'],['harvest','Harvest'],['hampton-cove','Hampton Cove']].map(([slug,name]) => (
              <div key={slug} style={{ marginBottom:'6px' }}>
                <Link href={'/service-area/'+slug} style={{ color:'#94A3B8', fontSize:'12px' }}>{name}, AL</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:'#fff', fontWeight:700, fontSize:'13px', marginBottom:'12px' }}>Company</div>
            {[['Home','/'],['About Us','/about'],['Services','/services'],['Free Estimates','/estimate'],['Portfolio','/portfolio'],['Reviews','/reviews'],['Blog','/blog'],['Contact Us','/contact']].map(([label,href]) => (
              <div key={href} style={{ marginBottom:'6px' }}>
                <Link href={href} style={{ color:'#94A3B8', fontSize:'12px' }}>{label}</Link>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'16px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
          <p style={{ fontSize:'11px', margin:0 }}>© {new Date().getFullYear()} 2M Construction LLC. All rights reserved.</p>
          <p style={{ fontSize:'11px', margin:0 }}>Huntsville · Madison · Athens · Decatur, Alabama</p>
        </div>
      </div>
    </footer>
  );
}
