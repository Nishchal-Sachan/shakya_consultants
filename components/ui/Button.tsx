import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  withArrow?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  withArrow = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-base disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-accent-primary text-white hover:bg-accent-primary-hover shadow-glow-primary focus:ring-accent-primary",
    secondary:
      "bg-white text-text-primary border border-border-default hover:bg-gray-50 focus:ring-gray-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {withArrow && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/assets/icon-arrow-right.svg"
          alt=""
          width={16}
          height={16}
          className="ml-2 icon-primary"
        />
      )}
    </button>
  );
}
