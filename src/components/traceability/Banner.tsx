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

import React from "react";
import { Leaf, MapPin, Award } from "lucide-react";

const NatureTraceBanner: React.FC = () => {
  const handleRedirect = () => {
    // Replace with your actual website URL
    window.open("https://yourcompanywebsite.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-green-brand/40"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            {/* <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">

              <Leaf className="h-20 w-20 text-white" />
            </div> */}
            <img
              src="/assets/images/K2K Logo.png"
              alt="Kishan2Kitchen Logo"
              className="h-32 w-32 bg-white p-2 object-cover mr-1 rounded-lg"
            />
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
            Trace Your Natural Journey
          </h1>
          
          <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-xl bg-black/20 rounded-xl ">
            Uncover the story behind every product. From farm to table, 
            we guarantee transparency, quality, and authenticity in every drop.
          </p>
          
          <div className="flex justify-center space-x-6 mb-16">
            <button 
              onClick={handleRedirect}
              className="flex items-center justify-center px-10 py-5 bg-white text-green-800 font-bold rounded-full 
                         hover:bg-green-100 transition-all duration-300 
                         transform hover:-translate-y-2 shadow-2xl hover:shadow-xl"
            >
              Explore Our Traceability
              {/* <Award className="ml-4 h-6 w-6" /> */}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-12">
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <MapPin className="h-6 w-6 text-white" />
              <span className="text-white font-medium">100+ Sourcing Locations</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Award className="h-6 w-6 text-white" />
              <span className="text-white font-medium">Certified Organic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NatureTraceBanner;