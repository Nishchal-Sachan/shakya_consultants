export interface PricingCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const pricingCards: PricingCard[] = [
  {
    id: "1",
    icon: "people",
    title: "Staff Augmentation",
    description: "Scale your team with expert developers, designers, and strategists who integrate seamlessly into your workflow. Perfect for teams that need additional capacity without the overhead of full-time hires.",
  },
  {
    id: "2",
    icon: "mobile",
    title: "Product Studio",
    description: "End-to-end product development from concept to launch. We handle strategy, design, development, and deployment, giving you a complete product ready for market. Ideal for startups and companies launching new products.",
  },
  {
    id: "3",
    icon: "slider",
    title: "Project Sprints",
    description: "Focused, time-boxed engagements to tackle specific challenges or build key features. Fast delivery with clear outcomes, perfect for established products that need targeted improvements or new capabilities.",
  },
];
