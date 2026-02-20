import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useBannerUrls } from '../../hooks/useBannerUrls';

const SLIDE_KEYS: { key: string; link: string; fallback: string }[] = [
  { key: 'hero_atta', link: '/all-products?category=atta', fallback: '/assets/images/Atta_Banner.jpeg' },
  { key: 'hero_ghee', link: '/all-products?category=ghee', fallback: '/assets/images/Ghee_Banner.jpeg' },
  { key: 'hero_mustard_oil', link: '/all-products?category=oils', fallback: '/assets/images/Mustard_Oil_Banner.jpeg' },
  { key: 'hero_sesar_oil', link: '/all-products?category=oils', fallback: '/assets/images/Sesar_Oil_Banner.jpeg' },
  { key: 'hero_dal', link: '/all-products?category=dal', fallback: '/assets/images/Dal_Banner.jpeg' },
  { key: 'hero_k2k_products', link: '/all-products', fallback: '/assets/images/K2K_Products_Banner.jpeg' },
];

const Hero = () => {
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(false);
  const { getUrl } = useBannerUrls();

  const slides = useMemo(
    () =>
      SLIDE_KEYS.map(({ key, link, fallback }) => ({
        image: getUrl(key) ?? fallback,
        link,
      })),
    [getUrl]
  );

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
          from { transform: scale(0.92); }
          to   { transform: scale(1); }
        }

        /* Pagination dots styling */
        .hero .swiper-pagination {
          bottom: 12px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .hero .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.55);
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1.5px solid rgba(255,255,255,0.7);
        }
        .hero .swiper-pagination-bullet-active {
          background: #6b7280;
          border-color: #6b7280;
          width: 22px;
          border-radius: 9999px;
          box-shadow: 0 0 6px rgba(107,114,128,0.5);
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
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
