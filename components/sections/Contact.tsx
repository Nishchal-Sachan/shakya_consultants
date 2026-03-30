"use client";

import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { useBookingModal } from "@/context/BookingModalContext";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";

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
    <Section 
      id="contact" 
      className={`pb-16 bg-navy text-white ${className}`}
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(99,102,241,0.12), transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(139,92,246,0.12), transparent 40%),
          #0B0F1A
        `
      }}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hero-grain"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-accent-primary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[30%] h-[60%] bg-purple-500/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            {/* Left Column — Text CTA */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-white/5 border border-white/10 text-white backdrop-blur-sm shadow-sm">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                  PARTNER WITH US
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-white mb-6 leading-[1.05] tracking-tighter">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-indigo-400 to-purple-400">scale?</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-white/50 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 font-medium tracking-tight">
                Whether you&apos;re building a new product or optimizing an enterprise ecosystem, we&apos;re here to help you engineer success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="relative !rounded-2xl px-10 py-5 font-extrabold text-sm tracking-widest shadow-xl"
                    onClick={openBooking}
                  >
                    BOOK A CALL
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column — Form Card */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-premium relative group">
                <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] pointer-events-none"></div>
                
                <h3 className="text-2xl font-extrabold text-white mb-10 text-center lg:text-left">
                  Send us a quick message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-extrabold text-white/50 tracking-widest uppercase ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-accent-primary focus:border-accent-primary transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-extrabold text-white/50 tracking-widest uppercase ml-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-accent-primary focus:border-accent-primary transition-all duration-300"
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-xs font-extrabold text-white/50 tracking-widest uppercase ml-1">
                      Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-accent-primary focus:border-accent-primary transition-all duration-300 resize-none"
                      placeholder="Tell us what you're working on..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-16 rounded-2xl bg-white text-text-primary hover:bg-accent-primary hover:text-white flex items-center justify-center font-extrabold tracking-widest uppercase transition-all duration-500 group/btn shadow-xl active:scale-95"
                    >
                      SEND INQUIRY
                      <Send className="ml-3 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
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
