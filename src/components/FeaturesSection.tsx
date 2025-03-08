import React, { useEffect, useRef } from "react";
import { Leaf, Droplets, PackageCheck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description:
      "All our products are certified organic, sourced from trusted farmers and producers who share our commitment to quality and sustainability.",
  },
  {
    icon: Droplets,
    title: "Pure & Natural",
    description:
      "No artificial preservatives or additives. We maintain the natural integrity of our products from source to shelf.",
  },
  {
    icon: PackageCheck,
    title: "Eco-Friendly Packaging",
    description:
      "Our packaging is made from recycled materials and is 100% biodegradable, minimizing our environmental impact.",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // Only update if the section is visible in the viewport.
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const parallaxElements =
          sectionRef.current.querySelectorAll("[data-parallax]");
        parallaxElements.forEach((element) => {
          const speed = parseFloat(
            element.getAttribute("data-parallax") || "0"
          );
          // Compute the translation based on the section's current position.
          const yValue = -rect.top * speed;

          // If the element is the background, add a scale factor to ensure full coverage.
          if (element.getAttribute("data-bg") === "true") {
            (
              element as HTMLElement
            ).style.transform = `translate3d(0, ${yValue}px, 0) scale(1.2)`;
          } else {
            (
              element as HTMLElement
            ).style.transform = `translate3d(0, ${yValue}px, 0)`;
          }
        });
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax(); // Initial update
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Oversized background container with extra margin (and scale in JS) to cover gaps */}
      <div
        data-parallax="0.4"
        data-bg="true"
        className="absolute top-[-20%] left-0 right-0 bottom-[-20%] bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1615472910606-9d4f7291944f?auto=format&fit=crop&q=80&w=2000)",
          willChange: "transform",
        }}
      >
        <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm" />
      </div>

      <div
        data-parallax="0.1"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ willChange: "transform" }}
      >
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4 opacity-0 animate-fadeIn"
            style={{ animationDelay: "0s" }}
          >
            Why Choose Kishan2Kitchen?
          </h2>
          <p
            className="text-lg text-white/90 max-w-2xl mx-auto opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            We're committed to bringing you the finest organic products while
            protecting our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center transform hover:-translate-y-1 transition-transform duration-300 opacity-0 animate-fadeIn"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <feature.icon className="w-12 h-12 text-green-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
