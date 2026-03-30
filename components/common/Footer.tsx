"use client";

import { useBookingModal } from "@/context/BookingModalContext";
import React from "react";
import Link from "next/link";
import * as Lucide from "lucide-react";

export default function Footer() {
  const { openBooking } = useBookingModal();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') return;

    if (href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
  };

  // We use stable icons that are guaranteed to exist in this version
  const socialLinks = [
    { Icon: Lucide.Globe, href: "https://www.linkedin.com/company/gdfinternationals/", label: "LinkedIn" },
    { Icon: Lucide.CircleUser, href: "#", label: "Instagram" },
    { Icon: Lucide.X || Lucide.Circle, href: "#", label: "Social" },
    { Icon: Lucide.MessageCircle, href: "#", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-[#0b0f1a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link 
              href="/" 
              className="inline-block mb-6 group"
              aria-label="Shakya Consultants Home"
            >
              <div className="text-2xl font-bold tracking-tighter text-white">
                <span className="text-accent-primary group-hover:text-white transition-colors duration-300">Shakya</span> Consultants
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8 font-medium">
              Empowering technology companies with full-stack innovation and premium digital product engineering.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => {
                const Icon = (social.Icon || Lucide.Circle) as any;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-accent-primary hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200 mb-6 font-bold">Services</h4>
            <ul className="space-y-4">
              {['Work', 'Capabilities', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    onClick={(e) => handleSmoothScroll(e as any, `/#${item.toLowerCase()}`)}
                    className="text-slate-400 hover:text-accent-primary text-sm transition-colors duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-accent-primary text-sm transition-colors duration-200">
                  Project Archive
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200 mb-6 font-bold">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#about"
                  onClick={(e) => handleSmoothScroll(e as any, "/#about")}
                  className="text-slate-400 hover:text-accent-primary text-sm transition-colors duration-200"
                >
                  About Our Vision
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openBooking}
                  className="text-slate-400 hover:text-accent-primary text-sm transition-colors duration-200 text-left bg-transparent p-0 border-0"
                  aria-label="Contact Support"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-200 hover:text-accent-primary text-xs font-bold uppercase tracking-tighter opacity-50 hover:opacity-100 transition-all">
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200 mb-6 font-bold">HQ Address</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lucide.MapPin className="w-5 h-5 text-accent-primary shrink-0" />
                <p className="text-slate-400 text-sm leading-6">
                  1st Floor HIG-1, Vivekanand Vihar<br/>
                  Keshav Nagar, Juhi Kalan<br/>
                  Kanpur Nagar, UP 208027
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Lucide.Mail className="w-5 h-5 text-accent-primary shrink-0" />
                <a href="mailto:contact@gdfinternationals.com" className="text-slate-400 hover:text-white text-sm transition-colors">
                  contact@gdfinternationals.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Shakya Consultants. Crafted for excellence.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
