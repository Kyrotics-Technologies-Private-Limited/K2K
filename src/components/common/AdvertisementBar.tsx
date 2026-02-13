const AdvertisementBar = () => {
    return (
      <a
        href="/kishanParivarPage"
        className="h-8 md:h-10 w-full bg-green-brand flex justify-center items-center cursor-pointer group hover:bg-green-900   transition-all duration-300 shadow-sm"
      >
        <div className="text-xs sm:text-sm md:text-base text-white font-normal tracking-wide flex items-center space-x-2">
          <span className="group-hover:underline decoration-1 underline-offset-2">
            Get Exclusive Offers With Kishan Parivar Card
          </span>
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </div>
      </a>
    );
  };
  
  export default AdvertisementBar;