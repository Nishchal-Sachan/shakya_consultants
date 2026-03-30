"use client";

import Section from "@/components/ui/Section";
import { capabilities } from "@/data/capabilities";
import {
  Code2,
  Smartphone,
  BarChart3,
  Users,
  Zap,
  Settings2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  BarChart3,
  Users,
  Zap,
  Settings2,
  TrendingUp,
};

export default function Capabilities({ className = "" }: { className?: string }) {
  return (
    <Section 
      id="capabilities" 
      className={`relative py-16 md:py-24 overflow-hidden border-y border-white/[0.05] bg-navy text-white ${className}`}
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(99,102,241,0.12), transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(139,92,246,0.12), transparent 40%),
          #0B0F1A
        `
      }}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hero-grain"></div>
      
      {/* Visual Depth Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header Upgrade */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20 space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white">
              Our Capabilities
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.05]">
            Everything you need to <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-indigo-400 to-purple-400">
               build, scale, and dominate
            </span><br className="hidden md:block" />
            your market
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-[600px] mx-auto font-medium">
            We combine engineering, automation, and growth systems to help businesses 
            move faster, operate smarter, and scale efficiently.
          </p>
        </div>

        {/* Capabilities Grid - Glassmorphism UI Dark */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((service) => {
            const Icon = iconMap[service.iconName] ?? Code2;

            return (
              <div
                key={service.id}
                className="
                  group relative reveal flex flex-col items-start gap-8 p-8 md:p-10 rounded-[2.5rem]
                  bg-white/[0.03] backdrop-blur-[14px] border border-white/10 focus-within:border-accent-primary/50 
                  shadow-2xl transition-all duration-500 ease-out h-full
                  hover:-translate-y-3 hover:bg-white/[0.06] hover:border-white/20
                "
              >
                {/* Icon Design Upgrade */}
                <div className="relative inline-flex items-center justify-center">
                   {/* Icon Glow */}
                  <div className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full bg-accent-primary"></div>
                  
                  <div className="
                    relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500
                    bg-gradient-to-br from-accent-primary to-purple-600
                  ">
                    <Icon size={28} strokeWidth={2} className="text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black leading-tight tracking-tight text-white group-hover:text-accent-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                </div>

                {/* Subtle Visual Accent */}
                <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-accent-primary/40 group-hover:scale-150 group-hover:bg-accent-primary transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
