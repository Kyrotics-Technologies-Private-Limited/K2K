
import React from 'react';
 
interface CompanyLogo {
  id: number;
  name: string;
  logo: string;
}
 
const companyLogos: CompanyLogo[] = [
  { id: 1, name: "AFBIC-IIT-KGP", logo: "/assets/logos/AFBIC.png" },
  { id: 2, name: "IIT-KGP", logo: "/assets/logos/IITKGP.png" },
  { id: 3, name: "ISI Kolkata", logo: "/assets/logos/ISI-kolkata.png" },
  { id: 4, name: "DPIIT", logo: "/assets/logos/DPIIT.png" },
  { id: 5, name: "MSME", logo: "/assets/logos/MSME.png" },
  { id: 6, name: "Start Up India", logo: "/assets/logos/Start Up India.png" },
  { id: 7, name: "Nasscom 10k Startups", logo: "/assets/logos/Nasscom 10k Startups.png" },
  { id: 8, name: "STPI", logo: "/assets/logos/STPI.png" },
];
 
const allLogos = [...companyLogos, ...companyLogos];
 
const RecognizedBy: React.FC = () => {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="flex flex-row items-center">
        {/* Title: same row as logos on mobile (compact), full style on desktop */}
        <div className="shrink-0 pl-3 pr-2 md:px-8 md:border-l-4 md:border-green-brand md:pl-4 flex items-center">
          <h2 className="text-xs font-semibold md:text-2xl lg:text-3xl md:font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-green-brand via-emerald-600 to-green-800 whitespace-nowrap font-cormorant">
            Recognized By
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative grow overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-12 md:w-24 lg:w-40 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-12 md:w-24 lg:w-40 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden h-full">
            <div className="flex animate-scroll py-2 items-center h-full">
              {allLogos.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="shrink-0 mx-4 sm:mx-6 md:mx-8 lg:mx-12 transition-all duration-300 flex flex-col items-center gap-0.5 md:gap-2"
                >
                  <div className="logo-3d">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-7 sm:h-9 md:h-14 w-auto object-contain max-w-[64px] sm:max-w-none"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-linear-to-r from-green-brand to-emerald-700 text-center whitespace-nowrap max-w-[70px] sm:max-w-none truncate md:max-w-none md:overflow-visible">
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
 