

import React, { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProducts } from "../store/slices/productSlice";
import { useSearchParams } from "react-router-dom";
import { useBannerUrls } from "../hooks/useBannerUrls";

function AllProductsBottomBanner() {
  const { getUrl } = useBannerUrls();
  const url = getUrl("all_products_banner") ?? "/assets/images/user.png";
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div
        className="relative w-full rounded-xl shadow-lg my-4 bg-cover bg-left bg-no-repeat aspect-[3/1] min-h-[150px] md:bg-center"
        style={{ backgroundImage: `url("${url}")` }}
      >
        <div className="absolute inset-0 rounded-xl" aria-hidden="true" />
      </div>
    </div>
  );
}

const AllProductPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
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



  return (
    <div className="bg-white">
      {/* Health Issues Section */}
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 relative">
            Health Concerns?
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover natural solutions for your everyday health challenges
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 lg:grid lg:grid-cols-5 lg:justify-normal">
            {healthIssues.map((issue, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-tr-2xl rounded-bl-2xl md:rounded-tr-3xl md:rounded-bl-3xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-[calc((100%-1rem)/3)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/3)] lg:w-auto"
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${issue.bgImage})` }}
                >
                  <div className="absolute inset-0 bg-green-800 opacity-70"></div>
                </div>

                {/* Content - mobile/sm: compact; md/lg: original sizes */}
                <div className="relative p-1.5 sm:p-3 md:p-6 h-[130px] sm:h-[160px] md:h-[220px] flex flex-col items-center justify-center text-center z-10 bg-green-800 pt-4 sm:pt-5 md:pt-0">
                  <div className="bg-white/90 rounded-full p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                    {React.cloneElement(issue.icon, {
                      className:
                        "w-5 h-5 sm:w-8 sm:h-8 md:w-8 md:h-8 text-green-800 transition-colors duration-300 group-hover:text-green-900",
                    })}
                  </div>
                  <h3 className="text-[9px] sm:text-sm md:text-xl font-semibold text-white mb-0.5 sm:mb-1 md:mb-2 transition-transform duration-300 leading-tight">
                    {issue.title}
                  </h3>
                  <p className="text-white/80 text-[8px] sm:text-xs md:text-sm transition-transform duration-300 leading-tight line-clamp-2">
                    {issue.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white transform origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Section */}
      {/* <div className="max-w-7xl mx-auto px-4">
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
      </div> */}
      {/* Bottom Banner Section - fixed aspect ratio so dimensions stay intact on all viewports */}
      <AllProductsBottomBanner />
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
      <div className=" py-4">
        <RecognizedBy />
      </div>
    </div>
  );
};

export default AllProductPage;