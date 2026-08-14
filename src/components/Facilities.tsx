'use client';

import { useState, useRef } from 'react';
import { ChevronRight, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const facilities = [
  {
    id: 'strength',
    name: 'Strength Zone',
    tagline: 'Custom Panatta & Hammer Strength Biomechanics',
    specs: 'Dumbbells up to 80kg · 4 Deadlift Platforms · Custom Pulleys',
    description:
      'Engineered with bespoke Panatta Italy and Hammer Strength lines, custom calibrated barbells, heavy-duty power racks, and precision cable systems to isolate muscle fibers safely.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600',
  },
  {
    id: 'cardio',
    name: 'Cardio Arena',
    tagline: 'Technogym Run Personal & Metric Telemetry',
    specs: 'Live VO2 Tracking · Skill-Mills · StairMasters · Rowers',
    description:
      'Features Italian Technogym Run Personal treadmills, curve skill-mills, Concept2 rowers, and air-bikes equipped with real-time biometric telemetry to optimize cardiovascular efficiency.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600',
  },
  {
    id: 'crossfit',
    name: 'Rogue CrossFit Box',
    tagline: '5,000 Sq Ft Functional Rig & Sled Turf',
    specs: 'Olympic Plates · Climbing Ropes · Sled Tracks · Gymnastic Rings',
    description:
      'A dedicated 5,000 sq ft functional arena fully outfitted with official Rogue fitness rigs, competition bumper plates, climbing ropes, heavy tire flips, and turf sprint tracks.',
    image: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?q=80&w=1600',
  },
  {
    id: 'pool',
    name: 'Semi-Olympic Pool',
    tagline: 'Indoor Heated 25m Lap Pool & Lounge Deck',
    specs: 'Temperature-Controlled (28°C) · 4 Lap Lanes · Underwater Audio',
    description:
      'A crystal-clear, climate-controlled 25-meter lap pool maintained at a soothing 28°C. Perfect for low-impact cardio conditioning, swimming drills, and active recovery.',
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=1600',
  },
  {
    id: 'recovery',
    name: 'Cryo & Recovery Suite',
    tagline: 'Ice Baths (3-5°C), Finnish Sauna & Steam',
    specs: 'Cold Plunge Tubs · Finnish Dry Sauna · Eucalyptus Steam Cabin',
    description:
      'Accelerate recovery with dedicated 3-5°C cryotherapy ice plunge tubs, cedarwood Finnish dry saunas, and eucalyptus-infused steam cabins for rapid tissue repair.',
    image: 'https://images.unsplash.com/photo-1594178543599-ced7481ec651?q=80&w=1600',
  },
  {
    id: 'yoga',
    name: 'Mind-Body Yoga Studio',
    tagline: 'Acoustically Isolated Wellness Sanctuary',
    specs: 'Bamboo Wood Flooring · Sound Healing · Reformer Pilates',
    description:
      'A peaceful, glass-enclosed studio with soft bamboo flooring, dedicated to classical Hatha, Vinyasa, aerial yoga, and mindfulness breathwork sessions.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600',
  },
  {
    id: 'lockers',
    name: 'Executive Locker Suites',
    tagline: 'Digital Keypad Lockers & Rainforest Showers',
    specs: 'Private Showers · Vanity Grooming Stations · Steam Access',
    description:
      'Private executive dressing suites equipped with digital keypad locks, plush bath sheets, rainforest shower heads, and luxury organic grooming products.',
    image: 'https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=1600',
  },
];

export default function Facilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.facility-card-item', {
      opacity: 0,
      x: -30,
      scale: 0.95,
      filter: 'blur(6px)',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      },
    });

    gsap.from('.facility-preview-card', {
      opacity: 0,
      scale: 0.94,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="facilities"
      className="relative bg-black py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background Image Showcase with Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {facilities.map((fac, idx) => (
          <div
            key={fac.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-out ${
              selectedIdx === idx ? 'opacity-30 scale-105 filter brightness-90' : 'opacity-0 scale-100'
            }`}
            style={{ backgroundImage: `url(${fac.image})` }}
          />
        ))}
        {/* Dark Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
        {/* Left Side: Facility Selector List */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 w-fit mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
              WORLD-CLASS INFRASTRUCTURE
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-6 sm:mb-8 uppercase leading-none">
            THE LUXURY <br />
            <span className="gold-gradient-text">TRAINING ARENAS</span>
          </h2>

          {/* Interactive Arena Items */}
          <div className="flex flex-col gap-2">
            {facilities.map((fac, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedIdx(idx)}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`facility-card-item w-full py-3.5 px-4 sm:px-6 rounded-xl text-left border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-neutral-900/90 border-accent text-accent shadow-[0_0_20px_rgba(255,209,0,0.15)]'
                      : 'bg-black/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-heading text-2xl sm:text-3xl uppercase tracking-wider leading-none">
                      {fac.name}
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
                      {fac.tagline}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-accent text-black translate-x-1 shadow'
                        : 'bg-white/5 text-gray-500 group-hover:text-white'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Arena Feature Card */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="facility-preview-card glass-panel p-6 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden flex flex-col justify-between border-accent/30 shadow-2xl">
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-accent-dark to-transparent" />

            <div>
              <span className="text-[10px] text-accent font-mono uppercase tracking-[0.3em] font-bold block mb-2">
                ARENA SPECIFICATION
              </span>

              <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wider mb-2">
                {facilities[selectedIdx].name}
              </h3>

              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-accent font-semibold mb-4 inline-block">
                {facilities[selectedIdx].specs}
              </div>

              <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                {facilities[selectedIdx].description}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest block">
                  ACCESS INCLUSION
                </span>
                <span className="font-heading text-lg text-white uppercase tracking-widest">
                  Included In All Plans
                </span>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent text-black font-heading text-sm uppercase tracking-wider px-5 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(255,209,0,0.3)]"
              >
                <span>Book Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
