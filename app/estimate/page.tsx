import Link from 'next/link';

const SERVICES = [
  { href:'/estimate/fence',    title:'Fence Installation',  sub:'Wood · Vinyl · Chain-link',            cat:'Exterior' },
  { href:'/estimate/deck',     title:'Deck & Patio',        sub:'Pressure-treated · Composite',         cat:'Exterior' },
  { href:'/estimate/roofing',  title:'Roofing',             sub:'Shingles · Metal · Full replacement',  cat:'Exterior' },
  { href:'/estimate/painting', title:'Painting',            sub:'Interior · Exterior · All surfaces',   cat:'Interior' },
  { href:'/estimate/bathroom', title:'Bathroom Remodel',    sub:'Tile · Vanity · Fixtures',             cat:'Interior' },
  { href:'/estimate/flooring', title:'Flooring',            sub:'LVP · Laminate · Hardwood',            cat:'Interior' },
  { href:'/estimate/kitchen',  title:'Kitchen Remodel',     sub:'Cabinets · Countertops · Backsplash',  cat:'Interior' },
  { href:'/estimate/drywall',  title:'Drywall',             sub:'New installation · Repair · Finishing', cat:'Interior' },
  { href:'/estimate/concrete', title:'Concrete & Flatwork', sub:'Driveways · Patios · Walkways',        cat:'Exterior' },
  { href:'/estimate/handyman', title:'Handyman Repairs',    sub:'Small fixes · Installations · General', cat:'General' },
];

export default function EstimatePage() {
  return (
    <main style={{ minHeight:'100vh', paddingTop:'80px', paddingBottom:'60px',
      background:'#0F2542', color:'#E2E8F0' }}>
      <div style={{ maxWidth:'800px', margin:'0 auto', padding:'0 16px' }}>

        <div style={{ textAlign:'center', marginBottom:'44px' }}>
          <p style={{ color:'#F5C518', fontSize:'12px', fontWeight:700,
            letterSpacing:'2px', textTransform:'uppercase', margin:'0 0 10px' }}>
            FREE INSTANT ESTIMATE
          </p>
          <h1 style={{ fontSize:'28px', fontWeight:800, color:'#FFFFFF', margin:'0 0 10px' }}>
            Select Your Project
          </h1>
          <p style={{ color:'#94A3B8', fontSize:'14px', maxWidth:'440px',
            margin:'0 auto', lineHeight:1.6 }}>
            Get a ballpark price in under 2 minutes. We confirm the exact quote on-site — free of charge.
          </p>
        </div>

        <div style={{ display:'grid', gap:'8px', marginBottom:'40px' }}>
          {SERVICES.map((s, i) => (
            <Link key={s.href} href={s.href} style={{ textDecoration:'none' }}>
              <div style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                background:'#1A3A5C', borderRadius:'10px', padding:'18px 22px',
                border:'1px solid #2D4F73', borderLeft:'3px solid #F5C518',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
                  <span style={{ color:'#334155', fontSize:'13px', fontWeight:700,
                    minWidth:'24px' }}>{String(i+1).padStart(2,'0')}</span>
                  <div>
                    <div style={{ color:'#FFFFFF', fontWeight:700, fontSize:'15px', marginBottom:'2px' }}>
                      {s.title}
                    </div>
                    <div style={{ color:'#64748B', fontSize:'12px' }}>{s.sub}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <span style={{ color:'#334155', fontSize:'11px',
                    background:'#0F2542', padding:'3px 8px', borderRadius:'6px' }}>
                    {s.cat}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#F5C518" strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ background:'#1A3A5C', borderRadius:'12px', padding:'24px',
          textAlign:'center', border:'1px solid #2D4F73' }}>
          <p style={{ color:'#94A3B8', fontSize:'14px', margin:'0 0 16px' }}>
            Need an on-site assessment? We&apos;ll visit and provide an exact quote at no charge.
          </p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href="tel:+12565551234" style={{ background:'#F5C518', color:'#1A3A5C',
              fontWeight:800, fontSize:'14px', padding:'11px 24px',
              borderRadius:'8px', textDecoration:'none' }}>
              Call (256) 555-1234
            </a>
            <Link href="/contact" style={{ background:'transparent', color:'#F5C518',
              fontWeight:700, fontSize:'14px', padding:'11px 24px',
              borderRadius:'8px', textDecoration:'none', border:'2px solid #F5C518' }}>
              Send a Message
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
