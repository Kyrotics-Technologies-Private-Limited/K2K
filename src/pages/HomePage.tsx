//import Navbar from '../components/Navbar';
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import GuaranteeCycle from "../components/GuaranteeCycle";
import RecognizedBy from "../components/RecognizedBy";
import KishanParivar from "../components/KishanParivar";
import FarmerBanner from "../components/FarmerBanner";
import SecondFarmerBanner from "../components/SecondFarmerBanner";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <RecognizedBy />
      <FeaturesSection />
      <ProductSection />
      <GuaranteeCycle />
      <FarmerBanner />
      <KishanParivar />
      <SecondFarmerBanner />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
