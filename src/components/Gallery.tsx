'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ['All', 'Strength', 'Cardio', 'CrossFit', 'Pool', 'Recovery'];

const items = [
  { id: 1, title: 'Heavy Dumbbell Isolation Line', category: 'Strength', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000', size: 'aspect-[3/4]' },
  { id: 2, title: 'Technogym Run Personal Floor', category: 'Cardio', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000', size: 'aspect-[4/3]' },
  { id: 3, title: '5,000 Sq Ft Rogue Functional Rig', category: 'CrossFit', url: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?q=80&w=1000', size: 'aspect-[3/4]' },
  { id: 4, title: 'Heated Semi-Olympic Lap Pool', category: 'Pool', url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=1000', size: 'aspect-[1/1]' },
  { id: 5, title: 'Cold Plunge Cryo Ice Baths', category: 'Recovery', url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000', size: 'aspect-[4/5]' },
  { id: 6, title: 'Olympic Deadlift Power Platform', category: 'Strength', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000', size: 'aspect-[4/3]' },
  { id: 7, title: 'CrossFit Sled & Turf Sprint Track', category: 'CrossFit', url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000', size: 'aspect-[1/1]' },
  { id: 8, title: 'Poolside Recovery & Lounge Deck', category: 'Pool', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000', size: 'aspect-[3/4]' },
  { id: 9, title: 'Finnish Dry Cedarwood Sauna', category: 'Recovery', url: 'https://images.unsplash.com/photo-1594178543599-ced7481ec651?q=80&w=1000', size: 'aspect-[4/3]' },
  { id: 10, title: 'Panatta Biomechanical Rows & Press', category: 'Strength', url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000', size: 'aspect-[4/5]' },
  { id: 11, title: 'High-Performance Air-Bikes & Rowers', category: 'Cardio', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000', size: 'aspect-[1/1]' },
  { id: 12, title: 'Executive Grooming Suite & Showers', category: 'Recovery', url: 'https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=1000', size: 'aspect-[4/3]' },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.gallery-card', {
      opacity: 0,
      scale: 0.95,
      y: 30,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { dependencies: [filter], scope: containerRef });

  const filteredItems = items.filter(
    (item) => filter === 'All' || item.category === filter
  );

  const openLightbox = (id: number) => {
    const idx = filteredItems.findIndex((item) => item.id === id);
    setLightboxIdx(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => setLightboxIdx(null);

  const prevImage = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const nextImage = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx, filteredItems]);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-accent/2 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <ImageIcon className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
              VISUAL SANCTUARY
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-6">
            THE GALLERY <br />
            <span className="gold-gradient-text">OF CHAMPIONS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Take a closer look at our world-class training zones, Olympic platforms, heated pool, and luxury recovery amenities in Motera.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-accent text-black shadow-[0_0_15px_rgba(255,209,0,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="gallery-card group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 cursor-pointer shadow-lg"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                loading="lazy"
                decoding="async"
              />

              {/* Hover Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="self-end w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-accent block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-heading text-lg uppercase tracking-wider text-white leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-all z-[10000]"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-all z-[10000]"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-all z-[10000]"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Lightbox Content */}
          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center select-none">
            <img
              src={filteredItems[lightboxIdx].url}
              alt={filteredItems[lightboxIdx].title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl border border-white/15 shadow-2xl"
            />
            
            <div className="mt-4 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-accent block">
                {filteredItems[lightboxIdx].category}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-wider mt-1">
                {filteredItems[lightboxIdx].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
