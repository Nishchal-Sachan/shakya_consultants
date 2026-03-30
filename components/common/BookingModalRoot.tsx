"use client";

import React from "react";
import FullScreenBookingModal from "@/components/ui/FullScreenBookingModal";
import FullScreenApplyModal from "@/components/ui/FullScreenApplyModal";

export default function BookingModalRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FullScreenBookingModal />
      <FullScreenApplyModal />
    </>
  );
}
