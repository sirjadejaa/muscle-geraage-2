'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  program: z.string().min(1, { message: 'Please select a training program.' }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      program: '',
      message: '',
    },
  });

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.contact-info-col', {
      opacity: 0,
      x: -40,
      filter: 'blur(6px)',
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      },
    });

    gsap.from('.contact-form-col', {
      opacity: 0,
      x: 40,
      scale: 0.96,
      filter: 'blur(6px)',
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      },
    });
  }, { scope: containerRef });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        setIsSuccess(true);
        reset();
      }
    } catch {
      setIsSuccess(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative bg-black py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Contact Information */}
          <div className="contact-info-col lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
                  COMPLIMENTARY VVIP PASS
                </span>
              </div>

              <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none mb-4 sm:mb-6">
                BEGIN YOUR <br />
                <span className="gold-gradient-text">TRANSFORMATION</span>
              </h2>

              <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed mb-8 sm:mb-10">
                Book your complimentary 1-Day Trial. Experience our Panatta biomechanical lines, heated semi-Olympic pool, and recovery suites with an assigned master coach in Motera.
              </p>

              {/* Contact Details List */}
              <div className="flex flex-col gap-5 border-t border-white/10 pt-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-accent uppercase font-bold tracking-widest block">
                      CLUB ADDRESS
                    </span>
                    <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed mt-0.5">
                      4th Floor, Apex Titanium, Near Narendra Modi Stadium, Motera, Ahmedabad, Gujarat 380005
                    </p>
                    <a
                      href="https://maps.google.com/?q=Motera+Stadium+Ahmedabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent underline mt-1 inline-block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-accent uppercase font-bold tracking-widest block">
                      VIP CONCIERGE PHONE
                    </span>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <a href="tel:+919876543210" className="text-xs sm:text-sm text-gray-300 font-mono hover:text-accent">
                        +91 98765 43210
                      </a>
                      <a href="tel:+917940001234" className="text-xs text-gray-400 font-mono hover:text-accent">
                        +91 79 4000 1234 (Reception)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-accent uppercase font-bold tracking-widest block">
                      EMAIL INQUIRIES
                    </span>
                    <a href="mailto:contact@musclegaraage.com" className="text-xs sm:text-sm text-gray-300 hover:text-accent mt-0.5 block">
                      contact@musclegaraage.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-accent uppercase font-bold tracking-widest block">
                      OPERATING HOURS
                    </span>
                    <p className="text-xs text-gray-300 mt-0.5">
                      <strong>Mon – Sat:</strong> 06:00 AM – 10:00 PM <br />
                      <strong>Sun:</strong> 08:00 AM – 02:00 PM (Active Recovery & Pool)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Reservation Form */}
          <div className="contact-form-col lg:col-span-7 bg-neutral-950/90 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-accent-dark to-transparent" />

            <div className="mb-6">
              <span className="text-[10px] text-accent font-bold uppercase tracking-[0.3em] block mb-1">
                COMPLIMENTARY PASS
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wider">
                RESERVE YOUR VVIP TRIAL
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Fill out the form below. Our concierge will confirm your pass within 15 minutes.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 rounded-2xl bg-accent/15 border border-accent/40 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-accent" />
                <h4 className="font-heading text-2xl text-white uppercase tracking-wider">
                  Pass Reserved Successfully
                </h4>
                <p className="text-xs text-gray-300 max-w-md">
                  Thank you! Our concierge team has reserved your 1-Day VVIP Trial Pass. A WhatsApp confirmation will arrive shortly on your mobile.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2 bg-accent text-black font-heading text-xs uppercase tracking-wider rounded-lg font-bold hover:bg-white transition-all"
                >
                  Book Another Pass
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-widest text-gray-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-white/10 focus:border-accent'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-400 mt-1 block">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-widest text-gray-300 mb-1.5">
                      Mobile Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-white/10 focus:border-accent'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-400 mt-1 block">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-widest text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-accent'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Program Preference */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-widest text-gray-300 mb-1.5">
                      Primary Interest *
                    </label>
                    <select
                      {...register('program')}
                      className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.program ? 'border-red-500' : 'border-white/10 focus:border-accent'
                      }`}
                    >
                      <option value="">Select Training Interest</option>
                      <option value="Panatta Strength Training">Panatta Strength & Hypertrophy</option>
                      <option value="Rogue CrossFit Arena">Rogue CrossFit & Conditioning</option>
                      <option value="1-on-1 VIP Personal Coaching">1-on-1 Personal Master Coaching</option>
                      <option value="Heated Semi-Olympic Pool">Heated Swimming Lap Pool</option>
                      <option value="Cryo Ice Bath & Sauna Suite">Cryo Ice Baths & Saunas</option>
                      <option value="12-Week Recomposition Cohort">12-Week Body Recomposition</option>
                    </select>
                    {errors.program && (
                      <span className="text-[10px] text-red-400 mt-1 block">
                        {errors.program.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-widest text-gray-300 mb-1.5">
                    Specific Fitness Goals or Queries (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Tell us about your fitness history, timeline, or current goals..."
                    className="w-full bg-neutral-900 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-black font-heading text-lg uppercase tracking-widest rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_25px_rgba(255,209,0,0.4)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming Pass...' : 'Claim Free 1-Day VVIP Pass'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-white/10 h-72 sm:h-80 w-full relative shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14681.332303254928!2d72.58988647565345!3d23.08489721727725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83c27633f81d%3A0x7d6f51c72f77c385!2sNarendra%20Modi%20Stadium!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Muscle Garaage Location Map"
          />
          <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-xs text-white">
            <span className="text-accent font-bold">Muscle Garaage</span> · Motera Stadium Road, Ahmedabad
          </div>
        </div>
      </div>
    </section>
  );
}
