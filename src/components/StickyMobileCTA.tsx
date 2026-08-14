'use client';

import { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Phone } from 'lucide-react';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const phoneNumber = '919876543210';
    const message = encodeURIComponent('Hi Muscle Garaage Motera, I would like to book a complimentary 1-Day Trial Pass.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden animate-fade-in">
      <div className="bg-black/90 backdrop-blur-2xl border border-white/20 p-2.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-2.5">
        {/* WhatsApp Chat Button */}
        <button
          onClick={handleWhatsApp}
          className="flex-1 py-3 px-3 rounded-xl bg-neutral-900 border border-white/10 text-white flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-heading text-xs uppercase tracking-wider font-bold">
            WhatsApp
          </span>
        </button>

        {/* Book Free Pass Button */}
        <button
          onClick={scrollToContact}
          className="flex-1 py-3 px-3 rounded-xl bg-accent text-black flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,209,0,0.4)] font-bold active:scale-95 transition-all"
          aria-label="Book Free Pass"
        >
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span className="font-heading text-xs uppercase tracking-wider font-bold">
            Free 1-Day Pass
          </span>
        </button>
      </div>
    </div>
  );
}
