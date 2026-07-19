'use client';

import { useRef } from 'react';
import { MessageSquare, Award } from 'lucide-react';
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
    experience: '10+ Years',
    specialization: 'Biomechanical Hypertrophy & Bio-Programming',
    certs: ['Gold\'s Gym Academy', 'K11 Master Trainer', 'NESTA Nutritionist'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Coach Vikram',
    role: 'CrossFit & Conditioning lead',
    experience: '8+ Years',
    specialization: 'Olympic Weightlifting & Aerobic Capacity',
    certs: ['CrossFit Level 2 Coach', 'Rogue Athlete Trainer', 'CPR/AED Standard'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=600',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Coach Ananya',
    role: 'Strength & Conditioning Specialist',
    experience: '6+ Years',
    specialization: 'Athletic Performance & Functional Aesthetics',
    certs: ['K11 Personal Training', 'ACSM Specialist', 'Sports Rehab Cert'],
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Guru Sunita',
    role: 'Mind-Body Instructor',
    experience: '12+ Years',
    specialization: 'Classical Hatha & Postural Restoration',
    certs: ['RYS 500 Yoga Alliance', 'Iyengar Therapy Cert', 'Sound Healing Master'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
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
      id="trainers"
      className="relative bg-secondary py-24 md:py-32 px-6 border-t border-white/5 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              THE ELITE PANEL
            </span>
            <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none">
              MEET OUR <br />
              <span className="text-accent">CHAMPION COACHES</span>
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-gray-400 max-w-sm leading-relaxed">
            Train under certified instructors. Our elite coaches design tailored plans to accelerate your results safely.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="trainer-card group relative aspect-[4/5] overflow-hidden border border-white/5 bg-black cursor-none"
            >
              {/* Profile Image */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-40 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              </div>

              {/* Static Text Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 group-hover:translate-y-[-100px] transition-transform duration-500 ease-out">
                <span className="text-[10px] text-accent font-semibold tracking-widest uppercase block mb-1">
                  {trainer.role}
                </span>
                <h3 className="font-heading text-3xl text-white uppercase tracking-wider leading-none">
                  {trainer.name}
                </h3>
                <span className="text-[10px] text-gray-400 tracking-wider uppercase block mt-1">
                  Experience: {trainer.experience}
                </span>
              </div>

              {/* Hover Details Panel (Slides Up) */}
              <div className="absolute inset-0 p-6 md:p-8 bg-black/95 z-25 flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out border-t-2 border-accent">
                <div>
                  <span className="text-[9px] text-accent font-bold tracking-[0.2em] uppercase block mb-1">
                    SPECIALIZATION
                  </span>
                  <h4 className="font-heading text-xl text-white uppercase tracking-wider mb-4 leading-tight">
                    {trainer.specialization}
                  </h4>

                  {/* Certifications list */}
                  <span className="text-[9px] text-gray-400 font-bold tracking-[0.2em] uppercase block mb-2">
                    CERTIFICATIONS
                  </span>
                  <div className="flex flex-col gap-2">
                    {trainer.certs.map((cert, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <Award className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Socials & Book action */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <div className="flex gap-4">
                    <a
                      href={trainer.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-accent transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a
                      href={trainer.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-accent transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                  </div>

                  <a
                    href="#contact"
                    className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-black bg-accent px-4 py-2 hover:bg-white hover:text-black transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Book Session
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
