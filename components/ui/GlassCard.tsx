"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconContainerClassName?: string;
  hover?: boolean;
}

export default function GlassCard({ 
  children, 
  className = "", 
  icon,
  iconContainerClassName = "",
  hover = true
}: GlassCardProps) {
  const baseStyles = "bg-white rounded-card border border-border-default shadow-card-shadow p-6 md:p-8";
  const hoverStyles = hover ? "group card-hover" : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {icon && (
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 card-icon-container bg-accent-primary-muted border border-accent-primary/10 ${iconContainerClassName}`}
        >
          <div className="icon-primary">
            {icon}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
