'use client';

import { useRef } from 'react';
import { Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const keyHighlights = [
  '35,000 Sq Ft Multi-Level Air-Conditioned Arena',
  'Panatta (Italy) Biomechanical Isolation Lines',
  'Official Rogue CrossFit Functional Training Rig',
  'Temperature-Controlled Semi-Olympic Indoor Pool',
  'Cryotherapy Ice Baths, Finnish Sauna & Steam Suites',
  'Certified K11, ACSM & Gold\'s Academy Coaches',
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(contentRef.current, {
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden z-30 border-t border-white/5"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,209,0,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Typographic Welcome Header */}
      <div className="w-full max-w-7xl mx-auto mb-16 sm:mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] sm:text-xs text-gray-400 tracking-[0.4em] uppercase font-bold">
            WELCOME TO THE SANCTUARY
          </span>
        </div>

        <h2 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.05em] text-white uppercase leading-none">
          MUSCLE <span className="gold-gradient-text">GARAAGE</span>
        </h2>
        <span className="text-[10px] sm:text-xs text-gray-400 tracking-[0.5em] uppercase block mt-3 font-semibold">
          MOTERA · AHMEDABAD · EST. 2020
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Content & Highlights */}
        <div ref={contentRef} className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-3">
            WHO WE ARE
          </span>
          <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6 uppercase leading-none">
            REDEFINING THE <br />
            <span className="text-accent">LIMITS OF HUMAN FITNESS</span>
          </h3>

          <p className="font-body text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
            Muscle Garaage is Ahmedabad&apos;s premier luxury fitness club. Born from the philosophy that physical transformation requires the ultimate environment, we combine cutting-edge Italian biomechanical technology with upscale concierge hospitality.
          </p>
          <p className="font-body text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">
            Spanning an expansive 35,000 square feet in Motera, our facility features heavy strength arenas, Rogue CrossFit rigs, a heated indoor swimming pool, eucalyptus steam rooms, Finnish saunas, and cryo recovery plunge baths.
          </p>

          {/* Highlights Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
            {keyHighlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300 font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-6">
            <a
              href="#facilities"
              className="inline-flex items-center gap-2 bg-accent text-black font-heading text-lg uppercase tracking-wider px-6 py-3 rounded-full font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(255,209,0,0.5)] transition-all duration-300"
            >
              <span>Explore Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex flex-col">
              <span className="font-heading text-2xl text-white leading-none">35,000 SQ FT</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Total Floor Area</span>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Image Stack */}
        <div ref={imageRef} className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1400"
              alt="Muscle Garaage Luxury Gym Interior"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Floating Luxury Quality Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent text-black flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading text-lg text-white uppercase tracking-wider block">
                    Panatta Certified
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                    Zero Joint Stress Biomechanics
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-accent font-bold">100% Calibrated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
