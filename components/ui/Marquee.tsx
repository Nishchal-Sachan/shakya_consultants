import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "medium" | "fast";
  itemClassName?: string;
}

export default function Marquee({
  children,
  className = "",
  speed = "medium",
  itemClassName = "",
}: MarqueeProps) {
  const speedClasses = {
    slow: "animate-[scroll_60s_linear_infinite]",
    medium: "animate-[scroll_40s_linear_infinite]",
    fast: "animate-[scroll_20s_linear_infinite]",
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex items-center gap-8 md:gap-12 w-fit ${speedClasses[speed]}`}>
        <div className={`flex items-center gap-8 md:gap-12 flex-shrink-0 ${itemClassName}`}>
          {children}
        </div>
        <div className={`flex items-center gap-8 md:gap-12 flex-shrink-0 ${itemClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
