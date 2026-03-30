import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default function About({ className = "" }: { className?: string }) {
  return (
    <Section id="about" className={`pt-24 pb-32 overflow-hidden ${className}`}>
      {/* Section Heading */}
      <SectionHeading
        label="ABOUT US"
        title="Engineering architecture that powers the future"
        description="Our consultancy focuses on crafting scalable software and cloud-native solutions that align technology with your enterprise objectives."
        align="center"
        className="mb-12 md:mb-16"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        {/* Left Column - Headline */}
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            We design and build{" "}
            <span className="text-accent-primary">software that matters</span>
          </h2>
        </div>

        {/* Right Column - Paragraph Copy */}
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Our engineering philosophy centers on creating scalable architecture that not only
            meets enterprise objectives but also delivers robust infrastructure
            for modern applications. We combine technical consulting with engineering excellence
            to build backends and platforms that scale globally.
          </p>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Every project we architect is approached with a deep understanding
            of scalable methodologies, robust deployments, and the
            technology landscape. This consulting approach ensures we deliver
            solutions that drive digital transformation and create lasting enterprise impact.
          </p>
          {/* About Us Link */}
          <a
            href="#about"
            className="cta-glow inline-flex items-center group text-accent-primary font-semibold hover:text-accent-primary-hover transition-colors"
          >
            About us
            <ArrowRight className="w-4 h-4" />
            {/* <Image
              src="/assets/icon-arrow-right.svg"
              alt=""
              width={20}
              height={20}
              className="ml-2 w-5 h-5 icon-primary group-hover:translate-x-1 transition-transform"
            /> */}
          </a>
        </div>
      </div>
    </Section>
  );
}
