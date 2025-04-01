import { motion } from "framer-motion";

// Sourcing Component
const Sourcing = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
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
          className="h-full flex flex-col justify-center"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Sourcing
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-4 md:mt-6 text-green-800 text-xl md:text-2xl font-semibold"
          >
            Transparent sourcing from farm to table
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-base md:text-lg text-gray-700 mt-4 md:mt-6 leading-relaxed text-justify"
          >
            We source directly from rural farmers and women, ensuring quality
            while supporting local communities. Our commitment to transparency
            and fair trade empowers these stakeholders.
          </motion.p>
        </motion.div>

        {/* Image with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center h-full w-full"
        >
          <div className="relative group w-full max-w-[350px] h-full flex items-center">
            <motion.img
              src="/assets/traceabilityImg/SOURCING.png"
              alt="Supply chain tracking"
              className="rounded-xl w-full h-auto max-h-[500px] object-contain z-10 transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sourcing;
