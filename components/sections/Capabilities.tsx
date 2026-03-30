import Card from "@/components/ui/Card";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { capabilities, techIcons } from "@/data/capabilities";
import Image from "next/image";

export default function Capabilities({ className = "" }: { className?: string }) {
  return (
    <Section id="capabilities" className={`pt-24 pb-32 overflow-hidden ${className}`}>
      {/* Header Area */}
      <SectionHeading
        label="OUR CAPABILITIES"
        title="Comprehensive Digital Solutions"
        description="Enterprise-grade software development services to bring your digital vision to life."
        align="center"
        className="mb-12 md:mb-16"
      />

      {/* Capabilities Grid */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {capabilities.map((capability) => (
            <GlassCard
              key={capability.id}
              className="p-6"
              icon={
                <Image 
                  src={capability.icon || "/assets/icon-check.svg"} 
                  alt="" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6" 
                />
              }
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-text-primary mb-3 transition-colors duration-300 group-hover:text-accent-primary">
                {capability.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {capability.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Tech Icon Cloud */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {techIcons.map((icon, index) => (
            <Card
              key={index}
              hover
              className="p-4 flex items-center justify-center aspect-square bg-white shadow-sm border border-border-default"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={icon}
                  alt={`Technology icon ${index + 1}`}
                  fill
                  className="object-contain icon-primary opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
