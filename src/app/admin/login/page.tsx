'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Send, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center px-6 py-12 z-30">
      {/* Background shadow glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-accent/2 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="glass-panel w-full max-w-md p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-12 h-[2px] bg-accent" />
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="font-heading text-2xl tracking-wider text-white">
            MUSCLE <span className="text-accent">GARAAGE</span>
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-gray-500 block mt-1">
            Staff Portal Access
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-accent" /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              required
              className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-accent" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password"
              required
              className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-wider bg-red-500/5 border border-red-500/10 p-3">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-black font-semibold text-xs uppercase tracking-widest py-4 transition-all duration-300 hover:bg-white hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Authenticating...'
            ) : (
              <>
                Access Dashboard <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
