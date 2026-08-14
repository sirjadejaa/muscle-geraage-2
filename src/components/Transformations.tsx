'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight, Flame, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stories = [
  {
    name: 'Aarav Patel',
    role: 'Tech Executive (34 yrs)',
    type: 'Body Recomposition & Fat Loss',
    stat: '-22 kg',
    period: '6 Months',
    quote:
      'The custom InBody scans and personalized nutrition blueprint changed everything. The trainers did not just stand there; they scientifically mapped my progression week by week.',
    beforeImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800',
  },
  {
    name: 'Kabir Shah',
    role: 'Architect (29 yrs)',
    type: 'Lean Hypertrophy & Strength',
    stat: '+12 kg Muscle',
    period: '8 Months',
    quote:
      'I struggled with muscle gain for years. Under Coach Dev’s elite transformation cohort, we isolated weak muscle groups on the Panatta line and tracked daily caloric thresholds.',
    beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
  },
  {
    name: 'Meera Desai',
    role: 'Corporate Lawyer (31 yrs)',
    type: 'Post-Injury Core & Athletic Rebuild',
    stat: '-14 kg / +40% Strength',
    period: '5 Months',
    quote:
      'After a lumbar strain, I was nervous to lift heavy again. The biomechanical coaches rebuilt my thoracic stability and glute strength with zero joint pain.',
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800',
  },
];

export default function Transformations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.transformation-wrap', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPos(percentage);
  }, []);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX);
    };

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
  }, [isDragging, handleMove]);

  const activeStory = stories[activeStoryIdx];

  return (
    <section
      ref={containerRef}
      id="transformations"
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full filter blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
              PROVEN METRICS
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-6">
            REAL CLIENT <br />
            <span className="gold-gradient-text">TRANSFORMATIONS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Witness verifiable physical transformations crafted through scientific biomechanical training, macro tracking, and dedication.
          </p>
        </div>

        {/* Story Selector Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {stories.map((story, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveStoryIdx(idx);
                setSliderPos(50);
              }}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeStoryIdx === idx
                  ? 'bg-accent text-black shadow-[0_0_15px_rgba(255,209,0,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {story.name} ({story.stat})
            </button>
          ))}
        </div>

        {/* Transformation Content Grid */}
        <div className="transformation-wrap grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Interactive Before / After Slider */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={sliderRef}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 select-none cursor-ew-resize shadow-2xl touch-none"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              {/* Before Image (Base) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeStory.beforeImage}
                  alt={`${activeStory.name} Before Transformation`}
                  className="w-full h-full object-cover filter grayscale brightness-75 pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-300 z-10">
                  Before
                </div>
              </div>

              {/* After Image Container (Clipped overlay) */}
              <div
                className="absolute inset-y-0 left-0 h-full overflow-hidden z-10 pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <div
                  className="absolute inset-0 h-full"
                  style={{ width: sliderRef.current ? `${sliderRef.current.clientWidth}px` : '100%' }}
                >
                  <img
                    src={activeStory.afterImage}
                    alt={`${activeStory.name} After Transformation`}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4 bg-accent px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-black z-10 shadow-md">
                    After
                  </div>
                </div>
              </div>

              {/* Divider Handle Line */}
              <div
                className="absolute inset-y-0 z-20 w-[2px] bg-accent pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-accent text-black rounded-full shadow-[0_0_20px_rgba(255,209,0,0.6)] flex items-center justify-center border-2 border-black pointer-events-none">
                  <ArrowLeftRight className="w-4 h-4 font-bold" />
                </div>
              </div>
            </div>

            <span className="text-[11px] text-gray-400 uppercase tracking-widest mt-4 flex items-center gap-1.5 font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5 text-accent" /> Drag slider left or right to compare
            </span>
          </div>

          {/* Right: Metrics & Testimonial Quote */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Stat Shift Badges */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 border-b border-white/10 pb-6 mb-6">
              <div className="flex flex-col p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                  Metric Result
                </span>
                <span className="font-heading text-3xl sm:text-4xl text-accent tracking-wide flex items-center gap-2">
                  <Flame className="w-6 h-6 fill-current text-accent" /> {activeStory.stat}
                </span>
              </div>

              <div className="flex flex-col p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                  Timeline
                </span>
                <span className="font-heading text-3xl sm:text-4xl text-white tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-white" /> {activeStory.period}
                </span>
              </div>
            </div>

            {/* Testimonial Quote Box */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden mb-6">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-accent" />
              <p className="font-body text-sm text-gray-300 italic leading-relaxed mb-6">
                &quot;{activeStory.quote}&quot;
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-heading text-xl text-white uppercase tracking-wider block leading-none">
                    {activeStory.name}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium block mt-1">
                    {activeStory.role} · {activeStory.type}
                  </span>
                </div>
                <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-accent text-black font-heading text-lg uppercase tracking-wider rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,209,0,0.3)]"
            >
              <span>Begin Your Transformation</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
