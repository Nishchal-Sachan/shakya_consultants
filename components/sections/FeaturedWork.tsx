"use client";

import { useState, useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedWork({ className = "" }: { className?: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Carousel behavior
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
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

  // Auto-slide effect
  useEffect(() => {
    if (projects.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [projects.length]);

  return (
    <Section id="work" className={`pt-24 pb-32 overflow-hidden ${className}`}>
      <SectionHeading
        label="Featured Work"
        title="Our recent projects"
        description="Explore our portfolio of successful digital products and solutions"
        align="center"
        className="mb-16"
      />

      {loading ? (
        <div className="flex justify-center gap-6 md:gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-1/3 h-[400px] bg-gray-100 animate-pulse rounded-card"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">No projects available yet. Stay tuned!</div>
      ) : (
        <div className="relative">
          {/* Slider Container */}
          <div className="flex items-center justify-center relative min-h-[500px]">
             {/* Carousel Wrapper */}
             <div className="flex items-center justify-center w-full max-w-7xl mx-auto overflow-visible relative">
                {/* Previous Button */}
                <button 
                  onClick={prevSlide}
                  aria-label="Previous Project"
                  className="absolute left-4 z-20 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-border-default hover:bg-accent-primary hover:text-white transition-all transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>

                {/* Cards Wrapper */}
                <div className="flex items-center justify-center w-full relative h-[600px] gap-8">
                {projects.map((project, index) => {
                  // Calculate distance from active index with wrapping
                  let diff = index - activeIndex;
                  const length = projects.length;
                  
                  // Adjust for circular wraparound
                  if (diff > length / 2) diff -= length;
                  if (diff < -length / 2) diff += length;

                  // Visibility logic: only show -1 (prev), 0 (active), 1 (next)
                  const isVisible = Math.abs(diff) <= 1;
                  if (!isVisible) return null;

                  const isActive = diff === 0;

                  return (
                    <div
                      key={project._id}
                      className={`absolute transition-all duration-700 ease-out transform pointer-events-none md:pointer-events-auto w-[clamp(300px,80vw,450px)]
                        ${isActive ? "z-10 scale-100 opacity-100 translate-x-0" : ""}
                        ${diff === -1 ? "z-0 scale-90 opacity-40 -translate-x-[70%] md:-translate-x-[90%]" : ""}
                        ${diff === 1 ? "z-0 scale-90 opacity-40 translate-x-[70%] md:translate-x-[90%]" : ""}
                      `}
                    >
                      <Card
                        hover={isActive}
                        className={`p-0 flex flex-col h-full bg-white overflow-hidden group border border-border-default transition-shadow duration-500
                          ${isActive ? "shadow-glow-primary-soft" : "shadow-none pointer-events-none"}
                        `}
                      >
                        {/* Project Image */}
                        <div className="relative w-full h-56 md:h-64 overflow-hidden">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className={`object-cover transition-transform duration-700 ${isActive ? "group-hover:scale-110" : ""}`}
                          />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow">
                          <h3 className={`text-2xl font-bold text-text-primary mb-3 transition-colors duration-300 ${isActive ? "group-hover:text-accent-primary" : ""}`}>
                            {project.title}
                          </h3>
                          <p className={`text-text-secondary text-sm leading-relaxed mb-8 flex-grow ${isActive ? "line-clamp-3" : "line-clamp-2"}`}>
                            {project.description}
                          </p>
                          
                          {isActive && (
                            <a
                              href={project.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-accent-primary font-bold text-xs tracking-widest uppercase group/link mt-auto transition-all duration-300 transform group-hover:translate-x-2"
                            >
                              Launch Project
                              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </a>
                          )}
                        </div>
                      </Card>
                    </div>
                  );
                })}
                </div>

                {/* Next Button */}
                <button 
                  onClick={nextSlide}
                  aria-label="Next Project"
                  className="absolute right-4 z-20 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-border-default hover:bg-accent-primary hover:text-white transition-all transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
             </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-2 transition-all duration-300 rounded-full ${i === activeIndex ? "w-10 bg-accent-primary shadow-glow-primary-soft" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="text-center mt-20">
        <Link
          href="/projects"
          className="cta-glow inline-flex items-center group bg-accent-primary text-white font-bold py-4 px-10 rounded-full shadow-glow-primary-soft hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-300"
        >
          See All Project Archive
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}
