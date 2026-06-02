'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [form, setForm]     = useState({ name: '', phone: '', email: '', message: '' });

  function handle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) { setError('Please fill in name and phone.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, note: form.message, service: 'General Inquiry' }),
      });
      if (res.ok) { setSent(true); }
      else { setError('Something went wrong. Please call us directly.'); }
    } catch {
      setError('Something went wrong. Please call us directly.');
    }
    setLoading(false);
  }

  if (sent) return (
    <div style={{ maxWidth:'600px', margin:'0 auto', padding:'60px 16px', textAlign:'center' }}>
      <div style={{ fontSize:'56px', marginBottom:'16px' }}>✅</div>
      <h2 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', marginBottom:'8px' }}>Message Sent!</h2>
      <p style={{ color:'#64748B', marginBottom:'8px' }}>We received your request and will call you back within 24 hours.</p>
      <p style={{ color:'#64748B', fontSize:'14px' }}>A confirmation has been sent to <strong>info@2mhuntsville.com</strong></p>
    </div>
  );

  return (
    <div style={{ maxWidth:'600px', margin:'0 auto', padding:'24px 16px' }}>
      <h1 style={{ fontWeight:800, fontSize:'22px', color:'#1E293B', margin:'0 0 4px' }}>Contact Us</h1>
      <p style={{ color:'#64748B', fontSize:'14px', margin:'0 0 24px' }}>We will call you back within 24 hours</p>

      <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        <input name="name" required value={form.name} onChange={handle}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', boxSizing:'border-box' as const }}
          placeholder="Full name *" />
        <input name="phone" type="tel" required value={form.phone} onChange={handle}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', boxSizing:'border-box' as const }}
          placeholder="Phone number *" />
        <input name="email" type="email" value={form.email} onChange={handle}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', boxSizing:'border-box' as const }}
          placeholder="Email (optional)" />
        <textarea name="message" value={form.message} onChange={handle} rows={4}
          style={{ width:'100%', border:'1.5px solid #E2E8F0', borderRadius:'10px', padding:'12px 16px', fontSize:'16px', boxSizing:'border-box' as const, resize:'none' as const }}
          placeholder="Describe your project..." />

        {error && <p style={{ color:'#DC2626', fontSize:'13px', margin:0 }}>{error}</p>}

        <button type="submit" disabled={loading}
          style={{ width:'100%', background: loading ? '#94A3B8' : '#F5C518', color:'#1A3A5C', fontWeight:800, fontSize:'16px', padding:'14px', borderRadius:'12px', border:'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        <a href="tel:+12565551234"
          style={{ display:'block', width:'100%', textAlign:'center', border:'2px solid #1A3A5C', color:'#1A3A5C', fontWeight:700, fontSize:'15px', padding:'13px', borderRadius:'12px', boxSizing:'border-box' as const }}>
          📞 Call (256) 555-1234
        </a>
      </form>
    </div>
  );
}
