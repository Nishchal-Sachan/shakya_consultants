"use client";

import React, { useState } from "react";

interface BookingCardProps {
  children?: React.ReactNode;
  brandName?: string;
  className?: string;
  /** Layout mode: "inline" (hero) vs "modal" (full-screen). Only affects container sizing. */
  variant?: "inline" | "modal";
}

export default function BookingCard({
  children,
  brandName = "Shakya Consultants",
  className = "",
  variant = "inline",
}: BookingCardProps) {
  const [hovered, setHovered] = useState(false);

  // UNIVERSAL LAYOUT: Centered narrow card for high-focus guided experience
  const rootLayoutClass =
    variant === "modal"
      ? "w-full sm:max-w-[540px] h-full sm:h-auto sm:max-h-[90vh] flex flex-col min-w-0 shrink-0 mx-auto"
      : "w-full max-w-[540px] mx-auto";

  // Body height classes: Consistent height for the step flow
  const bodyHeightClass =
    variant === "modal"
      ? "flex-1 sm:min-h-[500px] sm:max-h-[calc(90vh-4rem)] sm:h-[640px] overflow-hidden"
      : "h-[640px]";

  return (
    <div
      className={`
        cursor-default overflow-hidden transition-all duration-500 relative calendar-card
        ${hovered ? "scale-[1.02] shadow-[0_30px_70px_rgba(0,0,0,0.3),0_0_50px_rgba(99,102,241,0.25)] border-white/20" : ""}
        ${rootLayoutClass} ${className}
      `}
      onMouseEnter={() => variant !== "modal" ? setHovered(true) : undefined}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Body: Universal step container */}
      <div
        className={`sm:m-4 sm:rounded-[24px] overflow-hidden flex flex-col cursor-pointer calendar-card-inner ${bodyHeightClass}`}
      >
        {children}
      </div>
    </div>
  );
}
