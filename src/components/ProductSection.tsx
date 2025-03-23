// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const products = [
//   {
//     id: 1,
//     name: "Raw Forest Honey",
//     price: 24.99,
//     image:
//       "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
//     category: "Honey",
//   },
//   {
//     id: 2,
//     name: "Lavender Essential Oil",
//     price: 19.99,
//     image:
//       "https://images.unsplash.com/photo-1581514439794-f9777f7c22eb?auto=format&fit=crop&q=80&w=800",
//     category: "Oils",
//   },
//   {
//     id: 3,
//     name: "Chamomile Tea Blend",
//     price: 14.99,
//     image:
//       "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=800",
//     category: "Herbal",
//   },
//   {
//     id: 4,
//     name: "Rose Hip Face Oil",
//     price: 34.99,
//     image:
//       "https://images.unsplash.com/photo-1637524725461-bff1afdb946e?auto=format&fit=crop&q=80&w=800",
//     category: "Skincare",
//   },
//   {
//     id: 5,
//     name: "Organic Manuka Honey",
//     price: 39.99,
//     image:
//       "https://images.unsplash.com/photo-1637087040720-281e2fbea375?auto=format&fit=crop&q=80&w=800",
//     category: "Honey",
//   },
//   {
//     id: 6,
//     name: "Eucalyptus Essential Oil",
//     price: 17.99,
//     image:
//       "https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&q=80&w=800",
//     category: "Oils",
//   },
// ];

// const ProductSection = () => {
//   return (
//     <section className="py-20 bg-white overflow-hidden">
//       <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16 opacity-0 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Featured Products
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover our carefully curated selection of organic products,
//             sourced directly from nature.
//           </p>
//         </div>

//         <div className="relative">
//           {/* Navigation arrows container */}
//           <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 flex justify-between pointer-events-none px-2 sm:px-4 md:px-6 lg:px-8">
//             <button className="swiper-button-prev !static !mt-0 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md pointer-events-auto" />
//             <button className="swiper-button-next !static !mt-0 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md pointer-events-auto" />
//           </div>

//           {/* Swiper container */}
//           <div className="overflow-hidden px-12">
//             <Swiper
//               modules={[Autoplay, Navigation]}
//               navigation={{
//                 prevEl: ".swiper-button-prev",
//                 nextEl: ".swiper-button-next",
//               }}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//               slidesPerView={1}
//               spaceBetween={30}
//               breakpoints={{
//                 640: {
//                   slidesPerView: 2,
//                   spaceBetween: 30,
//                 },
//                 1024: {
//                   slidesPerView: 5,
//                   spaceBetween: 40,
//                 },
//               }}
//             >
//               {products.map((product, index) => (
//                 <SwiperSlide
//                   key={product.id}
//                   className="opacity-0 animate-fadeIn !h-auto"
//                   style={{
//                     animationDelay: `${index * 0.15}s`,
//                   }}
//                 >
//                   <div className="p-3">
//                     <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-2">
//                       <div className="relative pb-[100%] overflow-hidden group">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       </div>
//                       <div className="p-6">
//                         <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-2">
//                           {product.category}
//                         </span>
//                         <h3 className="text-xl font-bold text-gray-900 mb-2">
//                           {product.name}
//                         </h3>
//                         <div className="flex items-center justify-between">
//                           <span className="text-2xl font-bold text-green-600">
//                             ${product.price}
//                           </span>
//                           <button
//                             className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium
//                             hover:bg-green-700 transition-colors duration-300
//                             transform hover:scale-105 active:scale-95"
//                           >
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductSection;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Raw Forest Honey",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    category: "Honey",
  },
  {
    id: 2,
    name: "Lavender Essential Oil",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1581514439794-f9777f7c22eb?auto=format&fit=crop&q=80&w=800",
    category: "Oils",
  },
  {
    id: 3,
    name: "Chamomile Tea Blend",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=800",
    category: "Herbal",
  },
  {
    id: 4,
    name: "Rose Hip Face Oil",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1637524725461-bff1afdb946e?auto=format&fit=crop&q=80&w=800",
    category: "Skincare",
  },
  {
    id: 5,
    name: "Organic Manuka Honey",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1637087040720-281e2fbea375?auto=format&fit=crop&q=80&w=800",
    category: "Honey",
  },
  {
    id: 6,
    name: "Eucalyptus Essential Oil",
    price: 17.99,
    image:
      "https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&q=80&w=800",
    category: "Oils",
  },
];

const ProductSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-10 sm:mb-14 md:mb-16 ${
            loaded
              ? "opacity-100 transition-opacity duration-1000"
              : "opacity-0"
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Featured Products
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of organic products,
            sourced directly from nature.
          </p>
        </div>

        <div className="relative">
          {/* Navigation arrows container */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 flex justify-between pointer-events-none px-1 sm:px-4">
            <button className="swiper-button-prev !w-0 !h-0 !static !mt-0 pointer-events-auto">
              {/* <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100
              text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-110 active:scale-95">
                <ChevronLeft className="w-6 h-6" />
              </div> */}
            </button>
            <button className="swiper-button-next !w-0 !h-0 !static !mt-0 pointer-events-auto">
              {/* <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100
              text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-110 active:scale-95">
                <ChevronRight className="w-6 h-6" />
              </div> */}
            </button>
          </div>

          {/* Swiper container */}
          <div className="overflow-hidden px-6 sm:px-10 lg:px-12">
            <Swiper
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              slidesPerView={1}
              spaceBetween={16}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
              className="!overflow-visible"
            >
              {products.map((product, index) => (
                <SwiperSlide
                  key={product.id}
                  className={`${
                    loaded
                      ? "opacity-100 transition-opacity duration-1000"
                      : "opacity-0"
                  } !h-auto`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="p-2 sm:p-3">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-2">
                      <div className="relative pb-[100%] overflow-hidden group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 sm:p-5">
                        <span className="inline-block px-2.5 py-1 bg-green-100 text-green-600 rounded-full text-xs sm:text-sm font-medium mb-2">
                          {product.category}
                        </span>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex flex-col gap-2">
                          <span className="text-xl sm:text-2xl font-bold text-green-600">
                            ${product.price}
                          </span>
                          <button
                            className="w-full bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium 
                            hover:bg-green-700 transition-all duration-300 
                            transform hover:scale-105 active:scale-95"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
