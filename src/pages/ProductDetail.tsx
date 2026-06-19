import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Home, 
  Building2, 
  GraduationCap,
  Shield,
  Droplets,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { getProductBySlug, getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import productROMax from "@/assets/product-ro-max.jpg";
import productUVShield from "@/assets/product-uv-shield.jpg";
import productGravityPure from "@/assets/product-gravity-pure.jpg";
import productCommercialPro from "@/assets/product-commercial-pro.jpg";
import { API_URL } from "@/lib/api";

const productImages: Record<string, string> = {
  "puredrop-ro-max": productROMax,
  "puredrop-ro-essential": productROMax,
  "puredrop-uv-shield": productUVShield,
  "puredrop-gravity-pure": productGravityPure,
  "puredrop-home-guard": productCommercialPro,
  "puredrop-commercial-pro": productCommercialPro,
};

const idealForIcons: Record<string, React.ElementType> = {
  Home: Home,
  "Small Office": Building2,
  Office: Building2,
  School: GraduationCap,
  Hospital: Shield,
  Factory: Building2,
  Restaurant: Building2,
  Apartment: Home,
  "Small Family": Home,
  "Studio Apartment": Home,
  "PG Accommodation": Home,
  "Large Home": Home,
  Villa: Home,
  Bungalow: Home,
  "Rural Areas": Home,
  "Areas with Power Issues": Home,
  "Budget-conscious Families": Home,
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const found = data.find((p: any) => p.slug === slug);
          setProduct(found);
          setRelatedProducts(data.filter((p: any) => p.slug !== slug).slice(0, 3));
        } else {
          throw new Error("Empty data");
        }
      })
      .catch((err) => {
        console.log("Failed to fetch products from backend, using local copy.", err);
        const found = getProductBySlug(slug || "");
        setProduct(found);
        setRelatedProducts(getFeaturedProducts().filter((p) => p.slug !== slug).slice(0, 3));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <Button variant="water" asChild>
              <Link to="/products">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getProductImage = () => {
    if (!product.image) return productROMax;
    if (product.image.startsWith("http")) return product.image;
    if (product.image.startsWith("/uploads")) return `${API_URL}${product.image}`;
    return productImages[product.slug] || productROMax;
  };
  const imageSrc = getProductImage();

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="lg:sticky lg:top-32">
                <div className="bg-muted rounded-3xl overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 water-gradient text-primary-foreground text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technology */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Technology Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.technology.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Ideal For
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.idealFor.map((use) => {
                    const IconComponent = idealForIcons[use] || Home;
                    return (
                      <div
                        key={use}
                        className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg"
                      >
                        <IconComponent className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">{use}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="hero" size="lg" className="flex-1" asChild>
                  <Link to={`/contact?product=${product.slug}`}>
                    Request a Quote
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="flex-1" asChild>
                  <a href="tel:+1800123456">
                    Call: 1800-123-456
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 section-gradient">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Specs Table */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Specifications
              </h2>
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={index % 2 === 0 ? "bg-muted/50" : ""}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground font-medium text-sm sm:text-base">
                          {spec.label}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-foreground font-semibold text-right text-sm sm:text-base">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Benefits
              </h2>
              <div className="space-y-4">
                {product.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-full water-gradient flex items-center justify-center flex-shrink-0">
                      <Droplets className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <p className="text-foreground pt-2">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Related Products
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
