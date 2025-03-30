const Warehousing = () => {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative inline-block">
              Warehousing
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform translate-y-2"></span>
            </h2>
            <p className="text-lg text-gray-500">Premium storage and processing standards</p>
          </div>
  
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
            {/* Image section (right) */}
            <div className="lg:w-[48%] relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-100 to-green-50 rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
              <img 
                src="/assets/traceabilityImg/WAREHOUSING.png" 
                alt="Quality inspection"
                className="relative rounded-xl shadow-lg w-full h-auto max-h-[350px] object-contain z-10 transform group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
  
            {/* Text section (left) */}
            <div className="lg:w-[52%] space-y-6">
              <div className="relative">
                <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-green-300 to-green-500 rounded-full"></div>
                <p className="text-lg text-gray-700 leading-relaxed pl-6">
                  After sourcing from rural areas, we utilize our own warehouse for testing & manufacturing. 
                  This allows us to maintain complete control over the production process, ensuring zero 
                  adulteration and purity. We prioritize excellence every step of the way.
                </p>
              </div>
  
              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 italic font-medium">
                    "Complete process control ensures premium quality from storage to final product."
                  </p>
                </div>
              </div>
  
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Quality Controlled</p>
                  <p className="text-xs text-gray-500">GMP Certified Facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Warehousing;