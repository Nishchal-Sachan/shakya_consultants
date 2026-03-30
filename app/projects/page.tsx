"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="bg-bg-base min-h-screen pt-24">
      {/* Navbar Spacing */}
      
      <Section id="all-work">
        <header className="mb-16">
          <SectionHeading
            label="Portfolio"
            title="Our Full Creative Archive"
            description="A detailed look at every project we've meticulously crafted."
            align="center"
          />
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-card"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card
                  key={project._id}
                  hover
                  className="p-0 flex flex-col h-full bg-white overflow-hidden group border border-border-default shadow-card-shadow"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Details */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-text-secondary text-base leading-relaxed flex-grow mb-8 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto border-t border-border-default pt-6">
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-accent-primary font-bold text-sm tracking-widest uppercase group/link"
                      >
                        Launch Project
                        <svg
                          className="ml-3 w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-24 text-text-secondary">
                No archived projects yet. Follow us for updates!
              </div>
            )}
          </div>
        )}

        <div className="mt-20 text-center">
            <Link 
                href="/" 
                className="text-text-secondary hover:text-accent-primary transition-colors font-medium flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Back to Home
            </Link>
        </div>
      </Section>
    </div>
  );
}
