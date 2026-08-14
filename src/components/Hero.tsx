'use client';

import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Star, ShieldCheck, Flame, ChevronDown, Volume2, VolumeX, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 5000, suffix: '+', label: 'Active Elite Members' },
  { value: 35000, suffix: ' sq ft', label: 'Luxury Multi-Floor Facility' },
  { value: 4.9, suffix: ' / 5.0', label: 'Google Rating (850+ Reviews)' },
  { value: 12, suffix: '+', label: 'World-Class Programs' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Stats counting animation with GSAP
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(badgeRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2,
    })
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 1,
        },
        '-=0.5'
      )
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        '-=0.6'
      )
      .from(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        '-=0.5'
      )
      .from(
        statsRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        '-=0.4'
      );
  }, { scope: containerRef });

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const scrollToTour = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('virtual-tour');
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden select-none"
    >
      {/* High-Resolution Cinematic Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000"
          alt="Muscle Garaage Luxury Gym Floor"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.15]"
          loading="eager"
          decoding="async"
        />
        {/* Luxury Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,209,0,0.08)_0%,transparent_70%)]" />
        
        {/* Subtle grid lines pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Hero Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col items-center text-center pt-8 sm:pt-12">
        {/* Premium Pill Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-accent/30 backdrop-blur-md mb-6 sm:mb-8 shadow-[0_0_20px_rgba(255,209,0,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-white">
            Ahmedabad&apos;s #1 Luxury Fitness Sanctuary · Motera
          </span>
        </div>

        {/* Hero Main Heading */}
        <h1
          ref={titleRef}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.9] sm:leading-[0.88] mb-6 sm:mb-8"
        >
          TRAIN LIKE <br />
          <span className="gold-gradient-text drop-shadow-[0_0_35px_rgba(255,209,0,0.3)]">
            A CHAMPION
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal tracking-wide"
        >
          Experience 35,000 sq ft of world-class biomechanical engineering, custom Panatta equipment, 
          heated semi-Olympic pool, cryotherapy ice baths, and bespoke transformation coaching in Motera, Ahmedabad.
        </p>

        {/* Hero CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none"
        >
          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent text-black font-heading text-xl uppercase tracking-[0.15em] px-8 sm:px-10 py-4 rounded-full font-bold shadow-[0_0_25px_rgba(255,209,0,0.4)] hover:bg-white hover:shadow-[0_0_35px_rgba(255,209,0,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Claim Free 1-Day Pass</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#virtual-tour"
            onClick={scrollToTour}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/[0.06] hover:bg-white/15 text-white border border-white/15 hover:border-accent font-heading text-xl uppercase tracking-[0.15em] px-8 sm:px-10 py-4 rounded-full backdrop-blur-md transition-all duration-300 group"
          >
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>Watch Virtual Tour</span>
          </a>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 sm:mt-10 text-[11px] sm:text-xs text-gray-400 uppercase tracking-widest font-medium">
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Panatta Biomechanics
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Rogue CrossFit Arena
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Cryo Ice Baths & Saunas
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Complimentary Valet
          </span>
        </div>
      </div>

      {/* Hero Stats Grid */}
      <div
        ref={statsRef}
        className="relative z-10 w-full max-w-6xl mx-auto border-t border-white/10 pt-6 sm:pt-8 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center p-2">
            <div className="font-heading text-3xl sm:text-4xl md:text-5xl text-accent tracking-wide leading-none flex items-baseline justify-center">
              <span>{stat.value}</span>
              <span className="text-white text-2xl sm:text-3xl ml-0.5">{stat.suffix}</span>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1.5 font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll Down Trigger */}
      <div
        onClick={scrollToAbout}
        className="relative z-10 flex flex-col items-center justify-center mt-6 cursor-pointer text-gray-500 hover:text-accent transition-colors group"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-1">
          Explore Experience
        </span>
        <div className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center p-1 group-hover:border-accent transition-colors">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
