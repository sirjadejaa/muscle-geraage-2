'use client';

import { useRef } from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
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
    badge: 'Flexible Commitment',
    description: 'Ideal for short-term residency or testing the luxury fitness waters in Motera.',
    features: [
      'Strength Zone & Cardio Arena access',
      'Rogue CrossFit group sessions',
      'Rainforest showers & digital lockers',
      'Complimentary valet parking',
      'Basic InBody biometric assessment',
    ],
    nonFeatures: [
      'Semi-Olympic Pool access',
      'Cryo recovery ice bath suite',
      'Complimentary 1-on-1 coach sessions',
      'Private VIP lounge & laundry service',
    ],
  },
  {
    name: 'Annual Club',
    price: '₹22,000',
    period: 'Year',
    popular: true,
    badge: 'Most Preferred Choice',
    description: 'Our flagship tier. Complete year-round access to the gym, pool, saunas, and coaching.',
    features: [
      'Strength Zone & Cardio Arena access',
      'Rogue CrossFit Arena group sessions',
      'Semi-Olympic heated pool access',
      'Finnish dry sauna & steam cabins',
      'Rainforest showers & executive lockers',
      'Complimentary valet parking',
      '2x Complimentary 1-on-1 coach sessions',
      'Monthly InBody body composition scans',
      '10% Privilege discount at Nutrition Bar',
      '30-Day membership freeze allowance',
    ],
    nonFeatures: [
      'Unlimited Cryo Ice Bath recovery suite',
      'Dedicated private VIP locker & laundry',
    ],
  },
  {
    name: 'VIP Obsidian',
    price: '₹60,000',
    period: 'Year',
    popular: false,
    badge: 'Bespoke Ultra-Luxury',
    description: 'Unrestricted all-inclusive access to every facility, recovery suite, and master coach.',
    features: [
      'All Annual Club inclusions',
      'Unlimited Cryo Ice Bath plunge sessions',
      '1x Assigned Senior Coach session weekly',
      'Personalized nutritionist macro blueprints',
      'Private assigned digital locker with laundry',
      'VIP lounge access & complimentary guests (4/mo)',
      '60-Day membership freeze allowance',
      'Complimentary high-protein shakes (1 daily)',
    ],
    nonFeatures: [],
  },
];

const comparisonData = {
  columns: ['Feature Inclusions', 'Monthly Elite', 'Annual Club', 'VIP Obsidian'],
  rows: [
    { name: 'Strength & Cardio Arena Access', values: [true, true, true] },
    { name: 'Rogue CrossFit Functional Rig', values: [true, true, true] },
    { name: 'Executive Digital Locker & Showers', values: [true, true, true] },
    { name: 'Complimentary Valet Parking', values: [true, true, true] },
    { name: 'Semi-Olympic Indoor Heated Pool', values: [false, true, true] },
    { name: 'Finnish Sauna & Eucalyptus Steam', values: [false, true, true] },
    { name: 'Cryotherapy Ice Plunge Baths', values: [false, '₹500 / Session', 'Unlimited Free'] },
    { name: '1-on-1 Master Coach Sessions', values: [false, '2 Sessions Included', 'Weekly Session'] },
    { name: 'InBody Medical Biometric Scans', values: ['1 Onboarding Scan', 'Monthly Scans', 'Weekly Scans'] },
    { name: 'Dedicated Locker & Laundry Service', values: [false, false, true] },
    { name: 'VIP Lounge & Guest Privileges', values: [false, false, true] },
    { name: 'Membership Freeze Flexibility', values: [false, 'Up to 30 Days', 'Up to 60 Days'] },
  ],
};

export default function Membership() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.membership-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.membership-cards-grid',
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="membership"
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/3 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
              TRANSPARENT VALUE
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-6">
            MEMBERSHIP <br />
            <span className="gold-gradient-text">INVESTMENT TIERS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Choose the membership tier that aligns with your lifestyle. Zero hidden costs, full amenity transparency, and unmatched value.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="membership-cards-grid grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`membership-card relative flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 ${
                plan.popular
                  ? 'glass-panel-gold bg-neutral-950/90 shadow-[0_0_30px_rgba(255,209,0,0.2)]'
                  : 'bg-neutral-950/70 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black font-heading text-xs uppercase tracking-widest px-4 py-1 rounded-full font-bold shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> {plan.badge}
                </div>
              )}

              <div>
                <span className="text-xs text-accent uppercase font-bold tracking-widest block mb-2">
                  {plan.badge}
                </span>

                <h3 className="font-heading text-3xl sm:text-4xl uppercase tracking-wider text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-6">
                  <span className="font-heading text-5xl sm:text-6xl text-accent tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    / {plan.period}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="flex flex-col gap-3 mb-8">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                    Included Benefits:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-medium">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}

                  {plan.nonFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                      <X className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA */}
              <a
                href="#contact"
                className={`w-full py-4 rounded-xl font-heading text-lg uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-accent text-black font-bold hover:bg-white hover:shadow-[0_0_25px_rgba(255,209,0,0.6)]'
                    : 'bg-white/10 text-white hover:bg-white hover:text-black font-bold border border-white/10'
                }`}
              >
                <span>Select {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Inclusions Matrix Table */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs text-accent font-bold tracking-[0.3em] uppercase block mb-1">
                SIDE-BY-SIDE MATRIX
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl uppercase tracking-wider text-white">
                DETAILED <span className="text-accent">TIER COMPARISON</span>
              </h3>
            </div>
            <span className="text-xs text-gray-400">
              Need custom corporate plans? <a href="#contact" className="text-accent underline font-semibold">Contact Concierge</a>
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10">
                  {comparisonData.columns.map((col, cIdx) => (
                    <th
                      key={cIdx}
                      className={`py-4 px-4 sm:px-6 font-heading text-base uppercase tracking-wider ${
                        cIdx === 0
                          ? 'text-gray-400 w-2/5'
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
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-body text-xs font-semibold text-gray-300">
                      {row.name}
                    </td>
                    {row.values.map((val, vIdx) => (
                      <td key={vIdx} className="py-3.5 px-4 sm:px-6 font-body text-xs text-gray-400">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <X className="w-4 h-4 text-gray-700" />
                          )
                        ) : (
                          <span className="text-white font-medium text-xs">{val}</span>
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
