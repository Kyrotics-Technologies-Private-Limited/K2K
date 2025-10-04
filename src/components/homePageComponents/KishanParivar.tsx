

import React from "react";
import {
  CheckCircle,
  CreditCard,
  Tractor,
  Sun,
  // Droplets,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const KishanParivar: React.FC = () => {
  return (
    <div className="bg-[rgba(255,255,255,0.75)] py-16 px-4">
      {/* New Heading Section */}
      <div className="max-w-3xl mb-12 px-4 mx-auto text-center">
        <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold">
          The Kishan Parivar Advantage
        </h1>
        <p className="text-sm md:text-base text-gray-800/90 mt-2 max-w-xl mx-auto">
          India's premier agricultural subscription program designed to empower
          farmers with financial tools, insurance benefits, and exclusive
          rewards.
        </p>
      </div>

      {/* Main Card Component */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden w-full max-w-3xl">
        <div className="flex flex-col lg:flex-row justify-start">
          {/* Card Section - Left Side */}
          <div className="w-full lg:w-[320px] p-4 bg-green-brand flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/K2K Logo.png"
                  alt="Kishan2Kitchen Logo"
                  className="h-8 w-8 bg-white object-cover rounded-md"
                />
                <div>
                  <h3 className="text-md font-bold text-white pt-1">
                    Kishan Parivar
                  </h3>
                  <p className="text-green-200 text-[14px] pt-2">
                    Eat Fresh • Live Healthy • Save More
                  </p>
                </div>
              </div>
              <div className="bg-green-800 p-1 rounded-lg">
                <CreditCard size={14} className="text-green-100" />
              </div>
            </div>

            {/* Card Design */}
            <div className="relative bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-3 w-full h-24 shadow-lg mb-3 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-green-700/20"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-green-500/20"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <Tractor className="text-green-200" size={16} />
                  <Sun className="text-yellow-300" size={16} />
                </div>

                <div>
                  <p className="text-green-100 text-xs tracking-wider mb-1">
                    •••• •••• •••• 1234
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-green-200 text-[10px] uppercase tracking-wider">
                        Card Holder
                      </p>
                      <p className="text-white font-medium text-xs">
                        Kishan Kumar Pandit
                      </p>
                    </div>
                    <div>
                      <p className="text-green-200 text-[10px] uppercase tracking-wider">
                        Valid Thru
                      </p>
                      <p className="text-white font-medium text-xs">03/30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-green-100">
              <ShieldCheck size={12} className="text-green-300" />
              <p className="text-[10px]">Secure & Verified Membership</p>
            </div>
          </div>

          {/* Features Section - Right Side */}
          <div className="w-full lg:flex-1 p-8 lg:p-12 bg-white">
            {/* <div className="mb-3 flex items-center gap-2 text-green-brand">
              <Droplets size={24} />
              <span className="text-base font-medium tracking-wide">EXCLUSIVE OFFER</span>
            </div> */}
            <h2 className="text-xl  font-bold text-gray-800 mb-6">
              Become a Member of Kishan Parivar
            </h2>
            {/* <p className="text-gray-600 mb-8 text-xm">
    
            </p> */}

            {/* Enhanced Features List */}
            <ul className="space-y-8 mb-12">
              {[
                {
                  icon: <CheckCircle size={24} className="text-green-brand" />,
                  heading: "Freshly Prepared After Your Order",
                  // text: "We prioritize your family's health. Every item is freshly prepared only after you place an order — ensuring maximum freshness, nutrition, and health benefits for you and your loved ones.",
                  highlight: true,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  heading: "Flat 15% Off — Always",
                  // text: "Enjoy savings from day one. With the Kishan Parivar Card, you receive a flat 10% discount on every purchase — no coupons, no conditions.",
                  highlight: true,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  heading: "Your Health, Our Promise",
                  // text: "We go beyond food. As a member, you'll gain access to exclusive wellness guides, diet tips, and lifestyle insights curated by health experts — helping you live a healthier, happier life.",
                  highlight: true,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  heading: "Free Health Check-ups",
                  // text: "Loyalty comes with care. Spend ₹1,00,000 in a year and unlock two complimentary health check-ups annually — for you and your family.",
                  highlight: true,
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  {item.icon}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-green-800 mb-2">
                      {item.heading}
                    </h3>
                    {/* <p className="text-base text-gray-600 leading-relaxed">
                      {item.text}
                    </p> */}
                  </div>
                </li>
              ))}
            </ul>

            {/* Enhanced CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/kishanParivarPage#membership-plans"
                className="button bg-green-brand text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex-1 text-center"
              >
                Subscribe Now
              </Link>
              <button className="button border-2 border-green-brand text-green-brand hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors flex-1 text-center">
                Learn More
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">
              <CheckCircle size={16} className="text-green-brand" />
              <span>1,25,000+ farmers already members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KishanParivar;
