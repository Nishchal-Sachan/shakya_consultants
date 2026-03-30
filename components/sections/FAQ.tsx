"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import Image from "next/image";
import { faqItems } from "@/data/faq";
import { useState } from "react";

export default function FAQ({ className = "" }: { className?: string }) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <Section id="faq" className={`pt-24 pb-32 items-center justify-center overflow-hidden flex flex-col ${className}`}>
      {/* Section Heading */}
      <SectionHeading
        label="FAQ"
        title="Frequently asked questions"
        description="Find answers to common questions about our consultancy process and software delivery."
        align="center"
        className="mb-12"
      />

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item) => {
          const isOpen = openItems.has(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ease-in-out border border-border-default hover:border-accent-primary/40 bg-white shadow-card-shadow ${isOpen ? 'ring-1 ring-accent-primary/50' : ''}`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200"
              >
                <span
                  className={`font-semibold pr-4 transition-colors duration-300 ${
                    isOpen ? "text-accent-primary" : "text-text-primary"
                  }`}
                >
                  {item.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-accent-primary text-white' : 'bg-accent-primary/10'}`}
                >
                  <Image
                    src="/assets/icon-chevron-down.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={`w-5 h-5 transition-transform duration-300 icon-primary ${
                      isOpen ? "transform rotate-180 brightness-0 invert" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-1 border-t border-border-default/50">
                  <p className="text-text-secondary text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
