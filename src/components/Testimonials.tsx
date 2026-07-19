'use client';

import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reviews = [
  {
    name: 'Rajesh Sharma',
    role: 'Managing Director',
    rating: 5,
    quote: 'Ahmedabad\'s luxury fitness standard has finally arrived. Valet parking, private digital lockers, and absolute privacy. Coach Dev\'s bio-scans helped me lose 14kg in 4 months while managing my corporate workload.',
  },
  {
    name: 'Dr. Nidhi Vyas',
    role: 'Cardiologist',
    rating: 5,
    quote: 'As a physician, I am highly critical of posture and biomechanics. The custom-calibrated Panatta lines here isolate target muscle groups with zero joint stress. The recovery suite saunas are an incredible wellness asset.',
  },
  {
    name: 'Siddharth Mehta',
    role: 'Tech Entrepreneur',
    rating: 5,
    quote: 'The CrossFit Box here is unmatched—full Rogue rigs, bumper plates, sled tracks. But the ultimate game-changer is diving into the 4°C Cryo Ice Bath immediately after a grueling metabolic conditioning session.',
  },
  {
    name: 'Priya Patel',
    role: 'Fashion Designer',
    rating: 5,
    quote: 'Uncompromising hygiene, beautiful editorial lighting, and an elite, professional crowd. The mind-body yoga studio is acoustically insulated and offers the perfect sanctuary for neural recovery after a busy week.',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.testimonial-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.testimonial-card-item', {
      opacity: 0,
      x: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.testimonial-slider-wrap',
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative bg-secondary py-24 md:py-32 px-6 border-t border-white/5 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="testimonial-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              CLIENT VOICE
            </span>
            <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none">
              TESTIMONIALS OF <br />
              <span className="text-accent">EXCELLENCE</span>
            </h2>
          </div>
          
          {/* Nav buttons */}
          <div className="flex gap-4">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-all cursor-none"
              aria-label="Scroll testimonials left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-all cursor-none"
              aria-label="Scroll testimonials right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="testimonial-slider-wrap relative overflow-hidden -mx-6 px-6">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {reviews.map((rev, index) => (
              <div
                key={index}
                className="testimonial-card-item flex-shrink-0 w-full sm:w-[450px] bg-black border border-white/5 p-8 md:p-10 flex flex-col justify-between snap-start relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
                
                {/* Quote sign */}
                <Quote className="w-8 h-8 text-accent opacity-20 mb-6" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: rev.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-current text-accent" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-body text-sm text-gray-300 leading-relaxed mb-8 italic">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <div>
                    <span className="font-heading text-lg text-white uppercase tracking-wider block">
                      {rev.name}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-0.5">
                      {rev.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
