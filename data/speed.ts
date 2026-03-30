export interface SpeedItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const speedItems: SpeedItem[] = [
  {
    id: "1",
    icon: "/assets/icon-check.svg",
    title: "Streamlined Process",
    description: "Our proven methodology eliminates bottlenecks and ensures efficient project delivery from concept to launch.",
  },
  {
    id: "2",
    icon: "/assets/icon-check.svg",
    title: "Expert Team",
    description: "A dedicated team of specialists working in parallel to accelerate development without compromising quality.",
  },
  {
    id: "3",
    icon: "/assets/icon-check.svg",
    title: "Modern Tools",
    description: "Leveraging cutting-edge technologies and automation to reduce development time and increase productivity.",
  },
];
