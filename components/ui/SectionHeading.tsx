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
  const labelColorClass = "text-text-accent";
  const descColorClass = "text-text-secondary";

  return (
    <div className={`max-w-3xl ${alignStyles[align]} ${className}`}>
      {label && (
        <div 
          className="inline-block px-4 py-2 rounded-full mb-4 bg-accent-primary-muted border border-border-primary-hover text-accent-primary"
        >
          <span className="text-xs font-semibold uppercase tracking-wider">
            {label}
          </span>
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColorClass} mb-4 leading-tight`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base md:text-lg ${descColorClass} leading-relaxed max-w-[600px] ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
