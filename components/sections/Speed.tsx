import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { speedItems } from "@/data/speed";
import Image from "next/image";

export default function Speed({ className = "" }: { className?: string }) {
  return (
    <Section id="speed" className={`py-24 overflow-hidden border-y border-border-default ${className}`}>
      {/* Section Heading */}
      <SectionHeading
        title="Engineering Velocity"
        description="Our high-performance engineering culture delivers enterprise-grade products at startup speed."
        align="center"
        className="mb-12"
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {speedItems.map((item) => (
          <GlassCard
            key={item.id}
            className="p-8 text-center"
            icon={
              <Image
                src={item.icon || "/assets/icon-check.svg"}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8"
              />
            }
            iconContainerClassName="mx-auto"
          >
            {/* Title */}
            <h3 className="text-xl font-bold text-text-primary mb-3 transition-colors duration-300 group-hover:text-accent-primary">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-base leading-relaxed">
              {item.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
