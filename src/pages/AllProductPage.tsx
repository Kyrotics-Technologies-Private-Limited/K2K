// import React from 'react';
// import { ProductGrid } from '../components/products/ProductGrid'
// import { sampleProducts } from '../mockData/SampleProduct';
// import { Brain, Heart, Leaf, Scale, Zap, Weight, Utensils, Battery, Moon, Shield } from 'lucide-react';
// import RecognizedBy from '../components/RecognizedBy';

// const AllProductPage = () => {
//   const healthIssues = [
//     {
//       title: "Mental Fatigue",
//       description: "Struggling with focus and mental clarity?",
//       icon: <Brain className="w-8 h-8 text-green-700" />,
//       bgImage: "/assets/health/mental.jpg"
//     },
//     {
//       title: "Heart Health",
//       description: "Concerned about cardiovascular wellness?",
//       icon: <Heart className="w-8 h-8 text-green-700" />,
//       bgImage: "/assets/health/heart.jpg"
//     },
//     {
//       title: "Digestive Issues",
//       description: "Experiencing gut health problems?",
//       icon: <Utensils className="w-8 h-8 text-green-700" />,
//       bgImage: "/assets/health/digestive.jpg"
//     },
//     {
//       title: "Weight Management",
//       description: "Finding it hard to maintain healthy weight?",
//       icon: <Weight className="w-8 h-8 text-green-700" />,
//       bgImage: "/assets/health/weight.jpg"
//     },
//     {
//       title: "Low Energy",
//       description: "Feeling tired and lacking vitality?",
//       icon: <Battery className="w-8 h-8 text-green-700" />,
//       bgImage: "/assets/health/energy.jpg"
//     }
//   ];

//   const naturalSolutions = [
//     {
//       title: "Brain Boost",
//       image: "/assets/solutions/brain.jpg",
//       description: "Enhanced Mental Clarity",
//       icon: <Brain className="w-8 h-8 text-green-700" />
//     },
//     {
//       title: "Heart Care",
//       image: "/assets/solutions/heart.jpg",
//       description: "Cardiovascular Support",
//       icon: <Heart className="w-8 h-8 text-green-700" />
//     },
//     {
//       title: "Gut Health",
//       image: "/assets/solutions/gut.jpg",
//       description: "Digestive Wellness",
//       icon: <Leaf className="w-8 h-8 text-green-700" />
//     },
//     {
//       title: "Weight Balance",
//       image: "/assets/solutions/weight.jpg",
//       description: "Natural Weight Management",
//       icon: <Scale className="w-8 h-8 text-green-700" />
//     },
//     {
//       title: "Energy Boost",
//       image: "/assets/solutions/energy.jpg",
//       description: "Natural Vitality",
//       icon: <Zap className="w-8 h-8 text-green-700" />
//     },
//     {
//       title: "Sleep Better",
//       image: "/assets/solutions/sleep.jpg",
//       description: "Restful Natural Sleep",
//       icon: <Moon className="w-8 h-8 text-green-700" />
//     },
//     {
//       title: "Immunity Shield",
//       image: "/assets/solutions/immunity.jpg",
//       description: "Natural Defense System",
//       icon: <Shield className="w-8 h-8 text-green-700" />
//     }
//   ];

//   return (
//     <div className='bg-white'>
//       {/* Health Issues Section */}
//       <div className="pt-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-4xl font-bold tracking-wide font-lora italic  text-center mb-3">Health Concerns?</h2>
//           <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
//             Discover natural solutions for your everyday health challenges
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
//             {healthIssues.map((issue, index) => (
//               <div
//                 key={index}
//                 className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
//               >
//                 {/* Background Image with Overlay */}
//                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                      style={{ backgroundImage: `url(${issue.bgImage})` }}>
//                   <div className="absolute inset-0 bg-[#0d6b1e]"></div>
//                 </div>

//                 {/* Content */}
//                 <div className="relative p-6 h-[220px] flex flex-col items-center justify-center text-center z-10">
//                   <div className="bg-white/95 rounded-full p-4 mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-white">
//                     {React.cloneElement(issue.icon, {
//                       className: "w-8 h-8 text-[#9F97B8] transition-colors duration-500 group-hover:text-[#39445B]"
//                     })}
//                   </div>
//                   <h3 className="text-xl font-semibold text-[#FFD87D]  font-lora italic mb-2 transition-transform duration-500 group-hover:-translate-y-1">
//                     {issue.title}
//                   </h3>
//                   <p className="text-[#E9ECEF] text-sm transition-transform duration-500 group-hover:-translate-y-1">
//                     {issue.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Banner Section */}
//       <div className="max-w-7xl mx-auto px-4">
//         <div
//           className="relative rounded-xl shadow-lg p-8 my-4 bg-cover bg-center h-[300px]"
//           style={{
//             backgroundImage: 'url("/assets/bannerimg/banner.jpg")',
//           }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
//           <div className="relative z-10 text-center">
//             <h1 className="text-2xl font-bold font-titillium text-white mb-4">DID YOU KNOW ?</h1>
//             <p className="text-gray-100 max-w-2xl mx-auto">
//               Carefully sourced from nature, minimally processed, and delivered fresh to your door. Each
//               product maintains its natural goodness and nutritional integrity.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Natural Solutions Section */}
//       <div className="max-w-7xl mx-auto px-4">
//         <ProductGrid products={sampleProducts} />
//       </div>

//       {/* Bottom Banner Section */}
//       <div className="max-w-7xl mx-auto px-4">
//         <div
//           className="relative rounded-xl shadow-lg p-8 my-4 bg-cover bg-center h-[300px]"
//           style={{
//             backgroundImage: 'url("/assets/honeyimg/honey.jpeg")',
//           }}
//         >
//           <div className="absolute inset-0  rounded-xl"></div>

//         </div>
//       </div>
//       <div className=" py-4">
//       <RecognizedBy />
//       </div>
//     </div>
//   );
// }

// export default AllProductPage;

import React, { useEffect, useState } from "react";
import { ProductGrid } from "../components/products/ProductGrid";
// import { sampleProducts } from "../mockData/SampleProduct";
import {
  Brain,
  Heart,
  // Leaf,
  // Scale,
  // Zap,
  Weight,
  Utensils,
  Battery,
  // Moon,
  // Shield,
 
} from "lucide-react";
import RecognizedBy from "../components/homePageComponents/RecognizedBy";
import { productApi } from '../services/api/productApi'
import { Product } from "../types";
import { useSearchParams } from "react-router-dom";

const AllProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  // Scroll to product grid if category is selected
  if (categoryParam) {
    const productGridSection = document.getElementById('product-grid-section');
    if (productGridSection) {
      productGridSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, [categoryParam]);

  const healthIssues = [
    {
      title: "Mental Fatigue",
      description: "Struggling with focus and mental clarity?",
      icon: <Brain className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/mental.jpg",
    },
    {
      title: "Heart Health",
      description: "Concerned about cardiovascular wellness?",
      icon: <Heart className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/heart.jpg",
    },
    {
      title: "Digestive Issues",
      description: "Experiencing gut health problems?",
      icon: <Utensils className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/digestive.jpg",
    },
    {
      title: "Weight Management",
      description: "Finding it hard to maintain healthy weight?",
      icon: <Weight className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/weight.jpg",
    },
    {
      title: "Low Energy",
      description: "Feeling tired and lacking vitality?",
      icon: <Battery className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/energy.jpg",
    },
  ];

  // const naturalSolutions = [
  //   {
  //     title: "Brain Boost",
  //     image: "/assets/solutions/brain.jpg",
  //     description: "Enhanced Mental Clarity",
  //     icon: <Brain className="w-8 h-8 text-green-700" />,
  //   },
  //   {
  //     title: "Heart Care",
  //     image: "/assets/solutions/heart.jpg",
  //     description: "Cardiovascular Support",
  //     icon: <Heart className="w-8 h-8 text-green-700" />,
  //   },
  //   {
  //     title: "Gut Health",
  //     image: "/assets/solutions/gut.jpg",
  //     description: "Digestive Wellness",
  //     icon: <Leaf className="w-8 h-8 text-green-700" />,
  //   },
  //   {
  //     title: "Weight Balance",
  //     image: "/assets/solutions/weight.jpg",
  //     description: "Natural Weight Management",
  //     icon: <Scale className="w-8 h-8 text-green-700" />,
  //   },
  //   {
  //     title: "Energy Boost",
  //     image: "/assets/solutions/energy.jpg",
  //     description: "Natural Vitality",
  //     icon: <Zap className="w-8 h-8 text-green-700" />,
  //   },
  //   {
  //     title: "Sleep Better",
  //     image: "/assets/solutions/sleep.jpg",
  //     description: "Restful Natural Sleep",
  //     icon: <Moon className="w-8 h-8 text-green-700" />,
  //   },
  //   {
  //     title: "Immunity Shield",
  //     image: "/assets/solutions/immunity.jpg",
  //     description: "Natural Defense System",
  //     icon: <Shield className="w-8 h-8 text-green-700" />,
  //   },
  // ];

  return (
    <div className="bg-white">
      {/* Health Issues Section */}
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-3 relative">
            Health Concerns?
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover natural solutions for your everyday health challenges
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {healthIssues.map((issue, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-tr-3xl rounded-bl-3xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${issue.bgImage})` }}
                >
                  <div className="absolute inset-0 bg-green-800 opacity-70"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 h-[220px] flex flex-col items-center justify-center text-center z-10 bg-green-800">
                  <div className="bg-white/90 rounded-full p-4 mb-4 transition-transform duration-300 group-hover:scale-110">
                    {React.cloneElement(issue.icon, {
                      className:
                        "w-8 h-8 text-green-800 transition-colors duration-300 group-hover:text-green-900",
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 transition-transform duration-300">
                    {issue.title}
                  </h3>
                  <p className="text-white/80 text-sm transition-transform duration-300">
                    {issue.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white transform origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative rounded-xl shadow-lg p-6 md:p-8 my-4 bg-cover bg-center min-h-[350px] md:h-[400px] flex items-center"
          style={{
            backgroundImage: 'url("/assets/bannerimg/banner.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-green-900/60 to-black/70 rounded-xl"></div>
          <div className="relative z-10 text-center w-full">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Nature's Untouched Goodness
              </h1>
              <p className="text-gray-100 text-sm md:text-base mb-4 leading-relaxed">
                Discover pure, unadulterated nutrition from the heart of nature.
                Our carefully sourced products preserve the authentic essence of
                traditional farming.
              </p>
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
                <div className="button bg-white/20 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="bg-green-500/30 rounded-full p-2 md:p-3 inline-block mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 md:h-9 md:w-9 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M8 11l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">
                    100% Pure
                  </h3>
                  <p className="text-white text-xs opacity-80 hidden md:block">
                    No artificial additives
                  </p>
                </div>
                <div className="button bg-white/20 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="bg-amber-500/30 rounded-full p-2 md:p-3 inline-block mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 md:h-9 md:w-9 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">
                    Farm Fresh
                  </h3>
                  <p className="text-white text-xs opacity-80 hidden md:block">
                    Direct from local farms
                  </p>
                </div>
                <div className="button bg-white/20 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="bg-blue-500/30 rounded-full p-2 md:p-3 inline-block mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 md:h-9 md:w-9 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">
                    Scientifically Tested
                  </h3>
                  <p className="text-white text-xs opacity-80 hidden md:block">
                    Validated quality
                  </p>
                </div>
              </div>
              <div className="flex justify-center space-x-2 md:space-x-4">
                <a
                  href="/traceability"
                  className="text-xs md:text-sm bg-white text-green-800 font-semibold py-2 px-4 md:px-6 rounded-full hover:bg-green-50 transition duration-300 ease-in-out"
                >
                  Checkout Trecebility
                </a>
                <a
                  href="/our-story"
                  className="text-xs md:text-sm bg-transparent border-2 border-white text-white font-semibold py-2 px-4 md:px-6 rounded-full hover:bg-white hover:text-green-800 transition duration-300 ease-in-out"
                >
                  Our Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="product-grid-section" className="max-w-7xl mx-auto px-4">
        {loading ? (
          <ProductGrid products={products} />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {/* Bottom Banner Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative rounded-xl shadow-lg p-8 my-4 bg-cover bg-center h-[300px]"
          style={{
            backgroundImage: 'url("/assets/honeyimg/honey.jpeg")',
          }}
        >
          <div className="absolute inset-0  rounded-xl"></div>
        </div>
      </div>
      <div className=" py-4">
        <RecognizedBy />
      </div>
    </div>
  );
};

export default AllProductPage;