'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, Flame, TrendingUp, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stories = [
  {
    name: 'Aarav Patel',
    type: 'Body Recomposition',
    stat: '-22 kg',
    period: '6 Months',
    quote: 'The biomechanical machines and custom diet blueprint changed everything. The trainers did not just stand there; they scientifically mapped my progression.',
    beforeImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800',
  },
  {
    name: 'Kabir Shah',
    type: 'Lean Muscle Gain',
    stat: '+12 kg',
    period: '8 Months',
    quote: 'I struggled with muscle gain for years. Under Coach Dev\'s elite transformation cohort, we tracked everything from sleep latency to heavy load volume.',
    beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
  },
];

export default function Transformations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.transformation-stats', {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  const activeStory = stories[activeStoryIdx];

  return (
    <section
      ref={containerRef}
      id="transformations"
      className="relative bg-black py-24 md:py-32 px-6 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
            TRANSFORMATION SHOWCASE
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none mb-6">
            REAL CLIENT <br />
            <span className="text-accent">RESULTS</span>
          </h2>
          <p className="font-body text-sm md:text-base text-gray-400 leading-relaxed">
            Witness the physical power of scientific coaching. No shortcuts, just consistent dedication and professional programming.
          </p>
        </div>

        {/* Dynamic Story Selector */}
        <div className="flex gap-4 justify-center mb-10">
          {stories.map((story, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveStoryIdx(idx);
                setSliderPos(50);
              }}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                activeStoryIdx === idx
                  ? 'bg-accent text-black'
                  : 'border border-white/10 text-white hover:border-white'
              }`}
            >
              {story.name} ({story.stat})
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: The Interactive Slider */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={sliderRef}
              className="relative w-full aspect-[4/3] overflow-hidden border border-white/10 select-none cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              {/* Before Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeStory.beforeImage}
                  alt="Before Transformation"
                  className="w-full h-full object-cover pointer-events-none filter grayscale opacity-70"
                />
                <div className="absolute top-4 left-4 bg-black/80 px-4 py-1.5 border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-white z-20">
                  Before
                </div>
              </div>

              {/* After Image Container (clipped width) */}
              <div
                className="absolute inset-y-0 left-0 h-full overflow-hidden z-10 pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                {/* Notice the fixed width to avoid squishing */}
                <div className="absolute inset-0 w-[100vw] h-full" style={{ width: sliderRef.current?.getBoundingClientRect().width }}>
                  <img
                    src={activeStory.afterImage}
                    alt="After Transformation"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute top-4 left-4 bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black z-20">
                    After
                  </div>
                </div>
              </div>

              {/* Slider Handle Line */}
              <div
                className="absolute inset-y-0 z-20 w-[2px] bg-accent pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Drag Handle button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent text-black rounded-full shadow-2xl flex items-center justify-center border border-black pointer-events-none">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-4 flex items-center gap-1.5">
              Drag the center slider to inspect results
            </span>
          </div>

          {/* Right Column: Statistics & Quote */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="transformation-stats flex flex-col">
              {/* Highlight Metrics */}
              <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-8 mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    RESULT ACHIEFMENT
                  </span>
                  <span className="font-heading text-4xl sm:text-5xl text-accent tracking-wide flex items-center gap-2">
                    <Flame className="w-8 h-8 fill-current text-accent" /> {activeStory.stat}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    DURATION
                  </span>
                  <span className="font-heading text-4xl sm:text-5xl text-white tracking-wide flex items-center gap-2">
                    <TrendingUp className="w-8 h-8 text-white" /> {activeStory.period}
                  </span>
                </div>
              </div>

              {/* Client Quote */}
              <div className="glass-panel p-8 relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-accent" />
                <span className="text-gray-500 text-6xl font-heading leading-none absolute top-4 right-6 opacity-20 select-none">
                  “
                </span>
                <p className="font-body text-sm text-gray-300 italic leading-relaxed mb-6">
                  "{activeStory.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <span className="font-heading text-lg text-white uppercase tracking-wider">
                    {activeStory.name}
                  </span>
                  <span className="text-gray-500 text-xs">— {activeStory.type}</span>
                </div>
              </div>

              {/* CTA link */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent hover:text-white transition-colors"
              >
                Start Your Transformation <Sparkles className="w-4 h-4 text-accent group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
