import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border relative"
    >
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full water-gradient flex items-center justify-center">
        <Quote className="h-5 w-5 text-primary-foreground" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4 pt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-foreground mb-6 leading-relaxed">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full water-gradient flex items-center justify-center text-primary-foreground font-semibold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.city}</p>
        </div>
      </div>
    </motion.div>
  );
}
