// const Banner = () => {
//   return (
//     <div className="relative h-[86vh] w-full overflow-hidden">
//       <img 
//         src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
//         alt="Traceability Banner"
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <div className="text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Traceability Solutions</h1>
//           <p className="text-xl text-white max-w-2xl mx-auto">
//             Ensuring transparency and accountability throughout your supply chain with our advanced tracking systems.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import React, { useState, useEffect } from "react";
import { Leaf, Search, ShieldCheck, Zap, BarChart2 } from "lucide-react";

const Banner: React.FC = () => {
  const [serialNo, setSerialNo] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = () => {
    if (serialNo.trim() === "") {
      alert("Please enter a serial number.");
      return;
    }
    // window.location.href = /customer/${serialNo};
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative h-[86vh] w-full overflow-hidden">
      {/* Sexy background with gradients and effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        {/* Animated light effects */}
        <div className={`absolute top-0 left-0 w-full h-full opacity-70 transition-opacity duration-1000 ${isLoaded ? 'opacity-70' : 'opacity-0'}`}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse-slow"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse-slow animation-delay-4000"></div>
        </div>
        
        {/* Mesh grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Main content with reveal animation */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8 relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-70 blur-md animate-spin-slow"></div>
            <div className="relative bg-black bg-opacity-30 backdrop-blur-lg rounded-full p-5 z-10">
              <Leaf className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 mb-6 tracking-tight">
            Traceability Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Ensuring transparency and accountability throughout your supply chain with our advanced tracking systems.
          </p>
        </div>

        <div className="max-w-3xl w-full backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
          <div className="p-10">
            {/* Feature icons with better styling */}
            <div className="grid grid-cols-3 gap-6 mb-10 border-b border-white/10 pb-10">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-600/20 p-4 rounded-2xl w-18 h-18 mx-auto mb-3 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                  <ShieldCheck className="h-10 w-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <p className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">Product Authenticity</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-pink-500/20 to-rose-600/20 p-4 rounded-2xl w-18 h-18 mx-auto mb-3 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-pink-500/30">
                  <BarChart2 className="h-10 w-10 text-pink-400 group-hover:text-pink-300 transition-colors" />
                </div>
                <p className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">Batch Reports</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-cyan-500/20 to-teal-600/20 p-4 rounded-2xl w-18 h-18 mx-auto mb-3 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal-500/30">
                  <Zap className="h-10 w-10 text-teal-400 group-hover:text-teal-300 transition-colors" />
                </div>
                <p className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">Quality Analysis</p>
              </div>
            </div>

            {/* Search input with enhanced styling */}
            <div className="space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                  <Search className="h-6 w-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  className="relative w-full pl-14 pr-6 py-6 text-xl bg-black/50 backdrop-blur-md border border-white/20 text-white rounded-xl focus:outline-none focus:border-transparent placeholder-white/50 z-0"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter product serial number"
                />
              </div>
              
              <button 
                onClick={handleSearch}
                className="w-full py-6 text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-purple-500/25 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300 animate-shimmer"></span>
                <span className="relative z-10">Verify Product</span>
              </button>
              
              <p className="text-sm text-center text-white/60 italic">
                Enter the serial number found on your product packaging
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators with improved styling */}
        <div className="mt-14 text-center">
          <p className="text-sm text-white/80 font-medium mb-6">
            Trusted by leading natural product manufacturers worldwide
          </p>
          <div className="flex justify-center space-x-12">
            <div className="w-20 h-20 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center p-2 border border-white/20 shadow-lg transform transition-transform hover:scale-110 duration-300 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300"></div>
              <img
                src="/honey.webp"
                alt="Certification 1"
                className="w-12 h-12 rounded-full object-cover relative"
              />
            </div>
            <div className="w-20 h-20 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center p-2 border border-white/20 shadow-lg transform transition-transform hover:scale-110 duration-300 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300"></div>
              <img
                src="/cowghee.webp"
                alt="Certification 2"
                className="w-12 h-12 rounded-full object-cover relative"
              />
            </div>
            <div className="w-20 h-20 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center p-2 border border-white/20 shadow-lg transform transition-transform hover:scale-110 duration-300 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300"></div>
              <img
                src="/TeaP.webp"
                alt="Certification 3"
                className="w-12 h-12 rounded-full object-cover relative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these animations to your CSS or global styles
// const globalStyles = `

// `;

export default Banner;