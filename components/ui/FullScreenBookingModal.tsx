"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";
import BookingCard from "@/components/ui/BookingCard";
import BookingCalendarWidget from "@/components/ui/BookingCalendarWidget";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusables(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  const nodes = container.querySelectorAll<HTMLElement>(FOCUSABLE);
  return Array.from(nodes).filter((el) => !el.hasAttribute("aria-hidden"));
}

export default function FullScreenBookingModal() {
  const { isBookingOpen, closeBooking } = useBookingModal();
  const [openAnimated, setOpenAnimated] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  const startClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    if (isClosing) {
      const t = setTimeout(() => {
        closeBooking();
        setIsClosing(false);
        previousActiveRef.current?.focus?.();
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isClosing, closeBooking]);

  useEffect(() => {
    if (!isBookingOpen) {
      setOpenAnimated(false);
      return;
    }
    previousActiveRef.current = document.activeElement as HTMLElement | null;
    const openTimer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpenAnimated(true));
    });
    return () => cancelAnimationFrame(openTimer);
  }, [isBookingOpen]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose();
    },
    [startClose]
  );

  useEffect(() => {
    if (!isBookingOpen && !isClosing) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isBookingOpen, isClosing, handleEscape]);

  useEffect(() => {
    if (!isBookingOpen || !openAnimated || isClosing) return;
    const focusables = getFocusables(contentRef.current);
    const first = focusables[0];
    if (first) first.focus({ preventScroll: true });
  }, [isBookingOpen, openAnimated, isClosing]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = getFocusables(contentRef.current);
      if (focusables.length === 0) return;
      const current = document.activeElement as HTMLElement;
      const idx = focusables.indexOf(current);
      if (idx === -1) return;
      if (e.shiftKey) {
        if (idx === 0) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
        }
      } else {
        if (idx === focusables.length - 1) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    },
    []
  );

  if (!isBookingOpen && !isClosing) return null;

  const showContent = openAnimated && !isClosing;

  return (
    <div
      className="fixed inset-0 w-[100vw] h-[100vh] z-[9999] flex flex-col overflow-x-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Schedule Consultation"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop — fade on open/close */}
      <div
        className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-200 ease-out ${showContent ? "opacity-100" : "opacity-0"}`}
        onClick={startClose}
        aria-hidden="true"
      />

      {/* Close button — fixed, always visible */}
      <button
        type="button"
        onClick={startClose}
        className="fixed top-4 right-4 z-[10001] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 shrink-0"
        aria-label="Close booking modal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Content — fade + slight scale; focus trap container */}
      <div
        ref={contentRef}
        className={`relative z-[10000] flex-1 min-h-0 w-full overflow-hidden flex flex-col items-center justify-center transition-all duration-200 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[82vw] h-[60vh] sm:w-full sm:h-auto sm:max-h-[90vh] max-w-[500px] px-0 sm:px-0 flex flex-col overflow-hidden bg-[#0F172A] rounded-[2.5rem] sm:rounded-[2.5rem] shadow-2xl">
          <BookingCalendarWidget />
        </div>
      </div>
    </div>
  );
}
