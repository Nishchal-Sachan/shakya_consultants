export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A typical project ranges from 8-16 weeks, while larger enterprise solutions may take 3-6 months. We provide detailed timelines during the initial consultation.",
  },
  {
    id: "2",
    question: "What technologies do you work with?",
    answer: "We work with modern technologies including React, Next.js, TypeScript, Node.js, Python, and cloud platforms like AWS and Azure. Our team stays current with the latest frameworks and best practices.",
  },
  {
    id: "3",
    question: "Do you provide ongoing support?",
    answer: "Yes, all our plans include post-launch support. Support duration varies by plan, and we offer extended support packages for long-term maintenance and updates.",
  },
  {
    id: "4",
    question: "Can you work with our existing team?",
    answer: "Absolutely. We excel at collaborating with in-house teams, providing expertise where needed and integrating seamlessly with your existing workflows and processes.",
  },
  {
    id: "5",
    question: "What is your development process?",
    answer: "We follow an agile methodology with regular sprints, weekly updates, and continuous client feedback. Our process includes discovery, design, development, testing, and deployment phases.",
  },
  {
    id: "6",
    question: "How do you ensure quality?",
    answer: "We maintain quality through code reviews, automated testing, performance monitoring, and regular quality assurance checkpoints throughout the development lifecycle.",
  },
];
