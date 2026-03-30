import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  const baseStyles = "relative overflow-hidden bg-white rounded-[1.5rem] border border-border-default shadow-card-shadow";
  const hoverStyles = hover ? "hover:shadow-premium hover:-translate-y-1 transition-all duration-300" : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
