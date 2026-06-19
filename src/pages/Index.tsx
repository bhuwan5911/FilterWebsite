import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Droplets, 
  Shield, 
  Banknote, 
  Wrench, 
  Headphones, 
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Users,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { getFeaturedProducts } from "@/data/products";
import { getFeaturedTestimonials } from "@/data/testimonials";
import heroImage from "@/assets/hero-water-purifier.jpg";
import { API_URL } from "@/lib/api";

const features = [
  {
    icon: Shield,
    title: "99.9% Impurity Removal",
    description: "Our advanced filtration removes bacteria, viruses, heavy metals, and dissolved impurities.",
  },
  {
    icon: Banknote,
    title: "Saves Money",
    description: "Stop buying expensive bottled water. One PureDrop system pays for itself in months.",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description: "Professional installation in under 2 hours. We handle everything from start to finish.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support. We're here whenever you need us.",
  },
];

const stats = [
  { icon: Users, value: "1,00,000+", label: "Happy Customers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Customer Support" },
  { icon: Star, value: "4.9/5", label: "Customer Rating" },
];

const certifications = [
  { name: "ISO 9001", subtitle: "Quality Management" },
  { name: "WHO", subtitle: "Standards Compliant" },
  { name: "NSF", subtitle: "Certified Safe" },
  { name: "ISI", subtitle: "India Standard" },
];

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedProducts(data.slice(0, 4));
        } else {
          setFeaturedProducts(getFeaturedProducts());
        }
      })
      .catch(() => {
        setFeaturedProducts(getFeaturedProducts());
      });

    // Fetch testimonials
    fetch(`${API_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedTestimonials(data.slice(0, 3));
        } else {
          setFeaturedTestimonials(getFeaturedTestimonials(3));
        }
      })
      .catch(() => {
        setFeaturedTestimonials(getFeaturedTestimonials(3));
      });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                #1 Trusted Water Solutions
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Pure, Safe Water
                <span className="block water-gradient-text">For Every Home</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Advanced water filtration you can trust. Give your family the gift of clean, 
                healthy water with PureDrop's certified purification systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/products">
                    View Products
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-background"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">1,00,000+ Happy Customers</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="PureDrop Water Purifier"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-elevated"
                />
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -left-4 top-1/4 glass rounded-2xl p-4 shadow-water hidden sm:flex"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full water-gradient flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">99.9% Pure</p>
                      <p className="text-sm text-muted-foreground">Certified Safe</p>
                    </div>
                  </div>
                </motion.div>
                {/* Floating Badge 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-4 bottom-1/4 glass rounded-2xl p-4 shadow-water hidden sm:flex"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <Droplets className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Eco-Friendly</p>
                      <p className="text-sm text-muted-foreground">Reduce Plastic</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-primary-light mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 section-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why PureDrop?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Smart Choice for Your Family
            </h2>
            <p className="text-muted-foreground text-lg">
              Our water purifiers are designed with your health and convenience in mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border"
              >
                <div className="w-14 h-14 rounded-xl water-gradient flex items-center justify-center mb-5">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Products
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Featured Water Solutions
              </h2>
            </div>
            <Button variant="water" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-foreground overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary-light/20 text-primary-light rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              How PureDrop Works
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Getting clean water is as easy as 1-2-3
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Choose Your System", desc: "Select the perfect purifier for your home or office needs." },
              { step: 2, title: "Professional Installation", desc: "Our experts install your system in under 2 hours." },
              { step: 3, title: "Enjoy Pure Water", desc: "Start drinking clean, safe water immediately." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 rounded-full water-gradient mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-primary-foreground animate-pulse-glow">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/70">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-light to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 section-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of happy families enjoying pure, safe water.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="water" asChild>
              <Link to="/testimonials">
                Read More Reviews
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Trusted Certifications
            </h3>
            <p className="text-muted-foreground">
              Our products meet the highest international standards
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-3 mx-auto">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <p className="font-semibold text-foreground">{cert.name}</p>
                <p className="text-sm text-muted-foreground">{cert.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 water-gradient" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
            <div className="relative z-10 text-center py-16 px-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready for Pure, Safe Water?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Get a free consultation and quote today. Our experts will help you find 
                the perfect water solution for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/contact">
                    Request Free Quote
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <a href="tel:+1800123456">
                    <Headphones className="h-5 w-5" />
                    Call: 1800-123-456
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
