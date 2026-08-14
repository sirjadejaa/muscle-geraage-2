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

    gsap.from('.faq-card-item', {
      opacity: 0,
      y: 35,
      scale: 0.96,
      filter: 'blur(6px)',
      duration: 0.7,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      },
    });
  }, { dependencies: [activeCategory, searchQuery], scope: containerRef });

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
      className="relative bg-black py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent/2 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
              CLEAR ANSWERS
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-4 sm:mb-6">
            FREQUENTLY ASKED <br />
            <span className="gold-gradient-text">QUESTIONS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our luxury facilities, memberships, coaching, heated pool, and recovery suites.
          </p>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="flex flex-col gap-4 mb-8 sm:mb-10">
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
                className="text-xs text-accent font-semibold underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIdx === index;
              return (
                <div
                  key={index}
                  className={`faq-card-item rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-neutral-950/90 border-accent/40 shadow-[0_0_25px_rgba(255,209,0,0.08)]'
                      : 'bg-neutral-950/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-accent mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-heading text-lg sm:text-xl md:text-2xl uppercase tracking-wider text-white">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-accent text-black rotate-180 shadow-[0_0_15px_rgba(255,209,0,0.4)]'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Collapsible Answer Panel */}
                  <div
                    className={`transition-all duration-300 ease-out overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 font-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading text-2xl text-white uppercase tracking-wider mb-1">
              Still Have Questions?
            </h4>
            <p className="text-xs text-gray-400">
              Our concierge team is available 24/7 on WhatsApp and phone for membership inquiries.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-black font-heading text-sm uppercase tracking-wider px-6 py-3 rounded-full font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(255,209,0,0.3)] flex-shrink-0"
          >
            <span>Ask Concierge</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
