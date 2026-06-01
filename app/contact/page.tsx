'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  if (sent) return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h2>
      <p className="text-gray-500">We will call you back within 24 hours.</p>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Contact Us</h1>
      <p className="text-gray-500 text-sm mb-5">We will get back to you within 24 hours</p>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
        <input name="name" required value={form.name} onChange={handle}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
          placeholder="Full name *" />
        <input name="phone" type="tel" required value={form.phone} onChange={handle}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
          placeholder="Phone number *" />
        <input name="email" type="email" value={form.email} onChange={handle}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
          placeholder="Email (optional)" />
        <textarea name="message" value={form.message} onChange={handle} rows={4}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
          placeholder="Describe your project..." />
        <button type="submit"
          className="w-full bg-[#EA580C] text-white font-semibold py-4 rounded-xl text-base">
          Send Message
        </button>
        <a href="tel:+12565551234"
          className="block w-full text-center border-2 border-[#1A3A5C] text-[#1A3A5C] font-semibold py-4 rounded-xl text-base">
          Call (256) 555-1234
        </a>
      </form>
    </div>
  );
}
