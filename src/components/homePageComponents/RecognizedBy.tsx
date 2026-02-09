// import React from "react";
// import MicrosoftLogo from "../assets/assets/logos/microsoft.png";
// import GoogleLogo from "../assets/assets/logos/google.png";
// import AdobeLogo from "../assets/assets/logos/adobe.png";
// import AmazonLogo from "../assets/assets/logos/amazon.png";
// import IBMLogo from "../assets/assets/logos/ibm.png";
// import AppleLogo from "../assets/assets/logos/apple.webp";
// import MetaLogo from "../assets/assets/logos/meta.png";
// import NetflixLogo from "../assets/assets/logos/netflix.png";

import React from 'react';

interface CompanyLogo {
  id: number;
  name: string;
  logo: string;
}

const companyLogos: CompanyLogo[] = [
  { id: 1, name: "AFBIC", logo: "/assets/logos/7.png" },
  { id: 2, name: "IIT KGP", logo: "/assets/logos/1.png" },
  { id: 3, name: "ISI-Calcutta", logo: "/assets/logos/6.png" },
  { id: 4, name: "DPIIT", logo: "/assets/logos/5.png" },
  { id: 5, name: "MSME", logo: "/assets/logos/4.png" },
  { id: 5, name: "STARTUP INDIA", logo: "/assets/logos/8.png" },
  { id: 7, name: "NASSCOM  10K STARTUP", logo: "/assets/logos/2.png" },
  { id: 8, name: "STPI GOVT OF INDIA", logo: "/assets/logos/3.png" },
  
];

const allLogos = [...companyLogos, ...companyLogos];

const RecognizedBy: React.FC = () => {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-6 md:px-8 flex items-center border-l-4 border-green-brand pl-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-brand via-emerald-600 to-green-800 whitespace-nowrap font-cormorant">
            Recognized By
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative flex-grow">
          <div className="absolute left-0 top-0 h-full w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="overflow-hidden">
            <div className="flex animate-scroll py-2">
              {allLogos.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="flex-shrink-0 mx-8 md:mx-12 transition-all duration-300 flex flex-col items-center gap-2"
                >
                  <div className="logo-3d">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-10 md:h-14 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs md:text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-brand to-emerald-700 text-center whitespace-nowrap">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          display: flex;
          animation: scroll 35s linear infinite;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        .logo-3d {
          perspective: 800px;
          transform-style: preserve-3d;
        }
        
        .logo-3d img {
          display: block;
          transition: transform 0.25s ease, filter 0.25s ease;
          transform: rotateY(-4deg) rotateX(2deg) translateZ(0);
          filter: drop-shadow(4px 6px 8px rgba(0,0,0,0.18))
                  drop-shadow(8px 12px 16px rgba(0,0,0,0.14))
                  drop-shadow(14px 20px 24px rgba(0,0,0,0.1));
        }
        
        .animate-scroll .logo-3d:hover img {
          transform: rotateY(-4deg) rotateX(2deg) translateZ(8px) scale(1.02);
          filter: drop-shadow(6px 8px 10px rgba(0,0,0,0.2))
                  drop-shadow(12px 16px 20px rgba(0,0,0,0.15))
                  drop-shadow(20px 28px 30px rgba(0,0,0,0.12));
        }
      `}</style>
    </section>
  );
};

export default RecognizedBy;