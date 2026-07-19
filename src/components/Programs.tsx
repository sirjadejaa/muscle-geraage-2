'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Calendar, User, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const programs = [
  {
    title: 'Weight Training',
    description: 'Hypertrophy and structural strength development.',
    schedule: 'Mon - Sat: 06:00 AM - 10:00 PM',
    trainer: 'Coach Dev & Team',
    benefits: ['Hypertrophy development', 'Increase bone density', 'Fat loss support'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
  },
  {
    title: 'CrossFit Arena',
    description: 'High-intensity functional group athletic routines.',
    schedule: 'Mon, Wed, Fri: 07:00 AM & 06:00 PM',
    trainer: 'Coach Vikram (L2)',
    benefits: ['VO2 Max conditioning', 'Explosive power gains', 'Core strengthening'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800',
  },
  {
    title: 'HIIT Conditioning',
    description: 'Metabolic conditioning and accelerated cardiovascular burn.',
    schedule: 'Tue, Thu, Sat: 08:00 AM & 07:00 PM',
    trainer: 'Coach Ananya',
    benefits: ['EPOC burn trigger', 'Agility refinement', 'Heart rate optimization'],
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800',
  },
  {
    title: 'Personal Training',
    description: 'One-on-one custom transformation blueprint and nutrition.',
    schedule: 'Flexible / By Appointment',
    trainer: 'Elite Panel Coaches',
    benefits: ['Custom biometrics planning', '1-on-1 direct coaching', 'Weekly body scans'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
  },
  {
    title: 'Swimming Laps',
    description: 'Cardiovascular endurance training in heated pool.',
    schedule: 'Daily: 06:00 AM - 09:00 PM',
    trainer: 'Coach Rakesh',
    benefits: ['Zero-impact cardio', 'Full body resistance', 'Active recovery assistance'],
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=800',
  },
  {
    title: 'Yoga Studio',
    description: 'Flexibility, core stabilization, and neural recovery.',
    schedule: 'Mon - Fri: 07:00 AM & 05:00 PM',
    trainer: 'Guru Sunita',
    benefits: ['Enhance mobility', 'Stress hormones reduction', 'Postural correction'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800',
  },
  {
    title: 'Zumba & Aerobics',
    description: 'Rhythmic, high-energy group fitness coordination.',
    schedule: 'Tue, Thu: 06:00 PM',
    trainer: 'Coach Pooja',
    benefits: ['Coordination & balance', 'Endorphins surge', 'Fun cardio burn'],
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543dd6e?q=80&w=800',
  },
  {
    title: 'Body Transformation',
    description: 'Dedicated 12-week body re-composition blueprint.',
    schedule: 'Custom Cohorts',
    trainer: 'Lead Coach Dev',
    benefits: ['Guaranteed metrics shift', 'Complete lifestyle pivot', 'Bi-weekly blood logs'],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800',
  },
];

export default function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.program-card', {
      opacity: 0,
      scale: 0.95,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
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
      id="programs"
      className="relative bg-secondary py-24 md:py-32 px-6 border-t border-white/5 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              OUR DISCIPLINES
            </span>
            <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none">
              ELITE TRAINING <br />
              <span className="text-accent">PROGRAMS</span>
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-gray-400 max-w-sm leading-relaxed">
            Select a training track that matches your physical ambitions. Our structured programs deliver results with pure science and intensity.
          </p>
        </div>

        {/* Asymmetrical Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {programs.map((prog, idx) => (
            <div
              key={idx}
              className="program-card group relative aspect-[3/4] overflow-hidden border border-white/5 bg-black cursor-none"
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Image background with transition */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-20 scale-100 group-hover:scale-105 transition-all duration-[1s] ease-out mix-blend-luminosity group-hover:mix-blend-normal"
                />
                {/* Yellow lighting overlay on card hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              </div>

              {/* Card content */}
              <div className="absolute inset-0 p-6 md:p-8 z-20 flex flex-col justify-between h-full">
                {/* Top: title and expand icon */}
                <div className="flex justify-between items-start">
                  <h3 className="font-heading text-3xl uppercase tracking-wider text-white group-hover:text-accent transition-colors duration-300 leading-none">
                    {prog.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom: description & details reveal */}
                <div className="flex flex-col">
                  {/* Default info */}
                  <p className="font-body text-sm text-gray-300 leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                    {prog.description}
                  </p>

                  {/* Expanded info on hover */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col gap-3 border-t border-white/10 pt-4">
                    {/* Schedule */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{prog.schedule}</span>
                    </div>
                    {/* Trainer */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <User className="w-3.5 h-3.5 text-accent" />
                      <span>{prog.trainer}</span>
                    </div>

                    {/* Benefits List */}
                    <ul className="flex flex-col gap-1.5 mt-2">
                      {prog.benefits.map((ben, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quick CTA button */}
                    <a
                      href="#contact"
                      className="mt-4 w-full bg-accent text-black text-center font-semibold text-[10px] uppercase tracking-widest py-2.5 transition-colors hover:bg-white hover:text-black"
                    >
                      Book Trial Sessions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
