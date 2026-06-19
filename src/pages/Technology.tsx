import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Zap, Filter, Layers, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const technologies = [
  {
    id: "ro",
    name: "Reverse Osmosis (RO)",
    icon: Filter,
    description: "RO works like a super-fine net that blocks almost everything except water molecules.",
    howItWorks: "Water is pushed through a special membrane with tiny holes. Only pure water molecules can pass through, leaving behind impurities, dissolved salts, and harmful substances.",
    removes: ["Dissolved salts (TDS)", "Heavy metals", "Arsenic & fluoride", "Bacteria & viruses"],
    bestFor: "Areas with high TDS water (above 500 ppm), hard water, or water with heavy metal contamination.",
    analogy: "Think of it like a coffee filter, but 1000 times finer. The filter blocks everything except pure water.",
  },
  {
    id: "uv",
    name: "Ultraviolet (UV) Disinfection",
    icon: Zap,
    description: "UV light kills germs by destroying their DNA, making them harmless.",
    howItWorks: "Water passes through a chamber where it's exposed to powerful UV-C light. This light damages the genetic material of bacteria, viruses, and parasites, preventing them from reproducing.",
    removes: ["Bacteria", "Viruses", "Parasites", "Cysts"],
    bestFor: "Municipal water supply that's already relatively clean but may contain microorganisms.",
    analogy: "It's like sunlight killing germs on a surface, but much more powerful and focused.",
  },
  {
    id: "uf",
    name: "Ultrafiltration (UF)",
    icon: Layers,
    description: "UF uses hollow fiber membranes to remove suspended particles and microbes.",
    howItWorks: "Water is pushed through hollow fiber membranes with microscopic pores. These pores are small enough to block bacteria and suspended particles but allow water and dissolved minerals to pass.",
    removes: ["Bacteria", "Suspended particles", "Colloidal particles", "Some viruses"],
    bestFor: "Water with low TDS but visible impurities or bacterial contamination. Works without electricity.",
    analogy: "Like a very fine cloth that catches tiny particles invisible to the naked eye.",
  },
  {
    id: "alkaline",
    name: "Alkaline & Mineral Enhancement",
    icon: Droplets,
    description: "Adds beneficial minerals back to purified water for better taste and health.",
    howItWorks: "After purification, water passes through mineral cartridges that add calcium, magnesium, and other essential minerals. This also raises the pH level slightly, making water alkaline.",
    removes: [],
    adds: ["Calcium", "Magnesium", "Potassium", "Trace minerals"],
    bestFor: "People who want enhanced, mineral-rich water with a balanced pH level.",
    analogy: "It's like adding a pinch of healthy seasoning to make plain water more nutritious.",
  },
];

const filtrationStages = [
  { stage: 1, name: "Sediment Filter", description: "Removes dust, rust, and large particles", color: "bg-amber-500" },
  { stage: 2, name: "Pre-Carbon Filter", description: "Absorbs chlorine and organic impurities", color: "bg-gray-500" },
  { stage: 3, name: "RO Membrane", description: "Removes dissolved impurities and salts", color: "bg-primary" },
  { stage: 4, name: "UV Chamber", description: "Kills bacteria and viruses with UV light", color: "bg-violet-500" },
  { stage: 5, name: "UF Membrane", description: "Extra protection against microorganisms", color: "bg-secondary" },
  { stage: 6, name: "Post-Carbon Filter", description: "Polishes water and improves taste", color: "bg-gray-600" },
  { stage: 7, name: "Mineral Cartridge", description: "Adds healthy minerals back", color: "bg-accent" },
];

export default function Technology() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 section-gradient relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Technology
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              How We Make Water
              <span className="water-gradient-text"> Pure & Safe</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding water purification doesn't have to be complicated. 
              Here's a simple explanation of the technologies we use to give you clean, healthy water.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Multi-Stage Filtration */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              7-Stage Purification Process
            </h2>
            <p className="text-muted-foreground">
              Our advanced purifiers use multiple stages to ensure every drop is perfectly clean.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 water-gradient rounded-full transform -translate-y-1/2" />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {filtrationStages.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className={`w-16 h-16 ${stage.color} rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg relative z-10`}>
                    {stage.stage}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {stage.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Details */}
      <section className="py-20 section-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Technology Explained Simply
            </h2>
            <p className="text-muted-foreground">
              No jargon, just simple explanations of how each technology works to protect your family.
            </p>
          </motion.div>

          <div className="space-y-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-3xl p-8 shadow-card border border-border"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl water-gradient flex items-center justify-center">
                        <tech.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {tech.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {tech.description}
                    </p>
                    
                    {/* Analogy */}
                    <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">Simple Example:</span> {tech.analogy}
                      </p>
                    </div>
                  </div>

                  {/* How it works */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">How It Works</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tech.howItWorks}
                    </p>
                    
                    <h4 className="font-semibold text-foreground mt-6 mb-3">Best For</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tech.bestFor}
                    </p>
                  </div>

                  {/* What it removes/adds */}
                  <div>
                    {tech.removes.length > 0 && (
                      <>
                        <h4 className="font-semibold text-foreground mb-3">What It Removes</h4>
                        <div className="flex flex-wrap gap-2">
                          {tech.removes.map((item) => (
                            <span
                              key={item}
                              className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs"
                            >
                              ✗ {item}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    
                    {tech.adds && (
                      <>
                        <h4 className="font-semibold text-foreground mt-4 mb-3">What It Adds</h4>
                        <div className="flex flex-wrap gap-2">
                          {tech.adds.map((item) => (
                            <span
                              key={item}
                              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs"
                            >
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Which Technology is Right for You?
            </h2>
            <p className="text-muted-foreground">
              The best purifier depends on your water source and quality.
            </p>
          </motion.div>

          <div className="bg-card rounded-3xl shadow-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Water Type</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">RO</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">UV</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">UF</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Gravity</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "High TDS (Hard Water)", ro: true, uv: false, uf: false, gravity: false },
                    { type: "Municipal Supply", ro: true, uv: true, uf: true, gravity: true },
                    { type: "Borewell Water", ro: true, uv: false, uf: false, gravity: false },
                    { type: "Low TDS Water", ro: false, uv: true, uf: true, gravity: true },
                    { type: "No Electricity Area", ro: false, uv: false, uf: true, gravity: true },
                  ].map((row, index) => (
                    <tr key={row.type} className={index % 2 === 0 ? "" : "bg-muted/30"}>
                      <td className="px-6 py-4 text-foreground font-medium">{row.type}</td>
                      <td className="px-6 py-4 text-center">
                        {row.ro ? (
                          <span className="text-accent text-xl">✓</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.uv ? (
                          <span className="text-accent text-xl">✓</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.uf ? (
                          <span className="text-accent text-xl">✓</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.gravity ? (
                          <span className="text-accent text-xl">✓</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 section-gradient">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Still Confused? We're Here to Help
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our water experts can analyze your water and recommend the perfect purification system for your needs.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get Free Water Analysis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
