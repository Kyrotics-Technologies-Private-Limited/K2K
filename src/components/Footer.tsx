// //import React from 'react';
// import { Leaf, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-green-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Brand Section */}
//           <div className="md:col-span-1">
//             <div className="flex items-center mb-4">
//               <Leaf className="h-8 w-8 text-green-400" />
//               <span className="ml-2 text-xl font-semibold">Kishan2Kitchen</span>
//             </div>
//             <p className="text-gray-300 mb-4">
//               Bringing nature's finest organic products to your doorstep.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-300 hover:text-white transition">
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition">
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition">
//                 <Twitter className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Categories</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   Honey
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   Essential Oils
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   Herbal Products
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-gray-300 hover:text-white transition"
//                 >
//                   Skincare
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
//             <p className="text-gray-300 mb-4">
//               Subscribe to our newsletter for the latest products and organic
//               living tips.
//             </p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
//               />
//               <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition">
//                 <Mail className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-green-800 mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-300 text-sm">
//               © 2025 Kishan2Kitchen. All rights reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               <a
//                 href="/privacypolicy"
//                 className="text-gray-300 hover:text-white text-sm transition"
//               >
//                 Privacy Policy
//               </a>
//               <a
//                 href="/termsofservice"
//                 className="text-gray-300 hover:text-white text-sm transition"
//               >
//                 Terms of Service
//               </a>
//               <a
//                 href="/shipping"
//                 className="text-gray-300 hover:text-white text-sm transition"
//               >
//                 Shipping Info
//               </a>

//               <a
//                 href="/refund"
//                 className="text-gray-300 hover:text-white text-sm transition"
//               >
//                 Refund Policy
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Leaf, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-green-brand">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <Leaf className="h-10 w-10 text-green-300" />
              <span className="ml-3 text-2xl font-bold text-white">
                Kishan2Kitchen
              </span>
            </div>
            <p className="text-green-100 mb-6 text-lg leading-relaxed">
              Bringing nature's finest organic products to your doorstep.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, name: "Instagram" },
                { icon: Facebook, name: "Facebook" },
                { icon: Twitter, name: "Twitter" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="text-green-200 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-0.5"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-green-700/50">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Shop", "About Us", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-green-100 hover:text-white transition-all hover:underline hover:underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-green-700/50">
              Categories
            </h3>
            <ul className="space-y-3">
              {["Honey", "Essential Oils", "Herbal Products", "Skincare"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-green-100 hover:text-white transition-all hover:underline hover:underline-offset-4"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-green-700/50">
              Stay Updated
            </h3>
            <p className="text-green-100 mb-6 text-base leading-relaxed">
              Subscribe to our newsletter for the latest products and organic
              living tips.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-5 py-3 pr-16 rounded-lg border border-green-600/50 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-brand hover:bg-green-700 text-white p-2 rounded-md transition-all flex items-center justify-center shadow-lg hover:shadow-green-500/20"
                aria-label="Subscribe"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-xs text-green-200/80">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="border-t border-green-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-200/80 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Kishan2Kitchen. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Shipping Info",
                "Refund Policy",
              ].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "")}`}
                  className="text-green-200/80 hover:text-white text-sm transition-all hover:underline hover:underline-offset-4"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;