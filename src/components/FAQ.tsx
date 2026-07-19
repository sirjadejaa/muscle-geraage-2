'use client';

import { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: 'What are the operating hours of Muscle Garaage?',
    answer: 'We are open Monday through Saturday from 06:00 AM to 10:00 PM. On Sundays, our facility is open from 08:00 AM to 02:00 PM exclusively for active recovery, swimming pool access, and the cryo recovery suite.',
  },
  {
    key: 'valet',
    question: 'Is valet parking available at the facility?',
    answer: 'Yes, we provide complimentary secure valet parking for all active members at the main entrance of our Motera facility.',
  },
  {
    question: 'Can I freeze or pause my membership?',
    answer: 'Yes. Annual Club memberships can be frozen for up to 30 days per year. VIP Obsidian memberships offer premium flexibility, allowing up to 60 days of suspension per year with zero freezing fees.',
  },
  {
    question: 'Do you offer trial sessions for prospective members?',
    answer: 'Yes, we offer a complimentary 1-Day VVIP Free Trial. This includes full access to our strength and cardio zones, locker facilities, and a complimentary bio-scan assessment with a personal coach. You can book a trial via our contact form.',
  },
  {
    question: 'What certifications do the trainers hold?',
    answer: 'Every coach at Muscle Garaage is fully certified. Our team holds credentials from internationally recognized bodies such as Gold\'s Gym Academy, K11 Master Training Academy, Rogue CrossFit Level 1/2, and ACSM (American College of Sports Medicine).',
  },
];

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.faq-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.faq-item', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.faq-list',
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative bg-black py-24 md:py-32 px-6 z-30"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="faq-header mb-16 text-center">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
            COMMON INQUIRIES
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none">
            FREQUENTLY ASKED <br />
            <span className="text-accent">QUESTIONS</span>
          </h2>
        </div>

        {/* FAQ list */}
        <div className="faq-list flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="faq-item border border-white/5 bg-secondary group transition-all duration-300 hover:border-accent/30"
              >
                {/* Question trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-6 px-6 md:px-8 flex items-center justify-between text-left focus:outline-none cursor-none"
                >
                  <span className="font-heading text-xl md:text-2xl text-white uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-accent group-hover:text-black group-hover:bg-accent text-accent transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer body */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-white/10 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-body text-sm text-gray-400 leading-relaxed p-6 md:p-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
