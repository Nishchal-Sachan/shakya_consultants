"use client";

import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { useBookingModal } from "@/context/BookingModalContext";
import React, { useState } from "react";
import Image from "next/image";

export default function Contact({ className = "" }: { className?: string }) {
  const { openBooking } = useBookingModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <Section id="contact" className={className}>
      <SectionHeading
        label="CONTACT US"
        title="Ready to get started?"
        description="Hundreds of SaaS founders trusted us – book a call or shoot over a quick query to explore why."
        align="center"
        className="mb-12 md:mb-16"
      />

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-border-default shadow-card-shadow card-hover overflow-hidden relative">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/[0.03] rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Column — Text CTA */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight uppercase">
                READY TO <span className="text-accent-primary">GET STARTED</span>?
              </h2>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-md">
                Whether you need a full product build or cloud engineering support, we are ready to scale with you.
              </p>
              <div className="cta-glow">
                <Button
                  variant="primary"
                  size="lg"
                  className="relative"
                  onClick={openBooking}
                >
                  SCHEDULE CONSULTATION
                </Button>
              </div>
            </div>

            {/* Right Column — Form Card */}
            <div>
              <div className="bg-gray-50/50 border border-border-default rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary text-center mb-8">
                  Send us a quick query
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Name *
                    </label>
                     <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-accent-primary shadow-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email *
                    </label>
                     <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-accent-primary shadow-sm"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Message
                    </label>
                     <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-accent-primary shadow-sm resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <div className="flex justify-center pt-2">
                     <button
                      type="submit"
                      className="w-14 h-14 rounded-full bg-accent-primary hover:bg-accent-primary-hover flex items-center justify-center transition-all duration-200 hover:-translate-y-1 focus:outline-none border border-slate-200"
                      aria-label="Submit"
                    >
                      <Image
                        src="/assets/icon-arrow-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6 invert"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
