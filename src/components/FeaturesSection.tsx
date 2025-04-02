import { useEffect, useRef, useState } from "react";

const featureCircles = [
  {
    title: "Zero Adulteration",
    description:
      "Experience the health benefits with our Zero Adulteration Food",
    image: "/assets/images/ADULTERATION FREE FOOD.png",
  },
  {
    title: "Direct From Farmers",
    description:
      "Taste the authenticity - sourced directly from Passionate Farmers",
    image: "/assets/images/DIRECT FROM FARMER COMMUNITY.png",
  },
  {
    title: "Traditionally Made",
    description:
      "Experience the rich heritage of traditionally made foods in Villages",
    image: "/assets/images/Traditionally Made.png",
  },
  {
    title: "Empowering Women",
    description:
      "Support rural women through their skills. Together, we create a brighter future",
    image: "/assets/images/Empowering Rural Women.png",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null); // Changed from HTMLElement to HTMLDivElement
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pb-10 overflow-hidden bg-yellow-theme"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 mt-8">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-green-brand mb-6 opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            We Are Purpose Driven
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-14">
          {featureCircles.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center opacity-0 ${
                inView ? "animate-fadeIn" : ""
              }`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mb-6 overflow-hidden border border-black/20">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base sm:text-lg md:text-2xl font-normal text-[#121212] mb-3 text-center tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-800/70 text-center px-2 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
