"use client";

import { useState, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedWork({ className = "" }: { className?: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = () => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        } else {
          setError("Failed to load projects");
        }
      } catch (err) {
        setError("Error fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 1) {
      const interval = setInterval(nextSlide, 8000);
      return () => clearInterval(interval);
    }
  }, [projects.length, nextSlide]);

  // Return null if no projects are present after loading (Admin-Only policy)
  if (!loading && projects.length === 0) return null;

  return (
    <Section 
      id="work" 
      className={`relative py-16 overflow-hidden border-t border-border-subtle ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.05), transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(139,92,246,0.05), transparent 40%),
          #F8FAFC
        `
      }}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hero-grain"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          label="Featured Work"
          title="Our recent projects"
          description="High-impact software solutions engineered for performance and scalability."
          align="center"
          className="mb-8"
        />

        {loading ? (
          <div className="flex justify-center gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full max-w-[380px] h-[480px] bg-white rounded-[2rem] animate-pulse border border-border-subtle"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
        ) : (
          <div className="relative">
            {/* Carousel Container - Optimized Height */}
            <div className="relative min-h-[480px] flex items-center justify-center">
              
              {/* Navigation - Better Positioning */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none lg:-mx-10">
                 <button 
                  onClick={prevSlide}
                  aria-label="Previous"
                  className="pointer-events-auto w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-premium border border-white items-center justify-center hidden md:flex hover:bg-accent-primary hover:text-white transition-all transform hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button 
                  onClick={nextSlide}
                  aria-label="Next"
                  className="pointer-events-auto w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-premium border border-white items-center justify-center hidden md:flex hover:bg-accent-primary hover:text-white transition-all transform hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>

              {/* Slider Viewport */}
              <div className="relative w-full h-[460px] flex items-center justify-center perspective-1000">
                {projects.map((project, index) => {
                  let diff = index - activeIndex;
                  const length = projects.length;
                  if (diff > length / 2) diff -= length;
                  if (diff < -length / 2) diff += length;

                  const isVisible = Math.abs(diff) <= 1;
                  if (!isVisible) return null;
                  const isActive = diff === 0;

                  return (
                    <div
                      key={project._id}
                      className={`absolute transition-all duration-[800ms] cubic-bezier(0.23, 1, 0.32, 1) transform md:pointer-events-auto w-full max-w-[380px] md:max-w-[420px]
                        ${isActive ? "z-20 scale-100 opacity-100 translate-x-0" : ""}
                        ${diff === -1 ? "z-10 scale-[0.88] opacity-30 -translate-x-[75%] md:-translate-x-[95%] -rotate-y-12" : ""}
                        ${diff === 1 ? "z-10 scale-[0.88] opacity-30 translate-x-[75%] md:translate-x-[95%] rotate-y-12" : ""}
                      `}
                    >
                      <Card
                        className={`p-0 bg-white overflow-hidden group transition-all duration-500 rounded-[2rem] border-white/50
                          ${isActive ? "shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] md:hover:-translate-y-3" : "shadow-none pointer-events-none opacity-50"}
                        `}
                      >
                        {/* Compact Image - 16/10 Aspect Ratio */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-bg-soft">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className={`object-cover transition-transform duration-[1s] ${isActive ? "group-hover:scale-105" : ""}`}
                            sizes="(max-width: 768px) 100vw, 420px"
                          />
                          {isActive && (
                            <div className="absolute top-5 left-5 z-10 px-3 py-1 rounded-lg bg-accent-primary text-white text-[9px] font-black uppercase tracking-wider shadow-lg transform -translate-y-[200%] group-hover:translate-y-0 transition-all duration-500">
                              Selected Work
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Refined Content Area */}
                        <div className="p-7 md:p-9 bg-white relative z-10">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-black text-accent-primary uppercase tracking-[0.2em]">
                              {project.category || "Development"}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-text-primary mb-3 leading-tight group-hover:text-accent-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-text-muted text-sm md:text-base leading-relaxed mb-7 line-clamp-2">
                            {project.description}
                          </p>
                          
                          {isActive && (
                            <a
                              href={project.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-accent-primary font-black text-[10px] tracking-widest uppercase hover:text-text-primary transition-all duration-300"
                            >
                              Explore Study
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          )}
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compact Indicators */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 
                    ${i === activeIndex ? "w-10 bg-accent-primary shadow-sm" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Scaled-down CTA */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-white border border-border-default text-text-primary font-bold py-4 px-10 rounded-full shadow-card-shadow hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group/link"
          >
            <span className="text-xs tracking-widest uppercase">View Full Archive</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
