import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const banners = [
  {
    src: "/assets/images/we are in a mission.png",
    alt: "We are on a mission",
    link: "/all-products",
    clickable: true,
  },
  {
    src: "/assets/images/Adulteration free food banner (1).png",
    alt: "Adulteration free food",
    link: null,
    clickable: false,
  },
];

const FarmerBannerSlider = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section accent */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-emerald-300/80 rounded-full" />
          <span className="text-sm font-medium tracking-widest uppercase text-emerald-700/80">
            Our Mission
          </span>
          <span className="h-px w-12 bg-emerald-300/80 rounded-full" />
        </div>

        {/* 3D effect: depth without tilt (no trapezium) */}
        <div className="slider-3d-wrapper">
          <div className="slider-3d">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade, Keyboard]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={600}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".farmer-banner-pagination",
              bulletClass:
                "swiper-pagination-bullet !w-2 !h-2 !mx-1.5 !bg-white/70 !opacity-100 !transition-all !duration-300 !rounded-full",
              bulletActiveClass: "!bg-emerald-500 !w-8 !rounded-full",
            }}
            navigation={{
              nextEl: ".farmer-banner-next",
              prevEl: ".farmer-banner-prev",
            }}
            keyboard={{ enabled: true }}
            loop
            grabCursor
            className="w-full farmer-banner-swiper rounded-2xl"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="w-full flex flex-col">
                  <div
                    className={`w-full relative overflow-hidden rounded-t-2xl group/slide flex-shrink-0 ${banner.clickable ? "cursor-pointer" : ""}`}
                    onClick={() => banner.clickable && banner.link && navigate(banner.link)}
                    title={banner.clickable ? "View all products" : undefined}
                    role={banner.clickable ? "button" : undefined}
                  >
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="w-full h-auto object-contain md:object-cover select-none block"
                      loading="lazy"
                      draggable={false}
                    />
                    {banner.clickable && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-2xl" />
                    )}
                  </div>
                  {/* 20px on mobile, 40px on md+ - slider height increased, image height unchanged */}
                  <div className="w-full h-[20px] md:h-[40px] bg-white flex-shrink-0 rounded-b-2xl" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows - hidden on mobile, visible from md */}
          <button
            type="button"
            aria-label="Previous banner"
            className="farmer-banner-prev absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 shadow-lg hidden md:flex items-center justify-center text-emerald-700 opacity-90 hover:opacity-100 hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 border border-emerald-200/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next banner"
            className="farmer-banner-next absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 shadow-lg hidden md:flex items-center justify-center text-emerald-700 opacity-90 hover:opacity-100 hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 border border-emerald-200/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pagination bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 py-4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded-b-2xl" />
          <div className="farmer-banner-pagination absolute bottom-5 left-0 right-0 z-20 flex justify-center pointer-events-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerBannerSlider;
