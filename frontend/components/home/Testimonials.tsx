'use client';

import { useState } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS, BUSINESS } from '@/lib/constants';

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="section-padding bg-cream overflow-hidden relative">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-subtle border border-line text-xs font-medium text-charcoal mb-3">
              {/* Google G icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{BUSINESS.rating}★ Google Rated</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
              Real Stories from Pune Homeowners
            </h2>
            <div className="w-16 h-1 bg-terracotta rounded-full mt-3" />
          </div>
          <p className="text-sm text-muted max-w-sm">
            Read verified customer reviews from Hadapsar, Magarpatta, Mohammadwadi, Undri, and across Pune.
          </p>
        </div>
      </div>

      {/* Marquee slider track container */}
      <div 
        className="relative w-full py-4 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge fade masks for desktop */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-cream to-transparent z-10" />

        {/* Sliding items track */}
        <div 
          className="animate-marquee-left flex gap-6"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {marqueeItems.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="w-[340px] sm:w-[380px] shrink-0 bg-white rounded-card p-6 shadow-subtle border border-line/70 flex flex-col justify-between hover:shadow-card hover:border-terracotta/40 transition-all duration-300"
            >
              <div>
                {/* Top header: Google badge & rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Google Review
                  </div>
                </div>

                {/* Service Tag */}
                <div className="mb-3">
                  <span className="inline-block text-[11px] font-semibold text-terracotta bg-terracotta-pale/60 px-2.5 py-0.5 rounded-md">
                    {t.service}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-charcoal leading-relaxed mb-4 line-clamp-4">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-line mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-white font-heading font-bold text-sm shadow-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-muted leading-tight mt-0.5">
                      {t.location}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-muted/70 shrink-0">
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hint on hover */}
      <div className="text-center mt-4">
        <span className="text-xs text-muted/80 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
          Hover or tap on any card to pause reading
        </span>
      </div>
    </section>
  );
}
