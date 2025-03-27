import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    image: "/assets/images/BANNER IMAGE 1.png",
    link: "/all-products"  // Example link
  },
  {
    image: "/assets/images/BANNER IMAGE 2.png",
    link: "/all-products" 
  }, 
  {
    image: "/assets/images/BANNER IMAGE 3.png",
    link: "/all-products"
  },
  {
    image: "/assets/images/BANNER IMAGE 4.png",
    link: "/all-products"
  }
];

const Hero = () => {
  return (
    <div className="h-[77vh] w-full max-w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !mx-1.5 !bg-green-600/50 !opacity-100',
          bulletActiveClass: '!bg-white !w-3.5 !h-3.5'
        }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <a href={slide.link} className="block w-full h-full">
              <img 
                src={slide.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Pagination Container */}
      <div className="custom-pagination absolute bottom-8 left-0 right-0 z-10 flex justify-center" />
    </div>
  );
};

export default Hero;