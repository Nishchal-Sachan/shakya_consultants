"use client";

import React, { useState } from "react";

interface BookingCardProps {
  children?: React.ReactNode;
  brandName?: string;
  className?: string;
  /** Layout mode: "inline" (hero) vs "modal" (full-screen). Only affects container sizing. */
  variant?: "inline" | "modal";
}

const GLOW_BASE =
  "0 2px 16px rgba(var(--accent-primary-rgb),0.1), 0 10px 32px rgba(0,0,0,0.05)";
const GLOW_HOVER =
  "0 4px 24px rgba(var(--accent-primary-rgb),0.2), 0 15px 48px rgba(0,0,0,0.1)";

export default function BookingCard({
  children,
  brandName = "Shakya Consultants",
  className = "",
  variant = "inline",
}: BookingCardProps) {
  const [hovered, setHovered] = useState(false);

  const rootLayoutClass =
    variant === "modal"
      ? "w-full max-w-[1000px] max-h-[90vh] flex flex-col min-w-0 overflow-x-hidden shrink-0"
      : "w-full";

  const bodyHeightClass =
    variant === "modal"
      ? "min-h-[400px] max-h-[calc(90vh-8rem)] h-[560px] overflow-y-auto"
      : "h-[560px]";

  return (
    <div
      className={`cursor-default overflow-hidden rounded-[18px] border-2 border-accent-primary transition-shadow duration-300 ${rootLayoutClass} ${className}`}
      style={{
        backgroundColor: "white",
        boxShadow: hovered ? GLOW_HOVER : GLOW_BASE,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header — blue background with white text for high contrast */}
      <div
        className="flex items-center justify-center px-4 min-h-[56px] h-14 shrink-0 bg-accent-primary text-white"
      >
        <p className="text-sm sm:text-base font-semibold text-center">
          Book Your Call With {brandName} Now!
        </p>
      </div>

      {/* Body: fixed height inline; modal uses max-height so it fits viewport */}
      <div
        className={`m-3 rounded-[14px] overflow-hidden flex flex-col cursor-pointer ${bodyHeightClass}`}
        style={{ backgroundColor: "#ffffff" }}
      >
        {children}
      </div>
    </div>
  );
}
