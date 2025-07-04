import {
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  url: string;
}

const Footer: FC = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/kishan2kitchen/",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100091401806538",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/Kishan2Kitchen",
    },
    {
      icon: Linkedin,
      name: "Linkedin",
      url: "https://www.linkedin.com/company/kishan2kitchen/",
    },
    {
      icon: Youtube,
      name: "Youtube",
      url: "https://www.youtube.com/channel/UCIxVSJfOKPV95EmOL3g3jSw",
    },
  ];

  const quickLinks = [
    { name: "Shop", path: "/all-products" },
    { name: "Our Story", path: "/our-story" },
    { name: "Blog", path: "/Blog" },
    { name: "Traceability", path: "/traceability" },
  ];
  const categories = [
    { name: "Honey", path: "/all-products?category=honey" },
    { name: "Essential Oils", path: "/all-products?category=oils" },
    { name: "Ghee", path: "/all-products?category=ghee" },
    { name: "Natural Products", path: "/all-products" },
  ];
  const policyLinks = [
    { name: "Privacy Policy", path: "/privacypolicy" },
    { name: "Terms of Service", path: "/termsofservice" },
    { name: "Shipping Info", path: "/shippinginfo" },
    { name: "Refund Policy", path: "/refundpolicy" },
  ];

  return (
    <footer className="relative bg-green-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section - Full width on mobile, 2 columns on tablet */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-start gap-4 mb-4 sm:mb-6">
              <img
                src="/assets/images/K2K Logo.png"
                alt="Kishan2Kitchen Logo"
                className="bg-white h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md"
              />
              <span className="logoFont text-xl sm:text-2xl font-bold text-white">
                Kishan2Kitchen
              </span>
            </div>
            <p className="text-green-100 mb-4 text-xs sm:text-sm leading-relaxed">
              Univillage Agro Pvt. Ltd., Uttar Narayan Pur, PO: BK Chungri, PS:
              Margram, District: Birbhum, West Bengal - 731202, India
            </p>
            <p className="text-green-100 mb-4 text-sm sm:text-base leading-relaxed">
              Bringing nature's finest organic products to your doorstep.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-all transform hover:scale-110 hover:-translate-y-0.5"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 pb-2 border-b border-green-700/50">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-green-100 hover:text-white text-sm sm:text-base transition-all hover:underline hover:underline-offset-4"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 pb-2 border-b border-green-700/50">
              Categories
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {categories.map((item) =>
                item.path ? (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-green-100 hover:text-white text-sm sm:text-base transition-all hover:underline hover:underline-offset-4"
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {/* Newsletter - Full width on mobile, 2 columns on tablet */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 pb-2 border-b border-green-700/50">
              Stay Updated
            </h3>
            <p className="text-green-100 mb-4 text-sm sm:text-base leading-relaxed">
              Subscribe to our newsletter for the latest products and organic
              living tips.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 sm:px-5 sm:py-3 pr-12 sm:pr-16 rounded-lg border border-green-600/50 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all text-sm sm:text-base"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-brand hover:bg-green-700 text-white p-1.5 sm:p-2 rounded-md transition-all flex items-center justify-center shadow-lg hover:shadow-green-500/20"
                aria-label="Subscribe"
              >
                <Mail className="button h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            <p className="mt-2 sm:mt-3 text-xs text-green-200/80">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="border-t border-green-700/50 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-200/80 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Kishan2Kitchen. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              {policyLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-green-200/80 hover:text-white text-xs sm:text-sm transition-all hover:underline hover:underline-offset-4"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
