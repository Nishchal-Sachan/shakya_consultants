"use client";

import { useBookingModal } from "@/context/BookingModalContext";
import * as Lucide from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const { openBooking } = useBookingModal();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      if (href.startsWith("/#")) {
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  // Using safe property access to prevent runtime undefined component errors
  const socialLinks = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#0288D1"
            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
          ></path>
          <path
            fill="#FFF"
            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
          ></path>
        </svg>
      ),
      href: "https://www.linkedin.com/company/gdfinternationals/",
      label: "LinkedIn",
    },
    // { Icon: Lucide.Instagram || Lucide.CircleUser, href: "#", label: "Instagram" },
    // { Icon: Lucide.X || Lucide.Twitter || Lucide.Send, href: "#", label: "Twitter" },
    // { Icon: Lucide.MessageCircle || Lucide.Phone, href: "#", label: "WhatsApp" },
  ];

  return (
    <footer className="relative bg-[#0B0F1A] text-white pt-16 pb-10 overflow-hidden">
      {/* --- PREMIUM BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#0B0F1A] to-[#010409]"></div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-primary/10 rounded-full blur-[160px] opacity-60"></div>
        <div className="absolute -bottom-48 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] opacity-40"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay hero-grain"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* LEFT: Branding & Socials */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-6 mb-12 group"
              >
                <div className="flex items-center h-16 w-auto shrink-0">
                  <Image
                    src="/assets/logo.png"
                    alt="Shakya Consultants"
                    width={64}
                    height={64}
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                  Shakya{" "}
                  <span className="text-accent-primary">Consultants</span>
                </div>
              </Link>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
                Engineering high-impact digital solutions with surgical
                precision and elite-level velocity.
              </p>
            </div>

            <div className="flex items-center gap-5">
              {/* {socialLinks.map((social, i) => {
                const Icon = (social.Icon || Lucide.Circle) as any;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="
                      relative w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 
                      text-slate-400 hover:text-white transition-all duration-500 group
                      hover:bg-accent-primary/20 hover:border-accent-primary/30 hover:-translate-y-1 hover:shadow-glow-primary-soft
                    "
                    aria-label={social.label}
                  >
                    <Icon
                      size={20}
                      strokeWidth={2.5}
                      className="relative z-10"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-accent-primary opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
                  </a>
                );
              })} */}
              <a
                href="https://www.linkedin.com/company/gdfinternationals/"
                className="
                      relative w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 
                      text-slate-400 hover:text-white transition-all duration-500 group
                      hover:bg-accent-primary/20 hover:border-accent-primary/30 hover:-translate-y-1 hover:shadow-glow-primary-soft
                    "
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#0288D1"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                  ></path>
                </svg>
                <div className="absolute inset-0 rounded-2xl bg-accent-primary opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
              </a>
            </div>
          </div>

          {/* CENTER: Services & Company */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white/50 mb-6">
                Services
              </h4>
              <nav className="flex flex-col gap-4">
                {[
                  { name: "Engineering Speed", href: "/#speed" },
                  { name: "Core Capabilities", href: "/#capabilities" },
                  { name: "Platform Work", href: "/#work" },
                  { name: "Project Archive", href: "/projects" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e as any, item.href)}
                    className="
                      text-slate-400 hover:text-white font-bold text-sm tracking-tight transition-all duration-300 relative group w-fit
                    "
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white/50 mb-6">
                Company
              </h4>
              <nav className="flex flex-col gap-4">
                {[
                  { name: "The Vision", href: "/#about" },
                  { name: "Our Approach", href: "/approach" },
                  { name: "Client Success", href: "/#testimonials" },
                  { name: "Global HQ", href: "/#faq" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e as any, item.href)}
                    className="
                      text-slate-400 hover:text-white font-bold text-sm tracking-tight transition-all duration-300 relative group w-fit
                    "
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* RIGHT: Contact Block */}
          <div className="lg:col-span-12 xl:col-span-3 space-y-8 lg:pl-10">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white/50 mb-6">
                Get In Touch
              </h4>

              <div className="space-y-6">
                <a
                  href="mailto:contact@shakyaconsultants.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all">
                    <Lucide.Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Email Us
                    </p>
                    <p className="text-slate-200 font-bold text-sm truncate">
                      contact@shakyaconsultants.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent-primary mt-1">
                    <Lucide.MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Main Office
                    </p>
                    <p className="text-slate-200 font-bold text-sm leading-relaxed">
                      First-floor, Plot no 64 Rajendra Nagar, Naubasta
                      <br />
                      Kanpur Nagar UP, 209021
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={openBooking}
                    className="flex items-center justify-between w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black py-4 px-6 rounded-2xl transition-all duration-500 group"
                  >
                    <span className="text-xs font-black uppercase tracking-widest">
                      Schedule Strategy
                    </span>
                    <Lucide.ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Lucide.ShieldCheck className="w-5 h-5 text-accent-primary" />
            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()}{" "}
              <span className="text-slate-300 font-bold">
                Shakya Consultants
              </span>{" "}
              — Engineered with Precision.
            </p>
          </div>

          <div className="flex gap-10 items-center">
            <Link
              href="/privacy"
              className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors relative group"
            >
              Privacy
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/terms"
              className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors relative group"
            >
              Terms
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="hidden lg:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                System Status: Optimal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
