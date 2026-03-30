"use client";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { 
  ShieldCheck, 
  Cpu, 
  LineChart, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";
import { useBookingModal } from "@/context/BookingModalContext";

export default function ApproachPage() {
  const { openBooking } = useBookingModal();

  const principles = [
    {
      icon: ShieldCheck,
      title: "Reliability First",
      desc: "We don't just build; we engineer for uptime. Every system is architected with redundancy and failure-tolerance at its core."
    },
    {
      icon: Cpu,
      title: "Scalable by Design",
      desc: "Our solutions are never 'one-size'. We build infrastructures that grow with your user base, handling 10x or 100x traffic shifts with ease."
    },
    {
      icon: LineChart,
      title: "Data-Driven Impact",
      desc: "Engineering without data is guesswork. We optimize for performance metrics that directly correlate with your business conversion."
    }
  ];

  const phases = [
    {
      step: "01",
      title: "Discovery & Audit",
      items: ["Technology stack analysis", "Bottleneck identification", "Strategic goal alignment"]
    },
    {
      step: "02",
      title: "Architectural Mapping",
      items: ["High-level infrastructure design", "Data flow optimization", "Security & compliance planning"]
    },
    {
      step: "03",
      title: "Precision Engineering",
      items: ["Modular development", "Automated testing pipelines", "Performance benchmarking"]
    },
    {
      step: "04",
      title: "Scaling & Optimization",
      items: ["Real-time monitoring setup", "Infrastructure auto-scaling", "Continuous delivery cycles"]
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-bg-base pt-32">
        {/* --- HERO SECTION --- */}
        <Section 
          className="pb-20 md:pb-32"
          style={{
            background: `
              radial-gradient(circle at 15% 15%, rgba(99,102,241,0.08), transparent 40%),
              radial-gradient(circle at 85% 85%, rgba(139,92,246,0.12), transparent 40%),
              #F8FAFC
            `
          }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
             <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-border-default shadow-sm mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent-primary">
                Methodology
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tight leading-[1.05]">
              How we build <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-purple-600">
                enduring software
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-medium">
              A precision engineering philosophy that bridges the gap between complex technology and long-term business goals.
            </p>
          </div>
        </Section>

        {/* --- CORE PRINCIPLES (Cards) --- */}
        <Section className="py-24 bg-white border-y border-border-subtle shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {principles.map((p, i) => (
                <Card 
                  key={i} 
                  className="p-12 hover:-translate-y-4 group transition-all duration-500 border-white/50 shadow-premium"
                >
                  <p.icon className="w-12 h-12 text-accent-primary mb-8" />
                  <h3 className="text-2xl font-black text-text-primary mb-4">
                    {p.title}
                  </h3>
                  <p className="text-text-muted text-lg leading-relaxed">
                    {p.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* --- DETAILED PHASES (Timeline Style) --- */}
        <Section className="py-32 bg-bg-base">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-8 tracking-tighter">
                  The Blueprint for <br /> Reliable Growth.
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed mb-12">
                  Our engagement doesn’t just deliver code; it delivers a strategic roadmap. 
                  We guide you through a battle-tested process designed to minimize risk 
                  while maximizing platform velocity.
                </p>
                
                {/* START A PROJECT - TRIGGERS CALENDAR MODAL */}
                <button
                  type="button"
                  onClick={openBooking}
                  className="inline-flex items-center gap-4 bg-text-primary text-white py-5 px-10 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl hover:bg-accent-primary transition-all duration-300 group"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </button>
              </div>

              <div className="space-y-16">
                {phases.map((phase, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <span className="text-5xl font-black text-accent-primary opacity-20 group-hover:opacity-100 transition-opacity">
                      {phase.step}
                    </span>
                    <div className="pt-2">
                       <h4 className="text-2xl font-black text-text-primary mb-4">{phase.title}</h4>
                       <ul className="space-y-3">
                          {phase.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-text-muted text-lg">
                               <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/40"></div>
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </Section>

        {/* --- FINAL CTA SECTION --- */}
        <Section className="py-40 bg-gradient-to-b from-bg-base to-bg-indigo-soft/40 relative">
           <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-text-primary tracking-tight">
                Ready to optimize your infrastructure?
              </h2>
              <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
                Whether you&apos;re migrating to cloud-native or building from scratch,
                our engineering expertise ensures you scale without the growing pains.
              </p>
              
              {/* BUILD SOMETHING HIGH IMPACT - MAPS TO HOME CONTACT FORM */}
              <Link
                href="/#contact"
                className="inline-flex items-center gap-4 bg-accent-primary text-white py-6 px-16 rounded-full font-black text-base md:text-lg tracking-[0.15em] uppercase shadow-[0_20px_50px_rgba(79,70,229,0.4)] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(79,70,229,0.5)] transition-all duration-500"
              >
                Let&apos;s Build something high-impact
              </Link>
           </div>
           
           {/* Decorative Blur */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
