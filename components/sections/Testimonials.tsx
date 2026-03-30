"use client";

import React, { useState, useEffect, useRef } from "react";
import Section from "@/components/ui/Section";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials({ className = "" }: { className?: string }) {
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setDbTestimonials(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Soft Auto-play logic
  useEffect(() => {
    if (loading || dbTestimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dbTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [loading, dbTestimonials.length]);

  // Center active slide when activeIndex changes
  useEffect(() => {
    if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const containerWidth = scrollRef.current.offsetWidth;
        const cardWidth = 460; // Approximate card + gap width
        const scrollPos = activeIndex * cardWidth - (containerWidth / 2) + (cardWidth / 2);
        
        scrollRef.current.scrollTo({
            left: scrollPos,
            behavior: "smooth"
        });
    }
  }, [activeIndex]);

  if (!loading && dbTestimonials.length === 0) return null;

  const TestimonialCard = ({ t, index }: { t: any; index: number }) => {
    const isActive = activeIndex === index;

    return (
      <div 
        className={`
          flex-shrink-0 w-[320px] md:w-[420px] transition-all duration-700 ease-out py-10
          ${isActive ? "scale-100 opacity-100 z-10" : "scale-90 opacity-40 blur-[0.5px] z-0 pointer-events-none md:blur-none"}
        `}
      >
        <div className={`
          relative h-full p-8 md:p-12 rounded-[2.5rem] transition-all duration-500
          bg-white/[0.03] backdrop-blur-xl border border-black/[0.03] shadow-premium
          flex flex-col text-left group
          ${isActive ? "shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] bg-white/100 border-accent-primary/20" : "bg-white/40"}
        `}>
          {/* Subtle Quote Icon */}
          <Quote className={`
            absolute top-8 right-8 w-12 h-12 text-accent-primary transition-all duration-700 pointer-events-none opacity-[0.03]
            ${isActive ? "rotate-12 opacity-[0.08]" : "rotate-0"}
          `} />

          {/* ⭐ Rating */}
          <div className="flex gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={`fill-current ${i < (t.rating || 5) ? "text-yellow-400" : "text-gray-200"}`} 
              />
            ))}
          </div>

          {/* Quote Typography */}
          <blockquote className={`
            text-text-primary italic leading-[1.65] font-semibold mb-10 text-xl md:text-2xl transition-opacity flex-grow
            ${isActive ? "opacity-100" : "opacity-90"}
          `}>
             &ldquo;{t.message}&rdquo;
          </blockquote>

          {/* Subtle Divider */}
          <div className="h-px w-full bg-black/[0.03] mb-8"></div>

          {/* User Info */}
          <div className="flex items-center gap-4 mt-auto">
            <div className="relative shrink-0">
              {isActive && <div className="absolute -inset-1.5 bg-accent-primary/20 rounded-full blur-md animate-pulse"></div>}
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white shadow-card-shadow bg-indigo-50 flex items-center justify-center">
                {t.imageUrl ? (
                  <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-accent-primary font-black text-xl">{t.name?.charAt(0)}</span>
                )}
              </div>
            </div>
            <div className="text-left overflow-hidden">
              <h4 className="font-black text-text-primary tracking-tight truncate flex items-center gap-1.5 text-base md:text-lg">
                {t.name}
                <div className="px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-1">
                   <CheckCircle2 size={10} className="text-blue-500 fill-blue-500/10" />
                   <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest hidden md:inline">Verified</span>
                </div>
              </h4>
              <p className="font-bold text-text-muted/70 tracking-widest uppercase truncate text-[10px] md:text-[11px]">
                {t.role} <span className="text-accent-primary/80">{t.company ? `@ ${t.company}` : ""}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section 
      id="testimonials" 
      className={`relative py-24 md:py-32 overflow-hidden border-y border-black/[0.03] bg-white ${className}`}
    >
      {/* --- PREMUIM BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[140px] opacity-40"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay hero-grain"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-12">
        <div className="relative inline-block mb-8 reveal">
            <div className="absolute -inset-3 bg-accent-primary/10 rounded-full blur-xl opacity-50"></div>
            <div className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-border-default shadow-premium">
               <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                  ))}
               </div>
               <span className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] whitespace-nowrap">
                  Trusted by Global Teams
               </span>
            </div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter leading-[1.05] reveal">
          Social proof from <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-purple-600">
             high-impact partners
          </span>
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center h-64 items-center">
            <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative mt-8 reveal reveal-delayed">
          {/* Main Slider Container */}
          <div 
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-hidden gap-0 md:gap-10 scrollbar-hide py-10"
          >
            {/* Peek Spacers to center the first and last slides */}
            <div className="flex-shrink-0 w-[15vw] md:w-[35vw]" />
            
            {dbTestimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}

            <div className="flex-shrink-0 w-[15vw] md:w-[35vw]" />
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-10 pointer-events-none z-20">
             <button 
                onClick={() => setActiveIndex((prev) => (prev - 1 + dbTestimonials.length) % dbTestimonials.length)}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-premium border border-black/5 flex items-center justify-center pointer-events-auto hover:bg-white hover:scale-110 transition-all active:scale-95 group"
                aria-label="Previous"
             >
                <ChevronLeft className="text-text-primary group-hover:text-accent-primary transition-colors" />
             </button>
             <button 
                onClick={() => setActiveIndex((prev) => (prev + 1) % dbTestimonials.length)}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-premium border border-black/5 flex items-center justify-center pointer-events-auto hover:bg-white hover:scale-110 transition-all active:scale-95 group"
                aria-label="Next"
             >
                <ChevronRight className="text-text-primary group-hover:text-accent-primary transition-colors" />
             </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-12">
             {dbTestimonials.map((_, i) => (
                <button
                   key={i}
                   onClick={() => setActiveIndex(i)}
                   className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? "w-10 bg-accent-primary" : "w-1.5 bg-black/10 hover:bg-black/20"}`}
                   aria-label={`Go to slide ${i+1}`}
                />
             ))}
          </div>
        </div>
      )}
    </Section>
  );
}
