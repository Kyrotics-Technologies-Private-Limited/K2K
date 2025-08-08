import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import KishanParivarForm from '../components/kishanParivar/KishanParivarForm';
import KishanParivarHero from '../components/kishanParivar/KishanParivarHero';
import FeaturesKishanParivar from '../components/kishanParivar/FeaturesKishanParivar';
import MembershipStatusSection from '@/components/kishanParivar/MembershipStatusSecction';



const KishanParivarPage = () => {
  // Type the ref properly
  const targetRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Scroll function in the Kishan Parivar Page
  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle hash navigation when page loads
  useEffect(() => {
    if (location.hash === '#membership-plans') {
      // Small delay to ensure the component is rendered
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }
  }, [location.hash]);

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <KishanParivarHero scrollToTarget={scrollToTarget}/>
        <FeaturesKishanParivar scrollToTarget={scrollToTarget} />
        <MembershipStatusSection/>
        <KishanParivarForm targetRef={targetRef} />
      </div>
    </AuthProvider>
  );
};

export default KishanParivarPage;
