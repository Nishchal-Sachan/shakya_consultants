import React from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export default function SectionHeading({
  label,
  title,
  description,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  const textColorClass = "text-text-primary";
  const descColorClass = "text-text-muted/80";

  return (
    <div className={`max-w-3xl reveal ${alignStyles[align]} ${className}`}>
      {label && (
        <div 
          className="inline-block px-4 py-2 rounded-full mb-6 bg-white border border-border-default text-accent-primary shadow-sm"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.25em]">
            {label}
          </span>
        </div>
      )}
      <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black ${textColorClass} mb-6 leading-[1.1] tracking-tighter`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg md:text-xl font-medium ${descColorClass} leading-relaxed max-w-[600px] ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
