import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import productROMax from "@/assets/product-ro-max.jpg";
import productUVShield from "@/assets/product-uv-shield.jpg";
import productGravityPure from "@/assets/product-gravity-pure.jpg";
import productCommercialPro from "@/assets/product-commercial-pro.jpg";

const productImages: Record<string, string> = {
  "puredrop-ro-max": productROMax,
  "puredrop-ro-essential": productROMax,
  "puredrop-uv-shield": productUVShield,
  "puredrop-gravity-pure": productGravityPure,
  "puredrop-home-guard": productCommercialPro,
  "puredrop-commercial-pro": productCommercialPro,
};

import { API_URL } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const getProductImage = () => {
    if (!product.image) return productROMax;
    if (product.image.startsWith("http")) return product.image;
    if (product.image.startsWith("/uploads")) return `${API_URL}${product.image}`;
    return productImages[product.slug] || productROMax;
  };
  const imageSrc = getProductImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Key Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.technology.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="water" size="sm" className="flex-1" asChild>
            <Link to={`/products/${product.slug}`}>
              View Details
            </Link>
          </Button>
          <Button variant="default" size="sm" className="flex-1" asChild>
            <Link to={`/contact?product=${product.slug}`}>
              Enquire
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
