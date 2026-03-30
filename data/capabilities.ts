export interface CapabilityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const capabilities: CapabilityItem[] = [
  {
    id: "1",
    icon: "/assets/icon-mobile.svg",
    title: "Enterprise Web Applications",
    description: "Full-stack web platforms built with modern frameworks and scalable modular architectures.",
  },
  {
    id: "2",
    icon: "/assets/icon-people.svg",
    title: "Cloud Infrastructure",
    description: "Cloud-native solutions leveraging major providers for resilient and highly available infrastructure.",
  },
  {
    id: "3",
    icon: "/assets/icon-slider.svg",
    title: "Mobile App Engineering",
    description: "High-performance native and cross-platform mobile solutions tailored for iOS and Android.",
  },
  {
    id: "4",
    icon: "/assets/icon-check.svg",
    title: "Backend Systems",
    description: "Secure, high-throughput API microservices and database designs that power enterprise applications.",
  },
  {
    id: "5",
    icon: "/assets/icon-check.svg",
    title: "Artificial Intelligence",
    description: "Custom AI solutions, generative models, and intelligent automation built for business optimization.",
  },
  {
    id: "6",
    icon: "/assets/icon-check.svg",
    title: "Digital Transformation",
    description: "Strategic engineering consulting to modernize legacy systems and adopt scalable modern practices.",
  },
];

export const techIcons: string[] = [
  "/assets/logos/logo-1.svg",
  "/assets/logos/logo-2.svg",
  "/assets/logos/logo-3.svg",
  "/assets/logos/logo-4.svg",
  "/assets/logos/logo-5.svg",
  "/assets/logos/logo-6.svg",
];
