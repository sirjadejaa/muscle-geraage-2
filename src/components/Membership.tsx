'use client';

import { useRef, useState } from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const plans = [
  {
    name: 'Monthly Elite',
    price: '₹3,500',
    period: 'Month',
    popular: false,
    description: 'Perfect for short-term residency, with full standard facility access.',
    features: [
      'Strength Zone & Cardio Arena access',
      'CrossFit Arena group sessions',
      'Rainforest showers & executive lockers',
      'Valet parking assistance',
    ],
    nonFeatures: [
      'Semi-Olympic Pool access',
      'Cryo recovery ice baths',
      'Personal training sessions included',
      'VIP lounge access & custom laundry',
    ],
  },
  {
    name: 'Annual Club',
    price: '₹22,000',
    period: 'Year',
    popular: true,
    description: 'Our most sought-after tier. Achieve your physical peak with full support.',
    features: [
      'Strength Zone & Cardio Arena access',
      'CrossFit Arena group sessions',
      'Rainforest showers & executive lockers',
      'Valet parking assistance',
      'Semi-Olympic Pool access',
      'Finnish sauna & steam cabins access',
      '2x Personal Training sessions & bio-scans',
      '10% Discount at Nutrition Bar',
    ],
    nonFeatures: [
      'VIP lounge access & custom laundry',
      'Unlimited Cryo recovery ice baths',
    ],
  },
  {
    name: 'VIP Obsidian',
    price: '₹60,000',
    period: 'Year',
    popular: false,
    description: 'Bespoke fitness luxury. Unlimited access to the entire sanctuary.',
    features: [
      'Strength Zone & Cardio Arena access',
      'CrossFit Arena group sessions',
      'Rainforest showers & executive lockers',
      'Valet parking assistance',
      'Semi-Olympic Pool access',
      'Finnish sauna & steam cabins access',
      'Unlimited Cryo recovery ice baths',
      '1x Assigned Tier-1 coach session weekly',
      'Private digital locker & laundry service',
      'VIP lounge access & guest pass priority',
    ],
    nonFeatures: [],
  },
];

const comparisonData = {
  columns: ['Features', 'Monthly Elite', 'Annual Club', 'VIP Obsidian'],
  rows: [
    { name: 'Strength & Cardio Zone', values: [true, true, true] },
    { name: 'CrossFit Arena Sessions', values: [true, true, true] },
    { name: 'Locker & Shower Suites', values: [true, true, true] },
    { name: 'Valet Parking', values: [true, true, true] },
    { name: 'Semi-Olympic Pool Access', values: [false, true, true] },
    { name: 'Sauna & Steam Bath', values: [false, true, true] },
    { name: 'Cryo Ice Bath Recovery', values: [false, '₹500 / Session', 'Unlimited'] },
    { name: 'Personal Trainer Credits', values: [false, '2 Sessions', '1 Session / Week'] },
    { name: 'Private Locker & Laundry', values: [false, false, true] },
    { name: 'VIP Lounge & Guest Passes', values: [false, false, true] },
  ],
};

export default function Membership() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.plan-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.plans-grid',
        start: 'top 80%',
      },
    });

    gsap.from('.compare-table', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.compare-table',
        start: 'top 85%',
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="membership"
      className="relative bg-black py-24 md:py-32 px-6 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
            MEMBERSHIP TIERS
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none mb-6">
            INVEST IN YOUR <br />
            <span className="text-accent">PHYSICAL PRESTIGE</span>
          </h2>
          <p className="font-body text-sm md:text-base text-gray-400 leading-relaxed">
            Select a membership tier suited to your lifestyle. We offer flexible commitments and unparalleled luxury inclusions for a premium experience.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="plans-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card relative flex flex-col justify-between p-8 md:p-10 bg-secondary border transition-all duration-500 hover:scale-[1.02] cursor-none ${
                plan.popular ? 'border-accent/80' : 'border-white/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-black font-semibold text-[10px] uppercase tracking-widest px-4 py-1.5 shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                {/* Header info */}
                <span className="font-heading text-2xl uppercase tracking-wider text-white block mb-2">
                  {plan.name}
                </span>
                <p className="text-xs text-gray-400 mb-8 min-h-[32px]">{plan.description}</p>

                {/* Price */}
                <div className="flex items-baseline text-white mb-8 border-b border-white/10 pb-6">
                  <span className="text-4xl sm:text-5xl font-heading tracking-wide text-accent">
                    {plan.price}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest ml-2">
                    / {plan.period}
                  </span>
                </div>

                {/* Features list */}
                <ul className="flex flex-col gap-4 mb-10">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {plan.nonFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-gray-600">
                      <X className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action */}
              <a
                href="#contact"
                className={`w-full text-center font-semibold text-xs uppercase tracking-widest py-4 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-accent text-black hover:bg-white hover:text-black'
                    : 'border border-white/20 text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                Join This Tier
              </a>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="compare-table glass-panel p-6 md:p-10">
          <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-wider text-white mb-8 text-center md:text-left">
            COMPARE <span className="text-accent">TIER INCLUSIONS</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10">
                  {comparisonData.columns.map((col, cIdx) => (
                    <th
                      key={cIdx}
                      className={`py-4 px-6 font-heading text-sm uppercase tracking-wider ${
                        cIdx === 0
                          ? 'text-gray-400'
                          : cIdx === 2
                          ? 'text-accent'
                          : 'text-white'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <td className="py-4 px-6 font-body text-xs font-semibold text-gray-300">
                      {row.name}
                    </td>
                    {row.values.map((val, vIdx) => (
                      <td key={vIdx} className="py-4 px-6 font-body text-xs text-gray-400">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <X className="w-4 h-4 text-gray-700" />
                          )
                        ) : (
                          <span className="text-white font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
