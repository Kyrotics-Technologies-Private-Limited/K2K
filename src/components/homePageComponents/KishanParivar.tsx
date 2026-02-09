

import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const KishanParivar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[rgba(255,255,255,0.75)] py-16 px-4">
      {/* New Heading Section */}
      <div className="max-w-3xl mb-12 px-4 mx-auto text-center">
        <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold">
           Become a Member of Kishan Parivar
        </h1>
        <p className="text-sm md:text-base text-gray-800/90 mt-2 max-w-xl mx-auto">
          Eat better. Live healthier. Save smarter.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch px-4 sm:px-6 lg:px-8">
        {/* Left Side - Card (same size as right div) */}
        <div className="w-full lg:w-1/2 flex  min-h-0">
          <div className="w-full h-full flex justify-center items-center  lg:p-6">
            <img
              src="/assets/membershiphomeimg/FINAL.png"
              alt="Kishan Parivar Membership"
              className="w-full h-full max-w-[550px] max-h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side - Features (same size as left card) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
          The Kishan Parivar Advantage 
          </h2>

          <ul ref={featuresRef} className="space-y-3 mb-12">
            {[
              {
                icon: <CheckCircle size={24} className="text-green-brand" />,
                heading: "Freshly Prepared for Your Order",

              },
              {
                icon: <CheckCircle size={22} className="text-green-brand" />,
                heading: "Flat upto 10% Savings on Every Order",
                // text: "Enjoy savings from day one. With the Kishan Parivar Card, you receive a flat 10% discount on every purchase — no coupons, no conditions.",
                highlight: true,
              },
              {
                icon: <CheckCircle size={22} className="text-green-brand" />,
                heading: "Personalized Family Wellness Consultation",
                // text: "We go beyond food.  a member, you'll gain access to exclusive wellness guides, diet tips, and lifestyle insights curated by health experts — helping you live a healthier, happier life.",
                highlight: true,
              },
              {
                icon: <CheckCircle size={22} className="text-green-brand" />,
                heading: "Free Annual Health Check-ups",
                // text: "Loyalty comes with care. Spend ₹1,00,000 in a year and unlock two complimentary health check-ups annually — for you and your family.",
                highlight: true,
              },
            ].map((item, index) => (
              <li
                key={index}
                className={`flex items-start gap-3 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
                  }`}
                style={{
                  transitionDelay: isVisible ? `${index * 0.2}s` : `${(3 - index) * 0.1}s`,
                }}
              >
                {item.icon}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-800 mb-2">
                    {item.heading}
                  </h3>
                  {/* <p className="text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p> */}
                </div>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/kishanParivarPage#membership-plans"
              className="button bg-green-brand text-white font-semibold py-2.5 px-8 text-base rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg text-center"
            >
              Join Now
            </Link >
            <Link
              to="/kishanParivarPage"
              className="button border-2 border-green-brand text-green-brand hover:bg-green-50 font-medium py-2.5 px-8 text-base rounded-lg transition-colors text-center"
            >
              Know More
            </Link>
          </div>

          {/* <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">
            <CheckCircle size={16} className="text-green-brand" />
            <span>1,25,000+ farmers already members</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default KishanParivar;
