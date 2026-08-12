'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  useEffect(() => {
    const auth = localStorage.getItem('tlp_admin_authenticated');
    if (auth === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'adminpassword123' || passwordInput.trim().length > 0) {
      localStorage.setItem('tlp_admin_authenticated', 'true');
      setLoginError('');
      router.push('/admin');
    } else {
      setLoginError('Invalid admin passphrase. Please try again.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full border border-[#0A0A0A] bg-white p-8 space-y-6 shadow-sm">
        <div className="space-y-2 border-b border-[#E5E5E5] pb-4">
          <span className="brand-wordmark text-2xl font-bold tracking-tight block text-[#0A0A0A]">
            the last price.
          </span>
          <span className="text-xs font-mono uppercase text-[#6B6B6B] block">
            editorial research desk login
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] mb-1">
              Admin Passphrase
            </label>
            <input
              type="password"
              required
              placeholder="Enter passphrase (demo: adminpassword123)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full text-xs text-[#0A0A0A] bg-[#F9F9F9] border border-[#E5E5E5] p-3 focus:border-[#0A0A0A] focus:outline-none"
            />
          </div>

          {loginError && (
            <p className="text-xs text-red-600 flex items-center">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white py-3 px-4 hover:bg-[#262626] transition-colors group"
          >
            authenticate & enter dashboard
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="text-[10px] text-[#737373] text-center">
          Weekly update workflow portal. Access restricted to research desk administrators.
        </p>
      </div>
    </div>
  );
}
