'use client';

import { useRef } from 'react';
import { Award, Zap, Heart, Shield, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Zap,
    title: 'Biomechanical Weaponry',
    description: 'Equipped with custom-calibrated Panatta (Italy) and Technogym biomechanics to isolate muscle fibers with zero joint stress.',
    gridClass: 'md:col-span-2 lg:col-span-3',
  },
  {
    icon: Award,
    title: 'Certified Elite Trainers',
    description: 'Transform with coaches certified by Gold\'s Gym Academy, K11, and ACSM, offering personalized bio-programming.',
    gridClass: 'md:col-span-2 lg:col-span-3',
  },
  {
    icon: Heart,
    title: 'Luxury Recovery Suite',
    description: 'Accelerate muscle repair in our custom ice baths, Finnish saunas, steam cabins, and dedicated sports massage recovery rooms.',
    gridClass: 'md:col-span-2 lg:col-span-2',
  },
  {
    icon: Shield,
    title: 'Absolute Hygiene Standards',
    description: 'Continuous HEPA air filtration and premium sanitization protocols maintain a fresh, clean, and safe space 24/7.',
    gridClass: 'md:col-span-2 lg:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'VVIP Amenities',
    description: 'Premium towels, locker security, private shower suites, nutrition consulting bar, and valet parking.',
    gridClass: 'md:col-span-2 lg:col-span-2',
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Staggered reveal of features
    gsap.from('.feature-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="why-choose-us"
      className="relative bg-secondary py-24 md:py-32 px-6 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Premium Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1920')] bg-cover bg-center opacity-8 mix-blend-luminosity pointer-events-none" />
      
      {/* Golden Luxury Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,209,0,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Giant Typographic Watermark to fill empty space */}
      <div className="absolute bottom-6 right-0 font-heading text-[15vw] tracking-[0.1em] text-white/[0.015] uppercase select-none pointer-events-none leading-none z-0">
        LIMITLESS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              THE GOLD STANDARD
            </span>
            <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none">
              WHY THE ELITE <br />
              <span className="text-accent">CHOOSE US</span>
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-gray-400 max-w-sm leading-relaxed">
            Muscle Garaage delivers a bespoke lifestyle experience designed to optimize performance, comfort, and results.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className={`feature-card group relative p-8 md:p-10 bg-black border border-white/5 hover:border-accent/40 transition-all duration-500 flex flex-col justify-between hover:translate-y-[-4px] ${feat.gridClass}`}
              >
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center border border-white/10 group-hover:border-accent group-hover:bg-accent group-hover:text-black text-accent transition-all duration-500 mb-8 rounded-none">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl uppercase tracking-wider text-white mb-4 group-hover:text-accent transition-colors duration-300">
                    {feat.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
