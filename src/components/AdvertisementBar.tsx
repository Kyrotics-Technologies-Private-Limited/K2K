const AdvertisementBar = () => {
    return (
      <a
        href="/kishanParivarPage"
        className="h-10 w-full bg-gradient-to-r from-green-700 to-green-600 flex justify-center items-center cursor-pointer group hover:from-green-800 hover:to-green-700 transition-all duration-300 shadow-sm"
      >
        <div className="text-white font-normal tracking-wide flex items-center space-x-2">
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