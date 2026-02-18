import { useBannerUrls } from "../../hooks/useBannerUrls";

const SecondFarmerBanner = () => {
  const { getUrl } = useBannerUrls();
  const src = getUrl("farmer_slider_adulteration") ?? "/assets/images/Adulteration free food banner (1).png";
  return (
    <div className="w-full relative overflow-hidden">
      <div className="w-full">
        <img
          src={src}
          alt="Farmer Banner"
          className="w-full h-auto object-contain md:object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default SecondFarmerBanner;
