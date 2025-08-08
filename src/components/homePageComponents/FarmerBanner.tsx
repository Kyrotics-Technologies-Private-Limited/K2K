

import { useNavigate } from "react-router-dom";

const FarmerBanner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full relative overflow-hidden cursor-pointer"
      onClick={() => navigate("/all-products")}
      title="View all products"
    >
      <div className="w-full">
        <img
          src="/assets/images/we are in a mission.png"
          alt="Farmer Banner"
          className="w-full h-auto object-contain md:object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default FarmerBanner;
