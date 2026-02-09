//import Navbar from '../components/Navbar';
import Hero from "../components/homePageComponents/Hero";
import ProductSection from "../components/homePageComponents/ProductSection";
import FeaturesSection from "../components/homePageComponents/FeaturesSection";
import TestimonialsSection from "../components/homePageComponents/TestimonialsSection";
import GuaranteeCycle from "../components/homePageComponents/GuaranteeCycle";
import RecognizedBy from "../components/homePageComponents/RecognizedBy";
import KishanParivar from "../components/homePageComponents/KishanParivar";
import FarmerBannerSlider from "../components/homePageComponents/FarmerBannerSlider";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <RecognizedBy />
      <FeaturesSection />
      <ProductSection />
      <GuaranteeCycle />
      <FarmerBannerSlider />
      <KishanParivar />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
