import { motion } from "framer-motion";

const ShippingWithTestReport = () => {
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
            Shipping With Test Report
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-4 md:mt-6 text-green-800 text-xl md:text-2xl font-semibold"
          >
            Quality Verified at Every Step
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-base md:text-lg text-gray-700 mt-4 md:mt-6 leading-relaxed text-justify"
          >
            After manufacturing, we conduct rigorous lab tests followed by
            thorough adulteration testing to guarantee zero adulteration in our
            products. Our commitment to quality assurance ensures that every
            batch is meticulously examined.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-base md:text-lg text-gray-700 mt-4 leading-relaxed text-justify"
          >
            Each shipment includes comprehensive quality certification and test
            documentation for complete transparency and peace of mind.
          </motion.p>
        </motion.div>

        {/* Image with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center h-full"
        >
          <div className="relative group w-full max-w-[350px] h-full flex items-center">
            <motion.img
              src="/assets/traceabilityImg/SHIPPING WITH TEST REPORT.png"
              alt="Quality testing documentation"
              className="rounded-xl w-full h-auto max-h-[500px] object-contain z-10 transform group-hover:scale-[1.02] transition-transform duration-300 shadow-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShippingWithTestReport;
