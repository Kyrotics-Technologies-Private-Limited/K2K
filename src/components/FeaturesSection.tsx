// import { useEffect, useRef } from "react";
// import { Leaf, Droplets, PackageCheck } from "lucide-react";

// const features = [
//   {
//     icon: Leaf,
//     title: "100% Organic",
//     description:
//       "All our products are certified organic, sourced from trusted farmers and producers who share our commitment to quality and sustainability.",
//   },
//   {
//     icon: Droplets,
//     title: "Pure & Natural",
//     description:
//       "No artificial preservatives or additives. We maintain the natural integrity of our products from source to shelf.",
//   },
//   {
//     icon: PackageCheck,
//     title: "Eco-Friendly Packaging",
//     description:
//       "Our packaging is made from recycled materials and is 100% biodegradable, minimizing our environmental impact.",
//   },
// ];

// const FeaturesSection = () => {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     let ticking = false;

//     const updateParallax = () => {
//       if (!sectionRef.current) return;
//       const rect = sectionRef.current.getBoundingClientRect();

//       // Only update if the section is visible in the viewport.
//       if (rect.bottom > 0 && rect.top < window.innerHeight) {
//         const parallaxElements =
//           sectionRef.current.querySelectorAll("[data-parallax]");
//         parallaxElements.forEach((element) => {
//           const speed = parseFloat(
//             element.getAttribute("data-parallax") || "0"
//           );
//           // Compute the translation based on the section's current position.
//           const yValue = -rect.top * speed;

//           // If the element is the background, add a scale factor to ensure full coverage.
//           if (element.getAttribute("data-bg") === "true") {
//             (
//               element as HTMLElement
//             ).style.transform = `translate3d(0, ${yValue}px, 0) scale(1.2)`;
//           } else {
//             (
//               element as HTMLElement
//             ).style.transform = `translate3d(0, ${yValue}px, 0)`;
//           }
//         });
//       }
//       ticking = false;
//     };

//     const handleScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(updateParallax);
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     updateParallax(); // Initial update
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-24 overflow-hidden">
//       {/* Oversized background container with extra margin (and scale in JS) to cover gaps */}
//       <div
//         data-parallax="0.4"
//         data-bg="true"
//         className="absolute top-[-20%] left-0 right-0 bottom-[-20%] bg-cover bg-center z-0"
//         style={{
//           backgroundImage:
//             "url(https://images.unsplash.com/photo-1615472910606-9d4f7291944f?auto=format&fit=crop&q=80&w=2000)",
//           willChange: "transform",
//         }}
//       >
//         <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm" />
//       </div>

//       <div
//         data-parallax="0.1"
//         className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//         style={{ willChange: "transform" }}
//       >
//         <div className="text-center mb-16">
//           <h2
//             className="text-3xl md:text-4xl font-bold text-white mb-4 opacity-0 animate-fadeIn"
//             style={{ animationDelay: "0s" }}
//           >
//             We Are Purpose Driven
//           </h2>
//           {/* <p
//             className="text-lg text-white/90 max-w-2xl mx-auto opacity-0 animate-fadeIn"
//             style={{ animationDelay: "0.2s" }}
//           >
//             We're committed to bringing you the finest organic products while
//             protecting our planet.
//           </p> */}
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center transform hover:-translate-y-1 transition-transform duration-300 opacity-0 animate-fadeIn"
//               style={{ animationDelay: `${0.4 + index * 0.2}s` }}
//             >
//               <feature.icon className="w-12 h-12 text-green-400 mx-auto mb-6" />
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 {feature.title}
//               </h3>
//               <p className="text-white/80">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

import { useEffect, useRef, useState } from "react";

const featureCircles = [
  {
    title: "Zero Adulteration",
    description: "Experience the health benefits with our Zero Adulteration Food",
    image: "/assets/images/ADULTERATION FREE FOOD.png",
  },
  {
    title: "Direct From Farmers",
    description: "Taste the authenticity - sourced directly from Passionate Farmers",
    image: "/assets/images/DIRECT FROM FARMER COMMUNITY.png",
  },
  {
    title: "Traditionally Made",
    description: "Experience the rich heritage of traditionally made foods in Villages",
    image: "/assets/images/Traditionally Made.png",
  },
  {
    title: "Empowering Rural Women",
    description: "Support rural women through their skills. Together, we create a brighter future",
    image: "/assets/images/Empowering Rural Women.png",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
          <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider text-white bg-white/20 backdrop-blur-sm border border-white/20 mb-3 opacity-0 animate-fadeIn" style={{ animationDelay: "0s" }}>
            Our Philosophy
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4 opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            We Are Purpose Driven
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featureCircles.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center opacity-0 ${inView ? 'animate-fadeIn' : ''}`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="circle-image w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full mb-4 overflow-hidden glass">
                <div className="relative w-full h-full">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-white mb-3 sm:mb-3 text-center h-[40px] sm:h-[50px] flex items-center justify-center">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base md:text-base text-white/80 text-center px-1 sm:px-2">
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
