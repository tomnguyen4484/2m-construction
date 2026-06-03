'use client';

export default function AboutPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', color: '#1a1a1a' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)',
        color: '#fff',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#F5C518', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', margin: '0 0 16px' }}>
          About 2M Construction
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.2 }}>
          Built on 20 Years of Experience
        </h1>
        <p style={{ fontSize: 18, color: '#cbd5e1', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          Serving Huntsville and North Alabama with honest craftsmanship,
          fair pricing, and results that last.
        </p>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#F5C518', padding: '48px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32,
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {[
            { value: '20+', label: 'Years of Experience' },
            { value: '2,000+', label: 'Projects Completed' },
            { value: '2026', label: 'Year Founded' },
            { value: '100%', label: 'Licensed & Insured' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#0F2542', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A3A5C', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section style={{ padding: '72px 24px', maxWidth: 800, margin: '0 auto' }}>
        <p style={{ color: '#F5C518', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Our Story</p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#0F2542', margin: '0 0 24px', lineHeight: 1.3 }}>
          From the Job Site to Your Home
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>
          2M Construction was founded in 2026 by Tuan Nguyen — but the work started long before that.
          With over two decades of hands-on experience in residential and commercial construction,
          Tuan built a reputation for delivering quality work on time and on budget across North Alabama.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>
          After completing more than 2,000 projects ranging from fence installations to full kitchen
          remodels, 2M Construction was established to bring that same level of craftsmanship under
          one trusted name — with professional estimating tools, clear communication, and no surprises.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
          We serve Huntsville, Madison, Athens, Decatur, Harvest, Hampton Cove, and surrounding areas.
          Whether it's a small repair or a large renovation, we treat every project like it's our own home.
        </p>
      </section>

      {/* ── Core Values ── */}
      <section style={{ background: '#f8fafc', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#F5C518', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>What We Stand For</p>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#0F2542', margin: '0 0 48px' }}>
            Our Core Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
          }}>
            {[
              { title: 'Licensed & Insured', desc: 'Fully licensed contractor operating in Alabama. Every job is covered — protecting you and your property.' },
              { title: 'Honest Pricing', desc: 'No hidden fees. We provide detailed estimates upfront so you know exactly what you're paying for.' },
              { title: 'Quality Craftsmanship', desc: 'We use quality materials and proven techniques. Every project is built to last.' },
              { title: 'Clear Communication', desc: 'We keep you informed from estimate to completion. No surprises, no runaround.' },
            ].map((v) => (
              <div key={v.title} style={{
                background: '#fff',
                borderRadius: 12,
                padding: '32px 24px',
                textAlign: 'left',
                borderTop: '4px solid #F5C518',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F2542', margin: '0 0 12px' }}>{v.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#4b5563', margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Owner ── */}
      <section style={{ padding: '72px 24px', maxWidth: 800, margin: '0 auto' }}>
        <p style={{ color: '#F5C518', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Meet the Owner</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 40,
          alignItems: 'center',
        }}>
          <div style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: '#1A3A5C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: '#F5C518',
            fontSize: 48,
            fontWeight: 800,
          }}>
            TN
          </div>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0F2542', margin: '0 0 4px' }}>Tuan Nguyen</h2>
            <p style={{ color: '#F5C518', fontWeight: 700, fontSize: 14, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 1 }}>
              Founder & Owner
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#374151', margin: 0 }}>
              With 20+ years in construction, Tuan brings deep expertise across fencing, roofing,
              remodeling, and general contracting. He founded 2M Construction to offer North Alabama
              homeowners a contractor they can actually trust — one who shows up, communicates clearly,
              and delivers the work as promised.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: '#0F2542',
        color: '#fff',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, margin: '0 0 16px' }}>
          Ready to Start Your Project?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: 16, margin: '0 0 32px' }}>
          Get a free, no-obligation estimate today.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/estimate" style={{
            background: '#F5C518',
            color: '#0F2542',
            padding: '14px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}>
            Get Free Estimate
          </a>
          <a href="/contact" style={{
            background: 'transparent',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.4)',
          }}>
            Contact Us
          </a>
        </div>
      </section>

    </main>
  );
}
