"use client";

import BookingCalendarWidget from "@/components/ui/BookingCalendarWidget";
import BookingCard from "@/components/ui/BookingCard";
import Button from "@/components/ui/Button";
import { useBookingModal } from "@/context/BookingModalContext";
import React from "react";
import Image from "next/image";

export default function Hero() {
  const { openBooking } = useBookingModal();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 select-none pointer-events-none"
        >
          <source
            src="https://cdn.prod.website-files.com/67891e6f0e36bb3d6b889a35%2F67ee4d8cddfdf869c212628c_roro-video-hero-001-vt-transcode.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/40 via-bg-base/60 to-bg-base"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.06),transparent_50%)]"></div>
        {/* Grain/Noise Overlay */}
        <div className="hero-grain"></div>
      </div>

      {/* Content: 2-column on desktop, stacked on mobile */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-20 items-center">
          {/* Left: hero text */}
          <div className="max-w-3xl text-center lg:text-left">
            {/* Badge / Pill */}
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 bg-accent-primary-muted border border-accent-primary/20 text-accent-primary shadow-sm">
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                SOFTWARE ENGINEERING CONSULTANCY
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-text-primary mb-8 font-bold leading-[1.1] tracking-tight">
              We engineer{" "}
              <span className="text-accent-primary">scalable software</span>
              <br />
              that transforms <span className="text-accent-primary">enterprises</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              Leveraging intelligent architectures to deliver robust cloud-native systems for modern digital economies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              {/* Primary Button — opens booking modal */}
              <div className="cta-glow">
                <Button
                  onClick={openBooking}
                  size="lg"
                  className="w-full sm:w-auto min-w-[220px]"
                >
                  Schedule Consultation
                </Button>
              </div>
              {/* Secondary Button */}
              <a
                href="#capabilities"
                onClick={(e) => handleSmoothScroll(e, "#capabilities")}
                className="group inline-flex items-center justify-center font-bold transition-all duration-300 rounded-button px-8 py-4 text-base text-text-primary border border-border-default bg-white hover:border-accent-primary hover:text-accent-primary shadow-sm"
              >
                Our services
                <Image 
                  src="/assets/icon-arrow-right.svg" 
                  alt="" 
                  width={20} 
                  height={20} 
                  className="ml-2 w-5 h-5 icon-primary group-hover:translate-x-1 transition-transform" 
                />
              </a>
            </div>
          </div>

          {/* Right: booking widget */}
          <div className="relative w-full flex items-center justify-center lg:justify-end py-8 order-2 lg:order-none">
            <div className="absolute inset-0 bg-accent-primary/5 rounded-full blur-[120px] -z-10"></div>
            <div
              className="w-full max-w-md mx-auto lg:mr-0 animate-in fade-in slide-in-from-bottom-8 duration-1000"
              aria-label="Booking widget"
            >
              <BookingCard>
                <BookingCalendarWidget />
              </BookingCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
