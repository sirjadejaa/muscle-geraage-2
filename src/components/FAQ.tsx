'use client';

import { useState, useRef, useMemo } from 'react';
import { Plus, Minus, Search, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    category: 'Membership',
    question: 'What are the membership pricing options and terms?',
    answer:
      'We offer flexible membership tiers tailored to your schedule: Monthly Elite (₹3,500/month), Annual Club (₹22,000/year - our most popular flagship plan), and VIP Obsidian (₹60,000/year all-inclusive). We offer transparent upfront pricing with zero hidden maintenance fees or surprise charges.',
  },
  {
    category: 'Membership',
    question: 'How do I book a complimentary trial session before joining?',
    answer:
      'We provide a complimentary 1-Day VVIP Free Pass for prospective members. Your trial includes full access to our Panatta strength zones, Rogue CrossFit box, heated semi-Olympic pool, executive locker rooms, and an optional 20-minute biometric InBody scan with a personal coach. You can book directly using our contact form or WhatsApp concierge.',
  },
  {
    category: 'Training',
    question: 'How does Personal Training and dedicated coach pairing work?',
    answer:
      'Our Personal Training panel consists exclusively of certified master coaches (Gold\'s Gym Academy, K11 Master, ACSM). Every 1-on-1 coaching package includes progressive overload biomechanical programming, customized macronutrient meal plans, weekly InBody bio-scans, and form optimization.',
  },
  {
    category: 'Facilities',
    question: 'What are the specifications and rules for the Swimming Pool?',
    answer:
      'Our indoor semi-Olympic pool is 25 meters long with 4 dedicated lap lanes, maintained at an optimal 28°C temperature year-round. It is open daily from 06:00 AM to 09:00 PM. Proper nylon/lycra swimwear and swim caps are required. Dedicated lifeguards and stroke coaches are always on deck.',
  },
  {
    category: 'Facilities',
    question: 'What recovery amenities are included (Steam, Sauna & Ice Baths)?',
    answer:
      'Our dedicated Recovery Suite features cold plunge ice baths chilled to 3-5°C for rapid metabolic anti-inflammatory recovery, Finnish dry cedarwood saunas (80-90°C), and eucalyptus-infused steam cabins. Annual and VIP Obsidian members enjoy full recovery suite access.',
  },
  {
    category: 'Training',
    question: 'What equipment and classes are offered in the CrossFit Box?',
    answer:
      'The 5,000 sq ft CrossFit Arena is outfitted with official Rogue fitness rigs, competition bumper plates, Concept2 ski-ergs and rowers, climbing ropes, heavy sled turf tracks, and gymnastics rings. We host certified WOD (Workout of the Day) group sessions 6 days a week led by CrossFit Level 2 coaches.',
  },
  {
    category: 'Facilities',
    question: 'What security and amenities are provided in the Locker Facilities?',
    answer:
      'Our executive locker suites offer private digital keypad security lockers, luxury rain showers, complimentary plush towels, vanity stations with Dyson hair dryers, and premium organic body care amenities. VIP Obsidian tier includes dedicated private assigned lockers with laundry service.',
  },
  {
    category: 'General',
    question: 'Is parking available at the Motera facility?',
    answer:
      'Yes, we provide 100% complimentary, secure valet parking for all active members and trial guests right at the main portico entrance of our Motera facility on Stadium Road, with 24/7 CCTV surveillance.',
  },
  {
    category: 'General',
    question: 'What are the exact operating hours throughout the week?',
    answer:
      'Muscle Garaage is open Monday through Saturday from 06:00 AM to 10:00 PM. On Sundays, we operate from 08:00 AM to 02:00 PM exclusively for active recovery, heated swimming pool sessions, and the sauna/ice bath suite.',
  },
  {
    category: 'Membership',
    question: 'What is the membership freezing and cancellation policy?',
    answer:
      'Annual Club members can freeze their membership for up to 30 days per year for travel or medical reasons with zero fee. VIP Obsidian members can freeze up to 60 days. Memberships can also be transferred to an immediate family member upon request.',
  },
  {
    category: 'Training',
    question: 'Are Nutrition Consultations and diet blueprints provided?',
    answer:
      'Yes! We have an in-house certified sports nutritionist and functional health panel. Members receive comprehensive dietary breakdowns, personalized macronutrient targets (fat loss, hypertrophy, or endurance), and supplement guidance tailored to their bio-scan results.',
  },
  {
    category: 'General',
    question: 'I am a complete beginner. What guidance and onboarding do you offer?',
    answer:
      'Every new member undergoes a structured 3-Step Onboarding Assessment: 1) Medical history & InBody scan, 2) Joint mobility & movement screening, and 3) An introductory equipment walkthrough with a certified trainer to establish safe form on all Panatta machines.',
  },
];

const categories = ['All', 'Membership', 'Facilities', 'Training', 'General'];

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.faq-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent/2 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="faq-header text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
              CLEAR ANSWERS
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-6">
            FREQUENTLY ASKED <br />
            <span className="gold-gradient-text">QUESTIONS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our luxury facilities, memberships, coaching, heated pool, and recovery suites.
          </p>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. pricing, trial, pool, sauna, valet)..."
              className="w-full bg-neutral-950 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent/60 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-accent text-black font-bold shadow-[0_0_15px_rgba(255,209,0,0.4)]'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-neutral-950 rounded-2xl border border-white/10">
              <p className="text-sm text-gray-400 mb-2">No matching questions found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs text-accent font-bold uppercase tracking-wider underline"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-neutral-950 border-accent/60 shadow-[0_0_20px_rgba(255,209,0,0.1)]'
                      : 'bg-neutral-950/60 border-white/10 hover:border-white/25'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none gap-4 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold bg-accent/10 px-2.5 py-0.5 rounded border border-accent/20 w-fit">
                        {faq.category}
                      </span>
                      <span className="font-heading text-xl sm:text-2xl text-white uppercase tracking-wider group-hover:text-accent transition-colors">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-accent text-black border-accent rotate-180'
                          : 'bg-white/5 border-white/15 text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Animated Answer Body */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden px-6 sm:px-8 ${
                      isOpen ? 'max-h-96 pb-6 pt-1 opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-neutral-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-heading text-xl text-white uppercase tracking-wider block">
              Still have questions?
            </span>
            <span className="text-xs text-gray-400">
              Speak directly with our Motera fitness concierge team.
            </span>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-black font-heading text-sm uppercase tracking-wider px-6 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow"
          >
            <span>Ask Concierge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
