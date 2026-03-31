"use client";

import React, { useState, useEffect, useRef } from "react";
import Section from "@/components/ui/Section";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, PlusCircle, X } from "lucide-react";
import AddTestimonialForm from "@/components/ui/AddTestimonialForm";
import Button from "@/components/ui/Button";
import { createPortal } from "react-dom";

export default function Testimonials({ className = "" }: { className?: string }) {
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // When form is open, disable body scroll
  useEffect(() => {
    if (isFormOpen) {
       document.body.style.overflow = "hidden";
    } else {
       document.body.style.overflow = "";
    }
  }, [isFormOpen]);

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

  // Centering logic using scrollIntoView for active slide
  useEffect(() => {
    if (scrollRef.current) {
      const activeCard = scrollRef.current.querySelector(`#testimonial-card-${activeIndex}`);
      if (activeCard) {
        activeCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [activeIndex, dbTestimonials.length]);

  const TestimonialCard = ({ t, index }: { t: any; index: number }) => {
    const isActive = activeIndex === index;

    return (
      <div 
        id={`testimonial-card-${index}`}
        className={`
          flex-shrink-0 w-full transition-all duration-1000 ease-in-out px-4 py-12 snap-center flex justify-center
          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 absolute inset-0 pointer-events-none"}
        `}
      >
        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Editorial Background Quote Mark */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 text-slate-100/30 select-none pointer-events-none -z-10 transition-transform duration-1000 group-hover:scale-110">
             <Quote size={192} strokeWidth={0.5} className="opacity-10" />
          </div>

          {/* 1. HERO QUOTE (Compact Architectural Width) */}
          <div className="flex-grow max-w-[600px] mb-6 relative group cursor-default">
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold leading-[1.3] text-slate-800 tracking-tight transition-all duration-700">
               &ldquo;{t.message}&rdquo;
            </blockquote>
          </div>

          {/* 2. IDENTITY BLOCK (Signature Integration) */}
          <div className="flex flex-col items-center group/author">
            {/* Avatar with Signature Glow */}
            <div className="relative mb-4">
               <div className="absolute -inset-4 bg-accent-primary/[0.08] rounded-full blur-2xl group-hover/author:bg-accent-primary/[0.12] transition-all duration-700"></div>
               <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white ring-8 ring-slate-50/50 shadow-xl bg-white flex items-center justify-center transition-all duration-700 group-hover/author:scale-110 group-hover/author:ring-accent-primary/5">
                {t.imageUrl ? (
                  <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-accent-primary font-bold text-xl">{t.name?.charAt(0)}</span>
                )}
              </div>
            </div>

            {/* Author Meta (Brand Signature Line) */}
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-slate-900 tracking-tight text-base md:text-lg mb-1 transition-colors group-hover/author:text-accent-primary">{t.name}</h4>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold flex items-center justify-center gap-2">
                  <span>{t.role}</span>
                  <span className="text-slate-200 text-lg leading-none">•</span>
                  <span className="text-slate-900/70">{t.company || "Independent"}</span>
              </p>
            </div>
          </div>

          {/* 3. VIBRANT PROOF DETAIL */}
          <div className="mt-6 flex justify-center relative z-10 transition-all duration-700">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 hover:scale-125">
                  <path 
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" 
                    fill={i < (t.rating || 5) ? "#FACC15" : "#E2E8F0"}
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section 
      id="testimonials" 
      className={`relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white ${className}`}
    >
      {/* --- PREMUIM BACKGROUND DEPTH --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-primary/[0.02] rounded-full blur-[140px] opacity-100"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay hero-grain"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center transition-all duration-700">
        <div className="relative inline-block mb-10 reveal">
            <div className="absolute -inset-4 bg-accent-primary/5 rounded-full blur-2xl opacity-40"></div>
            <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-sm transition-all duration-500 hover:border-slate-200">
               <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                  ))}
               </div>
               <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.3em] whitespace-nowrap">
                  Trusted by Global High-Impact Partners
               </span>
            </div>
        </div>

        {/* --- MAIN HERO SLIDER --- */}
        <div className="relative min-h-[380px] md:min-h-[440px]">
           {!loading && dbTestimonials.length > 0 && (
             <div className="relative">
                {dbTestimonials.map((t, i) => (
                  <TestimonialCard key={`${i}-${activeIndex}`} t={t} index={i} />
                ))}

                {/* COMPACT NAVIGATION (Glassmorphic Controls) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-0 pointer-events-none z-20">
                   <button 
                      onClick={() => setActiveIndex((prev) => (prev - 1 + dbTestimonials.length) % dbTestimonials.length)}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-100 bg-white/40 backdrop-blur-md shadow-sm flex items-center justify-center pointer-events-auto hover:bg-white hover:scale-110 hover:shadow-xl hover:shadow-accent-primary/5 transition-all group active:scale-95"
                      aria-label="Previous"
                   >
                      <ChevronLeft strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-slate-300 group-hover:text-slate-900 transition-colors" />
                   </button>
                   <button 
                      onClick={() => setActiveIndex((prev) => (prev + 1) % dbTestimonials.length)}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-100 bg-white/40 backdrop-blur-md shadow-sm flex items-center justify-center pointer-events-auto hover:bg-white hover:scale-110 hover:shadow-xl hover:shadow-accent-primary/5 transition-all group active:scale-95"
                      aria-label="Next"
                   >
                      <ChevronRight strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-slate-300 group-hover:text-slate-900 transition-colors" />
                   </button>
                </div>
             </div>
           )}

           {loading && (
             <div className="flex justify-center h-64 items-center">
                <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin"></div>
             </div>
           )}

           {!loading && dbTestimonials.length === 0 && (
             <div className="text-center py-16 animate-fade-in">
                <p className="text-slate-300 font-bold italic text-2xl opacity-50">Be the first to share your experience!</p>
             </div>
           )}
        </div>

        {/* PROGRESS + CTA ACTION ZONE (Connected Flow) */}
        <div className="mt-8 md:mt-12 flex flex-col items-center gap-10">
           {/* Sophisticated Progress Dots */}
           {!loading && dbTestimonials.length > 1 && (
              <div className="flex justify-center gap-3">
                 {dbTestimonials.map((_, i) => (
                    <button
                       key={i}
                       onClick={() => setActiveIndex(i)}
                       className={`h-1 transition-all duration-700 rounded-full ${activeIndex === i ? "w-12 bg-accent-primary" : "w-5 bg-slate-200 hover:bg-slate-300"}`}
                       aria-label={`Go to slide ${i+1}`}
                    />
                 ))}
              </div>
           )}

           {/* Global Action (Cinematic CTA) */}
           <div className="reveal reveal-delayed">
              <Button 
                  size="md" 
                  onClick={() => setIsFormOpen(true)}
                  className="px-10 py-3.5 rounded-full flex items-center gap-4 active:scale-95 transition-all shadow-xl shadow-slate-900/10 bg-slate-900 hover:bg-black text-white hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-primary/10"
              >
                  <PlusCircle size={20} strokeWidth={1.5} />
                  <span className="font-black uppercase tracking-[0.25em] text-[10px]">Share Your Experience</span>
              </Button>
           </div>
        </div>
      </div>

      {/* FORM MODAL - RENDERED VIA PORTAL */}
      {isMounted && isFormOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-md transition-all duration-500 animate-fade-in"
             onClick={() => setIsFormOpen(false)}
           />
           {/* Modal Container */}
           <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up z-10 border border-slate-100">
              <AddTestimonialForm 
                 onCancel={() => setIsFormOpen(false)} 
                 onSuccess={() => setIsFormOpen(false)}
              />
           </div>
        </div>,
        document.body
      )}
    </Section>
  );
}
