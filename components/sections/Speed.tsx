"use client";

import Section from "@/components/ui/Section";
import { Workflow, Users, Code, Zap } from "lucide-react";

export default function Speed({ className = "" }: { className?: string }) {
  const speedItems = [
    {
      id: "1",
      icon: Workflow,
      title: "Streamlined Execution",
      description: "Our optimized workflows eliminate bottlenecks and ensure fast, predictable delivery from idea to production.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "2",
      icon: Users,
      title: "Elite Engineering Teams",
      description: "Work with highly skilled specialists collaborating in parallel to accelerate development without compromising quality.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "3",
      icon: Code,
      title: "Modern Tech Stack",
      description: "We leverage cutting-edge tools, automation, and cloud-native architectures to maximize speed and efficiency.",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <Section 
      id="speed" 
      className={`relative py-16 md:py-24 overflow-hidden border-y border-black/[0.03] bg-bg-soft ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.05), transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(139,92,246,0.05), transparent 40%),
          #F1F5F9
        `
      }}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hero-grain"></div>
      
      {/* Visual Depth Orb behind center card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Section Header Upgrade */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-border-default shadow-sm mb-4">
            <Zap className="w-3.5 h-3.5 text-accent-primary mr-2 fill-accent-primary" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent-primary">
              Engineering Velocity
            </span>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-black text-text-primary tracking-tighter leading-[1.05]">
            Built for Speed. <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-indigo-500 to-purple-600">
               Engineered for Scale.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-text-muted/80 leading-relaxed max-w-[600px] mx-auto font-medium">
            We combine elite engineering talent, streamlined processes, and modern tools to deliver 
            high-performance products — <span className="text-text-primary font-bold">faster than traditional teams.</span>
          </p>
        </div>

        {/* Cards Grid - Glassmorphism UI Light */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {speedItems.map((item) => (
            <div
              key={item.id}
              className="group relative"
            >
               {/* Hover Glow Highlight */}
               <div className="absolute -inset-2 bg-gradient-to-r from-accent-primary/20 via-purple-500/20 to-accent-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

               <div className="relative h-full reveal bg-white/60 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[2rem] shadow-premium transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
                {/* Icon Upgrade */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center p-4 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-text-primary mb-4 transition-colors duration-300 group-hover:text-accent-primary tracking-tight">
                  {item.title}
                </h3>

                <p className="text-text-muted text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
