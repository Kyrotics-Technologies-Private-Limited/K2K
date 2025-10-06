import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    image: "/assets/images/BANNER IMAGE 1.png",
    link: "/all-products?category=ghee"
  },
  {
    image: "/assets/images/BANNER IMAGE 2.png",
    link: "/all-products?category=oils" 
  }, 
  {
    image: "/assets/images/BANNER IMAGE 3.png",
    link: "/all-products?category=honey"
  },
  {
    image: "/assets/images/BANNER IMAGE 4.png",
    link: "/all-products"
  }
];

const Hero = () => {
  return (
    <div className="hero w-screen max-w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !mx-1.5 !bg-gray-400/80 !opacity-100',
          bulletActiveClass: '!bg-green-600/50 !w-3 !h-3',
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
                className="w-full h-full object-contain sm:h-auto sm:w-full md:h-auto md:w-full lg:h-auto lg:w-full"
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

