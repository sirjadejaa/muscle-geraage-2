'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollSectionRef.current || !containerRef.current) return;

    const panels = gsap.utils.toArray('.brand-panel');
    const totalPanels = panels.length;
    if (totalPanels === 0) return;

    // Horizontal scroll timeline
    gsap.to(scrollSectionRef.current, {
      x: () => -(scrollSectionRef.current!.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollSectionRef.current!.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-black z-30">
      {/* Scrollable Container */}
      <div
        ref={scrollSectionRef}
        className="flex h-screen w-[300vw] overflow-x-hidden"
      >
        {/* Panel 1: The Sanctuary */}
        <section className="brand-panel w-screen h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-24 bg-gradient-to-r from-black to-neutral-dark border-r border-white/5">
          <div className="max-w-4xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              01 // THE ORIGIN
            </span>
            <h2 className="font-heading text-6xl sm:text-8xl md:text-9xl uppercase tracking-tight text-white mb-6 leading-none">
              A SANCTUARY <br />
              <span className="text-accent">FOR POWER</span>
            </h2>
            <p className="font-body text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              We did not build another fitness center. We engineered a luxury sanctuary where human potential meets absolute precision. Muscle Garaage is the physical manifestation of strength, discipline, and uncompromising design.
            </p>
          </div>
        </section>

        {/* Panel 2: The Equipment */}
        <section className="brand-panel w-screen h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-24 bg-neutral-dark border-r border-white/5 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1920')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
          <div className="max-w-4xl relative z-10">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              02 // THE WEAPONRY
            </span>
            <h2 className="font-heading text-6xl sm:text-8xl md:text-9xl uppercase tracking-tight text-white mb-6 leading-none">
              UNCOMPROMISING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">
                BIOMECHANICS
              </span>
            </h2>
            <p className="font-body text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Every dumbbell weight, cable tension, and leather stitch is handpicked. By combining Panatta's biomechanical engineering with bespoke, hand-crafted interior aesthetics, we ensure every rep feels as luxurious as it is powerful.
            </p>
          </div>
        </section>

        {/* Panel 3: The Community */}
        <section className="brand-panel w-screen h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-24 bg-black">
          <div className="max-w-4xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              03 // THE MISSION
            </span>
            <h2 className="font-heading text-6xl sm:text-8xl md:text-9xl uppercase tracking-tight text-white mb-6 leading-none">
              AHMEDABAD&apos;S <br />
              <span className="text-accent">NEW ELITE</span>
            </h2>
            <p className="font-body text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Based in Motera, Ahmedabad, Muscle Garaage is home to leaders, builders, and elite athletes. We exist to deliver world-class training programs, next-level physical transformations, and an unmatched fitness community for those who settle for nothing less than total victory.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
