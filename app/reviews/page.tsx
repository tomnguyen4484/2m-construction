'use client';

const REVIEWS = [
  {
    name: 'James Holloway',
    location: 'Huntsville, AL',
    service: 'Fence Installation',
    date: 'March 2026',
    text: 'Tuan and his crew did an outstanding job on our wood privacy fence. They showed up on time every day, cleaned up after themselves, and the finished product looks fantastic. Highly recommend 2M Construction to anyone in the Huntsville area.',
  },
  {
    name: 'Sarah Mitchell',
    location: 'Madison, AL',
    service: 'Kitchen Remodel',
    date: 'January 2026',
    text: 'We had our entire kitchen redone — cabinets, countertops, backsplash — and we could not be happier. The craftsmanship is excellent and the price was very fair. Communication throughout the project was great. Will definitely use them again.',
  },
  {
    name: 'Robert & Linda Crane',
    location: 'Huntsville, AL',
    service: 'Deck Build',
    date: 'April 2026',
    text: 'Our new composite deck is absolutely beautiful. Tuan helped us pick the right materials for our budget and completed the project ahead of schedule. The attention to detail is impressive. Our neighbors keep asking who built it!',
  },
  {
    name: 'Marcus Thompson',
    location: 'Athens, AL',
    service: 'Roofing Replacement',
    date: 'February 2026',
    text: 'Got a full roof replacement after the last storm. 2M Construction gave me the most competitive quote and delivered quality work. The crew was professional and respectful of my property. No mess left behind at all.',
  },
  {
    name: 'Angela Brooks',
    location: 'Decatur, AL',
    service: 'Bathroom Remodel',
    date: 'May 2026',
    text: 'Transformed our outdated bathroom into something out of a magazine. The tile work is perfect and the new shower looks incredible. Tuan was transparent about costs throughout and there were no surprise charges. 10 out of 10.',
  },
  {
    name: 'Kevin Patterson',
    location: 'Harvest, AL',
    service: 'LVP Flooring',
    date: 'April 2026',
    text: 'Had luxury vinyl plank installed throughout the entire first floor. The crew was efficient, the seams are barely visible, and the floors look incredible. Much better than my previous contractor. Will be calling 2M for future projects.',
  },
  {
    name: 'Donna & Steve Walters',
    location: 'Hampton Cove, AL',
    service: 'Interior Painting',
    date: 'March 2026',
    text: 'We had the whole house painted inside before moving in. The team was fast, clean, and did a beautiful job cutting in around trim and ceilings. Colors came out exactly as expected. Very happy with the results.',
  },
  {
    name: 'Chris Nguyen',
    location: 'Huntsville, AL',
    service: 'Drywall Repair',
    date: 'March 2025',
    text: 'Had some significant water damage in the ceiling and walls. 2M Construction repaired and textured everything so well you cannot tell anything was ever wrong. Quick turnaround and very professional service.',
  },
  {
    name: 'Tiffany Moore',
    location: 'Madison, AL',
    service: 'Concrete Driveway',
    date: 'January 2026',
    text: 'Brand new concrete driveway installed with rebar reinforcement. Tuan explained the whole process before starting and kept me updated daily. The finished driveway is smooth, level, and looks great. Great value for the price.',
  },
  {
    name: 'Gary & Beth Simmons',
    location: 'Huntsville, AL',
    service: 'Vinyl Fence',
    date: 'April 2026',
    text: 'Replaced our old chain-link fence with a white vinyl privacy fence. The installation was clean and professional. Posts are solid, panels are perfectly aligned. The yard looks completely transformed. Very satisfied.',
  },
  {
    name: 'Natalie Cruz',
    location: 'Athens, AL',
    service: 'Handyman Services',
    date: 'February 2026',
    text: 'Called 2M for a list of small repairs — door adjustments, a leaky fixture, some trim work. Everything was handled in one visit and done properly. Fair hourly rate and Tuan was honest about what actually needed to be fixed.',
  },
  {
    name: 'Derek Johnson',
    location: 'Decatur, AL',
    service: 'Exterior Painting',
    date: 'February 2026',
    text: 'House exterior was in rough shape. 2M Construction power-washed, primed, and painted everything. The color is even, the trim looks sharp, and the paint quality is holding up well months later. Great work all around.',
  },
  {
    name: 'Pamela Wright',
    location: 'Huntsville, AL',
    service: 'Kitchen Remodel',
    date: 'April 2026',
    text: 'The kitchen renovation exceeded our expectations. New cabinets, quartz countertops, and a tile backsplash that ties it all together. Tuan has a good eye for design and helped us avoid a costly mistake with our layout. Highly recommend.',
  },
  {
    name: 'Tony & Maria Reyes',
    location: 'Harvest, AL',
    service: 'Bathroom Remodel',
    date: 'March 2026',
    text: 'Complete master bath renovation. Walk-in tile shower, double vanity, new flooring. Every detail was handled perfectly. The project was on budget and finished within the timeframe promised. Could not ask for better.',
  },
  {
    name: 'Brandon Ellis',
    location: 'Madison, AL',
    service: 'Deck Repair',
    date: 'March 2025',
    text: 'My deck had several rotted boards and a shaky railing. 2M came out, assessed everything honestly, and repaired only what was needed instead of pushing for a full replacement. Saved me money and the deck is solid again.',
  },
  {
    name: 'Cynthia Harper',
    location: 'Hampton Cove, AL',
    service: 'Roofing',
    date: 'January 2026',
    text: 'After getting four quotes, 2M Construction offered the best combination of price and professionalism. The roof was completed in two days with no damage to my landscaping. The cleanup was thorough. Zero complaints.',
  },
  {
    name: 'William Foster',
    location: 'Huntsville, AL',
    service: 'Concrete Patio',
    date: 'May 2026',
    text: 'Had a large concrete patio poured in the backyard. The crew was punctual, worked efficiently, and the surface came out perfectly level. Already set up furniture and it looks like an extension of the house. Great investment.',
  },
  {
    name: 'Rachel Kim',
    location: 'Athens, AL',
    service: 'Hardwood Flooring',
    date: 'February 2026',
    text: 'Had hardwood installed in the living room and dining area. The installation was clean with no gaps or creaks. Tuan matched the stain color to our existing trim perfectly. The floors look like they have always been there.',
  },
  {
    name: 'Scott & Jennifer Barnes',
    location: 'Huntsville, AL',
    service: 'Fence & Deck',
    date: 'April 2026',
    text: 'Got both a fence and a deck done at the same time. 2M coordinated everything seamlessly. Both came out beautifully and having one reliable contractor handle it all made the process so much easier. Will use again without question.',
  },
  {
    name: 'Denise Coleman',
    location: 'Decatur, AL',
    service: 'Interior Painting',
    date: 'March 2025',
    text: 'Had several rooms painted before putting the house on the market. The team was fast, clean, and the results were crisp and professional. The house sold quickly and I am convinced the fresh paint helped. Thank you 2M Construction!',
  },
];

export default function ReviewsPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', color: '#1a1a1a' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)',
        color: '#fff', padding: '80px 24px', textAlign: 'center',
      }}>
        <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', margin: '0 0 16px' }}>
          Customer Reviews
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
          What Our Customers Say
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ color: '#F5C518', fontSize: 28 }}>★★★★★</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>5.0</span>
          <span style={{ color: '#94a3b8', fontSize: 15 }}>— {REVIEWS.length} reviews</span>
        </div>
        <p style={{ fontSize: 16, color: '#cbd5e1', margin: 0 }}>
          Serving Huntsville and North Alabama with trusted craftsmanship.
        </p>
      </section>

      {/* Reviews Grid */}
      <section style={{ background: '#f8fafc', padding: '64px 24px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{
              background: '#fff', borderRadius: 12,
              padding: '28px 24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              borderTop: '3px solid #F5C518',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              {/* Stars */}
              <div style={{ color: '#F5C518', fontSize: 18 }}>★★★★★</div>

              {/* Review text */}
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#374151', margin: 0, flex: 1 }}>
                {r.text}
              </p>

              {/* Meta */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0F2542' }}>{r.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                  {r.location} · {r.service} · {r.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0F2542', color: '#fff', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, margin: '0 0 16px' }}>
          Ready to be our next happy customer?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: 16, margin: '0 0 32px' }}>
          Get a free estimate today — no obligation.
        </p>
        <a href="/estimate" style={{
          background: '#F5C518', color: '#0F2542',
          padding: '14px 36px', borderRadius: 8,
          fontWeight: 700, fontSize: 15, textDecoration: 'none',
          display: 'inline-block',
        }}>Get Free Estimate</a>
      </section>

    </main>
  );
}
