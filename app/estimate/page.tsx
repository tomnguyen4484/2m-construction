import Link from 'next/link';

const SERVICES = [
  { href:'/estimate/fence',    title:'Fence Installation',  desc:'Wood, vinyl, or chain-link fencing — price per linear foot.', popular:true },
  { href:'/estimate/deck',     title:'Deck & Patio',        desc:'Pressure-treated or composite deck with railing options.', popular:true },
  { href:'/estimate/roofing',  title:'Roofing',             desc:'Asphalt shingles or metal roofing — full replacement estimate.', popular:true },
  { href:'/estimate/painting', title:'Painting',            desc:'Interior or exterior, primed and finish coats included.', popular:false },
  { href:'/estimate/bathroom', title:'Bathroom Remodel',    desc:'Tile, vanity, fixtures — full or partial bathroom update.', popular:true },
  { href:'/estimate/flooring', title:'Flooring',            desc:'LVP, laminate, or hardwood installed over your subfloor.', popular:true },
  { href:'/estimate/kitchen',  title:'Kitchen Remodel',     desc:'Cabinets, countertops, backsplash — full kitchen update.', popular:false },
  { href:'/estimate/drywall',  title:'Drywall',             desc:'New installation, repair, or finishing — any room size.', popular:false },
  { href:'/estimate/concrete', title:'Concrete & Flatwork', desc:'Driveways, patios, walkways — with rebar and labor.', popular:false },
  { href:'/estimate/handyman', title:'Handyman Repairs',    desc:'Small fixes, installations, and general home repairs.', popular:false },
];

// Minimal professional icon — checkmark in a square, color-coded per service
function ServiceIcon() {
  return (
    <div style={{ width:'48px', height:'48px', background:'#0F2542', borderRadius:'10px',
      display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    </div>
  );
}

export default function EstimatePage() {
  return (
    <main style={{ minHeight:'100vh', paddingTop:'80px', paddingBottom:'60px',
      background:'#0F2542', color:'#E2E8F0' }}>
      <div style={{ maxWidth:'860px', margin:'0 auto', padding:'0 16px' }}>

        <div style={{ textAlign:'center', marginBottom:'48px' }}>
          <div style={{ display:'inline-block', background:'#F5C518', color:'#1A3A5C',
            fontSize:'11px', fontWeight:800, padding:'4px 14px', borderRadius:'20px',
            marginBottom:'14px', letterSpacing:'0.5px' }}>
            FREE INSTANT ESTIMATE
          </div>
          <h1 style={{ fontSize:'30px', fontWeight:800, color:'#FFFFFF', margin:'0 0 12px' }}>
            All Estimate Tools
          </h1>
          <p style={{ color:'#94A3B8', fontSize:'15px', maxWidth:'500px', margin:'0 auto', lineHeight:1.6 }}>
            Select your project type to get an instant ballpark price.
            We&apos;ll confirm the exact quote on-site — free of charge.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(380px,1fr))', gap:'12px', marginBottom:'40px' }}>
          {SERVICES.map(s => (
            <Link key={s.href} href={s.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#1A3A5C', borderRadius:'12px', padding:'20px',
                border:'1px solid #2D4F73', display:'flex', alignItems:'center',
                gap:'16px', position:'relative' }}>
                {s.popular && (
                  <div style={{ position:'absolute', top:'10px', right:'10px',
                    background:'#F5C518', color:'#1A3A5C',
                    fontSize:'9px', fontWeight:800, padding:'2px 7px', borderRadius:'10px', letterSpacing:'0.3px' }}>
                    POPULAR
                  </div>
                )}
                <ServiceIcon />
                <div style={{ flex:1, paddingRight: s.popular ? '56px' : '0' }}>
                  <div style={{ color:'#FFFFFF', fontWeight:700, fontSize:'15px', marginBottom:'4px' }}>{s.title}</div>
                  <div style={{ color:'#94A3B8', fontSize:'12px', lineHeight:1.4 }}>{s.desc}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#F5C518" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ background:'#1A3A5C', borderRadius:'16px', padding:'28px',
          textAlign:'center', border:'1px solid #2D4F73' }}>
          <h2 style={{ color:'#FFFFFF', fontSize:'18px', fontWeight:700, margin:'0 0 8px' }}>
            Need a custom quote?
          </h2>
          <p style={{ color:'#94A3B8', fontSize:'13px', margin:'0 0 20px' }}>
            Not sure what you need? Contact us for a free on-site assessment.
          </p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href="tel:+12565551234" style={{ background:'#F5C518', color:'#1A3A5C',
              fontWeight:800, fontSize:'14px', padding:'11px 24px',
              borderRadius:'10px', textDecoration:'none' }}>
              Call (256) 555-1234
            </a>
            <Link href="/contact" style={{ background:'transparent', color:'#F5C518',
              fontWeight:700, fontSize:'14px', padding:'11px 24px',
              borderRadius:'10px', textDecoration:'none', border:'2px solid #F5C518' }}>
              Send a Message
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
