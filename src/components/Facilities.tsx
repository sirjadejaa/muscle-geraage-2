'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const facilities = [
  {
    name: 'Strength Zone',
    tagline: 'Custom biomechanical isolation lines',
    description: 'Equipped with bespoke Panatta and Hammer Strength lines, including specialized barbells, dumbbells up to 80kg, and dedicated heavy-lifting platforms.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600',
  },
  {
    name: 'Cardio Arena',
    tagline: 'High-performance calorie conditioning',
    description: 'Features Technogym Run Personal treadmills, skill-mills, air-bikes, and cross-trainers configured with telemetry systems to track performance metrics.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600',
  },
  {
    name: 'CrossFit Box',
    tagline: 'High-intensity functional arena',
    description: 'A bespoke 5,000 sq ft arena fully outfitted with Rogue fitness rigs, climbing ropes, sled tracks, kettlebells, and bumper plates.',
    image: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?q=80&w=1600',
  },
  {
    name: 'Swimming Pool',
    tagline: 'Temperature-controlled lap luxury',
    description: 'An indoor, semi-Olympic size pool heated precisely for recovery laps, featuring lounge decks and direct access to steam facilities.',
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=1600',
  },
  {
    name: 'Recovery Suite & Ice Bath',
    tagline: 'Cryo-conditioning and muscle repair',
    description: 'Equipped with cold plunge ice baths (3-5°C), Finnish dry saunas, eucalyptus steam cabins, and specialized sports physiotherapy recovery tables.',
    image: 'https://images.unsplash.com/photo-1594178543599-ced7481ec651?q=80&w=1600',
  },
  {
    name: 'Mind-Body Yoga Studio',
    tagline: 'Serene wellness sanctuary',
    description: 'An acoustically isolated, glass-walled studio with soft bamboo flooring, dedicated to classical Hatha, Vinyasa, and power yoga sessions.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600',
  },
  {
    name: 'Executive Locker Rooms',
    tagline: 'Premium grooming amenities',
    description: 'Equipped with digital lockers, luxury bath products, rainforest showers, private dressing areas, and complimentary vanity amenities.',
    image: 'https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=1600',
  },
];

export default function Facilities() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <section
      id="facilities"
      className="relative bg-black min-h-screen py-24 md:py-32 px-6 flex items-center overflow-hidden z-30"
    >
      {/* Background Images Wrapper */}
      <div className="absolute inset-0 w-full h-full z-0">
        {facilities.map((fac, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-out ${
              hoveredIdx === idx ? 'opacity-30 scale-105 filter blur-[1px]' : 'opacity-0 scale-100'
            }`}
            style={{ backgroundImage: `url(${fac.image})` }}
          />
        ))}
        {/* Dark radial glow to ensure typography remains legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Side: List */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-6">
            FACILITIES SHOWCASE
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white mb-10 uppercase leading-none">
            THE WORLD-CLASS <br />
            <span className="text-accent">ARENAS</span>
          </h2>

          <div className="flex flex-col gap-2">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="py-4 border-b border-white/10 flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex flex-col">
                  <button
                    className={`font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-left transition-colors duration-300 ${
                      hoveredIdx === idx ? 'text-accent' : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {fac.name}
                  </button>
                  <span
                    className={`font-body text-xs text-gray-500 uppercase tracking-widest mt-1 transition-opacity duration-300 ${
                      hoveredIdx === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {fac.tagline}
                  </span>
                </div>
                <ChevronRight
                  className={`w-6 h-6 transition-all duration-300 ${
                    hoveredIdx === idx ? 'text-accent translate-x-2' : 'text-gray-600 group-hover:text-white'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Dynamic Content Card */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden transition-all duration-500 hover:border-accent/30 min-h-[300px] flex flex-col justify-between">
            {/* Border glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent to-transparent" />
            
            {hoveredIdx !== null && (
              <div className="flex flex-col justify-between h-full animate-fade-in">
                <div>
                  <span className="font-heading text-lg text-accent uppercase tracking-wider block mb-2">
                    {facilities[hoveredIdx].tagline}
                  </span>
                  <p className="font-body text-sm text-gray-300 leading-relaxed">
                    {facilities[hoveredIdx].description}
                  </p>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-1">
                    ACCESS TIER
                  </span>
                  <span className="font-heading text-xl text-white uppercase tracking-widest">
                    ALL MEMBERSHIP PLANS
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
