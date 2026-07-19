'use client';

import { useRef } from 'react';
import { Clock, User, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const blogs = [
  {
    title: 'The Science of Active Recovery: Cryo vs. Heat',
    excerpt: 'Explore how ice bath cryo-conditioning and Finnish saunas affect muscle hypertrophy, inflammation, and recovery biomarkers.',
    category: 'Recovery',
    readTime: '5 Min Read',
    author: 'Coach Dev',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600',
    slug: 'science-of-active-recovery',
  },
  {
    title: 'Macronutrient Blueprints for Lean Muscle Hypertrophy',
    excerpt: 'A comprehensive deep dive into protein synthesis triggers, clean caloric surpluses, and nutrient timing for elite body composition.',
    category: 'Nutrition',
    readTime: '7 Min Read',
    author: 'Coach Priya',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600',
    slug: 'macronutrient-blueprints-hypertrophy',
  },
  {
    title: 'Biomechanical Safety in Heavy Barbell Lifts',
    excerpt: 'How biomechanical isolation and proper alignment eliminate spinal shear force and optimize joint torque under heavy loads.',
    category: 'Workout',
    readTime: '6 Min Read',
    author: 'Coach Vikram',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600',
    slug: 'biomechanical-safety-heavy-lifts',
  },
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.blog-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.blog-card', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.blog-grid',
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="blog"
      className="relative bg-secondary py-24 md:py-32 px-6 border-t border-white/5 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="blog-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
              EDITORIAL RESOURCE
            </span>
            <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none">
              LATEST INSIGHTS & <br />
              <span className="text-accent">FITNESS BLOG</span>
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-gray-400 max-w-sm leading-relaxed">
            Read professional articles covering science-based training, performance nutrition, and recovery routines.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <div
              key={index}
              className="blog-card group relative bg-black border border-white/5 flex flex-col justify-between overflow-hidden cursor-none"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-90 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute top-4 left-4 bg-accent text-black font-semibold text-[9px] uppercase tracking-widest px-3 py-1">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-gray-500 text-[10px] uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-accent" /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-accent" /> {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl text-white uppercase tracking-wider mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-body text-xs text-gray-400 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Link */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between group-hover:border-accent/30 transition-colors duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent group-hover:text-white transition-colors duration-300">
                    Read Article
                  </span>
                  <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
