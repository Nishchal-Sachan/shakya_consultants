"use client";

import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { useBookingModal } from "@/context/BookingModalContext";
import { pricingCards } from "@/data/pricing";
import Image from "next/image";

const IconComponent = ({ icon }: { icon: string }) => {
  const iconMap: Record<string, string> = {
    people: "/assets/icon-people.svg",
    mobile: "/assets/icon-mobile.svg",
    slider: "/assets/icon-slider.svg",
  };

  const iconSrc = iconMap[icon];
  if (!iconSrc) return null;

  return (
    <Image src={iconSrc} alt={icon} width={32} height={32} className="w-8 h-8" />
  );
};

export default function Pricing({ className = "" }: { className?: string }) {
  const { openBooking } = useBookingModal();
  if (!pricingCards || !Array.isArray(pricingCards)) {
    return null;
  }

  return (
    <Section id="pricing" className={className}>
      {/* Section Heading */}
      <SectionHeading
        label="ENGAGEMENT MODELS"
        title="Flexible consulting structures"
        description="Professional enterprise engagements designed to align seamlessly with your engineering requirements."
        align="center"
        className="mb-12 md:mb-16"
      />

      {/* PART A — Pricing Cards Grid */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingCards.map((card) => (
            <GlassCard
              key={card.id}
              className="p-8 flex flex-col h-full bg-bg-card/30"
              icon={<IconComponent icon={card.icon} />}
            >
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 transition-colors duration-300 group-hover:text-accent-primary">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-base leading-relaxed">
                {card.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* PART B — Tailored Pricing CTA Banner */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-bg-card rounded-2xl p-8 md:p-12 border border-border-default shadow-card-shadow card-hover bg-gradient-to-br from-bg-card to-accent-primary/5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Left: Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center bg-accent-primary-muted border border-border-default shadow-input-shadow">
                <Image
                  src="/assets/icon-pricing.svg"
                  alt="Pricing"
                  width={64}
                  height={64}
                  className="w-12 h-12 md:w-16 md:h-16 icon-primary"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                <span className="text-accent-primary">Tailored solutions</span> for
                every stage
              </h2>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                Whether you&apos;re augmenting an existing team, initiating cloud migration, or building
                enterprise software from scratch – we offer engagement models tailored to your technical strategy.
              </p>

              {/* CTA Button — opens booking modal */}
              <div className="cta-glow">
                <Button
                  variant="primary"
                  size="lg"
                  className="relative"
                  onClick={openBooking}
                >
                  EXPLORE ENGAGEMENT MODELS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
