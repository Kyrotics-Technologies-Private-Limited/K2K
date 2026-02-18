import { useNavigate } from "react-router-dom";
import { useBannerUrls } from "../../hooks/useBannerUrls";

const FarmerBanner = () => {
  const navigate = useNavigate();
  const { getUrl } = useBannerUrls();
  const src = getUrl("farmer_slider_mission") ?? "/assets/images/we are in a mission.png";
  return (
    <div
      className="w-full relative overflow-hidden cursor-pointer"
      onClick={() => navigate("/all-products")}
      title="View all products"
    >
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

export default FarmerBanner;
