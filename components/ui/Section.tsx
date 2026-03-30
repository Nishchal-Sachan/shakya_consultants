import React from "react";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Section({ id, children, className = "", style }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`relative overflow-hidden bg-base ${className}`}
      style={style}
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}
