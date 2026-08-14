'use client';

import { useRef } from 'react';
import { Award, Zap, Heart, ShieldCheck, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';
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
    subtitle: 'Panatta & Technogym Calibrated Lines',
    description:
      'Custom-calibrated Panatta (Italy) and Technogym biomechanics designed to isolate target muscle fibers with pinpoint accuracy and zero joint stress.',
    stats: '80+ Specialized Machines',
    gridClass: 'lg:col-span-4',
  },
  {
    icon: Award,
    title: 'Certified Master Coaches',
    subtitle: 'ACSM, K11 & Gold\'s Academy Panel',
    description:
      'Every trainer is fully certified and experienced in biomechanical hypertrophy, injury prevention, and customized transformation programming.',
    stats: '15+ Certified Trainers',
    gridClass: 'lg:col-span-4',
  },
  {
    icon: Droplets,
    title: 'Luxury Recovery Suite',
    subtitle: 'Cryo Ice Baths, Finnish Sauna & Steam',
    description:
      'Accelerate systemic recovery and reduce inflammation with dedicated 4°C cold plunge baths, Finnish dry saunas, and eucalyptus steam rooms.',
    stats: 'Full Recovery Wing',
    gridClass: 'lg:col-span-4',
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Hygiene Standards',
    subtitle: 'Medical-Grade HEPA Air Filtration',
    description:
      'Continuous medical-grade air purification, automated sanitization cycles, pristine rainforest showers, and immaculate locker rooms 24/7.',
    stats: '99.9% HEPA Purity',
    gridClass: 'lg:col-span-6',
  },
  {
    icon: Sparkles,
    title: 'VVIP Hospitality & Amenities',
    subtitle: 'Complimentary Valet & Concierge Bar',
    description:
      'Enjoy seamless valet parking, private digital keypad lockers, plush towels, organic grooming amenities, and an in-house protein shake bar.',
    stats: 'Full Concierge Service',
    gridClass: 'lg:col-span-6',
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.feature-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="why-choose-us"
      className="relative bg-neutral-950 py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background Texture & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,209,0,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 sm:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-3 block">
              THE GOLD STANDARD
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none">
              WHY THE ELITE <br />
              <span className="gold-gradient-text">CHOOSE US</span>
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            Muscle Garaage delivers a bespoke fitness lifestyle engineered for unmatched performance, executive comfort, and proven results.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className={`feature-card group relative p-6 sm:p-8 md:p-10 rounded-2xl bg-black border border-white/10 hover:border-accent/50 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 shadow-lg ${feat.gridClass}`}
              >
                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-accent group-hover:w-full transition-all duration-700 rounded-t-2xl" />

                <div>
                  {/* Icon & Stats Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent/80 bg-accent/5 border border-accent/20 px-3 py-1 rounded-full">
                      {feat.stats}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wider text-white mb-1 group-hover:text-accent transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-4">
                    {feat.subtitle}
                  </span>

                  {/* Description */}
                  <p className="font-body text-sm text-gray-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  <span>Standard In All Memberships</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
