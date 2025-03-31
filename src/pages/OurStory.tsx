import React, { useEffect } from "react";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  useEffect(() => {
    console.log("AboutUs component mounted");
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url(/assets/images/ourstory.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></section>

      {/* Section 1: Fair Price for Farmers */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Fair Price for Farmers
            </h2>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="text-green-800 text-2xl font-semibold">
                300+ Farmers attached with us
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed flex items-center justify-center text-justify">
              At Kishan2Kitchen, we believe in a sustainable India, where rural
              farmers thrive. By providing competitive fair prices for their
              produce, we empower farmers and create a ripple of happiness.
              Together, let's support local communities, strengthen the
              agricultural backbone, and savour the taste of a brighter future.
              Join us in celebrating the joy of fair trade and contributing to a
              sustainable, happy India.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/assets/images/Farmers.png"
              alt="Farmers"
              className="w-full max-w-[400px] h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Empowering Rural Women */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/assets/images/Empowering Rural Women.png"
              alt="Empowering Rural Women"
              className="w-full max-w-[400px] h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Empowering Rural Women
            </h2>
            <p className="text-green-800 text-2xl font-semibold mt-4">
              100+ Micro-Entrepreneurs & Self-Help Groups
            </p>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed flex items-center text-justify">
              At Kishan2Kitchen, we are committed to empowering rural women by
              providing them with opportunities to sell their pure, homemade,
              and adulteration-free natural foods. Through skill development and
              sustainable practices, we help them achieve financial independence
              while preserving traditional food craftsmanship.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed text-justify">
              Every product you purchase directly supports these women, their
              families, and their communities. Experience the authentic taste of
              homemade goodness while contributing to a brighter, more
              sustainable future.
            </p>
            <p className="text-green-800 font-semibold text-lg mt-6">
              Kishan2Kitchen – Changing Lives, Building Bharat.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Adulteration Free Food */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text with Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-4xl font-bold text-gray-900"
            >
              Adulteration free Food
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mt-6 text-green-800 text-2xl font-semibold"
            >
              Long-Term Health Benefits
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-lg text-gray-700 mt-6 leading-relaxed"
            >
              
              
              <p className="text-justify">
                <span className="font-semibold text-green-900">
                 At Kishan2Kitchen
                </span>
                ,we are committed to providing 100% adulteration-free food
                handcrafted by skilled rural women across India. Every product
                is made with love, purity, and tradition, ensuring that you
                experience the authentic flavor while reaping long-term health
                benefits.
              </p>
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-lg text-gray-700 mt-4 leading-relaxed text-justify"
            >
              By choosing our products, you’re not only nourishing yourself but
              also <strong>empowering rural communities</strong> and{" "}
              <strong>preserving traditional food craftsmanship</strong>.
            </motion.p>
          </motion.div>

          {/* Image with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.img
              src="/assets/images/Adulteration free.png"
              alt="Adulteration Free Food"
              className="w-full max-w-[400px] h-[400px] object-cover rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
