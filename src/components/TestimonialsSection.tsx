// import React from 'react';
// import { Star, Quote } from 'lucide-react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Wellness Enthusiast",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
//     content: "The quality of Natura's organic honey is unmatched. It's pure, raw, and you can truly taste the difference.",
//     rating: 5
//   },
//   {
//     name: "Michael Chen",
//     role: "Holistic Practitioner",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
//     content: "I've been using their essential oils in my practice for years. The purity and potency are exceptional.",
//     rating: 4
//   },
//   {
//     name: "Emma Rodriguez",
//     role: "Organic Skincare Advocate",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
//     content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
//     rating: 5
//   },
//   {
//     name: "Emma Stone",
//     role: "Organic Skincare Advocate",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
//     content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
//     rating: 5
//   },
//   {
//     name: "James Rodriguez",
//     role: "Organic Skincare Advocate",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
//     content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
//     rating: 4
//   },
//   {
//     name: "Jonathan Smith",
//     role: "Organic Skincare Advocate",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
//     content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
//     rating: 4
//   }
// ];

// const TestimonialsSection = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-3">Customer Stories</h2>
//         <p className="text-gray-600 max-w-xl mx-auto mb-12">Hear from those who've experienced our products</p>

//         <Swiper
//           modules={[Autoplay]}
//           autoplay={{ delay: 5000 }}
//           spaceBetween={30}
//           slidesPerView={1}
//           breakpoints={{
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 }
//           }}
//           className="px-2"
//         >
//           {testimonials.map(({ name, role, image, content, rating }) => (
//             <SwiperSlide key={name}>
//               <div className="bg-green-100 border-black border-[0.5px] p-6 rounded-lg shadow-md h-full flex flex-col">
//                 <div className="flex items-center mb-4">
//                   <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover mr-3" />
//                   <div>
//                     <h3 className="font-medium">{name}</h3>
//                     <p className="text-sm text-gray-500">{role}</p>
//                   </div>
//                 </div>
//                 <div className="flex mb-3">
//                   {[...Array(rating)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <Quote className="text-green-100 w-6 h-6 mb-2" />
//                 <p className="text-gray-600 text-sm flex-grow">"{content}"</p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;

import React from "react";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Wellness Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      content: "The quality of Natura's organic honey is unmatched. It's pure, raw, and you can truly taste the difference.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Holistic Practitioner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      content: "I've been using their essential oils in my practice for years. The purity and potency are exceptional.",
      rating: 4
    },
    {
      name: "Emma Rodriguez",
      role: "Organic Skincare Advocate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
      rating: 5
    },
    {
      name: "Emma Stone",
      role: "Organic Skincare Advocate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
      rating: 5
    },
    {
      name: "James Rodriguez",
      role: "Organic Skincare Advocate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
      rating: 4
    },
    {
      name: "Jonathan Smith",
      role: "Organic Skincare Advocate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      content: "Their herbal skincare line transformed my skin. The rose hip oil is my holy grail!",
      rating: 4
    }
  ];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Customer Stories
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Hear from those who've experienced our products
        </p>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000 }}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass:
                "swiper-pagination-bullet !w-2.5 !h-2.5 !mx-1.5 !bg-gray-400/80 !opacity-100",
              bulletActiveClass: "!bg-green-600 !w-3 !h-3",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="px-2 pb-12"
          >
            {testimonials.map(({ name, role, image, content, rating }) => (
              <SwiperSlide key={name}>
                <div
                  className="bg-white border border-green-200 p-6 h-full flex flex-col backdrop-blur-sm bg-opacity-70 transition-all duration-300 hover:shadow-lg hover:border-green-300 hover:scale-[1.02] hover:bg-opacity-90"
                  style={{
                    borderRadius: "16px 16px 50px 16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={image}
                      alt={name}
                      className="w-12 h-12 rounded-full object-cover mr-3 ring-2 ring-green-100 transition-all duration-300 group-hover:ring-green-300"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                        {name}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current transition-transform duration-300 group-hover:scale-110"
                      />
                    ))}
                  </div>
                  <Quote className="text-green-200 w-6 h-6 mb-2 transition-transform duration-300 group-hover:scale-110" />
                  <p className="text-gray-700 text-sm flex-grow group-hover:text-gray-800 transition-colors duration-300">
                    "{content}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonial-pagination absolute bottom-4 left-0 right-0 z-10 flex justify-center" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
