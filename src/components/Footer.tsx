'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Star, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/5 pt-20 pb-10 px-6 z-30 overflow-hidden">
      {/* Background shadow glow */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-accent/2 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: About & Google Reviews */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <span className="font-heading text-2xl tracking-wider text-white">
              MUSCLE <span className="text-accent">GARAAGE</span>
            </span>
            <p className="font-body text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              Motera&apos;s premier luxury fitness club. Engineered to provide the finest biomechanical equipment, CrossFit box, heated pool, and bespoke sports recovery services.
            </p>
            
            {/* Google Reviews rating card */}
            <div className="flex items-center gap-3 bg-secondary border border-white/5 p-4 max-w-xs">
              <div className="flex flex-col">
                <span className="font-heading text-xl text-white leading-none">4.9 / 5.0</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Google Rating</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current text-accent" />
                  ))}
                </div>
                <span className="text-[9px] text-accent uppercase tracking-widest mt-1 font-semibold">95+ Verified Reviews</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-heading text-lg text-white uppercase tracking-wider">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="/#hero" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-accent transition-colors">About Story</Link></li>
              <li><Link href="/#facilities" className="hover:text-accent transition-colors">Arenas</Link></li>
              <li><Link href="/#programs" className="hover:text-accent transition-colors">Disciplines</Link></li>
              <li><Link href="/#membership" className="hover:text-accent transition-colors">Membership</Link></li>
              <li><Link href="/#trainers" className="hover:text-accent transition-colors">Coaches</Link></li>
            </ul>
          </div>

          {/* Col 3: Programs Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-heading text-lg text-white uppercase tracking-wider">
              PROGRAMS
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="/#programs" className="hover:text-accent transition-colors">Weight Training</Link></li>
              <li><Link href="/#programs" className="hover:text-accent transition-colors">CrossFit Box</Link></li>
              <li><Link href="/#programs" className="hover:text-accent transition-colors">HIIT Burn</Link></li>
              <li><Link href="/#programs" className="hover:text-accent transition-colors">Personal Coaching</Link></li>
              <li><Link href="/#programs" className="hover:text-accent transition-colors">Swimming Laps</Link></li>
              <li><Link href="/#programs" className="hover:text-accent transition-colors">Transformation Cohort</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-heading text-lg text-white uppercase tracking-wider">
              OBSIDIAN JOURNAL
            </span>
            <p className="font-body text-xs text-gray-400 leading-relaxed">
              Subscribe to receive elite fitness methodologies, diet blueprints, and member event priority bookings directly in your inbox.
            </p>

            {subscribed ? (
              <span className="text-[10px] text-accent font-bold uppercase tracking-widest animate-fade-in block mt-2">
                Subscribed successfully. Welcome to the Elite.
              </span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="bg-secondary border border-white/10 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none flex-grow cursor-none"
                />
                <button
                  type="submit"
                  className="w-12 h-12 bg-accent text-black flex items-center justify-center hover:bg-white transition-colors cursor-none"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Big Large Typographic Wordmark */}
        <div className="border-t border-b border-white/5 py-8 select-none text-center relative">
          <h2
            className="font-heading text-[12vw] leading-none text-transparent tracking-tighter uppercase"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
            }}
          >
            MUSCLE GARAAGE
          </h2>
          
          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 border border-white/15 hover:border-accent text-white hover:text-accent flex items-center justify-center transition-all cursor-none"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-[10px] uppercase tracking-widest">
          <span>© 2026 Muscle Garaage Gym. All Rights Reserved.</span>
          
          {/* Socials */}
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>

          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-accent transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
