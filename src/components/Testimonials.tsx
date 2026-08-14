'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reviews = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    profession: 'Senior Orthopedic Surgeon',
    duration: 'Member for 2.5 Years',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400',
    quote:
      'As a surgeon, joint biomechanics are paramount to me. The Panatta isolation machines here eliminate torque shear on the rotator cuff and lower lumbar. Plus, diving into the 4°C ice bath post-training is the best active recovery in Gujarat.',
  },
  {
    id: 2,
    name: 'Ananya Singhania',
    profession: 'Tech Founder & Managing Director',
    duration: 'Member for 18 Months',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
    quote:
      'The privacy, valet parking, and executive locker suites make working out completely frictionless before my morning board meetings. Coach Dev created a bio-scan nutrition protocol that lowered my visceral fat by 8% in 4 months.',
  },
  {
    id: 3,
    name: 'Siddharth Mehta',
    profession: 'Venture Capitalist',
    duration: 'Member for 3 Years',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    quote:
      'Ahmedabad finally has a fitness club that rivals Equinox in New York and Third Space in London. The Rogue CrossFit Arena is huge, never overcrowded, and maintained to an immaculate standard of medical hygiene.',
  },
  {
    id: 4,
    name: 'Priya Patel',
    profession: 'Haute Couture Fashion Director',
    duration: 'Member for 14 Months',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
    quote:
      'The aesthetic lighting, acoustically isolated yoga studio, and eucalyptus steam room make Muscle Garaage feel like a high-end wellness sanctuary rather than just a gym. Truly the gold standard in Motera.',
  },
  {
    id: 5,
    name: 'Capt. Vikram Rathore',
    profession: 'Commercial Airline Captain',
    duration: 'Member for 2 Years',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    quote:
      'Irregular flight schedules used to ruin my fitness routine. With their extended hours, heated 25m semi-Olympic lap pool, and Finnish saunas, I can recharge my spine and stay in peak physical condition 24/7.',
  },
  {
    id: 6,
    name: 'Advocate Meera Desai',
    profession: 'Senior Corporate Counsel',
    duration: 'Member for 1 Year',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400',
    quote:
      'I signed up for the 12-Week Body Recomposition Cohort. Having dedicated 1-on-1 bio-scans, progressive overload tracking, and personal recovery plunge sessions gave me the best physical shape of my life.',
  },
  {
    id: 7,
    name: 'Rohan Varma',
    profession: 'National Level Triathlete',
    duration: 'Member for 2 Years',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400',
    quote:
      'Finding a facility with Technogym telemetry runners, Concept2 rowers, heated lap swimming, and cryotherapy ice plunges all under one roof was a dream. The coaching staff understands high-performance periodization.',
  },
  {
    id: 8,
    name: 'Neha Joshi',
    profession: 'Architect & Studio Head',
    duration: 'Member for 8 Months',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    quote:
      'The interior architecture and spatial design of this 35,000 sq ft facility is extraordinary. The equipment spacing is generous, lighting is cinematic, and the community of members is exceptionally courteous and driven.',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = reviews.length - 1;

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.testimonials-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  // Auto slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative bg-neutral-950 py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Google Rating Summary Card */}
        <div className="testimonials-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
                VERIFIED MEMBER VOICES
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none">
              TESTIMONIALS OF <br />
              <span className="gold-gradient-text">LUXURY EXCELLENCE</span>
            </h2>
          </div>

          {/* Google Review Rating Badge */}
          <div className="flex items-center gap-4 bg-black/80 border border-accent/30 p-5 rounded-2xl shadow-[0_0_25px_rgba(255,209,0,0.15)] max-w-sm">
            {/* Google G Logo icon */}
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl text-white leading-none">4.9 / 5.0</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current text-accent" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-gray-400 uppercase tracking-widest mt-1 font-semibold">
                850+ Verified Reviews on Google
              </span>
              <span className="text-[9px] text-accent font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-accent" /> Verified Member Feedback
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Active Card Slider View (Shows 1 large featured card on mobile, 2 on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            {reviews.slice(currentIndex, currentIndex + 1).map((rev) => (
              <div
                key={rev.id}
                className="testimonial-card relative p-6 sm:p-8 md:p-10 rounded-3xl bg-black border border-white/10 shadow-2xl flex flex-col justify-between transition-all duration-500 hover:border-accent/40"
              >
                {/* Gold accent bar */}
                <div className="absolute top-0 left-0 w-12 h-[2px] bg-accent" />

                {/* Top: Rating Stars & Duration Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {Array.from({ length: rev.rating }).map((_, rIdx) => (
                        <Star key={rIdx} className="w-4 h-4 fill-current text-accent" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent/90 bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
                      {rev.duration}
                    </span>
                  </div>

                  {/* Quote */}
                  <Quote className="w-8 h-8 text-accent/20 mb-4" />
                  <p className="font-body text-sm sm:text-base text-gray-200 leading-relaxed italic mb-8">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>

                {/* Bottom Author Info */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <img
                    src={rev.photo}
                    alt={rev.name}
                    className="w-13 h-13 rounded-full object-cover border-2 border-accent shadow-md"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <span className="font-heading text-xl text-white uppercase tracking-wider block leading-tight">
                      {rev.name}
                    </span>
                    <span className="text-xs text-gray-400 font-medium block mt-0.5">
                      {rev.profession}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Card 2 (Next item in list) */}
            {reviews.slice((currentIndex + 1) % reviews.length, ((currentIndex + 1) % reviews.length) + 1).map((rev) => (
              <div
                key={rev.id}
                className="testimonial-card hidden md:flex relative p-6 sm:p-8 md:p-10 rounded-3xl bg-neutral-950 border border-white/10 shadow-2xl flex-col justify-between transition-all duration-500 hover:border-accent/40"
              >
                {/* Gold accent bar */}
                <div className="absolute top-0 left-0 w-12 h-[2px] bg-accent" />

                {/* Top: Rating Stars & Duration Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {Array.from({ length: rev.rating }).map((_, rIdx) => (
                        <Star key={rIdx} className="w-4 h-4 fill-current text-accent" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent/90 bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
                      {rev.duration}
                    </span>
                  </div>

                  {/* Quote */}
                  <Quote className="w-8 h-8 text-accent/20 mb-4" />
                  <p className="font-body text-sm sm:text-base text-gray-200 leading-relaxed italic mb-8">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>

                {/* Bottom Author Info */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <img
                    src={rev.photo}
                    alt={rev.name}
                    className="w-13 h-13 rounded-full object-cover border-2 border-accent shadow-md"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <span className="font-heading text-xl text-white uppercase tracking-wider block leading-tight">
                      {rev.name}
                    </span>
                    <span className="text-xs text-gray-400 font-medium block mt-0.5">
                      {rev.profession}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Bar (Dots & Arrows) */}
          <div className="flex items-center justify-between mt-10">
            {/* Dot Pagination Indicators */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:border-accent transition-all shadow"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:border-accent transition-all shadow"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
