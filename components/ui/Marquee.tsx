import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "medium" | "fast" | "verySlow";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: string;
}

export default function Marquee({
  children,
  className = "",
  speed = "medium",
  direction = "left",
  pauseOnHover = false,
  gap = "gap-12",
}: MarqueeProps) {
  const speedClasses = {
    verySlow: "animate-[scroll_80s_linear_infinite]",
    slow: "animate-[scroll_60s_linear_infinite]",
    medium: "animate-[scroll_40s_linear_infinite]",
    fast: "animate-[scroll_20s_linear_infinite]",
  };

  const directionClass = direction === "right" ? "animate-[scroll-reverse_40s_linear_infinite]" : speedClasses[speed];

  return (
    <div className={`overflow-hidden group ${className}`}>
      <div 
        className={`flex items-center w-fit ${direction === "right" ? "animate-marquee-reverse" : speedClasses[speed]} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""} ${gap}`}
        style={{
          animationDuration: speed === "verySlow" ? "120s" : speed === "slow" ? "80s" : speed === "medium" ? "60s" : "40s",
          animationDirection: direction === "right" ? "reverse" : "normal"
        }}
      >
        <div className={`flex items-center flex-shrink-0 ${gap}`}>
          {children}
        </div>
        <div className={`flex items-center flex-shrink-0 ${gap}`}>
          {children}
        </div>
        <div className={`flex items-center flex-shrink-0 ${gap}`}>
          {children}
        </div>
        <div className={`flex items-center flex-shrink-0 ${gap}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
