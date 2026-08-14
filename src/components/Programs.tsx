'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Calendar, User, CheckCircle2, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const programs = [
  {
    title: 'Weight Training',
    tagline: 'Hypertrophy & Biomechanical Power',
    schedule: 'Mon - Sat: 06:00 AM - 10:00 PM',
    trainer: 'Coach Dev & Lead Team',
    benefits: ['Panatta isolation lines', 'Progressive overload tracking', 'Zero joint shear stress'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
  },
  {
    title: 'Rogue CrossFit',
    tagline: 'High-Intensity Functional Conditioning',
    schedule: 'Mon, Wed, Fri: 07:00 AM & 06:00 PM',
    trainer: 'Coach Vikram (CrossFit L2)',
    benefits: ['VO2 Max conditioning', 'Explosive power & agility', 'Dedicated 5,000 sq ft rig'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800',
  },
  {
    title: 'HIIT Burn',
    tagline: 'Metabolic & Cardiovascular Accelerator',
    schedule: 'Tue, Thu, Sat: 08:00 AM & 07:00 PM',
    trainer: 'Coach Ananya',
    benefits: ['24-hour EPOC calorie burn', 'Heart rate telemetry', 'Stamina refinement'],
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800',
  },
  {
    title: '1-on-1 VIP Coaching',
    tagline: 'Bespoke Biometric Transformation',
    schedule: 'Flexible / By Private Appointment',
    trainer: 'Senior Master Coaches',
    benefits: ['Custom InBody scans weekly', 'Tailored macro blueprints', 'Dedicated coach guidance'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
  },
  {
    title: 'Swimming Conditioning',
    tagline: 'Heated 25m Lap Pool Endurance',
    schedule: 'Daily: 06:00 AM - 09:00 PM',
    trainer: 'Coach Rakesh',
    benefits: ['Low-impact full-body cardio', 'Stroke technique coaching', 'Active recovery assistance'],
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=800',
  },
  {
    title: 'Mind-Body Yoga',
    tagline: 'Mobility, Core & Neural Recovery',
    schedule: 'Mon - Fri: 07:00 AM & 05:00 PM',
    trainer: 'Guru Sunita (RYS 500)',
    benefits: ['Postural correction', 'Myofascial flexibility', 'Stress cortisol reduction'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800',
  },
  {
    title: 'Zumba & Aerobics',
    tagline: 'High-Energy Rhythmic Cardio',
    schedule: 'Tue, Thu: 06:00 PM',
    trainer: 'Coach Pooja',
    benefits: ['Coordination & rhythm', 'Endorphin release', 'Fun group energy'],
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543dd6e?q=80&w=800',
  },
  {
    title: '12-Week Recomposition',
    tagline: 'Guaranteed Physical Transformation',
    schedule: 'Exclusive Cohorts',
    trainer: 'Head Coach Dev & Sports Nutritionist',
    benefits: ['Body fat reduction guarantee', 'Bi-weekly blood metric logs', 'Complete lifestyle pivot'],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800',
  },
];

export default function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.program-card', {
      opacity: 0,
      y: 50,
      scale: 0.93,
      filter: 'blur(8px)',
      duration: 0.8,
      stagger: 0.08,
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
      id="programs"
      className="relative bg-neutral-950 py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
                CURATED DISCIPLINES
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
              ELITE TRAINING <br />
              <span className="gold-gradient-text">PROGRAMS</span>
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            Select a specialized training track built on biomechanical science, structured progression, and dedicated master coaching.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, idx) => {
            const isHovered = activeCard === idx;
            return (
              <div
                key={prog.title}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className="program-card group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black transition-all duration-500 hover:border-accent/60 hover:shadow-[0_0_25px_rgba(255,209,0,0.2)] flex flex-col justify-between p-6 shadow-xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.45] group-hover:brightness-[0.35]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Top: Program Title & Arrow */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-accent font-bold block mb-1">
                      0{idx + 1} // TRACK
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wider text-white group-hover:text-accent transition-colors duration-300">
                      {prog.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-black transition-all duration-300 shadow">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom: Details & Hover Expand */}
                <div className="relative z-10 flex flex-col">
                  <p className="font-body text-xs text-gray-300 mb-3 line-clamp-2">
                    {prog.tagline}
                  </p>

                  {/* Benefits & Schedule */}
                  <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="truncate">{prog.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                      <User className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="truncate">{prog.trainer}</span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <a
                    href="#contact"
                    className="mt-4 w-full py-2 bg-accent/90 hover:bg-accent text-black font-heading text-sm uppercase tracking-wider text-center rounded-lg font-bold transition-all shadow-md"
                  >
                    Book Free Trial
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
