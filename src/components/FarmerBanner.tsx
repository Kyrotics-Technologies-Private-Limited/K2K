// export default function FarmerBanner() {
//   return (
//     <div className="relative h-[400px] md:h-[600px] lg:h-[750px]">
//       {/* Background Image with Fixed Effect */}
//       <div
//         className="absolute inset-0 bg-fixed bg-center bg-cover"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1627920768905-575535d6dd2e')",
//         }}
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex items-center justify-center">
//         <div className="text-center text-white px-6">
//           <h2 className="text-xl md:text-5xl font-bold drop-shadow-lg">
//             Empowering Farmers, Cultivating Nature
//           </h2>
//           <p className="text-sm md:text-xl mt-4 drop-shadow-md max-w-2xl mx-auto">
//             Supporting sustainable farming and organic products for a healthier
//             future.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

const FarmerBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      imageUrl: "/assets/images/we are in a mission.png",
      alt: "Farmer working in field",
    },
    {
      id: 2,
      imageUrl: "/assets/images/WEB FOOTER IMAGE 2.png",
      alt: "Fresh produce from farm",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Manual navigation functions
  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden h-48 sm:h-56 md:h-72 lg:h-96 xl:h-112 2xl:h-128">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 h-full">
            <img
              src={slide.imageUrl}
              alt={slide.alt}
              className="w-full h-full object-contain md:object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full focus:outline-none"
        onClick={goToPrevSlide}
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full focus:outline-none"
        onClick={goToNextSlide}
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FarmerBanner;
