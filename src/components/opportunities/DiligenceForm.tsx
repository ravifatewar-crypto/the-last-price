'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface DiligenceFormProps {
  opportunityTitle: string;
}

export const DiligenceForm: React.FC<DiligenceFormProps> = ({ opportunityTitle }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investorType: 'First-time Investor',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate immediate response
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-[#F9F9F9] border border-[#E5E5E5] p-6 text-center space-y-3">
        <CheckCircle2 className="w-8 h-8 text-[#1F5C3D] mx-auto" />
        <h4 className="text-sm font-bold text-[#0A0A0A] lowercase">diligence package dispatched</h4>
        <p className="text-xs text-[#6B6B6B] leading-relaxed">
          Thank you, {formData.name}. Our research analyst will transmit the full financial model and schedule your briefing shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] mb-1">
          Full Name *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Dr. Rajesh Sharma"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full text-xs text-[#0A0A0A] bg-[#F9F9F9] border border-[#E5E5E5] p-2.5 focus:border-[#0A0A0A] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] mb-1">
          Email Address *
        </label>
        <input
          type="email"
          required
          placeholder="rajesh@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full text-xs text-[#0A0A0A] bg-[#F9F9F9] border border-[#E5E5E5] p-2.5 focus:border-[#0A0A0A] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          required
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full text-xs text-[#0A0A0A] bg-[#F9F9F9] border border-[#E5E5E5] p-2.5 focus:border-[#0A0A0A] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] mb-1">
          Investor Profile
        </label>
        <select
          value={formData.investorType}
          onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
          className="w-full text-xs text-[#0A0A0A] bg-[#F9F9F9] border border-[#E5E5E5] p-2.5 focus:border-[#0A0A0A] focus:outline-none"
        >
          <option value="First-time Investor">First-time Real Estate Investor</option>
          <option value="Working Professional">Working Professional / Executive</option>
          <option value="Doctor / Medical Professional">Doctor / Healthcare Professional</option>
          <option value="Business Owner / Entrepreneur">Business Owner / HNI</option>
          <option value="NRI Investor">NRI / Overseas Investor</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white py-3 px-4 hover:bg-[#262626] transition-colors group"
      >
        {loading ? 'Transmitting Request...' : 'Request Research Package'}
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      <p className="text-[10px] text-[#737373] text-center">
        No sales spam guarantee. Editorial research desk communication only.
      </p>
    </form>
  );
};
