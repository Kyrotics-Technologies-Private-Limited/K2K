import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import { ProductCard } from "../products/ProductCard";
import { sampleProducts } from "../../mockData/SampleProduct";

const ProductSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="pt-4 sm:pt-8 md:pt-12 pb-2 sm:pb-4 md:pb-5 bg-[rgba(255,255,255,0.75)] overflow-hidden w-full max-w-7xl m-auto">
      <div className="w-full">
        <div
          className={`text-center mb-4 sm:mb-6 md:mb-10 px-4 sm:px-6 lg:px-8 ${
            loaded
              ? "opacity-100 transition-opacity duration-1000"
              : "opacity-0"
          }`}
        >
          <h2 className="featureProducts text-2xl md:text-3xl lg:text-4xl font-semibold text-green-brand">
            Featured Products
          </h2>
          <p className="text-sm md:text-base text-gray-800/70 mx-auto mt-2">
            Discover our carefully curated selection of organic products,
            sourced directly from nature.
          </p>
        </div>

        <div className="relative w-full">
          {/* Navigation arrows container */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 flex justify-between pointer-events-none px-1 sm:px-4">
            <button className="swiper-button-prev !w-0 !h-0 !static !mt-0 pointer-events-auto" />
            <button className="swiper-button-next !w-0 !h-0 !static !mt-0 pointer-events-auto" />
          </div>

          {/* Swiper container */}
          <div className="overflow-hidden w-full px-4 sm:px-6 lg:px-8">
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
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="!overflow-visible w-full"
            >
              {sampleProducts.map((product, index) => (
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
                  <div className="w-full p-1">
                    <ProductCard product={product} />
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
