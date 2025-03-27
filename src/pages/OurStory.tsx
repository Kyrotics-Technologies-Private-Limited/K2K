import React, { useEffect } from "react";
import {motion} from 'framer-motion'

const AboutUs: React.FC = () => {
 

  useEffect(() => {
    console.log("AboutUs component mounted");
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Sticky Navbar to Avoid Overlap */}
      <div className="top-0 left-0 w-full z-50">
      
      </div>
      {/* Hero Section with Full Cover Background */}
      <section
        className="relative w-full h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url(/assets/images/ourstory.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></section>
      {/* About Us Content Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Fair Price for Farmers
            </h2>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="text-green-800 text-3xl font-bold">
                300+ Farmers attached with us
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              At Kishan2Kitchen, we believe in a sustainable India, where rural
              farmers thrive. By providing competitive fair prices for their
              produce, we empower farmers and create a ripple of happiness.
              Together, let's support local communities, strengthen the
              agricultural backbone, and savour the taste of a brighter future.
              Join us in celebrating the joy of fair trade and contributing to a
              sustainable, happy India. Kishan2Kitchen - Nurturing Farmers,
              Spreading Happiness.
            </p>
          </div>

          {/* Right: Image */}
          <div className="rounded-lg overflow-hidden shadow-lg flex justify-center">
            <img
              src="/assets/images/Farmers.png"
              alt="Farmers"
              className="w-full max-w-[500px] h-[500px] object-cover rounded-md"
            />
          </div>
        </div>
      </section>
      {/* Our Founders Section */}
      <section className="bg-yellow-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900">Our Founders</h2>
          <p className="text-lg text-gray-700 mt-4">
            Young and agile graduates from IIT Guwahati wanted to use their
            technical skills in the food and agriculture industry. They have the
            vision to bring food processing to the farm level and provide
            traditional superfoods to everyone.
          </p>
        </div>
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Founder 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="/assets/images/founder1.jpg"
              //alt="Founder 1"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="text-2xl font-bold mt-4">Kuldeep Parewa</h3>
            <p className="text-gray-700 mt-2">
              Being from a farming family, I know the hardships they face.
              Equipping them with technology, financial aid, and food-processing
              machines will generate more value for them.
            </p>
          </div>

          {/* Founder 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="/assets/images/founder2.jpg"
              //alt="Founder 2"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="text-2xl font-bold mt-4">Aayushi Khandelwal</h3>
            <p className="text-gray-700 mt-2">
              I have always missed my nani’s recipes and nuskhe in this modern
              lifestyle. I have the vision to preserve these with India’s lost
              superfoods.
            </p>
          </div>

          {/* Founder 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="/assets/images/founder3.jpg"
              // alt="Founder 3"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="text-2xl font-bold mt-4">Akhil Kansal</h3>
            <p className="text-gray-700 mt-2">
              Using technology to assess food quality and create a
              direct-from-farm supply chain excites me the most. Consumers need
              access to quality food, and farmers need to be empowered.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="flex justify-center">
            <img
              src="/assets/images/empowering rural women.png"
              alt="Empowering Rural Women"
              className="rounded-lg shadow-xl w-full max-w-md object-cover"
            />
          </div>

          {/* Right: Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Empowering Rural Women
            </h2>
            <p className="text-green-800 text-2xl font-semibold mt-4">
              100+ Micro-Entrepreneurs & Self-Help Groups
            </p>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              At Kishan2Kitchen, we are committed to empowering rural women by
              providing them with opportunities to sell their pure, homemade,
              and adulteration-free natural foods. Through skill development and
              sustainable practices, we help them achieve financial independence
              while preserving traditional food craftsmanship.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
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
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16  rounded-lg ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content with Staggered Fade-in */}
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
              className="text-3xl font-extrabold text-gray-900 leading-tight"
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
              <span className="inline-block bg-green-100 px-4 py-2 rounded-lg shadow-sm">
                Long-Term Health Benefits
              </span>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-lg text-gray-700 mt-6 leading-relaxed"
            >
              At{" "}
              <span className="font-semibold text-green-900">
                Kishan2Kitchen
              </span>
              , we are committed to providing
              <span className="font-bold text-green-800">
                {" "}
                100% adulteration-free food
              </span>
              , handcrafted by skilled rural women across India. Every product
              is made with <strong>love, purity, and tradition</strong>,
              ensuring that you experience the{" "}
              <strong>authentic flavors</strong> while reaping{" "}
              <strong>long-term health benefits</strong>.
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-lg text-gray-700 mt-4 leading-relaxed"
            >
              By choosing our products, you’re not only nourishing yourself but
              also <strong>empowering rural communities</strong>
              and <strong>preserving traditional food craftsmanship</strong>.
            </motion.p>
          </motion.div>

          {/* Right: Image with Subtle Zoom-in & Float Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-lg  flex justify-center"
          >
            <motion.img
              src="/assets/images/Adulteration free.png"
              alt="Adulteration Free Food"
              className="w-full max-w-[450px] h-[450px] object-cover rounded-lg"
              animate={{
                y: [0, -5, 0], // Floating effect
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>
      ; ;
    </div>
  );
};

export default AboutUs;
