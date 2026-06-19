import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

import { API_URL } from "@/lib/api";

export default function Contact() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get("product") || "";
  
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    city: "", 
    message: "" 
  });

  useEffect(() => {
    if (productSlug) {
      // Format slug into a readable name
      const readableName = productSlug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setFormData(prev => ({
        ...prev,
        message: `Hello! I would like to request a quote for "${readableName}". Please contact me with more details.`
      }));
    }
  }, [productSlug]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productSlug }),
      });

      if (!res.ok) throw new Error("Failed to submit enquiry");

      toast({ title: "Thank you!", description: "We've received your enquiry and will contact you shortly." });
      setFormData({ name: "", phone: "", email: "", city: "", message: "" });
    } catch (error) {
      toast({ title: "Submission Failed", description: "Could not submit form. Please check your connection.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 section-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Contact Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Get in <span className="water-gradient-text">Touch</span></h1>
            <p className="text-lg text-muted-foreground">Have questions? Need a quote? We're here to help you find the perfect water solution.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl water-gradient flex items-center justify-center flex-shrink-0"><MapPin className="h-6 w-6 text-primary-foreground" /></div><div><h4 className="font-semibold text-foreground">Address</h4><p className="text-muted-foreground">123 Water Street, Clean City, CC 12345</p></div></div>
                <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl water-gradient flex items-center justify-center flex-shrink-0"><Phone className="h-6 w-6 text-primary-foreground" /></div><div><h4 className="font-semibold text-foreground">Phone</h4><a href="tel:+1800123456" className="text-primary hover:underline">1800-123-456 (Toll Free)</a></div></div>
                <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl water-gradient flex items-center justify-center flex-shrink-0"><Mail className="h-6 w-6 text-primary-foreground" /></div><div><h4 className="font-semibold text-foreground">Email</h4><a href="mailto:info@puredrop.com" className="text-primary hover:underline">info@puredrop.com</a></div></div>
                <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl water-gradient flex items-center justify-center flex-shrink-0"><Clock className="h-6 w-6 text-primary-foreground" /></div><div><h4 className="font-semibold text-foreground">Working Hours</h4><p className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p></div></div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="water" size="lg" className="w-full sm:w-auto" asChild><a href="tel:+1800123456"><Phone className="h-4 w-4" />Call Now</a></Button>
                <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild><a href="https://wa.me/1800123456" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send an Enquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label className="block text-sm font-medium text-foreground mb-2">Name *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Your full name" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Your phone" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                      <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Your city" />
                    </div>
                  </div>
                  <div><label className="block text-sm font-medium text-foreground mb-2">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Your email" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-2">Message</label><textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your requirements..." /></div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit Enquiry"}<Send className="h-4 w-4" /></Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
