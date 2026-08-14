'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, MapPin, Sparkles } from 'lucide-react';

const desktopNavItems = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Facilities', href: '#facilities', id: 'facilities' },
  { name: 'Programs', href: '#programs', id: 'programs' },
  { name: 'Membership', href: '#membership', id: 'membership' },
  { name: 'Trainers', href: '#trainers', id: 'trainers' },
  { name: 'Results', href: '#transformations', id: 'transformations' },
  { name: 'Reviews', href: '#testimonials', id: 'testimonials' },
  { name: 'FAQ', href: '#faq', id: 'faq' },
];

const mobileNavItems = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About Story', href: '#about', id: 'about' },
  { name: 'Luxury Arenas', href: '#facilities', id: 'facilities' },
  { name: 'Training Disciplines', href: '#programs', id: 'programs' },
  { name: 'Membership Tiers', href: '#membership', id: 'membership' },
  { name: 'Master Coaches', href: '#trainers', id: 'trainers' },
  { name: 'Client Results', href: '#transformations', id: 'transformations' },
  { name: 'Virtual Tour', href: '#virtual-tour', id: 'virtual-tour' },
  { name: 'Gallery', href: '#gallery', id: 'gallery' },
  { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { name: 'FAQ', href: '#faq', id: 'faq' },
  { name: 'Editorial Blog', href: '#blog', id: 'blog' },
  { name: 'Contact & Valet', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const observedIds = [
      'hero',
      'about',
      'facilities',
      'programs',
      'membership',
      'trainers',
      'transformations',
      'testimonials',
      'faq',
      'contact',
    ];

    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '#' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'glass-nav py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-black/95 via-black/70 to-transparent py-3 sm:py-4'
        }`}
        style={{
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-2 sm:gap-3 cursor-pointer select-none flex-shrink-0"
          >
            {/* Logo Badge Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-accent via-accent-dark to-yellow-600 p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(255,209,0,0.3)] group-hover:shadow-[0_0_25px_rgba(255,209,0,0.6)] transition-all duration-300 flex-shrink-0">
              <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                <span className="font-heading text-base sm:text-lg md:text-xl text-accent font-black tracking-tighter group-hover:scale-110 transition-transform duration-300">
                  MG
                </span>
              </div>
            </div>

            {/* Logo Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-heading text-xl sm:text-2xl md:text-3xl tracking-wider text-white group-hover:text-accent transition-colors duration-300">
                  MUSCLE
                </span>
                <span className="font-heading text-xl sm:text-2xl md:text-3xl tracking-wider text-accent group-hover:text-white transition-colors duration-300">
                  GARAAGE
                </span>
              </div>
              <span className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gray-400 group-hover:text-accent/80 transition-colors duration-300 -mt-0.5 font-medium">
                Motera · Ahmedabad
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (xl:flex for full list, lg:flex for compact) */}
          <nav className="hidden xl:flex items-center gap-1 bg-neutral-950/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner flex-shrink">
            {desktopNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-black bg-accent font-bold shadow-[0_0_15px_rgba(255,209,0,0.5)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Compact Links for Medium Screens (lg:flex, xl:hidden) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 bg-neutral-950/80 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {desktopNavItems.slice(0, 5).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-black bg-accent font-bold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Action */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+919876543210"
              className="hidden 2xl:flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-accent transition-colors font-mono"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>+91 98765 43210</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-accent px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,209,0,0.5)] active:scale-95 whitespace-nowrap shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Book Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Menu Button */}
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-accent text-black px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,209,0,0.4)] whitespace-nowrap"
            >
              Free Pass
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-colors focus:outline-none flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Fullscreen Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between p-6 sm:p-8 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-black font-heading font-black text-lg">
              MG
            </div>
            <div>
              <span className="font-heading text-xl text-white tracking-wider">
                MUSCLE <span className="text-accent">GARAAGE</span>
              </span>
              <span className="text-[8px] text-gray-500 uppercase tracking-widest block font-medium">
                Luxury Fitness Sanctuary
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links Grid */}
        <nav className="my-auto py-4 grid grid-cols-2 gap-2.5 overflow-y-auto max-h-[60vh] no-scrollbar">
          {mobileNavItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                style={{ animationDelay: `${idx * 25}ms` }}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? 'bg-accent/15 border-accent text-accent font-bold'
                    : 'bg-white/[0.03] border-white/5 text-gray-300 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="font-heading text-sm sm:text-base uppercase tracking-wider">
                  {item.name}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-gray-600'}`} />
              </a>
            );
          })}
        </nav>

        {/* Drawer Footer & Quick Contact */}
        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" /> Motera Stadium Rd, Ahmedabad
            </span>
            <span className="text-accent font-semibold">Open 6 AM - 10 PM</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="w-full py-3.5 bg-accent text-black font-heading text-lg uppercase tracking-widest text-center rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(255,209,0,0.4)] font-bold"
          >
            <Sparkles className="w-4 h-4" /> Book Complimentary 1-Day Trial
          </a>
        </div>
      </div>
    </>
  );
}
