'use client';

import { useRef } from 'react';
import { Sparkles, Shield, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stories = [
  {
    number: '01',
    tag: 'THE ARCHITECTURE',
    title: 'A SANCTUARY FOR POWER',
    subtitle: 'Ahmedabad’s Most Exclusive Fitness Ground',
    description:
      'We did not build another fitness center. We engineered a 35,000 sq ft architectural sanctuary where human performance meets high-end hospitality. Muscle Garaage is the physical manifestation of discipline, refined luxury, and relentless ambition in Motera.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600',
    icon: Sparkles,
  },
  {
    number: '02',
    tag: 'THE WEAPONRY',
    title: 'UNCOMPROMISING BIOMECHANICS',
    subtitle: 'Panatta Italy & Rogue Certified Engineering',
    description:
      'Every dumbbell, cable pulley ratio, and ergonomic angle is calibrated to perfection. By pairing Panatta’s Italian biomechanical engineering with custom-welded Rogue rigs, we eliminate joint shear while maximizing muscle fiber recruitment.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600',
    icon: Shield,
  },
  {
    number: '03',
    tag: 'THE COHORT',
    title: 'AHMEDABAD’S NEW ELITE',
    subtitle: 'Community of Leaders, Builders & Athletes',
    description:
      'Based in Motera, Muscle Garaage is home to top executives, doctors, entrepreneurs, and dedicated athletes. We provide customized nutrition protocols, recovery ice baths, and transformational blueprints for members who demand the absolute best.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600',
    icon: Trophy,
  },
];

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.brand-story-card', {
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.25,
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
      id="brand-story"
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
            THE PHILOSOPHY
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-6">
            BEYOND FITNESS. <br />
            <span className="gold-gradient-text">A BESPOKE STANDARD.</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Discover why Muscle Garaage is recognized as Ahmedabad’s pinnacle destination for strength, recovery, and lifestyle prestige.
          </p>
        </div>

        {/* 3 Chapters Showcase */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
          {stories.map((story, idx) => {
            const Icon = story.icon;
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={story.number}
                className={`brand-story-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center p-6 sm:p-10 lg:p-12 rounded-3xl bg-neutral-950/80 border border-white/10 relative overflow-hidden transition-all duration-500 hover:border-accent/40 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Background watermarked chapter number */}
                <span className="absolute -bottom-10 -right-6 font-heading text-[160px] sm:text-[220px] text-white/[0.02] select-none pointer-events-none leading-none">
                  {story.number}
                </span>

                {/* Left/Content Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-accent font-bold tracking-[0.3em] uppercase">
                      CHAPTER {story.number} // {story.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-2 leading-tight">
                    {story.title}
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold mb-6 block">
                    {story.subtitle}
                  </span>

                  <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                    {story.description}
                  </p>

                  <div className="border-l-2 border-accent pl-4 sm:pl-6 py-1">
                    <span className="font-heading text-base sm:text-lg text-white uppercase tracking-wider block">
                      Engineered For High Achievers
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-widest">
                      Zero compromises on hygiene, equipment, or service quality.
                    </span>
                  </div>
                </div>

                {/* Right/Image Column */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                      Muscle Garaage Motera
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-accent">
                      {story.number} / 03
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
