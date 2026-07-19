'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/#hero' },
  { name: 'About', href: '/#about' },
  { name: 'Facilities', href: '/#facilities' },
  { name: 'Programs', href: '/#programs' },
  { name: 'Membership', href: '/#membership' },
  { name: 'Trainers', href: '/#trainers' },
  { name: 'Transformation', href: '/#transformations' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav py-3 opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col justify-start">
          <span className="font-heading text-2xl md:text-3xl tracking-wider text-white group-hover:text-accent transition-colors duration-300">
            MUSCLE <span className="text-accent group-hover:text-white transition-colors duration-300">GARAAGE</span>
          </span>
          <span className="text-[9px] tracking-[0.4em] uppercase text-gray-500 group-hover:text-accent/60 transition-colors duration-300 -mt-1 pl-0.5">
            Motera · Ahmedabad
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs uppercase tracking-widest text-gray-300 hover:text-accent transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Book Trial <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white hover:text-accent p-2 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/98 z-40 transition-transform duration-500 lg:hidden flex flex-col justify-center items-center px-6 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button in drawer */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-accent p-2 transition-colors focus:outline-none"
        >
          <X className="w-7 h-7" />
        </button>

        <nav className="flex flex-col gap-6 text-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl uppercase tracking-widest text-gray-300 hover:text-accent transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-widest text-black transition-all hover:bg-white hover:scale-105"
          >
            Book Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
