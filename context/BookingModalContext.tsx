"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface BookingModalContextValue {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  applyModalOpen: boolean;
  openApplyModal: () => void;
  closeApplyModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const openBooking = useCallback(() => {
    setApplyModalOpen(false);
    setIsBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setIsBookingOpen(false), []);

  const openApplyModal = useCallback(() => {
    setIsBookingOpen(false);
    setApplyModalOpen(true);
  }, []);

  const closeApplyModal = useCallback(() => setApplyModalOpen(false), []);

  const value: BookingModalContextValue = {
    isBookingOpen,
    openBooking,
    closeBooking,
    applyModalOpen,
    openApplyModal,
    closeApplyModal,
  };

  return (
    <BookingModalContext.Provider value={value}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return ctx;
}
