import Banner from "../components/traceability/Banner";
import ShippingWithTestReport from "../components/traceability/ShippingWithTestReport";
import Sourcing from "../components/traceability/Sourcing";
import Warehousing from "../components/traceability/Warehousing";

const Traceability = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Banner/>
      <Sourcing/>
      <Warehousing/>
      <ShippingWithTestReport/>
    </div>
  );
};

export default Traceability;