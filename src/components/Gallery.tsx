'use client';

import { useState, useRef } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ['All', 'Strength', 'Cardio', 'CrossFit', 'Pool', 'Recovery'];

const items = [
  { id: 1, category: 'Strength', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800', size: 'aspect-[3/4]' },
  { id: 2, category: 'Cardio', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800', size: 'aspect-[4/3]' },
  { id: 3, category: 'CrossFit', url: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?q=80&w=800', size: 'aspect-[3/4]' },
  { id: 4, category: 'Pool', url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=800', size: 'aspect-[1/1]' },
  { id: 5, category: 'Recovery', url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800', size: 'aspect-[4/5]' },
  { id: 6, category: 'Strength', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800', size: 'aspect-[4/3]' },
  { id: 7, category: 'CrossFit', url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800', size: 'aspect-[1/1]' },
  { id: 8, category: 'Pool', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800', size: 'aspect-[3/4]' },
  { id: 9, category: 'Recovery', url: 'https://images.unsplash.com/photo-1594178543599-ced7481ec651?q=80&w=800', size: 'aspect-[4/3]' },
  { id: 10, category: 'Strength', url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800', size: 'aspect-[4/5]' },
  { id: 11, category: 'Cardio', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800', size: 'aspect-[1/1]' },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.gallery-item-wrap', {
      opacity: 0,
      scale: 0.95,
      y: 30,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
      },
    });
  }, { dependencies: [filter], scope: containerRef });

  const filteredItems = items.filter(
    (item) => filter === 'All' || item.category === filter
  );

  const openLightbox = (id: number) => {
    const idx = filteredItems.findIndex((item) => item.id === id);
    setLightboxIdx(idx !== -1 ? idx : null);
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

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative bg-black py-24 md:py-32 px-6 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
            VISUAL SANCTUARY
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none mb-6">
            THE GALLERY <br />
            <span className="text-accent">OF CHAMPIONS</span>
          </h2>
          <p className="font-body text-sm md:text-base text-gray-400 leading-relaxed">
            Take a visual tour inside our training zones, recovery rooms, and swimming facility. Every zone is optimized for elite performance.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                filter === cat
                  ? 'bg-accent text-black'
                  : 'border border-white/10 text-white hover:border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="gallery-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="gallery-item-wrap break-inside-avoid relative overflow-hidden border border-white/5 bg-secondary group cursor-view cursor-none"
            >
              <img
                src={item.url}
                alt={`Muscle Garaage ${item.category}`}
                className={`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[1s] ease-out opacity-75 group-hover:opacity-100 ${item.size}`}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white mt-1">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[1000] bg-black/98 flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-accent p-2 focus:outline-none z-[1010]"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:text-accent p-2 focus:outline-none z-[1010]"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:text-accent p-2 focus:outline-none z-[1010]"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Active Image */}
          <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center select-none">
            <img
              src={filteredItems[lightboxIdx].url}
              alt="Lightbox"
              className="max-w-full max-h-[75vh] object-contain border border-white/10"
            />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mt-4">
              Category: {filteredItems[lightboxIdx].category}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
