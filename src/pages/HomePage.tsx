//import Navbar from '../components/Navbar';
import Hero from "../components/homePageComponents/Hero";
import ProductSection from "../components/homePageComponents/ProductSection";
import FeaturesSection from "../components/homePageComponents/FeaturesSection";
import TestimonialsSection from "../components/homePageComponents/TestimonialsSection";
import GuaranteeCycle from "../components/homePageComponents/GuaranteeCycle";
import RecognizedBy from "../components/homePageComponents/RecognizedBy";
import KishanParivar from "../components/homePageComponents/KishanParivar";
import FarmerBanner from "../components/homePageComponents/FarmerBanner";
import SecondFarmerBanner from "../components/homePageComponents/SecondFarmerBanner";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <RecognizedBy />
      <FeaturesSection />
      <ProductSection />
      <FarmerBanner />
      <GuaranteeCycle />
      <SecondFarmerBanner />
      <KishanParivar />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
