import { motion } from 'framer-motion';

const KishanParivarInfo = () => {
  const benefits = [
    {
      title: "Freshly Prepared for Your Order",
      description: (
        <>
          Your Family Deserves Pure, Fresh & Honest Food. Every product is freshly prepared in Batch within 3 Months for our KISHAN PARIVAR Member, ensuring maximum freshness - Higher nutritional value - Zero preservatives - Farm-to-home purity for your family.
        </>
      ),
      image: "/assets/images/1kp.jpeg",
      imageAlt: "Freshly Prepared Food"
    },
    {
      title: "Flat 5%-10% Savings on Every Order",
      description: (
        <>
          No Coupons. No Conditions. We offer a flat discount on all purchases with transparent pricing and absolutely no hidden charges.
        </>
      ),
      image: "/assets/images/2kp.jpeg",
      imageAlt: "Savings"
    },
    {
      title: "Personalized Family Wellness Consultation",
      description: (
        <>
          Expert Wellness Guidance. Receive customized family food plans designed for balanced nutrition, aiming to improve immunity and overall well-being.
        </>
      ),
      image: "/assets/images/3kp.jpeg",
      imageAlt: "Wellness Consultation"
    },
    {
      title: "Kishan Parivar Card Benefits",
      description: (
        <>
          With the Kishan Parivar Card, you get access to expert wellness guidance: Customized family food plans, Balanced nutrition, Improved immunity, Lifestyle disease prevention.
        </>
      ),
      image: "/assets/images/4kp.png",
      imageAlt: "Kishan Parivar Card"
    },
    {
      title: "Free Annual Health Check-ups",
      description: (
        <>
          Your Health, Our Promise. Spend ₹1,50,000 in a year and unlock: Two complimentary health check-ups, Preventive screening, Early risk detection.
        </>
      ),
      image: "/assets/images/5kp.jpeg",
      imageAlt: "Health Check-up"
    }
  ];

  const trustPoints = [
    "Direct sourcing from farmers",
    "Rural women-led production",
    "Traditional processing",
    "AI-backed quality testing",
    "QR traceability"
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-20">
      {/* Header Section */}
      <div className="text-center mb-20 px-4">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Have You Missed <br className="hidden md:block"/> Becoming a Farmer?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto">
            Still eat better. Live healthier. <span className="text-green-700 font-bold">Save smarter.</span>
          </p>
        </motion.div>
      </div>

      {/* Benefits Loop */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 flex justify-center perspective-1000">
                 <motion.div 
                   className="relative w-full max-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                 >
                   <img 
                     src={benefit.image} 
                     alt={benefit.imageAlt} 
                     className="w-full h-full object-cover"
                   />
                 </motion.div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2">

              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug">
                {benefit.title}
              </h3>
              
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  {benefit.description}
                </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Section Footer */}
      {/* Trust Section Footer */}
      <div className="mt-20 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] text-center border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Families Trust <span className="text-green-700">Kishan Parivar</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
             {trustPoints.map((point, idx) => (
               <div 
                 key={idx}
                 className="flex items-center gap-2"
               >
                 <span className="text-lg">✅</span>
                 <span className="text-gray-800 font-medium text-sm">{point}</span>
               </div>
             ))}
          </div>

          <div className="mt-8">
             <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
               Join the Kishan Parivar Today
             </h3>
             <p className="text-base text-gray-600 font-medium">
               Upgrade your lifestyle. Protect your health. Save every day.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KishanParivarInfo;
