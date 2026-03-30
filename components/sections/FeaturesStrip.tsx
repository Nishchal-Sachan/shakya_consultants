"use client";

import { features } from "@/data/features";

export default function FeaturesStrip({ className = "" }: { className?: string }) {
  // Triple the content for absolute seamless feel on all screen widths
  const marqueeItems = [...features, ...features, ...features];

  return (
    <div className={`relative w-full overflow-hidden border-y border-black/[0.05] ${className}`}
      style={{
        background: "linear-gradient(90deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))"
      }}
    >
      {/* Visual Depth Glow */}
      <div className="absolute inset-0 blur-3xl opacity-5 pointer-events-none z-0 bg-accent-primary/20"></div>
      
      {/* Interaction Wrapper */}
      <div className="relative py-4 md:py-5 group">
        {/* Edge Fade Effects */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/20 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/20 to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Container */}
        <div className="overflow-hidden">
          <div className="flex flex-nowrap w-max gap-8 md:gap-14 animate-marquee pause-on-hover px-4">
            {marqueeItems.map((feature, index) => (
              <div
                key={`${feature.id}-${index}`}
                className="flex items-center gap-6 md:gap-10 whitespace-nowrap"
              >
                {/* Feature Text */}
                <span className="text-sm md:text-base font-medium tracking-[0.05em] text-text-primary capitalize">
                  {feature.text}
                </span>

                {/* Dot Separator with Glow */}
                <div className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/60 shadow-[0_0_10px_rgba(99,102,241,0.6)]"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
