// import React from "react";
// import MicrosoftLogo from "../assets/assets/logos/microsoft.png";
// import GoogleLogo from "../assets/assets/logos/google.png";
// import AdobeLogo from "../assets/assets/logos/adobe.png";
// import AmazonLogo from "../assets/assets/logos/amazon.png";
// import IBMLogo from "../assets/assets/logos/ibm.png";
// import AppleLogo from "../assets/assets/logos/apple.webp";
// import MetaLogo from "../assets/assets/logos/meta.png";
// import NetflixLogo from "../assets/assets/logos/netflix.png";

const companyLogos = [
  { id: 1, name: "Microsoft", logo: "/assets/logos/microsoft.png" },
  { id: 2, name: "Google", logo: "/assets/logos/google.png" },
  { id: 3, name: "Adobe", logo: "/assets/logos/adobe.png" },
  { id: 4, name: "Amazon", logo: "/assets/logos/amazon.png" },
  { id: 5, name: "IBM", logo: "/assets/logos/ibm.png" },
  { id: 6, name: "Apple", logo: "/assets/logos/apple.webp" },
];

const allLogos = [...companyLogos, ...companyLogos];

const RecognizedBy = () => {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="flex">
        <div className="text-center px-10 flex items-center justify-center">
          <h2 className="text-base md:text-lg font-medium text-green-600">
            Recognized By
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="overflow-hidden">
            <div className="flex animate-scroll py-2">
              {allLogos.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="flex-shrink-0 mx-12 md:mx-16 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-12 md:h-16 w-auto object-contain"
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
