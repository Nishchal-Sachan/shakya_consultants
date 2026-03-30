"use client";

import React, { useMemo, useState } from "react";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const GOLD = "var(--accent-primary)";

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = (first.getDay() + 6) % 7;
  const days: (number | null)[] = Array(startPad).fill(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(d);
  return days;
}

function generateTimeSlots(date: Date): string[] {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    for (const m of [0, 30]) {
      if (h === 17 && m === 30) break;
      const t = new Date(date);
      t.setHours(h, m, 0, 0);
      slots.push(t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    }
  }
  return slots;
}

const TIMEZONES = [
  "Asia/Calcutta",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
];

export default function BookingCalendarWidget() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("Asia/Calcutta");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = viewDate.toLocaleString("default", { month: "long", year: "numeric" });
  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const timeSlots = useMemo(() => {
    const d = selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) : new Date();
    return generateTimeSlots(d);
  }, [selectedDate]);

  const goPrev = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  const goNext = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));

  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          date: selectedDate.toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          time: selectedTime,
          timezone: timezone || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Booking request failed");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-w-0 max-w-full h-full min-h-0 bg-white overflow-x-hidden">
      <div className="flex flex-1 min-h-0 flex-col sm:flex-row overflow-hidden min-w-0">
        {/* Left: Date picker — static, no scroll */}
        <div className="flex flex-col shrink-0 border-b sm:border-b-0 sm:border-r border-gray-200 p-4 sm:min-w-[220px] overflow-hidden min-w-0">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={goPrev}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2L4 6l4 4" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-800">{monthLabel}</span>
            <button
              type="button"
              onClick={goNext}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 2l4 4-4 4" />
              </svg>
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className="text-center text-xs font-medium text-gray-500 py-1">
                {wd}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const date = new Date(year, month, day);
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  className="w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center mx-auto transition-colors"
                  style={
                    isSelected
                      ? { backgroundColor: GOLD, color: "#000" }
                      : { color: "#374151" }
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Timezone selector */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <label className="sr-only">Timezone</label>
            <div className="flex items-center gap-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="flex-1 text-sm text-gray-700 bg-transparent border-0 p-0 focus:ring-0 focus:outline-none"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Time slots — only this column scrolls */}
        <div className="flex flex-col flex-1 min-h-0 min-w-0 p-4 overflow-hidden">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 shrink-0">
            SELECT A TIME
          </h3>
          {selectedDate ? (
            <div className="flex flex-wrap gap-2 overflow-y-auto overflow-x-hidden min-h-0 flex-1 content-start">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className="px-3 py-2 rounded-lg text-sm font-medium border transition-colors shrink-0"
                  style={
                    selectedTime === slot
                      ? { borderColor: GOLD, backgroundColor: "rgba(var(--accent-primary-rgb),0.2)", color: "#1f2937" }
                      : { borderColor: "#d1d5db", color: "#374151" }
                  }
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No available times</p>
          )}
        </div>
      </div>

      {/* Booking form — static */}
      <div className="border-t border-gray-200 p-4 bg-gray-50/50 shrink-0">
        {submitted ? (
          <p className="text-sm font-medium text-gray-700">
            Thank you! Your call is booked for {selectedDate?.toLocaleDateString()} at {selectedTime}. We&apos;ll confirm via email.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {submitError && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{submitError}</p>
            )}
            <div>
              <label htmlFor="booking-name" className="block text-xs font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                id="booking-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-70"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="booking-email" className="block text-xs font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                id="booking-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-70"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || submitting}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-black transition-opacity disabled:opacity-50"
              style={{ backgroundColor: GOLD }}
            >
              {submitting ? "Sending…" : "Book appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
