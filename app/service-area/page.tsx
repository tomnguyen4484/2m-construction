import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Areas – Huntsville, Madison, Athens, Decatur AL',
  description: '2M Construction serves Huntsville, Madison, Athens, Decatur, Harvest, and Hampton Cove, Alabama with licensed construction services.',
};

const areas = [
  {
    "slug": "huntsville",
    "name": "Huntsville",
    "county": "Madison County",
    "zip": "35801",
    "desc": "the heart of Rocket City"
  },
  {
    "slug": "madison",
    "name": "Madison",
    "county": "Madison County",
    "zip": "35758",
    "desc": "one of the fastest-growing cities in Alabama"
  },
  {
    "slug": "athens",
    "name": "Athens",
    "county": "Limestone County",
    "zip": "35611",
    "desc": "the county seat of Limestone County"
  },
  {
    "slug": "decatur",
    "name": "Decatur",
    "county": "Morgan County",
    "zip": "35601",
    "desc": "the River City of Alabama"
  },
  {
    "slug": "harvest",
    "name": "Harvest",
    "county": "Madison County",
    "zip": "35749",
    "desc": "a growing community north of Huntsville"
  },
  {
    "slug": "hampton-cove",
    "name": "Hampton Cove",
    "county": "Madison County",
    "zip": "35763",
    "desc": "a premier residential community east of Huntsville"
  }
];

export default function ServiceAreaIndex() {
  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'24px 16px' }}>
      <h1 style={{ fontWeight:800, fontSize:'24px', color:'#1E293B', marginBottom:'8px' }}>Service Areas</h1>
      <p style={{ color:'#64748B', marginBottom:'24px' }}>2M Construction proudly serves the following communities in North Alabama.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'16px' }}>
        {areas.map(area => (
          <Link key={area.slug} href={'/service-area/' + area.slug}
            style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:'12px', padding:'20px', display:'block' }}>
            <div style={{ fontWeight:700, fontSize:'16px', color:'#1A3A5C', marginBottom:'4px' }}>{area.name}, AL</div>
            <div style={{ fontSize:'13px', color:'#64748B' }}>{area.county}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
