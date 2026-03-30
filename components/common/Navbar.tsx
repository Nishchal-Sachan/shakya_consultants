"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useBookingModal } from "@/context/BookingModalContext";

const MENU_ANIMATION_MS = 250;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const { openBooking, openApplyModal } = useBookingModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [panelEntered, setPanelEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sticky navbar: always visible; only update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection ? `#${currentSection}` : "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = useCallback(() => {
    if (!isMobileMenuOpen && !isMenuClosing) return;
    if (isMenuClosing) return;
    setIsMenuClosing(true);
    window.setTimeout(() => {
      menuToggleRef.current?.focus({ preventScroll: true });
      setIsMobileMenuOpen(false);
      setIsMenuClosing(false);
      setPanelEntered(false);
    }, MENU_ANIMATION_MS);
  }, [isMobileMenuOpen, isMenuClosing]);

  // Lock body scroll when mobile menu is open; restore when closed
  useEffect(() => {
    if (isMobileMenuOpen || isMenuClosing) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobileMenuOpen, isMenuClosing]);

  // Enter animation: after mount, trigger slide-in
  useEffect(() => {
    if (isMobileMenuOpen && !isMenuClosing) {
      setPanelEntered(false);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelEntered(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    if (!isMobileMenuOpen) setPanelEntered(false);
  }, [isMobileMenuOpen, isMenuClosing]);

  // Focus close button when menu opens; trap focus and handle Escape
  useEffect(() => {
    if (!isMobileMenuOpen || isMenuClosing) return;
    closeButtonRef.current?.focus({ preventScroll: true });
    const el = menuRef.current;
    if (!el) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobileMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (node) => node.offsetParent !== null
      );
      if (focusable.length === 0) return;
      const i = focusable.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? focusable.length - 1 : i - 1) : (i === -1 || i >= focusable.length - 1 ? 0 : i + 1);
      e.preventDefault();
      focusable[next]?.focus();
    };
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isMenuClosing, closeMobileMenu]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[9998] transition-all duration-300"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 1px 10px rgba(0,0,0,0.02)",
          height: "72px"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleSmoothScroll(e, "#hero")}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-white rounded-md text-lg text-text-primary space-x-2"
            >
              <div className="text-xl font-bold tracking-tighter shrink-0 flex items-center h-14 w-auto">
                <span className="text-accent-primary mr-1">Shakya</span> <span className="text-text-primary">Consultants</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href || (activeSection === "" && item.href === "#work");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-base rounded-md px-2 py-1 relative group text-sm"
                    style={{
                      color: isActive ? "var(--accent-primary)" : "rgba(15, 23, 42, 0.8)"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "var(--accent-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "rgba(15, 23, 42, 0.8)";
                      }
                    }}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-accent-primary transition-all duration-200 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  </a>
                );
              })}
            </div>

            {/* CTA Button — opens Join Our Team modal */}
            <div className="hidden md:block">
              <button
                type="button"
                onClick={() => {
                  openApplyModal();
                  closeMobileMenu();
                }}
                className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary focus:ring-offset-white px-5 py-2.5 text-sm text-white shadow-glow-primary hover:shadow-glow-primary-soft"
                style={{
                  backgroundColor: "var(--accent-primary)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-primary-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                }}
              >
                Join Our Team
              </button>
            </div>

            {/* Mobile Menu Button — ensure always clickable above page content */}
            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => {
                if (isMobileMenuOpen) closeMobileMenu();
                else setIsMobileMenuOpen(true);
              }}
              className="md:hidden p-2 relative z-10 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer touch-manipulation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center pointer-events-none"
                style={{
                  backgroundColor: "rgba(var(--accent-primary-rgb),0.15)"
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isMobileMenuOpen ? "/assets/icon-close.svg" : "/assets/icon-menu.svg"}
                  alt=""
                  width={24}
                  height={24}
                  className="icon-primary"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile: full-screen overlay — flex column, only links section scrolls */}
      {(isMobileMenuOpen || isMenuClosing) && (
        <div
          ref={menuRef}
          className="md:hidden fixed top-0 left-0 w-[100vw] h-[100vh] z-[9999] flex flex-col overflow-hidden transition-transform duration-[250ms] ease-out isolate"
          style={{
            transform: panelEntered && !isMenuClosing ? "translateX(0)" : "translateX(100%)",
            backgroundColor: "#F9FAFB",
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.05), transparent 60%)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          {/* Decorative layers — no layout impact */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(1200px circle at 30% 20%, rgba(128,0,255,0.15), transparent 55%)",
              zIndex: 0,
            }}
          />
          <div className="mobile-menu-grain absolute inset-0 pointer-events-none" aria-hidden="true" />

          {/* 3-section layout: header → Join Our Team → links (only links scroll) */}
          <div className="mobile-menu flex flex-col flex-1 min-h-0 relative z-10">
            <div className="menu-header shrink-0 flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-100">
              <a
                href="#hero"
                onClick={(e) => {
                  handleSmoothScroll(e, "#hero");
                  closeMobileMenu();
                }}
                className="flex items-center text-accent-primary space-x-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-base rounded-md"
              >
                <div className="text-2xl font-bold tracking-tighter shrink-0 text-text-primary">
                  <span className="text-accent-primary">Shakya</span> <span className="text-text-primary">Consultants</span>
                </div>
              </a>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMobileMenu}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-text-primary hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary"
                style={{ backgroundColor: "rgba(var(--accent-primary-rgb),0.15)" }}
                aria-label="Close menu"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/icon-close.svg" alt="" width={24} height={24} className="icon-primary" />
              </button>
            </div>

            <div className="apply-section shrink-0 px-4 sm:px-6 py-4 border-b border-gray-100">
              <button
                type="button"
                onClick={() => {
                  openApplyModal();
                  closeMobileMenu();
                }}
                className="w-full min-h-[48px] py-4 rounded-button font-semibold text-base text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-white active:opacity-90 touch-manipulation shadow-glow-primary"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                Join Our Team
              </button>
            </div>

            <div className="nav-links flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-4">
              <nav className="mobile-nav flex flex-col items-center gap-3" aria-label="Main">
                {navItems.map((item) =>
                  item.href === "#contact" ? (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => {
                        openBooking();
                        closeMobileMenu();
                      }}
                      className="mobile-nav-link w-full max-w-xs py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-base text-left text-text-primary"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="mobile-nav-link block w-full max-w-xs py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-base text-text-primary text-center"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
