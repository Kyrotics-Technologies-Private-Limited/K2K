const Sourcing = () => {
    return (
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative inline-block">
            Sourcing
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform translate-y-2"></span>
          </h2>
          <p className="text-lg text-gray-500">Transparent sourcing from farm to table</p>
        </div>
  
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-[48%] relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-100 to-green-50 rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
            <img 
              src="/assets/traceabilityImg/SOURCING.png" 
              alt="Supply chain tracking"
              className="relative rounded-xl shadow-lg w-full h-auto max-h-[350px] object-contain z-10 transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
  
          <div className="lg:w-[52%] space-y-6">
            <div className="relative">
              <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-green-300 to-green-500 rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed pl-6">
                We source directly from rural farmers and women, ensuring quality while supporting local communities. 
                Our commitment to transparency and fair trade empowers these stakeholders, creating sustainable 
                agricultural ecosystems and fostering economic growth.
              </p>
            </div>
  
            <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 italic font-medium">
                  "Enjoy authentic flavors while making measurable impact on rural livelihoods through our direct partnerships."
                </p>
              </div>
            </div>
  
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Ethically Sourced</p>
                <p className="text-xs text-gray-500">Certified Fair Trade Partnership</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sourcing;

  