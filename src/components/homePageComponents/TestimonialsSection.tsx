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


import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Olivia Martinez",
    role: "Nutritionist",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    content:
      "The organic protein powder blends perfectly into my morning smoothies. It's the cleanest plant-based protein I've found.",
    rating: 5,
    product: "Vanilla Protein Powder"
  },
  {
    name: "Raj Patel",
    role: "Yoga Instructor",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    content:
      "The meditation candles create the perfect ambiance for my evening sessions. The subtle lavender scent helps my students relax deeply.",
    rating: 5,
    product: "Lavender Meditation Candles"
  },
  {
    name: "Sophia Chen",
    role: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200",
    content:
      "I recommend the hyaluronic acid serum to all my patients. It's fragrance-free and doesn't irritate even the most sensitive skin.",
    rating: 5,
    product: "Hyaluronic Acid Serum"
  },
  {
    name: "Marcus Johnson",
    role: "Personal Trainer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    content:
      "The post-workout recovery balm is a game-changer. My clients love how it soothes sore muscles without any greasy residue.",
    rating: 5,
    product: "Arnica Recovery Balm"
  },
  {
    name: "Aisha Williams",
    role: "Aromatherapist",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    content:
      "The eucalyptus essential oil has the perfect therapeutic aroma. I use it in my diffuser blends for respiratory support.",
    rating: 5,
    product: "Eucalyptus Essential Oil"
  },
  {
    name: "Ethan Thompson",
    role: "Holistic Chef",
    image:
      "https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=crop&q=80&w=200",
    content:
      "The organic coconut oil has become my kitchen staple. Its rich flavor elevates both raw and cooked dishes beautifully.",
    rating: 5,
    product: "Cold-Pressed Coconut Oil"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-8 bg-[#fffbe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-green-brand">
          Customer Stories
        </h2>
        <p className="text-sm md:text-base text-gray-800/90 max-w-lg mx-auto mt-2">
          Hear from those who've experienced our products
        </p>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass:
                "swiper-pagination-bullet !w-2.5 !h-2.5 !mx-1.5 !bg-gray-400/80 !opacity-100",
              bulletActiveClass: "!bg-yellow-200 !w-3 !h-3",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="px-2 pb-12 pt-6"
          >
            {testimonials.map(({ name, image, content, rating, product }) => (
              <SwiperSlide key={name}>
                <div
                  className="bg-[#fffbe8] border border-black p-4 h-full flex flex-col"
                  style={{
                    borderRadius: "16px 16px 50px 16px",
                  }}
                >
                  <div className="flex mb-4 justify-center">
                    <img
                      src={image}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-gray-100"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 text-lg">
                        {name}
                      </h3>
                      <div className="flex mt-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-800/70 flex-grow mb-4">
                    "{content}"
                  </p>
                  <div className="mt-auto pt-3 border-t border-gray-200">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-[#fff6ca] text-gray-700 rounded-full">
                      {product}
                    </span>
                  </div>
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