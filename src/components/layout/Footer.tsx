import { Link } from "react-router-dom";
import { Droplets, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  products: [
    { label: "RO Water Purifiers", href: "/products#ro" },
    { label: "UV Water Purifiers", href: "/products#uv" },
    { label: "Gravity Filters", href: "/products#gravity" },
    { label: "Whole House Filters", href: "/products#whole-house" },
    { label: "Commercial Systems", href: "/products#commercial" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Technology", href: "/technology" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
    { label: "Admin Panel", href: "/admin" },
  ],
  support: [
    { label: "FAQ", href: "/contact#faq" },
    { label: "Service Request", href: "/contact" },
    { label: "AMC Plans", href: "/products" },
    { label: "Installation Guide", href: "/technology" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Droplets className="h-8 w-8 text-primary-light" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold">
                  Pure<span className="text-primary-light">Drop</span>
                </span>
                <span className="text-[10px] text-primary-foreground/60 tracking-wider uppercase">
                  Water Solutions
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm leading-relaxed">
              Providing clean, safe drinking water solutions for homes, offices, and businesses. 
              Because every drop matters.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 text-primary-light flex-shrink-0" />
                <span className="text-sm">123 Water Street, Clean City, CC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="h-5 w-5 text-primary-light flex-shrink-0" />
                <a href="tel:+1800123456" className="text-sm hover:text-primary-light transition-colors">
                  1800-123-456 (Toll Free)
                </a>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="h-5 w-5 text-primary-light flex-shrink-0" />
                <a href="mailto:info@puredrop.com" className="text-sm hover:text-primary-light transition-colors">
                  info@puredrop.com
                </a>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} PureDrop Water Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-light/20 hover:text-primary-light transition-all duration-200"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
