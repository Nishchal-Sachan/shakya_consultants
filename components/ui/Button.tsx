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
    "relative inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 rounded-2xl focus:outline-none disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.03] active:scale-[0.95]";

  const variants = {
    primary:
      "bg-gradient-to-r from-accent-primary via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-right text-white shadow-[0_8px_30px_-6px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_45px_-8px_rgba(99,102,241,0.5)] border border-white/10",
    secondary:
      "bg-white/5 backdrop-blur-md text-text-primary border border-border-default hover:bg-white/10 hover:border-text-primary/10 shadow-sm",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[10px] uppercase tracking-[0.2em]",
    md: "px-8 py-4 text-[11px] uppercase tracking-[0.2em]",
    lg: "px-10 py-5 text-xs uppercase tracking-[0.2em]",
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
