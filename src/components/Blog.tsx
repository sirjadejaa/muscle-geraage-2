'use client';

import { useRef } from 'react';
import { Clock, User, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const blogs = [
  {
    title: 'The Science of Active Recovery: Cryo Ice vs. Finnish Heat',
    excerpt:
      'Explore how 4°C cold plunge ice baths and dry cedar saunas modulate muscle hypertrophy, systemic inflammation, and recovery biomarkers.',
    category: 'Recovery',
    readTime: '5 Min Read',
    author: 'Coach Dev',
    authorRole: 'Head of Transformation',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800',
  },
  {
    title: 'Macronutrient Blueprints for Lean Muscle Hypertrophy',
    excerpt:
      'A comprehensive breakdown of mTOR protein synthesis triggers, clean caloric surpluses, and nutrient timing for elite body composition.',
    category: 'Nutrition',
    readTime: '7 Min Read',
    author: 'Coach Priya',
    authorRole: 'Sports Nutritionist',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800',
  },
  {
    title: 'Biomechanical Safety & Spinal Mechanics in Heavy Lifts',
    excerpt:
      'How custom Panatta isolation equipment and ergonomic bar paths eliminate joint shear while maximizing muscle tension under load.',
    category: 'Biomechanics',
    readTime: '6 Min Read',
    author: 'Coach Vikram',
    authorRole: 'CrossFit L2 Lead',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
  },
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.blog-card', {
      opacity: 0,
      y: 50,
      scale: 0.94,
      filter: 'blur(8px)',
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="blog"
      className="relative bg-neutral-950 py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-accent/2 rounded-full filter blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
                OBSIDIAN EDITORIAL
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none">
              LATEST INSIGHTS & <br />
              <span className="gold-gradient-text">FITNESS SCIENCE</span>
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            Read evidence-based articles authored by our master coaching panel on biomechanics, nutrition protocols, and recovery methodologies.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((post, index) => (
            <article
              key={index}
              className="blog-card group relative bg-black rounded-3xl border border-white/10 flex flex-col justify-between overflow-hidden shadow-xl hover:border-accent/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div>
                {/* Article Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-108 transition-transform duration-700 ease-out brightness-90"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest text-black bg-accent px-3 py-1 rounded-full shadow">
                    {post.category}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-accent" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wider text-white mb-3 group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  {post.authorRole}
                </span>

                <div className="flex items-center gap-1 text-xs text-accent font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
