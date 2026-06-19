import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { testimonials as localTestimonials } from "@/data/testimonials";
import { API_URL } from "@/lib/api";

export default function Testimonials() {
  const [testimonialsList, setTestimonialsList] = useState<any[]>(localTestimonials);

  useEffect(() => {
    fetch(`${API_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonialsList(data);
        }
      })
      .catch((err) => console.log("Failed to fetch testimonials from backend, using local copy.", err));
  }, []);

  return (
    <Layout>
      <section className="pt-32 pb-16 section-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Testimonials</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">What Our <span className="water-gradient-text">Customers Say</span></h1>
            <p className="text-lg text-muted-foreground">Real stories from real families who chose PureDrop for their water needs.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsList.map((testimonial, index) => (
              <TestimonialCard key={testimonial._id || testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 section-gradient">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Join Our Happy Customers</h2>
          <p className="text-muted-foreground mb-8">Experience clean, safe water for your family today.</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Get Your Quote <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
