import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const slides = [
  {
    image: "/assets/images/BANNER IMAGE 2.png",
    link: "/all-products?category=atta" 
  }, 
  {
    image: "/assets/images/BANNER IMAGE 3.png",
    link: "/all-products?category=ghee"
  },
  {
    image: "/assets/images/BANNER IMAGE 4.png",
    link: "/all-products? category=oils"
  },
  {
    image: "/assets/images/BANNER IMAGE 1.png",
    link: "/all-products"
  },
];

const Hero = () => {
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasPlayedInitialAnimation(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero w-full max-w-full relative overflow-hidden">
      <style>{`
        .hero .hero-zoom-initial {
          animation: heroZoomIn 0.4s ease-out forwards;
        }
        @keyframes heroZoomIn {
          from {
            transform: scale(0.92);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
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
                className={`w-full h-full object-contain sm:h-auto sm:w-full md:h-auto md:w-full lg:h-auto lg:w-full ${index === 0 && !hasPlayedInitialAnimation ? 'hero-zoom-initial' : ''}`}
                loading="eager"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

