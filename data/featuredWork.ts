export interface FeaturedWorkItem {
  id: string;
  image: string;
  tags: string[];
  title: string;
  description: string;
}

export const featuredWork: FeaturedWorkItem[] = [
  {
    id: "1",
    image: "/assets/case-studies/case-1.jpg",
    tags: ["Web Design", "Branding"],
    title: "E-commerce Platform Redesign",
    description: "Complete redesign of a modern e-commerce platform with enhanced user experience and conversion optimization.",
  },
  {
    id: "2",
    image: "/assets/case-studies/case-2.jpg",
    tags: ["Mobile App", "UI/UX"],
    title: "Mobile Banking Application",
    description: "Intuitive mobile banking app with secure transactions and seamless user interface for financial management.",
  },
  {
    id: "3",
    image: "/assets/case-studies/case-3.jpg",
    tags: ["SaaS", "Dashboard"],
    title: "Analytics Dashboard Platform",
    description: "Comprehensive analytics dashboard with real-time data visualization and advanced reporting capabilities.",
  },
];
