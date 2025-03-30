const ShippingWithTestReport = () => {
    return (
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative inline-block">
            Shipping With Test Report
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform translate-y-2"></span>
          </h2>
          <p className="text-lg text-gray-500">Quality verified at every step</p>
        </div>
  
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image section (left) */}
          <div className="lg:w-[48%] relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-100 to-green-50 rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
            <img
              src="/assets/traceabilityImg/SHIPPING WITH TEST REPORT.png"
              alt="Quality testing and shipping"
              className="relative rounded-xl shadow-lg w-full h-auto max-h-[350px] object-contain z-10 transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
  
          {/* Text section (right) */}
          <div className="lg:w-[52%] space-y-6">
            <div className="relative">
              <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-green-300 to-green-500 rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed pl-6">
                After manufacturing, we conduct rigorous lab tests followed by
                thorough adulteration testing to guarantee zero adulteration in
                our products. Our commitment to quality assurance ensures that
                every batch is meticulously examined, providing complete peace of
                mind and assurance of authenticity.
              </p>
            </div>
  
            <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-700 italic font-medium">
                  "We leave no stone unturned in delivering only the purest and
                  safest products to your doorstep."
                </p>
              </div>
            </div>
  
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Lab Tested</p>
                <p className="text-xs text-gray-500">
                  Adulteration-Free Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ShippingWithTestReport;