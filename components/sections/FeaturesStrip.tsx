"use client";

import { features } from "@/data/features";
import Marquee from "@/components/ui/Marquee";

export default function FeaturesStrip() {
  return (
    <div className="py-6 text-text-primary border-y border-border-default bg-accent-primary/5">
      <Marquee speed="slow">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center gap-3 flex-shrink-0 whitespace-nowrap group"
          >
            {/* Bullet */}
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform"></span>
            {/* Text */}
            <span className="text-sm md:text-base font-medium tracking-wide">
              {feature.text}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
