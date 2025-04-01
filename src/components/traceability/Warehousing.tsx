import {motion} from "framer-motion"
const Warehousing = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Image with Animation (left side) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center md:order-1 h-full"
        >
          <div className="relative group w-full max-w-[350px] h-full flex items-center">
            <motion.img
              src="/assets/traceabilityImg/WAREHOUSING.png"
              alt="Warehousing"
              className="rounded-xl w-full h-auto max-h-[500px] object-contain z-10 transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* Text with Animation (right side) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, x: 50 },
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
          className="md:order-2 h-full flex flex-col justify-center"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Warehousing
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-4 md:mt-6 text-green-800 text-xl md:text-2xl font-semibold"
          >
            Premium storage and processing standards
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-base md:text-lg text-gray-700 mt-4 md:mt-6 leading-relaxed text-justify"
          >
            After sourcing from rural areas, we utilize our own warehouse for
            testing & manufacturing. This allows us to maintain complete control
            over the production process, ensuring zero adulteration and purity.
            We prioritize excellence every step of the way.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Warehousing;
