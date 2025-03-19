import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KishanParivar from '../components/KishanParivar';
import KishanParivarForm from '../components/kishanParivar/KishanParivarForm';

const KishanParivarPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <Hero />
      <RecognizedBy/>
      <FeaturesSection />
      <ProductSection />
      <GuaranteeCycle  />
      <FarmerBanner/>
      <KishanParivar/>
      <TestimonialsSection /> */}
      <KishanParivar/>
      <KishanParivarForm/>
      <Footer />
    </div>
  )
}

export default KishanParivarPage