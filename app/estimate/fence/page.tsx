'use client';
import { useState } from 'react';
import Link from 'next/link';

const PRICE = {
  wood:  { material: 8,  labor: 12 },
  vinyl: { material: 18, labor: 12 },
  chain: { material: 6,  labor: 10 },
};

function fmt(n) { return '$' + n.toLocaleString(); }

export default function FenceEstimator() {
  const [type, setType]     = useState('wood');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('6');
  const [gates, setGates]   = useState('1');
  const [showContact, setShowContact] = useState(false);
  const [form, setForm]     = useState({ name: '', phone: '', email: '' });
  const [sent, setSent]     = useState(false);

  const ft       = Number(length) || 0;
  const gt       = Number(gates)  || 0;
  const p        = PRICE[type];
  const material = ft * Number(height) * p.material;
  const labor    = ft * p.labor;
  const gateCost = gt * 350;
  const total    = material + labor + gateCost;
  const hasResult = ft > 0;

  if (sent) return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      <div className="text-5xl mb-4">checkmark</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Request Sent!</h2>
      <p className="text-gray-500 mb-6">We will call you back within 24 hours.</p>
      <Link href="/" className="text-[#EA580C] font-semibold">Back to Home</Link>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <Link href="/estimate" className="text-sm text-gray-500 mb-4 block">Back to Services</Link>
      <h1 className="text-xl font-bold text-gray-800 mb-1">Fence Estimator</h1>
      <p className="text-gray-500 text-sm mb-5">Prices based on current market rates</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Fence Type</label>
        <div className="grid grid-cols-3 gap-2">
          {[['wood','Wood'],['vinyl','Vinyl'],['chain','Chain Link']].map(([v,l]) => (
            <button key={v} onClick={() => setType(v)}
              className={'py-3 rounded-xl text-sm font-medium border-2 transition-colors ' +
                (type === v ? 'border-[#EA580C] bg-orange-50 text-[#EA580C]' : 'border-gray-200 text-gray-600')}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Length (linear feet)</label>
        <input type="number" inputMode="numeric" value={length} onChange={e => setLength(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
          placeholder="e.g. 150" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
        <div className="grid grid-cols-3 gap-2">
          {['4','6','8'].map(h => (
            <button key={h} onClick={() => setHeight(h)}
              className={'py-3 rounded-xl text-sm font-medium border-2 transition-colors ' +
                (height === h ? 'border-[#EA580C] bg-orange-50 text-[#EA580C]' : 'border-gray-200 text-gray-600')}>
              {h} ft
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Gates</label>
        <input type="number" inputMode="numeric" value={gates} onChange={e => setGates(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
          placeholder="1" />
      </div>

      {hasResult && (
        <div className="bg-[#1A3A5C] rounded-2xl p-5 mb-6 text-white">
          <h2 className="font-bold text-lg mb-3">Estimate Breakdown</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Materials</span>
              <span>{fmt(material)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Labor</span>
              <span>{fmt(labor)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Gates ({gates}x)</span>
              <span>{fmt(gateCost)}</span>
            </div>
            <div className="border-t border-gray-600 pt-2 flex justify-between font-bold text-base">
              <span>Total Estimate</span>
              <span className="text-[#EA580C]">{fmt(total)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Final price may vary based on site conditions</p>
        </div>
      )}

      {hasResult && !showContact && (
        <button onClick={() => setShowContact(true)}
          className="w-full bg-[#EA580C] text-white font-semibold py-4 rounded-xl text-base mb-3">
          Request This Quote
        </button>
      )}

      {showContact && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
          <h3 className="font-bold text-gray-800 mb-4">Your Contact Info</h3>
          <div className="space-y-3">
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
              placeholder="Full name *" />
            <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
              placeholder="Phone number *" />
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#EA580C]"
              placeholder="Email (optional)" />
            <button onClick={() => setSent(true)}
              className="w-full bg-[#EA580C] text-white font-semibold py-4 rounded-xl text-base">
              Submit Request
            </button>
          </div>
        </div>
      )}

      <a href="tel:+12565551234"
        className="block w-full text-center border-2 border-[#1A3A5C] text-[#1A3A5C] font-semibold py-4 rounded-xl text-base">
        Call for Exact Quote
      </a>
    </div>
  );
}
