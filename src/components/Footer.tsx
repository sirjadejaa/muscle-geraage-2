'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Star, ArrowUp, MapPin, Phone, Mail, Clock, Sparkles, X, Shield } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

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
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 z-30 overflow-hidden select-none">
      {/* Background shadow glow */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-accent/2 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand Wordmark & Google Rating Badge (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center text-black font-heading font-black text-2xl shadow-[0_0_20px_rgba(255,209,0,0.4)]">
                MG
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-3xl tracking-wider text-white">
                  MUSCLE <span className="text-accent">GARAAGE</span>
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-gray-400 -mt-1">
                  Motera · Ahmedabad
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Ahmedabad’s premier 35,000 sq ft luxury fitness sanctuary. Engineered with custom Panatta Italy biomechanics, official Rogue CrossFit rig, 25m heated pool, Finnish saunas, and cryotherapy ice plunge suites.
            </p>

            {/* Google Rating Summary Mini-Card */}
            <div className="flex items-center gap-3 bg-neutral-950 border border-white/10 p-3.5 rounded-xl max-w-xs shadow-md">
              <div className="flex flex-col">
                <span className="font-heading text-2xl text-white leading-none">4.9 / 5.0</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">Google Score</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current text-accent" />
                  ))}
                </div>
                <span className="text-[9px] text-accent uppercase tracking-widest mt-1 font-bold">
                  850+ Verified Reviews
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-heading text-lg text-white uppercase tracking-wider border-b border-white/10 pb-2">
              QUICK LINKS
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-medium">
              <li>
                <a href="#hero" className="hover:text-accent transition-colors flex items-center gap-1">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  About Story
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-accent transition-colors">
                  Luxury Arenas
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-accent transition-colors">
                  Training Disciplines
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-accent transition-colors">
                  Membership Tiers
                </a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-accent transition-colors">
                  Master Coaches
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-accent transition-colors">
                  Client Results
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-accent transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Facilities & Programs (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-heading text-lg text-white uppercase tracking-wider border-b border-white/10 pb-2">
              FACILITIES & PROGRAMS
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-medium">
              <li>
                <a href="#facilities" className="hover:text-accent transition-colors">
                  Panatta Strength Zone (Italy)
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-accent transition-colors">
                  Rogue CrossFit Arena (5,000 sq ft)
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-accent transition-colors">
                  Semi-Olympic Heated Lap Pool (28°C)
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-accent transition-colors">
                  Cryo Ice Baths (3-5°C) & Saunas
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-accent transition-colors">
                  1-on-1 Biomechanical Personal Training
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-accent transition-colors">
                  12-Week Body Recomposition Cohort
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-accent transition-colors">
                  Executive Digital Locker Suites
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Complimentary Valet Parking
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information & Newsletter (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-heading text-lg text-white uppercase tracking-wider border-b border-white/10 pb-2">
              CONTACT & LOCATION
            </span>

            <div className="flex flex-col gap-3 text-xs text-gray-300 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  4th Floor, Apex Titanium, Near Narendra Modi Stadium, Motera, Ahmedabad 380005
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-accent transition-colors font-mono">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:contact@musclegaraage.com" className="hover:text-accent transition-colors">
                  contact@musclegaraage.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Mon–Sat: 6 AM – 10 PM | Sun: 8 AM – 2 PM</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-2 pt-3 border-t border-white/5">
              <span className="text-[11px] uppercase font-bold tracking-widest text-accent block mb-2">
                OBSIDIAN JOURNAL
              </span>
              <p className="text-[11px] text-gray-400 mb-3">
                Subscribe for training protocols, diet blueprints & member event priority.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-accent/15 border border-accent/40 text-accent text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Welcome to the Elite Newsletter.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:border-accent focus:outline-none flex-grow"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center hover:bg-white transition-colors flex-shrink-0 shadow"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Large Typographic Watermark Banner with Back-to-Top Button */}
        <div className="border-t border-b border-white/10 py-8 text-center relative">
          <h2
            className="font-heading text-[11vw] leading-none text-transparent tracking-tighter uppercase select-none pointer-events-none"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.07)',
            }}
          >
            MUSCLE GARAAGE
          </h2>

          {/* Smooth Back-to-Top Floating Button */}
          <button
            onClick={scrollToTop}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-900 border border-white/20 hover:border-accent hover:bg-accent text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-xl group"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Legal, Socials & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
          <span>© 2026 Muscle Garaage Luxury Fitness Club. All Rights Reserved. Motera, Ahmedabad.</span>

          {/* Social Icons with Clean SVGs */}
          <div className="flex gap-4 items-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all"
              aria-label="X Twitter"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>

          {/* Legal Modals & Staff */}
          <div className="flex gap-4 items-center text-[11px] font-medium">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-accent transition-colors underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-accent transition-colors underline"
            >
              Terms of Service
            </button>
            <Link href="/admin/login" className="text-gray-400 hover:text-accent transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-neutral-950 border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-xs uppercase font-bold tracking-widest text-accent">
                LEGAL & COMPLIANCE
              </span>
            </div>

            {modalType === 'privacy' ? (
              <div>
                <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wider mb-4">
                  Privacy Policy
                </h3>
                <div className="font-body text-xs sm:text-sm text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Muscle Garaage Fitness Club values and respects your personal privacy. When you schedule a trial pass, register for membership, or submit biometric InBody scans, your data is securely stored and protected.
                  </p>
                  <p>
                    We do not sell, rent, or lease your personal contact information to any third parties. Contact details are solely used for membership services, scheduling personal training sessions, and club announcements.
                  </p>
                  <p>
                    For inquiries regarding data removal or privacy preferences, contact our data administrator at contact@musclegaraage.com.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wider mb-4">
                  Terms of Service & Club Rules
                </h3>
                <div className="font-body text-xs sm:text-sm text-gray-300 leading-relaxed space-y-4">
                  <p>
                    1. <strong>Club Conduct:</strong> Members agree to conduct themselves courteously, re-rack weights after use, and follow hygiene guidelines on all equipment.
                  </p>
                  <p>
                    2. <strong>Facility Access:</strong> Membership access is non-transferable without written consent. Keycard or biometric check-in is required for entry.
                  </p>
                  <p>
                    3. <strong>Pool & Recovery Suite:</strong> Appropriate swimming attire is mandatory in the semi-Olympic pool. Showering is required prior to entering saunas or cold plunge ice baths.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setModalType(null)}
              className="mt-8 w-full py-3 bg-accent text-black font-heading text-sm uppercase tracking-wider rounded-xl font-bold hover:bg-white transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
