import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Construction Services in Decatur, AL | 2M Construction',
  description: '2M Construction provides licensed fencing, decking, roofing, painting, flooring & remodeling services in Decatur, AL (35601). Free estimates. Call (256) 555-1234.',
  alternates: { canonical: 'https://2mhuntsville.com/service-area/decatur' },
};

const services = ["Fence Installation","Deck Building","Roofing","Painting","Flooring","Bathroom Remodel","Kitchen Remodel","Drywall","Concrete","Handyman Services"];

export default function DecaturServiceArea() {
  return (
    <div style={{ maxWidth:'800px', margin:'0 auto', padding:'24px 16px' }}>
      <p style={{ fontSize:'13px', color:'#64748B', marginBottom:'8px' }}>
        <Link href="/" style={{ color:'#64748B' }}>Home</Link> › <Link href="/service-area" style={{ color:'#64748B' }}>Service Areas</Link> › Decatur
      </p>

      <h1 style={{ fontWeight:800, fontSize:'26px', color:'#1E293B', margin:'0 0 8px' }}>
        Construction Services in Decatur, AL
      </h1>
      <p style={{ color:'#64748B', fontSize:'15px', margin:'0 0 24px', lineHeight:1.6 }}>
        2M Construction is the River City of Alabama serving Decatur and surrounding Morgan County communities.
        We provide high-quality, affordable construction services with free on-site estimates.
      </p>

      {/* Local schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Construction",
          "provider": {
            "@type": "LocalBusiness",
            "name": "2M Construction",
            "telephone": "+12565551234",
            "url": "https://2mhuntsville.com"
          },
          "areaServed": {
            "@type": "City",
            "name": "Decatur",
            "containedIn": { "@type": "State", "name": "Alabama" }
          }
        })}}
      />

      <div style={{ background:'linear-gradient(135deg,#1A3A5C,#0F2542)', borderRadius:'16px', padding:'24px', marginBottom:'24px', color:'#fff' }}>
        <h2 style={{ fontWeight:800, fontSize:'18px', margin:'0 0 8px' }}>Free Estimates in Decatur</h2>
        <p style={{ color:'rgba(255,255,255,0.8)', margin:'0 0 16px', fontSize:'14px' }}>
          Serving 35601 and surrounding areas. Licensed & insured in Alabama.
        </p>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
          <Link href="/estimate" style={{ background:'#F5C518', color:'#1A3A5C', fontWeight:800, padding:'12px 24px', borderRadius:'10px', fontSize:'15px' }}>
            Get Free Estimate →
          </Link>
          <a href="tel:+12565551234" style={{ border:'1.5px solid rgba(255,255,255,0.4)', color:'#fff', padding:'12px 20px', borderRadius:'10px', fontSize:'15px' }}>
            📞 (256) 555-1234
          </a>
        </div>
      </div>

      <h2 style={{ fontWeight:700, fontSize:'18px', color:'#1E293B', marginBottom:'16px' }}>
        Our Services in Decatur, AL
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'10px', marginBottom:'32px' }}>
        {services.map((s: string) => (
          <div key={s} style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:'10px', padding:'14px 16px', fontSize:'14px', color:'#1E293B', fontWeight:500 }}>
            ✓ {s}
          </div>
        ))}
      </div>

      <div style={{ background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:'12px', padding:'20px', marginBottom:'24px' }}>
        <h3 style={{ fontWeight:700, fontSize:'16px', color:'#1E293B', margin:'0 0 12px' }}>Why Choose 2M Construction in Decatur?</h3>
        <ul style={{ margin:0, paddingLeft:'20px', color:'#475569', fontSize:'14px', lineHeight:2 }}>
          <li>Licensed & insured Alabama contractor</li>
          <li>Serving Decatur and Morgan County since 2010</li>
          <li>Free on-site estimates — no obligation</li>
          <li>Quality materials, competitive pricing</li>
          <li>5-star rated on Google</li>
        </ul>
      </div>

      <div style={{ textAlign:'center', padding:'24px', background:'#fff', border:'1px solid #E2E8F0', borderRadius:'12px' }}>
        <h3 style={{ fontWeight:700, fontSize:'16px', color:'#1E293B', margin:'0 0 8px' }}>Ready to start your project in Decatur?</h3>
        <p style={{ color:'#64748B', fontSize:'14px', margin:'0 0 16px' }}>Use our instant estimator or call us directly.</p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/estimate" style={{ background:'#F5C518', color:'#1A3A5C', fontWeight:800, padding:'12px 28px', borderRadius:'10px', fontSize:'15px' }}>
            Get Instant Estimate
          </Link>
          <a href="tel:+12565551234" style={{ background:'#1A3A5C', color:'#fff', fontWeight:700, padding:'12px 24px', borderRadius:'10px', fontSize:'15px' }}>
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
