"use client";

import Section from "@/components/ui/Section";
import { useBookingModal } from "@/context/BookingModalContext";
import { Check, Zap, Building2, Rocket } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "starter",
    icon: Zap,
    name: "Starter",
    tagline: "Execution-focused support",
    price: "Custom",
    priceNote: "Tailored to your scope",
    highlighted: false,
    cta: "Consult Strategy",
    features: [
      "1 dedicated resource",
      "Web or mobile project",
      "Monthly progress reports",
      "Priority email support",
      "Basic CI/CD setup",
      "30-day onboarding",
    ],
  },
  {
    id: "growth",
    icon: Rocket,
    name: "Growth",
    tagline: "High-velocity scaling",
    price: "Custom",
    priceNote: "Flexible monthly engagement",
    highlighted: true,
    cta: "Scale with Us",
    features: [
      "3–5 dedicated specialists",
      "Full-stack engineering studio",
      "Bi-weekly strategy sessions",
      "SLA-backed support (24 h)",
      "Advanced cloud architecture",
      "Performance optimization",
      "Talent pipeline access",
      "Quarterly ROI reviews",
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    name: "Enterprise",
    tagline: "Full product partnership",
    price: "Custom",
    priceNote: "Dedicated account director",
    highlighted: false,
    cta: "Partner for Growth",
    features: [
      "Full-scale engineering team",
      "Unlimited product scope",
      "Weekly executive advisory",
      "Real-time slack channel",
      "Infrastructure & DevOps",
      "Custom AI integrations",
      "HR & hiring operations",
      "On-site presence available",
    ],
  },
];

export default function Pricing({ className = "" }: { className?: string }) {
  const { openBooking } = useBookingModal();

  return (
    <Section
      id="pricing"
      className={`relative py-16 md:py-24 overflow-hidden border-t border-black/[0.03] ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 10%, rgba(99,102,241,0.06), transparent 40%),
          radial-gradient(circle at 80% 90%, rgba(139,92,246,0.06), transparent 45%),
          linear-gradient(180deg, #F8FAFC, #FFFFFF)
        `
      }}
    >
      {/* Subtle Noise Texture */}
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay hero-grain"></div>
      
      {/* Premium Visual Orb behind center card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header Upgrade */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-6">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-border-default shadow-sm mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent-primary">
              Pricing & Scalability
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-text-primary tracking-tighter leading-[1.05]">
            Simple <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-indigo-500 to-purple-600">pricing</span>. <br className="hidden md:block" />
            Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-accent-primary">outcomes</span>.
          </h2>
          
          <p className="text-lg md:text-xl text-text-muted/80 leading-relaxed max-w-[600px] mx-auto font-medium">
            Choose a plan that aligns with your growth stage — from focused execution 
            to full-scale product partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`
                  relative flex flex-col rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 group
                  ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-[#0f172a] to-[#020617] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] scale-[1.05] z-10 border border-white/5"
                      : "bg-white/70 backdrop-blur-xl border border-white shadow-premium hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
                  }
                `}
              >
                {/* Glowing Border for center card */}
                {plan.highlighted && (
                  <div className="absolute inset-0 rounded-[2.5rem] border border-accent-primary/30 opacity-50 pointer-events-none"></div>
                )}

                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-glow-primary animate-float">
                    ✦ Highly Recommended
                  </div>
                )}

                {/* Icon Design */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 ${
                    plan.highlighted
                      ? "bg-white/5 shadow-inner"
                      : "bg-gradient-to-br from-bg-base to-white shadow-sm"
                  }`}
                >
                  <Icon
                    size={28}
                    strokeWidth={2}
                    className="text-accent-primary"
                  />
                </div>

                {/* Name & Tagline */}
                <div className="mb-10">
                  <h3 className={`text-3xl font-black mb-3 tracking-tight ${plan.highlighted ? "text-white" : "text-text-primary"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-base font-medium ${plan.highlighted ? "text-white/50" : "text-text-muted"}`}>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-12">
                  <span className={`text-6xl font-black tracking-tighter ${plan.highlighted ? "text-white" : "text-text-primary"}`}>
                    {plan.price}
                  </span>
                  <p className={`text-[11px] mt-4 font-black tracking-[0.2em] uppercase ${plan.highlighted ? "text-accent-primary" : "text-text-muted"}`}>
                    {plan.priceNote}
                  </p>
                </div>

                {/* Feature List */}
                <ul className="flex flex-col gap-6 flex-1 mb-12">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-5 group/item">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 ${
                          plan.highlighted ? "bg-accent-primary shadow-glow-primary-soft" : "bg-accent-primary/10"
                        }`}
                      >
                        <Check
                          size={12}
                          strokeWidth={4}
                          className={plan.highlighted ? "text-white" : "text-accent-primary"}
                        />
                      </span>
                      <span className={`text-base font-medium transition-colors ${plan.highlighted ? "text-white/80 group-hover/item:text-white" : "text-text-secondary group-hover/item:text-text-primary"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Premium CTA Button */}
                <button
                  type="button"
                  onClick={openBooking}
                  className={`
                    w-full py-6 rounded-2xl font-black text-xs md:text-sm tracking-[0.15em] uppercase transition-all duration-[600ms]
                    ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-glow-primary hover:shadow-glow-primary-soft hover:-translate-y-1"
                        : "bg-text-primary text-white hover:bg-black hover:shadow-2xl hover:-translate-y-1"
                    }
                  `}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
