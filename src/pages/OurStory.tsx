import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Leaf } from "lucide-react";

const AboutUs: React.FC = () => {
  const sections = [
    {
      icon: Leaf,
      title: "Fair Price for Farmers",
      text: "At Kishan2Kitchen, we believe in a sustainable India, where rural farmers thrive. By providing competitive fair prices for their produce, we empower farmers and create a ripple of happiness. Together, let's support local communities, strengthen the agricultural backbone, and savour the taste of a brighter future. Join us in celebrating the joy of fair trade and contributing to a sustainable, happy India. Kishan2Kitchen - Nurturing Farmers, Spreading Happiness.",
      subText: "300+ Farmers attached with us",
      image: "/assets/images/Farmers.png",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Empowering Rural Women",
      text: "Unlock the potential of rural women with Kishan2Kitchen. We empower them to sell their pure, homemade, adulteration-free natural foods, revolutionizing livelihoods. Indulge in our wholesome offerings and experience the authentic flavour nurtured by these incredible women. Together, let's support sustainable communities and create a brighter future. Taste the difference and join us in empowering rural women through the power of food. Kishan2Kitchen -Changing Lives, Building Bharat.",
      subText: "100+ Micro-Entrepreneurs & Self-Help Groups",
      image: "/assets/images/Empowering Rural Women.png",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: ShieldCheck,
      title: "Adulteration Free Food",
      text: "At Kishan2Kitchen, our mission is to proudly provide adulteration-free food prepared by skilled rural women in India. We ensure an authentic taste that delights the palate while offering significant long-term health benefits. Our commitment to quality and the empowerment of rural women results in products that are not only delicious but also promote a healthier lifestyle. Experience the unique flavours and goodness of our meticulously crafted food, supporting the well-being of both consumers and the community.",
      subText: "Long-Term Health Benefits",
      image: "/assets/images/Adulteration free.png",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url(/assets/images/ourstory.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          //backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
       
      </section>

      {/* Mission Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {sections.map((section, index) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`
              grid md:grid-cols-2 gap-12 items-center 
              ${section.bgColor} 
              rounded-2xl 
              overflow-hidden 
              shadow-lg 
              ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
            `}
          >
            {/* Text Section */}
            <div className={`p-10 ${index % 2 === 1 ? "md:order-last" : ""}`}>
              <div className="flex items-center mb-6">
                <section.icon
                  className={`w-12 h-12 ${section.iconColor} mr-4`}
                />
                <h2 className="text-3xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <p className="text-xl text-green-800 font-semibold mb-4">
                {section.subText}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                {section.text}
              </p>
            </div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex justify-center p-8"
            >
              <div
                className="
                bg-white 
                p-4 
                rounded-2xl 
                shadow-xl 
                transform 
                transition-transform 
                hover:scale-105 
                duration-300
              "
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="
                    w-full 
                    max-w-[450px] 
                    h-auto 
                    object-cover 
                    rounded-xl 
                    shadow-md
                  "
                />
              </div>
            </motion.div>
          </motion.section>
        ))}
      </div>

      
    </div>
  );
};

export default AboutUs;
