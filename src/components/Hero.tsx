import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1601592149903-210683803e31",
    title: "Pure Organic Honey",
    description: "Straight from nature's heart to your table"
  },
  {
    image: "https://images.unsplash.com/photo-1618673713291-2d5edaf0ad9c",
    title: "Pure Herbal Tea",
    description: "Straight from nature's heart to your table"
  },
  {
    image: "https://images.unsplash.com/photo-1574785289548-b6604d39125d",
    title: "Essential Oils",
    description: "Experience the power of natural healing"
  },
  {
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000",
    title: "Herbal Products",
    description: "Traditional remedies for modern wellness"
  }
];

const Hero = () => {
  return (
    <div className="relative h-[75vh]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !inline-block !bg-white !opacity-50 !mx-1.5',
          bulletActiveClass: '!opacity-100',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="relative h-full flex items-center justify-center text-center">
                <div className="max-w-3xl px-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8">
                    {slide.description}
                  </p>
                  <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="hero-pagination absolute bottom-8 left-0 right-0 z-10 flex justify-center" />
      </Swiper>
    </div>
  );
};

export default Hero;