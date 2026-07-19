'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !imageRef.current) return;

    // Parallax scroll on the image
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Content fade up stagger
    gsap.from(contentRef.current!.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-black overflow-hidden z-30"
    >
      {/* Illuminated Wall Logo Transition Target */}
      <div className="w-full h-[50vh] flex flex-col justify-center items-center bg-black relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,209,0,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="text-center z-10 px-6">
          <span className="text-[9px] sm:text-xs text-gray-500 tracking-[0.6em] uppercase block mb-3">
            WELCOME TO THE
          </span>
          <h2 className="font-heading text-6xl sm:text-8xl md:text-9xl tracking-[0.1em] text-white uppercase leading-none cinematic-glow">
            MUSCLE <span className="text-accent">GARAAGE</span>
          </h2>
          <span className="text-[9px] sm:text-xs text-gray-500 tracking-[0.4em] uppercase block mt-3">
            MOTERA · AHMEDABAD
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-20 md:py-32 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Side: Asymmetrical Content */}
        <div ref={contentRef} className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4">
            WHO WE ARE
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white mb-6 uppercase leading-none">
            REDEFINING THE <br />
            <span className="text-accent">LIMITS OF FITNESS</span>
          </h2>
          <p className="font-body text-base text-gray-300 mb-6 leading-relaxed">
            Muscle Garaage is Ahmedabad's premier luxury fitness club. Born from the belief that fitness should be an immersive, high-end experience, we combine cutting-edge biomechanical technology with upscale hospitality.
          </p>
          <p className="font-body text-base text-gray-400 mb-8 leading-relaxed">
            Spanning a massive 35,000 square feet, our facility in Motera features dedicated strength arenas, specialized CrossFit rigs, a crystal-clear indoor pool, steam and sauna cabins, and dynamic training zones. This is not just a gym; it is a lifestyle statement for those who value performance.
          </p>
          
          <div className="border-l-2 border-accent pl-6 py-2">
            <span className="font-heading text-lg text-white uppercase tracking-wider block mb-1">
              Engineered for Greatness
            </span>
            <span className="font-body text-xs text-gray-500 uppercase tracking-widest">
              Every detail optimized to facilitate your personal transformation.
            </span>
          </div>
        </div>

        {/* Right Side: Parallax Image Showcase */}
        <div className="lg:col-span-6 relative aspect-[4/5] w-full overflow-hidden border border-white/10 group">
          <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200"
            alt="Muscle Garaage Luxury Gym Interior"
            className="absolute inset-0 w-full h-[120%] object-cover -top-[10%] scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
          />
        </div>
      </div>
    </section>
  );
}
