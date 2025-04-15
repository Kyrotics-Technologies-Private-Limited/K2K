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
  { id: 1, name: "Microsoft", logo: "/assets/logos/microsoft.png" },
  { id: 2, name: "Google", logo: "/assets/logos/google.png" },
  { id: 3, name: "Amazon", logo: "/assets/logos/amazon.png" },
  { id: 4, name: "IBM", logo: "/assets/logos/ibm.png" },
  { id: 5, name: "Apple", logo: "/assets/logos/apple.webp" },
];

const allLogos = [...companyLogos, ...companyLogos];

const RecognizedBy: React.FC = () => {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-6 md:px-8">
          <h2 className="text-lg md:text-xl font-semibold text-green-brand whitespace-nowrap">
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
                  className="flex-shrink-0 mx-8 md:mx-12 transition-all duration-300"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-10 md:h-14 w-auto object-contain"
                    loading="lazy"
                  />
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
      `}</style>
    </section>
  );
};

export default RecognizedBy;