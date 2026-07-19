'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Phone must be a valid 10-digit number.' }),
  email: z.string().email({ message: 'Email must be a valid email address.' }),
  program: z.string().min(1, { message: 'Please select a program.' }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        setErrorMessage(resData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-black py-24 md:py-32 px-6 z-30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Form Info & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
                FREE TRIAL INQUIRY
              </span>
              <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none mb-6">
                BEGIN YOUR <br />
                <span className="text-accent">TRANSFORMATION</span>
              </h2>
              <p className="font-body text-sm text-gray-400 leading-relaxed mb-10">
                Submit your inquiry to schedule your VVIP 1-Day Trial. Experience our elite gym floor, CrossFit box, and luxury recovery suite with a private coach.
              </p>

              {/* Details List */}
              <div className="flex flex-col gap-6">
                {/* Location */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading text-lg text-white uppercase tracking-wider block">
                      LOCATION
                    </span>
                    <p className="font-body text-xs text-gray-400 mt-0.5 leading-relaxed">
                      Muscle Garaage, Motera, Ahmedabad, Gujarat, India.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading text-lg text-white uppercase tracking-wider block">
                      PHONE
                    </span>
                    <p className="font-body text-xs text-gray-400 mt-0.5 leading-relaxed">
                      +91 99999 99999 / +91 88888 88888
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading text-lg text-white uppercase tracking-wider block">
                      EMAIL
                    </span>
                    <p className="font-body text-xs text-gray-400 mt-0.5 leading-relaxed">
                      info@muscle-garaage.com / transform@muscle-garaage.com
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading text-lg text-white uppercase tracking-wider block">
                      BUSINESS HOURS
                    </span>
                    <p className="font-body text-xs text-gray-400 mt-0.5 leading-relaxed">
                      Mon - Sat: 06:00 AM - 10:00 PM <br />
                      Sun: 08:00 AM - 02:00 PM (Recovery & Pool)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form & Google Map */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-accent" />
              
              {isSuccess ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-accent mb-4 animate-bounce" />
                  <h3 className="font-heading text-3xl text-white uppercase tracking-wider mb-2">
                    TRIAL BOOKED SUCCESSFULLY
                  </h3>
                  <p className="font-body text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
                    Thank you for choosing Muscle Garaage. Our concierge team will call you within 2 hours to coordinate your custom training slot and personal coach.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="border border-white/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:border-accent hover:text-accent transition-all cursor-none"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        placeholder="John Doe"
                        className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-none"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-semibold mt-1">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="+91 99999 99999"
                        className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-none"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-500 font-semibold mt-1">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="johndoe@email.com"
                        className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-none"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-semibold mt-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* Program Option */}
                    <div className="flex flex-col">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                        Preferred Program
                      </label>
                      <select
                        {...register('program')}
                        className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-none appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffd100' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundSize: '1.25rem',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <option value="" disabled className="text-gray-600">Select a Program</option>
                        <option value="Weight Training">Weight Training</option>
                        <option value="CrossFit Arena">CrossFit Arena</option>
                        <option value="HIIT Conditioning">HIIT Conditioning</option>
                        <option value="Personal Training">Personal Training</option>
                        <option value="Swimming Laps">Swimming Laps</option>
                        <option value="Yoga Studio">Yoga Studio</option>
                        <option value="Zumba & Aerobics">Zumba & Aerobics</option>
                        <option value="Body Transformation">Body Transformation</option>
                      </select>
                      {errors.program && (
                        <span className="text-[10px] text-red-500 font-semibold mt-1">
                          {errors.program.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                      Message (Optional)
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Share any specific goals or health queries..."
                      className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none cursor-none"
                    />
                  </div>

                  {errorMessage && (
                    <span className="text-[10px] text-red-500 font-bold mt-2">
                      {errorMessage}
                    </span>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-accent text-black font-semibold text-xs uppercase tracking-widest py-4 transition-all duration-300 hover:bg-white hover:scale-[1.02] flex items-center justify-center gap-2 cursor-none"
                  >
                    {isSubmitting ? (
                      'Scheduling...'
                    ) : (
                      <>
                        Book VVIP Free Trial <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Dark Mode Google Map Embed */}
            <div className="w-full aspect-[21/9] border border-white/10 overflow-hidden relative">
              <iframe
                title="Muscle Garaage Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.1873133615456!2d72.5973413!3d23.0903332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83c2a6b2ef75%3A0x7d022b7c46cbb66c!2sMotera%20Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full border-none pointer-events-none"
                style={{
                  filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) brightness(0.9) contrast(1.2)',
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay cover to protect cursor none */}
              <div className="absolute inset-0 z-10 pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
