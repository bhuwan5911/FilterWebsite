import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  MapPin, 
  Calendar,
  ArrowRight,
  Droplets
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const values = [
  {
    icon: Heart,
    title: "Health First",
    description: "Every product we create prioritizes the health and safety of your family.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "We listen, understand, and deliver solutions that truly meet your needs.",
  },
  {
    icon: Droplets,
    title: "Quality Water",
    description: "We believe clean water is a right, not a privilege. We make it accessible.",
  },
];

const milestones = [
  { year: "2009", title: "Company Founded", description: "Started with a vision to provide clean water for all." },
  { year: "2012", title: "First Commercial System", description: "Launched our commercial water purification line." },
  { year: "2015", title: "100,000 Customers", description: "Reached our first major customer milestone." },
  { year: "2018", title: "National Expansion", description: "Extended services to all major cities in India." },
  { year: "2022", title: "Eco-Friendly Initiative", description: "Launched sustainable, low-waste purification systems." },
  { year: "2024", title: "1 Million+ Served", description: "Over 1 million happy customers and growing." },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 section-gradient relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Story of
              <span className="water-gradient-text"> Pure Water</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For over 15 years, PureDrop has been on a mission to bring clean, safe drinking water 
              to every home, office, and community. What started as a small team with a big dream 
              has grown into one of India's most trusted water purification brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 shadow-card border border-border"
            >
              <div className="w-16 h-16 rounded-2xl water-gradient flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide affordable, reliable, and eco-friendly water purification solutions 
                that ensure every family has access to clean and safe drinking water. We believe 
                that pure water is the foundation of a healthy life, and we're committed to making 
                it accessible to all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 shadow-card border border-border"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading water purification brand that combines innovation with 
                sustainability. We envision a future where clean water is not a luxury but 
                a standard, where our technology reduces plastic waste, and where every 
                community thrives with access to pure water.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 section-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do at PureDrop.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full water-gradient mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground">
              15 years of innovation and growth in water purification.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`w-full md:flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-card p-6 rounded-2xl shadow-card border border-border w-full md:w-auto text-left block md:inline-block">
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                      <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex w-12 h-12 rounded-full water-gradient items-center justify-center flex-shrink-0 z-10">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Locations */}
      <section className="py-20 section-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                We're Across India
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With service centers in over 100 cities and a network of trained technicians, 
                we ensure prompt installation and support wherever you are.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"].map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground border border-border"
                  >
                    <MapPin className="h-3 w-3 inline mr-1 text-primary" />
                    {city}
                  </span>
                ))}
                <span className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                  +90 more cities
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "100+", label: "Cities Served" },
                { value: "500+", label: "Service Centers" },
                { value: "2000+", label: "Trained Technicians" },
                { value: "Same Day", label: "Installation Available" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-6 text-center shadow-card border border-border"
                >
                  <p className="font-display text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Join the PureDrop Family
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the difference of clean, pure water. Contact us today for a free consultation.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
