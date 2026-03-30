"use client";

import Section from "@/components/ui/Section";
import { faqItems } from "@/data/faq";
import { useState } from "react";
import { Plus, Minus, ChevronDown, MessageCircle, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function FAQ({ className = "" }: { className?: string }) {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section 
      id="faq" 
      className={`relative py-16 md:py-24 overflow-hidden border-y border-black/[0.03] ${className}`}
      style={{
        background: `
          radial-gradient(circle at 10% 10%, rgba(99,102,241,0.04), transparent 40%),
          radial-gradient(circle at 90% 90%, rgba(139,92,246,0.04), transparent 40%),
          #F1F5F9
        `
      }}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hero-grain"></div>
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay hero-grain"></div>
      
      {/* Visual Depth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header Upgrade */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-border-default shadow-sm mb-4 animate-fade-in">
            <HelpCircle className="w-3.5 h-3.5 text-accent-primary mr-2" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent-primary">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-text-primary tracking-tighter leading-[1.05]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-indigo-500 to-purple-600">
              Everything
            </span> you need to <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-accent-primary">
              know
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-text-muted/80 leading-relaxed max-w-[600px] mx-auto font-medium">
             Clear answers to help you understand how we work, deliver, and scale your product.
          </p>
        </div>

        {/* --- SPLIT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: FAQ List (Accordion) */}
          <div className="lg:col-span-8 space-y-4">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`
                    group relative rounded-[2rem] overflow-hidden transition-all duration-500 ease-out 
                    bg-white/70 backdrop-blur-xl border border-black/[0.05] shadow-premium
                    hover:scale-[1.01] hover:border-accent-primary/20
                    ${isOpen ? 'bg-white/90 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]' : ''}
                  `}
                >
                  {/* Left Border Accent for Active State */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent-primary to-purple-600 transition-transform duration-500 origin-top ${isOpen ? 'scale-y-100' : 'scale-y-0'}`}></div>

                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-8 md:px-10 py-8 text-left flex items-center justify-between"
                  >
                    <span
                      className={`text-xl md:text-2xl font-black tracking-tight leading-snug transition-colors duration-300 pr-10 
                        ${isOpen ? "text-accent-primary" : "text-text-primary group-hover:text-accent-primary"}
                      `}
                    >
                      {item.question}
                    </span>
                    <div
                      className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500
                        ${isOpen ? 'bg-accent-primary text-white shadow-glow-primary rotate-180' : 'bg-accent-primary/10 text-accent-primary'}
                      `}
                    >
                      <ChevronDown size={28} strokeWidth={2.5} />
                    </div>
                  </button>

                  <div
                    className={`
                      overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
                      ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="px-8 md:px-10 pb-10">
                      <div className="w-12 h-0.5 bg-accent-primary/10 mb-6"></div>
                      <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Support Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
             <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0f172a] to-[#020617] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hero-grain"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/20 rounded-full blur-[80px]"></div>

                <div className="relative z-10 space-y-8">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner">
                      <MessageCircle className="w-8 h-8 text-accent-primary" />
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-3xl font-black tracking-tight">Still have <br />questions?</h3>
                      <p className="text-white/60 text-lg font-medium leading-relaxed">
                         Can&apos;t find the answer you&apos;re looking for? Reach out to our strategy team.
                      </p>
                   </div>

                   <Link
                    href="/#contact"
                    className="flex items-center justify-between gap-4 bg-accent-primary text-white py-5 px-8 rounded-2xl font-black text-xs tracking-[0.15em] uppercase shadow-glow-primary hover:shadow-glow-primary-soft hover:-translate-y-1 transition-all duration-300"
                  >
                    Ask a person
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
             </div>

             {/* Trust Element Below */}
             <div className="mt-12 text-center lg:text-left">
                <p className="text-sm font-black text-text-muted uppercase tracking-[0.2em] mb-6">
                   Trusted by 20+ teams globally
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                   <div className="px-4 py-2 rounded-xl bg-white border border-black/[0.03] shadow-sm">
                      <span className="text-xs font-bold text-text-secondary opacity-60">Linear-level Build</span>
                   </div>
                   <div className="px-4 py-2 rounded-xl bg-white border border-black/[0.03] shadow-sm">
                      <span className="text-xs font-bold text-text-secondary opacity-60">Enterprise Validated</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
