"use client";

import ApplyNowForm from "@/components/ui/ApplyNowForm";
import { useBookingModal } from "@/context/BookingModalContext";
import React, { useCallback, useEffect, useRef, useState } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusables(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  const nodes = container.querySelectorAll<HTMLElement>(FOCUSABLE);
  return Array.from(nodes).filter((el) => !el.hasAttribute("aria-hidden"));
}

export default function FullScreenApplyModal() {
  const { applyModalOpen, closeApplyModal } = useBookingModal();
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
        closeApplyModal();
        setIsClosing(false);
        previousActiveRef.current?.focus?.();
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isClosing, closeApplyModal]);

  useEffect(() => {
    if (!applyModalOpen) {
      setOpenAnimated(false);
      return;
    }
    previousActiveRef.current = document.activeElement as HTMLElement | null;
    const openTimer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpenAnimated(true));
    });
    return () => cancelAnimationFrame(openTimer);
  }, [applyModalOpen]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose();
    },
    [startClose],
  );

  useEffect(() => {
    if (!applyModalOpen && !isClosing) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [applyModalOpen, isClosing, handleEscape]);

  useEffect(() => {
    if (!applyModalOpen || !openAnimated || isClosing) return;
    const focusables = getFocusables(contentRef.current);
    const first = focusables[0];
    if (first) first.focus({ preventScroll: true });
  }, [applyModalOpen, openAnimated, isClosing]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, []);

  if (!applyModalOpen && !isClosing) return null;

  const showContent = openAnimated && !isClosing;

  return (
    <div
      className="fixed inset-0 w-[100vw] h-[100vh] z-[9999] flex flex-col overflow-x-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Join Our Team"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop — same as Calendar modal: fade on open/close, click to close */}
      <div
        className={`absolute inset-0 bg-white/80 backdrop-blur-sm transition-opacity duration-200 ease-out ${showContent ? "opacity-100" : "opacity-0"}`}
        onClick={startClose}
        aria-hidden="true"
      />

      {/* Close button — fixed, same as Calendar modal */}
      <button
        type="button"
        onClick={startClose}
        className="fixed top-4 right-4 z-[10001] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 shrink-0"
        aria-label="Close Apply modal"
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

      {/* Content — same as Calendar: fade + scale, same padding & scroll behavior */}
      <div
        ref={contentRef}
        className={`relative z-[10000] flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden pt-14 pb-4 px-2 sm:px-4 flex justify-center transition-all duration-200 ease-out ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-[1000px] max-h-[90vh] flex flex-col min-w-0 overflow-x-hidden shrink-0 rounded-[18px] border border-gray-200 overflow-hidden bg-white shadow-xl">
          {/* Header — blue background with white text for high contrast */}
          <div className="flex items-center justify-center px-4 min-h-[56px] h-14 shrink-0 bg-accent-primary text-white">
            <p className="text-sm sm:text-base font-semibold text-center">
              Join Our Team
            </p>
          </div>
          {/* Body — scroll only inside, same spacing as modal content */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-white">
            <p className="text-text-secondary text-sm mb-4">
              Complete the form below. All fields are required.
            </p>
            <ApplyNowForm />
          </div>
        </div>
      </div>
    </div>
  );
}
