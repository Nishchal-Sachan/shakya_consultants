export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide-react icon name key
}

export const capabilities: CapabilityItem[] = [
  {
    id: "1",
    iconName: "Code2",
    title: "Custom Software Development",
    description: "Enterprise web applications tailored to your business needs.",
  },
  {
    id: "2",
    iconName: "Smartphone",
    title: "Mobile App Development",
    description: "High-performance Android & iOS applications.",
  },
  {
    id: "3",
    iconName: "BarChart3",
    title: "Digital Marketing & SEO",
    description: "Data-driven strategies to increase visibility and generate leads.",
  },
  {
    id: "4",
    iconName: "Users",
    title: "Talent Acquisition & Hiring",
    description: "Finding and managing the right people for your business.",
  },
  {
    id: "5",
    iconName: "Zap",
    title: "Business Process Automation",
    description: "Streamlining operations to save time and cost.",
  },
  {
    id: "6",
    iconName: "Settings2",
    title: "CRM Setup & Customization",
    description: "Optimizing systems like Zoho, Salesforce for better sales tracking.",
  },
  {
    id: "7",
    iconName: "TrendingUp",
    title: "Sales Outsourcing",
    description: "Dedicated team to handle your sales and customer conversion.",
  },
];
