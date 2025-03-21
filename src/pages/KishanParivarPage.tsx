import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KishanParivarForm from '../components/kishanParivar/KishanParivarForm';
import KishanParivarHero from '../components/kishanParivar/KishanParivarHero';
import GreenBar from '../components/kishanParivar/GreenBar';
import FeaturesKishanParivar from '../components/kishanParivar/FeaturesKishanParivar';
import TrialPackSection from '../components/kishanParivar/TrialPackSection';



const KishanParivarPage = () => {
  // Type the ref properly
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Scroll function in the Kishan Parivar Page
  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <GreenBar />
      <KishanParivarHero />
      <FeaturesKishanParivar scrollToTarget={scrollToTarget} />
      <TrialPackSection/>
      <KishanParivarForm targetRef={targetRef} />
      <Footer />
    </div>
  );
};

export default KishanParivarPage;