'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    const phoneNumber = '919876543210';
    const message = encodeURIComponent('Hi Muscle Garaage Motera, I would like to book a complimentary 1-Day Trial Pass.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      className="hidden lg:flex fixed bottom-6 right-6 z-40 bg-accent text-black p-3.5 rounded-full shadow-[0_0_25px_rgba(255,209,0,0.5)] hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 group pulse-glow items-center gap-2 font-bold"
      aria-label="Contact Concierge on WhatsApp"
    >
      <div className="w-6 h-6 rounded-full bg-black text-accent flex items-center justify-center">
        <MessageCircle className="w-4 h-4 fill-current" />
      </div>
      <span className="font-heading text-xs uppercase tracking-wider pr-1 text-black">
        WhatsApp Concierge
      </span>
    </button>
  );
}
