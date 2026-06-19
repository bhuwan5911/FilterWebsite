export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  type: "home" | "office" | "school" | "hospital";
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    city: "Mumbai",
    rating: 5,
    text: "Water tastes so fresh now! My kids love drinking water finally. The installation was quick and the team was very professional. Highly recommend PureDrop!",
    type: "home",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    city: "Delhi",
    rating: 5,
    text: "We installed PureDrop commercial system in our office. 200+ employees and the water quality is consistently excellent. Great after-sales support too!",
    type: "office",
  },
  {
    id: "3",
    name: "Dr. Meera Patel",
    city: "Bangalore",
    rating: 5,
    text: "As a doctor, I understand the importance of clean water. PureDrop's hospital-grade system gives us peace of mind. The maintenance team is always on time.",
    type: "hospital",
  },
  {
    id: "4",
    name: "Amit Singh",
    city: "Chennai",
    rating: 4,
    text: "Easy service and quick install. The technician explained everything clearly. Water quality improved noticeably from day one.",
    type: "home",
  },
  {
    id: "5",
    name: "Sunita Reddy",
    city: "Hyderabad",
    rating: 5,
    text: "Our school needed a reliable water solution for 500+ students. PureDrop delivered exactly what we needed. Parents are happy, we are happy!",
    type: "school",
  },
  {
    id: "6",
    name: "Vikram Malhotra",
    city: "Pune",
    rating: 5,
    text: "Switched from bottled water to PureDrop. Saving money and no more plastic waste. The water tastes even better than expensive mineral water!",
    type: "home",
  },
  {
    id: "7",
    name: "Anita Desai",
    city: "Ahmedabad",
    rating: 5,
    text: "The whole house filter changed our life. Clean water in every bathroom, kitchen has great tasting water, and our appliances are protected from scale.",
    type: "home",
  },
  {
    id: "8",
    name: "Mohammed Ali",
    city: "Kolkata",
    rating: 4,
    text: "Restaurant owner here. PureDrop commercial system handles our heavy demand without any issues. Customers often compliment our water quality!",
    type: "office",
  },
];

export function getTestimonialsByType(type: Testimonial["type"]): Testimonial[] {
  return testimonials.filter((t) => t.type === type);
}

export function getFeaturedTestimonials(count: number = 3): Testimonial[] {
  return testimonials.filter((t) => t.rating === 5).slice(0, count);
}
