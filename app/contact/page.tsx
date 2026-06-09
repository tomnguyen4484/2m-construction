'use client';
import { useState } from 'react';

const SERVICE_AREAS = [
  'Huntsville, AL',
  'Madison, AL',
  'Athens, AL',
  'Decatur, AL',
  'Harvest, AL',
  'Hampton Cove, AL',
  'Meridianville, AL',
  'Hazel Green, AL',
  'Other (please describe)',
];

const SERVICES = [
  'Fence Installation',
  'Deck / Patio',
  'Roofing',
  'Painting (Interior / Exterior)',
  'Bathroom Remodel',
  'Kitchen Remodel',
  'Flooring',
  'Drywall',
  'Concrete / Flatwork',
  'Handyman / Repairs',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    service: '', location: '', message: '',
  });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const input = (style?: object) => ({
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid #334155', background: '#1E3A5F', color: '#E2E8F0',
    fontSize: '14px', boxSizing: 'border-box' as const, outline: 'none',
    ...style,
  });

  const label = { display: 'block', fontSize: '13px', fontWeight: 600,
    color: '#94A3B8', marginBottom: '6px' };

  return (
    <main style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '60px',
      background: '#0F2542', color: '#E2E8F0' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            Get a Free Quote
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>
            Fill out the form and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Quick contact bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <a href="tel:+19383026795" style={{
            flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', gap: '10px',
            background: '#F5C518', color: '#1A3A5C', padding: '14px 16px',
            borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '15px',
          }}>
            📞 (938) 302-6795
          </a>
          <a href="mailto:info@2mhuntsville.com" style={{
            flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', gap: '10px',
            background: '#1E3A5F', color: '#E2E8F0', padding: '14px 16px',
            borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
            border: '1px solid #334155',
          }}>
            ✉️ info@2mhuntsville.com
          </a>
        </div>

        {status === 'sent' ? (
          <div style={{ background: '#0F3A1A', border: '1px solid #22C55E',
            borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
            <h2 style={{ color: '#22C55E', margin: '0 0 8px' }}>Message Sent!</h2>
            <p style={{ color: '#86EFAC', margin: 0 }}>
              We&apos;ll reach out within 24 hours to discuss your project.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: '#1A3A5C', borderRadius: '16px', padding: '32px',
            border: '1px solid #2D4F73',
          }}>
            {/* Row 1: Name + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={label}>Full Name *</label>
                <input required style={input()} value={form.name}
                  onChange={e => set('name', e.target.value)} placeholder="John Smith" />
              </div>
              <div>
                <label style={label}>Phone Number</label>
                <input style={input()} value={form.phone}
                  onChange={e => set('phone', e.target.value)} placeholder="(256) 000-0000" />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={label}>Email Address *</label>
              <input required type="email" style={input()} value={form.email}
                onChange={e => set('email', e.target.value)} placeholder="you@email.com" />
            </div>

            {/* Service */}
            <div style={{ marginBottom: '20px' }}>
              <label style={label}>Service Needed *</label>
              <select required style={input()} value={form.service}
                onChange={e => set('service', e.target.value)}>
                <option value="">— Select a service —</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Project Location ← NEW FIELD */}
            <div style={{ marginBottom: '20px' }}>
              <label style={label}>Project Location / Service Area *</label>
              <select required style={input()} value={form.location}
                onChange={e => set('location', e.target.value)}>
                <option value="">— Select your area —</option>
                {SERVICE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#64748B' }}>
                We serve Huntsville metro area and surrounding communities.
              </p>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '28px' }}>
              <label style={label}>Project Details</label>
              <textarea style={{ ...input(), height: '110px', resize: 'vertical' as const }}
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Describe your project — size, materials, timeline, anything helpful..." />
            </div>

            <button type="submit" disabled={status === 'sending'} style={{
              width: '100%', padding: '14px', borderRadius: '10px',
              background: status === 'sending' ? '#64748B' : '#F5C518',
              color: '#1A3A5C', fontWeight: 800, fontSize: '16px',
              border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            }}>
              {status === 'sending' ? 'Sending...' : '📩 Send Message & Request Quote'}
            </button>

            {status === 'error' && (
              <p style={{ color: '#F87171', textAlign: 'center', marginTop: '12px', fontSize: '13px' }}>
                Something went wrong. Please call us directly at (938) 302-6795.
              </p>
            )}
          </form>
        )}

        {/* Service area note */}
        <div style={{ marginTop: '32px', background: '#1E3A5F', borderRadius: '12px',
          padding: '20px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#F5C518', fontSize: '14px', fontWeight: 700, margin: '0 0 10px' }}>
            📍 Areas We Serve
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0, lineHeight: 1.7 }}>
            Huntsville · Madison · Athens · Decatur · Harvest · Hampton Cove ·
            Meridianville · Hazel Green and surrounding areas.
          </p>
        </div>

      </div>
    </main>
  );
}
