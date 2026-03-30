"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import Section from "@/components/ui/Section";

export default function TrustedBy({ className = "" }: { className?: string }) {
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        if (data.success) {
          setLogos(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch clients logos");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Map to format UI expects (logoUrl -> src, name -> alt)
  const formattedLogos = logos.map((c) => ({
    src: c.logoUrl,
    alt: c.name,
  }));

  // Fallback logos if DB is empty, or show empty during loading
  const displayLogos =
    formattedLogos.length > 0 ? formattedLogos : [];

  return (
    <Section
      id="trusted"
      className={`py-12 md:py-16 overflow-hidden bg-white border-y border-border-default ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Side Text */}
          <div className="flex-shrink-0">
            <p className="text-xs md:text-sm font-semibold text-text-secondary uppercase tracking-widest whitespace-nowrap">
              Trusted by industry leaders
            </p>
          </div>

          {/* Scrolling Logo Strip */}
          {loading ? (
            <div className="flex-1 flex gap-8 h-8 opacity-20">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="w-24 h-4 bg-gray-400 rounded-full animate-pulse"></div>
              ))}
            </div>
          ) : (
            displayLogos.length > 0 && (
              <Marquee className="flex-1 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {displayLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-shrink-0"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain mx-8"
                    />
                  </div>
                ))}
              </Marquee>
            )
          )}
        </div>
      </div>
    </Section>
  );
}
