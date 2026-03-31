"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Globe, Check, ArrowRight, Calendar, Clock, User, Edit3, ShieldCheck } from "lucide-react";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

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

  // UNIVERSAL STEP STATE
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // When step changes, scroll to top
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
    }
  }, [step]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = viewDate.toLocaleString("default", { month: "long", year: "numeric" });
  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const timeSlots = useMemo(() => {
    const d = selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) : new Date();
    return generateTimeSlots(d);
  }, [selectedDate]);

  const goPrevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  const goNextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));

  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  const handleTimeSelect = (slot: string) => {
    setSelectedTime(slot);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email) return;
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

  const getStepTitle = () => {
    if (step === 1) return "Select Date";
    if (step === 2) return "Select Time";
    return "Your Details";
  };

  const isFormComplete = name && email && selectedDate && selectedTime;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center space-y-6 h-full min-h-[500px] bg-[#0F172A] animate-fade-in">
        <div className="w-24 h-24 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center shadow-inner scale-110 border border-green-500/20">
           <Check className="w-12 h-12 text-green-400" />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-white tracking-tighter">Consultation Booked</h3>
          <p className="text-slate-300 font-medium px-8 text-lg">
            Scheduled for <span className="text-accent-primary font-black">{selectedDate?.toLocaleDateString()}</span> at <span className="text-accent-primary font-black">{selectedTime}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border border-white/5">
           <ShieldCheck size={16} className="text-green-400" />
           Confirmation email sent
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-[#0F172A] relative overflow-hidden">
      
      {/* UNIVERSAL STEP HEADER (IDENTICAL MOBILE/DESKTOP) */}
      <div className="shrink-0 border-b border-white/5 bg-[#0F172A] relative z-40 px-6 pt-4 pb-3">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                aria-label="Go back to previous step"
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h3 className="text-xl font-black text-white tracking-tighter uppercase">{getStepTitle()}</h3>
          </div>
          
          <div className="flex gap-2.5">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${step === s ? "w-8 bg-accent-primary" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA - FLEXIBLE AND CENTERED */}
      <div 
        className="flex-1 min-h-0 px-6 py-4 animate-fade-in relative z-10 flex flex-col justify-center overflow-hidden"
      >
        
        {/* STEP 1: DATE */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-start min-h-0 space-y-0.5 animate-slide-up pt-1">
             <div className="flex items-center justify-between px-2 shrink-0 pb-0.5">
                <button onClick={goPrevMonth} aria-label="Previous month" className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors border border-white/10">
                  <ChevronLeft className="w-4 h-4 text-slate-200" />
                </button>
                <div className="text-center">
                   <p className="text-[8px] font-black text-accent-primary uppercase tracking-[0.2em] mb-0.5">Calendar</p>
                   <span className="text-base font-black text-white tracking-tighter">{monthLabel}</span>
                </div>
                <button onClick={goNextMonth} aria-label="Next month" className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors border border-white/10">
                   <ChevronRight className="w-4 h-4 text-slate-200" />
                </button>
             </div>

             <div className="calendar-grid grid grid-cols-7 gap-x-1 gap-y-0.5 flex-1">
                {WEEKDAYS.map(day => (
                  <div key={day} className="text-[8px] font-black text-slate-400 tracking-widest text-center py-0.5 opacity-90">{day}</div>
                ))}
                {days.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} />;
                  const date = new Date(year, month, day);
                  const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

                  return (
                    <button
                      key={day}
                      disabled={isPast}
                      onClick={() => handleDateClick(day)}
                      className={`
                        w-full aspect-[1/0.7] rounded-lg text-xs font-black flex flex-col items-center justify-center transition-all duration-300 relative
                        ${isSelected ? "bg-accent-primary text-white shadow-[0_0_12px_rgba(79,70,229,0.3)] scale-105 z-10" : "text-slate-100 hover:bg-white/10 hover:text-white"}
                        ${isPast ? "text-slate-500 opacity-50 pointer-events-none" : ""}
                        ${isToday && !isSelected ? "border-2 border-accent-primary/40" : ""}
                      `}
                    >
                      {day}
                      {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-accent-primary rounded-full" />}
                    </button>
                  );
                })}
             </div>
          </div>
        )}

        {/* STEP 2: TIME */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-center space-y-6 animate-slide-up">
             <div className="flex items-center gap-3 px-2">
                <div className="w-9 h-9 rounded-xl bg-accent-primary/20 flex items-center justify-center">
                   <Clock className="w-4 h-4 text-accent-primary" />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Schedule Time</p>
                   <p className="text-base font-black text-white tracking-tighter">{selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3 overflow-hidden">
                {timeSlots.slice(0, 8).map(slot => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className={`
                      p-4 rounded-xl text-sm font-black border transition-all duration-400 text-center
                      ${selectedTime === slot 
                        ? "bg-accent-primary text-white border-transparent shadow-[0_0_15px_rgba(79,70,229,0.3)] scale-[1.03] z-10" 
                        : "bg-white/5 border-white/10 text-slate-300 hover:border-accent-primary/50 hover:bg-white/10"}
                    `}
                  >
                    {slot}
                  </button>
                ))}
             </div>
          </div>
        )}

        {/* STEP 3: DETAILS */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-center space-y-6 animate-slide-up">
             <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 rounded-3xl border border-white/10 relative">
                <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] mb-2">You&apos;re scheduling for</p>
                <div className="space-y-0.5">
                   <p className="text-lg font-black text-white tracking-tighter">{selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                   <p className="text-base font-black text-accent-primary">{selectedTime}</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="space-y-1.5 px-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl font-black text-white text-base focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all outline-none"
                    placeholder="E.g. John Doe"
                  />
                </div>
                <div className="space-y-1.5 px-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl font-black text-white text-base focus:ring-4 focus:ring-accent-primary/10 focus:border-accent-primary transition-all outline-none"
                    placeholder="john@company.com"
                  />
                </div>
                {submitError && <p className="text-[9px] font-black text-red-400 uppercase tracking-widest px-2">{submitError}</p>}
             </div>
          </div>
        )}

      </div>

      {/* FOOTER - FIXED HEIGHT, ALWAYS VISIBLE */}
      <div className="shrink-0 p-6 bg-[#0F172A]/98 backdrop-blur-2xl border-t border-white/5 z-20 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-4">
          
          {/* Timezone Selector - Fixed above button in Step 1 */}
          {step === 1 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.05] rounded-xl border border-white/10 shadow-inner group">
              <Globe className="w-4 h-4 text-accent-primary group-hover:scale-110 transition-transform" />
              <select 
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="bg-transparent text-[10px] font-black text-slate-200 uppercase tracking-[0.15em] focus:ring-0 focus:outline-none flex-1 cursor-pointer"
              >
                {TIMEZONES.map(tz => (
                  <option key={tz} value={tz} className="bg-[#0F172A] text-white">
                    {tz.split("/").length > 1 ? tz.split("/")[1].replace("_", " ") : tz}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 1 && selectedDate) setStep(2);
                  else if (step === 2 && selectedTime) setStep(3);
                }}
                disabled={(step === 1 && !selectedDate) || (step === 2 && !selectedTime)}
                className="w-full bg-accent-primary text-white py-4 rounded-xl font-black text-[12px] tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(79,70,229,0.35)] flex items-center justify-center gap-3 active:scale-95 transition-all hover:brightness-110 disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none disabled:hover:brightness-100"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={submitting || !isFormComplete}
                className="w-full bg-accent-primary text-white py-4 rounded-xl font-black text-[12px] tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(79,70,229,0.35)] flex items-center justify-center gap-3 active:scale-95 transition-all hover:brightness-110 disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none disabled:hover:brightness-100"
              >
                {submitting ? "Booking..." : "Complete"}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
      </div>


      <style jsx>{`
        .calendar-grid {
          transform: scale(0.95);
          transition: transform 0.3s ease;
        }
        @media (max-height: 700px) {
          .calendar-grid {
            transform: scale(0.85);
          }
        }
        @media (max-height: 600px) {
          .calendar-grid {
            transform: scale(0.75);
          }
        }
      `}</style>
    </div>
  );
}
