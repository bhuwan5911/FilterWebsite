import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Users, Wrench, Clock, Shield, Leaf, Headphones, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const reasons = [
  { icon: Award, title: "Certified Products", description: "All products meet ISO, WHO, and NSF international standards." },
  { icon: Users, title: "1 Lakh+ Happy Customers", description: "Join over 100,000 families trusting PureDrop for clean water." },
  { icon: Wrench, title: "Trained Technicians", description: "Professional installation and service by certified experts." },
  { icon: Clock, title: "Fast Service", description: "Same-day installation and quick response to service requests." },
  { icon: Shield, title: "Affordable AMC Plans", description: "Budget-friendly maintenance plans for worry-free ownership." },
  { icon: Leaf, title: "Eco-Friendly Systems", description: "Reduce plastic waste and save money with sustainable solutions." },
];

export default function WhyChooseUs() {
  return (
    <Layout>
      <section className="pt-32 pb-16 section-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Why Choose Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Why Families Trust <span className="water-gradient-text">PureDrop</span></h1>
            <p className="text-lg text-muted-foreground">We're not just selling water purifiers. We're delivering peace of mind, health, and happiness to your family.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div key={reason.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-2xl p-6 shadow-card border border-border card-hover">
                <div className="w-14 h-14 rounded-xl water-gradient flex items-center justify-center mb-5">
                  <reason.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 section-gradient">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Ready to Experience the Difference?</h2>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Get Free Consultation <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
