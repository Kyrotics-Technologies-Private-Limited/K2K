import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Award, Leaf, Package, Droplets } from "lucide-react";

const GuaranteeCycle = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const guarantees = [
    {
      title: "Pure Honey",
      description:
        "Harvested from pristine locations, our honey is 100% pure with no additives",
      icon: Droplets,
      color: "amber",
    },
    {
      title: "Cold-Pressed Oil",
      description:
        "Traditional methods preserve all nutrients and natural benefits",
      icon: Leaf,
      color: "emerald",
    },
    {
      title: "Eco-Friendly Farming",
      description:
        "Sustainable practices that protect and nurture our environment",
      icon: Leaf,
      color: "green",
    },
    {
      title: "Sustainable Packaging",
      description:
        "Recyclable materials that minimize our environmental footprint",
      icon: Package,
      color: "teal",
    },
    {
      title: "Organic Certification",
      description:
        "Internationally recognized certifications guarantee quality",
      icon: Award,
      color: "blue",
    },
  ];

  // Auto-rotate through items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % guarantees.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [guarantees.length]);

  return (
    // <div className="w-full bg-gradient-to-b from-green-50 to-white rounded-2xl p-8 min-h-screen">
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 p-8 backdrop-blur-sm opacity-95">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-4xl font-bold text-green-800 ">
              Our Quality Guarantee
            </h2>
            <Shield className="w-6 h-6 text-green-600" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="text-green-700 max-w-lg mx-auto"
          >
            Every product meets our rigorous standards for purity,
            sustainability, and quality
          </motion.p>
        </div>

        {/* Main Circle Display */}
        <div className="relative h-96 mb-12 flex items-center justify-center">
          {/* Center Shield */}
          <div className="absolute z-20">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            >
              <div className="w-40 h-40 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-green-100">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-1" />
                  <div className="font-bold text-green-800 text-lg">100%</div>
                  <div className="font-bold text-green-700 text-sm">
                    GUARANTEED
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Orbital Circle */}
          <motion.div
            className="absolute w-80 h-80 rounded-full border-2 border-dashed border-green-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Guarantees */}
          {guarantees.map((item, index) => {
            // Calculate the angle for even spacing around the circle
            const angle = (index / guarantees.length) * (2 * Math.PI);
            // Radius should be half the width of the orbital circle (80px)
            const radius = 160;

            // Calculate x and y positions along the circle
            // Start from the top (12 o'clock position)
            const x = Math.cos(angle - Math.PI / 2) * radius;
            const y = Math.sin(angle - Math.PI / 2) * radius;

            const isActive = activeIndex === index;
            const IconComponent = item.icon;

            return (
              <div
                key={item.title}
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  zIndex: 10,
                }}
              >
                <motion.div
                  className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer
                   ${
                     isActive
                       ? "bg-green-600 text-white shadow-lg"
                       : "bg-white text-green-700 shadow-md"
                   } 
                   border-2 ${isActive ? "border-white" : "border-green-100"}`}
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="text-center p-1">
                    <IconComponent className="mx-auto mb-1 w-6 h-6" />
                    <p className="text-xs font-semibold leading-tight">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Featured Guarantee Detail */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md border border-green-100 max-w-2xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              {React.createElement(guarantees[activeIndex].icon, {
                className: "w-8 h-8 text-green-600",
              })}
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                {guarantees[activeIndex].title}
                <Check className="w-5 h-5 text-green-600" />
              </h3>
              <p className="text-green-700 mt-1">
                {guarantees[activeIndex].description}
              </p>
              <div className="mt-3 flex gap-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  Premium Quality
                </span>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuaranteeCycle;
