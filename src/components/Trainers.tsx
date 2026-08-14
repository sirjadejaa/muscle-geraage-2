'use client';

import { useRef } from 'react';
import { Award, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const trainers = [
  {
    name: 'Coach Dev',
    role: 'Head of Transformation',
    experience: '10+ Years Experience',
    specialization: 'Biomechanical Hypertrophy & Bio-Programming',
    certs: ['Gold\'s Gym Academy Master', 'K11 Certified Master Trainer', 'NESTA Sports Nutritionist'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800',
    instagram: 'https://instagram.com',
  },
  {
    name: 'Coach Vikram',
    role: 'CrossFit & Conditioning Lead',
    experience: '8+ Years Experience',
    specialization: 'Olympic Weightlifting & Aerobic Capacity',
    certs: ['Official CrossFit Level 2 Coach', 'Rogue Athlete Trainer', 'CPR/AED Certified'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=800',
    instagram: 'https://instagram.com',
  },
  {
    name: 'Coach Ananya',
    role: 'Strength & Conditioning Specialist',
    experience: '6+ Years Experience',
    specialization: 'Athletic Performance & Functional Aesthetics',
    certs: ['ACSM Certified Specialist', 'K11 Personal Training', 'Sports Injury Rehab Cert'],
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800',
    instagram: 'https://instagram.com',
  },
  {
    name: 'Guru Sunita',
    role: 'Mind-Body & Yoga Director',
    experience: '12+ Years Experience',
    specialization: 'Classical Hatha, Vinyasa & Posture Restoration',
    certs: ['RYS 500 Yoga Alliance Master', 'Iyengar Therapy Certified', 'Sound Healing Practitioner'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800',
    instagram: 'https://instagram.com',
  },
];

export default function Trainers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.trainer-card', {
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
      id="trainers"
      className="relative bg-neutral-950 py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/3 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 sm:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
                THE ELITE PANEL
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none">
              MEET OUR <br />
              <span className="gold-gradient-text">MASTER COACHES</span>
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            Train under certified fitness instructors. Our panel designs customized protocols to accelerate your goals safely and scientifically.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="trainer-card group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-xl"
            >
              {/* Profile Image */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-75 group-hover:brightness-50"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              {/* Static Overlay Text */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-10 transition-transform duration-500 group-hover:translate-y-[-80px]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent block mb-1">
                  {trainer.role}
                </span>
                <h3 className="font-heading text-3xl uppercase tracking-wider text-white leading-none">
                  {trainer.name}
                </h3>
                <span className="text-[11px] text-gray-400 font-medium block mt-1">
                  {trainer.experience}
                </span>
              </div>

              {/* Hover Slide-Up Details Panel */}
              <div className="absolute inset-0 p-6 bg-black/95 backdrop-blur-md z-20 flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out border-t-2 border-accent">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-accent block mb-1">
                    SPECIALIZATION
                  </span>
                  <h4 className="font-heading text-xl uppercase tracking-wider text-white mb-4 leading-snug">
                    {trainer.specialization}
                  </h4>

                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block mb-2">
                    CREDENTIALS
                  </span>
                  <div className="flex flex-col gap-2">
                    {trainer.certs.map((cert, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-gray-300">
                        <Award className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <a
                    href={trainer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent transition-colors p-2 -ml-2"
                    aria-label={`${trainer.name} Instagram`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 bg-accent text-black font-heading text-sm uppercase tracking-wider px-4 py-2 rounded-lg font-bold hover:bg-white transition-all shadow"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Book Coach</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
