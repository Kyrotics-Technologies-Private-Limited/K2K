import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import GuaranteeCycle from '../components/GuaranteeCycle';
import RecognizedBy from '../components/RecognizedBy';
import KishanParivar from '../components/KishanParivar';
import FarmerBanner from '../components/FarmerBanner';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <RecognizedBy/>
      <FeaturesSection />
      <ProductSection />
      <GuaranteeCycle  />
      <FarmerBanner/>
      <KishanParivar/>
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

export default HomePage