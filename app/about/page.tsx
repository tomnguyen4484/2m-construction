'use client';
import Image from 'next/image';

const TEAM = [
  {
    file: '/about/tuan-nguyen-mike-founder-2m-construction-huntsville-al.png',
    alt: 'Tuan Nguyen Mike - Founder and CEO of 2M Construction Huntsville AL',
    name: 'Tuan Nguyen (Mike)',
    title: 'Founder & CEO',
    credentials: null,
    bio: 'Mike brings 20+ years of hands-on construction experience to every project 2M undertakes. Rooted in a family construction tradition spanning over 40 years, he founded 2M Construction to bring that same generational dedication to homeowners and businesses across North Alabama. His leadership style is simple: show up, do the work right, and never leave a client behind.',
  },
  {
    file: '/about/james-collins-co-founder-2m-construction.png',
    alt: 'James R Collins PE - Co-Founder and Director of Engineering 2M Construction',
    name: 'James R. Collins, P.E.',
    title: 'Co-Founder & Director of Engineering',
    credentials: 'Licensed Professional Engineer (P.E.) · B.S. Civil Engineering, Auburn University · M.S. Construction Management, University of Alabama',
    bio: 'With over 25 years of structural and civil engineering experience, James oversees all technical planning, code compliance, and quality assurance at 2M Construction. His engineering background ensures every project — from a backyard deck to a commercial build-out — is designed and executed to last.',
  },
  {
    file: '/about/david-hartley-co-founder-2m-construction.png',
    alt: 'David M Hartley MBA - Co-Founder and Director of Operations 2M Construction',
    name: 'David M. Hartley, MBA',
    title: 'Co-Founder & Director of Operations',
    credentials: 'B.S. Construction Management, Tennessee Tech University · MBA, Vanderbilt University Owen Graduate School of Management',
    bio: 'David brings 22 years of construction operations and project management expertise to 2M. He oversees estimating, scheduling, subcontractor coordination, and client communications — ensuring every project stays on time, on budget, and on spec from start to finish.',
  },
];

const STATS = [
  { value: '60+', label: 'Years of Combined Leadership' },
  { value: '40+', label: 'Years Family Construction Tradition' },
  { value: '2,000+', label: 'Projects Completed' },
  { value: '100%', label: 'Licensed & Insured' },
  { value: '7', label: 'Cities Across North Alabama' },
];

const VALUES = ['Trust', 'Quality', 'Transparency', 'Respect', 'Craftsmanship', 'Community'];

const PROMISES = [
  'Free, detailed estimate within 24 hours',
  'Clear written contract before work begins',
  'Daily updates on project progress',
  'Clean job site at the end of every workday',
  'Final walkthrough — you approve before we close',
];

export default function AboutPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', color: '#1a1a1a' }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)',
        color: '#fff', padding: '90px 24px', textAlign: 'center',
      }}>
        <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', margin: '0 0 16px' }}>
          About 2M Construction
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.2 }}>
          Built on Legacy. Driven by Excellence.
        </h1>
        <p style={{ fontSize: 17, color: '#cbd5e1', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
          Three decades of combined leadership. A family tradition of building that spans over 40 years.
          One company built to serve North Alabama with integrity, skill, and pride.
        </p>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', margin: '0 0 12px' }}>
            Our Story
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, color: '#0F2542', margin: '0 0 32px', lineHeight: 1.3 }}>
            From a Family Legacy to North Alabama&apos;s Trusted Builder
          </h2>
          {[
            '2M Construction was founded in 2026 — but the story begins long before that.',
            'Founder Tuan Nguyen (Mike) grew up in a family with over 40 years of history in the construction industry. From an early age, he learned the trade from the ground up — watching craftsmen work, understanding materials, and absorbing the discipline that only comes from a multi-generational building tradition. That foundation shaped everything he became as a professional.',
            'After earning his place in the industry through decades of hands-on work, Mike joined forces with seasoned American construction veterans James R. Collins and David M. Hartley to establish 2M Construction — a company built on three pillars: technical excellence, honest communication, and genuine care for every client.',
            'Together, the 2M leadership team and their crews of skilled engineers and tradespeople have delivered over 2,000 completed projects across residential and commercial construction — from fence installations and bathroom remodels to full kitchen renovations and large-scale builds.',
            'We are proud to call Huntsville home, and proud to build it better every day.',
          ].map((para, i) => (
            <p key={i} style={{ fontSize: 16, color: '#374151', lineHeight: 1.85, margin: '0 0 20px' }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ──────────────────────────────────────── */}
      <section style={{ background: '#f8fafc', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', margin: '0 0 12px' }}>
              Leadership
            </p>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, color: '#0F2542', margin: 0 }}>
              Meet the Team Behind 2M Construction
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 32,
          }}>
            {TEAM.map((member) => (
              <div key={member.name} style={{
                background: '#fff',
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Photo */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#e2e8f0' }}>
                  <Image
                    src={member.file}
                    alt={member.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F2542', margin: '0 0 4px' }}>
                      {member.name}
                    </h3>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#F5C518', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {member.title}
                    </p>
                  </div>

                  {member.credentials && (
                    <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, margin: 0, borderLeft: '3px solid #F5C518', paddingLeft: 10 }}>
                      {member.credentials}
                    </p>
                  )}

                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.75, margin: 0, flex: 1 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ───────────────────────────────────────── */}
      <section style={{ background: '#0F2542', color: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', margin: '0 0 12px' }}>
            By the Numbers
          </p>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 800, margin: '0 0 48px' }}>
            Experience You Can Count On
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 32,
          }}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#F5C518', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 8, lineHeight: 1.4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', margin: '0 0 12px' }}>
            What We Stand For
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, color: '#0F2542', margin: '0 0 40px' }}>
            Core Values
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {VALUES.map((v) => (
              <span key={v} style={{
                background: '#f1f5f9', color: '#0F2542',
                fontSize: 15, fontWeight: 700,
                padding: '12px 24px', borderRadius: 50,
                border: '2px solid #e2e8f0',
              }}>{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT PROMISES ──────────────────────────────────────── */}
      <section style={{ background: '#f8fafc', padding: '72px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', margin: '0 0 12px' }}>
              Our Commitment
            </p>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, color: '#0F2542', margin: 0 }}>
              What Every Client Can Expect
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PROMISES.map((promise, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                background: '#fff', borderRadius: 12,
                padding: '20px 24px',
                boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  minWidth: 32, height: 32,
                  background: '#F5C518', color: '#0F2542',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14, flexShrink: 0,
                }}>{i + 1}</div>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                  {promise}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: '#0F2542', color: '#fff', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, margin: '0 0 16px' }}>
          Ready to Build with North Alabama&apos;s Most Trusted Team?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: 16, margin: '0 0 36px' }}>
          Call us at (938) 302-6795 or request a free estimate online.
        </p>
        <a href="/estimate" style={{
          background: '#F5C518', color: '#0F2542',
          padding: '16px 40px', borderRadius: 8,
          fontWeight: 700, fontSize: 16, textDecoration: 'none',
          display: 'inline-block',
        }}>Get Your Free Estimate →</a>
      </section>

    </main>
  );
}
