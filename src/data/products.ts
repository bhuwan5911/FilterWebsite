export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  idealFor: string[];
  technology: string[];
  benefits: string[];
}

export const productCategories = [
  { id: "ro", name: "RO Water Purifiers", description: "Advanced reverse osmosis technology" },
  { id: "uv", name: "UV Water Purifiers", description: "Ultraviolet disinfection systems" },
  { id: "gravity", name: "Gravity Filters", description: "Non-electric natural filtration" },
  { id: "whole-house", name: "Whole House Filters", description: "Complete home water solutions" },
  { id: "commercial", name: "Commercial Systems", description: "High-capacity industrial units" },
];

export const products: Product[] = [
  // RO Water Purifiers
  {
    id: "1",
    name: "PureDrop RO Max",
    slug: "puredrop-ro-max",
    category: "RO Water Purifiers",
    categorySlug: "ro",
    shortDescription: "Our flagship 7-stage RO purifier with TDS controller",
    description: "The PureDrop RO Max is our premium water purification system that combines advanced RO technology with UV sterilization for the purest drinking water. With a 7-stage purification process and intelligent TDS controller, it ensures your water is not just clean but perfectly balanced for taste and health.",
    image: "/placeholder.svg",
    features: [
      "7-stage advanced purification",
      "RO + UV + UF + TDS Controller",
      "12 liters storage capacity",
      "Smart LED indicators",
      "Auto-flush technology",
      "Child safety lock",
    ],
    specifications: [
      { label: "Capacity", value: "12 Liters" },
      { label: "Purification Rate", value: "20 L/hour" },
      { label: "Power", value: "60 Watts" },
      { label: "Stages", value: "7 Stage" },
      { label: "Warranty", value: "2 Years" },
    ],
    idealFor: ["Home", "Small Office", "Apartment"],
    technology: ["RO", "UV", "UF", "TDS Controller"],
    benefits: [
      "Removes 99.9% impurities including heavy metals",
      "Maintains essential minerals",
      "Improves taste of water",
      "Reduces water wastage by 50%",
    ],
  },
  {
    id: "2",
    name: "PureDrop RO Essential",
    slug: "puredrop-ro-essential",
    category: "RO Water Purifiers",
    categorySlug: "ro",
    shortDescription: "Compact 5-stage RO system for everyday needs",
    description: "Perfect for small families, the PureDrop RO Essential delivers reliable water purification with a space-saving design. Its 5-stage filtration ensures safe, clean drinking water while being energy efficient.",
    image: "/placeholder.svg",
    features: [
      "5-stage purification",
      "RO + UV technology",
      "8 liters storage",
      "Energy efficient",
      "Quick-change filters",
    ],
    specifications: [
      { label: "Capacity", value: "8 Liters" },
      { label: "Purification Rate", value: "15 L/hour" },
      { label: "Power", value: "45 Watts" },
      { label: "Stages", value: "5 Stage" },
      { label: "Warranty", value: "1 Year" },
    ],
    idealFor: ["Small Family", "Studio Apartment", "PG Accommodation"],
    technology: ["RO", "UV"],
    benefits: [
      "Compact design saves space",
      "Low power consumption",
      "Easy filter replacement",
      "Affordable maintenance",
    ],
  },
  // UV Water Purifiers
  {
    id: "3",
    name: "PureDrop UV Shield",
    slug: "puredrop-uv-shield",
    category: "UV Water Purifiers",
    categorySlug: "uv",
    shortDescription: "High-intensity UV purifier for municipal water",
    description: "Designed for areas with clean municipal water supply, the PureDrop UV Shield uses powerful UV-C technology to eliminate bacteria and viruses without altering the natural taste and minerals of your water.",
    image: "/placeholder.svg",
    features: [
      "High-intensity UV lamp",
      "Stainless steel chamber",
      "No water wastage",
      "Retains natural minerals",
      "Low maintenance",
    ],
    specifications: [
      { label: "Flow Rate", value: "2 L/minute" },
      { label: "UV Lamp Life", value: "8000 hours" },
      { label: "Power", value: "11 Watts" },
      { label: "Warranty", value: "1 Year" },
    ],
    idealFor: ["Home with Municipal Water", "Office", "Restaurant"],
    technology: ["UV-C"],
    benefits: [
      "Zero water wastage",
      "Preserves natural minerals",
      "No electricity fluctuation issues",
      "Silent operation",
    ],
  },
  // Gravity Filters
  {
    id: "4",
    name: "PureDrop Gravity Pure",
    slug: "puredrop-gravity-pure",
    category: "Gravity Filters",
    categorySlug: "gravity",
    shortDescription: "Non-electric gravity-based water filter",
    description: "The PureDrop Gravity Pure is perfect for areas with power outages or low TDS water. Using natural gravity filtration with activated carbon and ceramic filters, it provides clean water without electricity.",
    image: "/placeholder.svg",
    features: [
      "No electricity required",
      "Ceramic + Carbon filtration",
      "18 liters capacity",
      "Transparent design",
      "Easy maintenance",
    ],
    specifications: [
      { label: "Capacity", value: "18 Liters" },
      { label: "Filter Life", value: "6 months" },
      { label: "Material", value: "Food-grade plastic" },
      { label: "Warranty", value: "1 Year" },
    ],
    idealFor: ["Rural Areas", "Areas with Power Issues", "Budget-conscious Families"],
    technology: ["Ceramic Filter", "Activated Carbon"],
    benefits: [
      "Works without electricity",
      "Very low running cost",
      "Easy to maintain",
      "Portable design",
    ],
  },
  // Whole House Filters
  {
    id: "5",
    name: "PureDrop Home Guard",
    slug: "puredrop-home-guard",
    category: "Whole House Filters",
    categorySlug: "whole-house",
    shortDescription: "Complete home water filtration system",
    description: "Protect your entire home with the PureDrop Home Guard. This comprehensive filtration system treats water at the entry point, ensuring every tap in your home delivers clean, filtered water.",
    image: "/placeholder.svg",
    features: [
      "Point-of-entry installation",
      "Multi-stage filtration",
      "High flow rate",
      "Sediment + Carbon filters",
      "Water softening option",
    ],
    specifications: [
      { label: "Flow Rate", value: "40 L/minute" },
      { label: "Coverage", value: "Up to 4 bathrooms" },
      { label: "Filter Life", value: "12 months" },
      { label: "Warranty", value: "3 Years" },
    ],
    idealFor: ["Large Home", "Villa", "Bungalow"],
    technology: ["Sediment Filter", "Carbon Block", "Water Softener"],
    benefits: [
      "Filtered water in every tap",
      "Protects appliances from scale",
      "Better for skin and hair",
      "Extends plumbing life",
    ],
  },
  // Commercial Systems
  {
    id: "6",
    name: "PureDrop Commercial Pro",
    slug: "puredrop-commercial-pro",
    category: "Commercial Systems",
    categorySlug: "commercial",
    shortDescription: "Industrial-grade water purification for businesses",
    description: "Built for high-demand environments, the PureDrop Commercial Pro delivers industrial-strength water purification for offices, schools, hospitals, and factories with continuous high-volume clean water output.",
    image: "/placeholder.svg",
    features: [
      "High-capacity system",
      "24/7 operation ready",
      "Multiple outlet support",
      "Remote monitoring",
      "Commercial-grade components",
    ],
    specifications: [
      { label: "Capacity", value: "500 L/hour" },
      { label: "Tank", value: "100 Liters SS" },
      { label: "Power", value: "250 Watts" },
      { label: "Warranty", value: "5 Years" },
    ],
    idealFor: ["Office", "School", "Hospital", "Factory", "Restaurant"],
    technology: ["Industrial RO", "UV", "Ozone"],
    benefits: [
      "Serves 500+ people daily",
      "Low per-liter cost",
      "Professional service support",
      "Scalable capacity",
    ],
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}
