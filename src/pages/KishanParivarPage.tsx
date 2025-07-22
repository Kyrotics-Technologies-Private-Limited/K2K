import { useRef } from 'react';
import { AuthProvider } from '../context/AuthContext';
import KishanParivarForm from '../components/kishanParivar/KishanParivarForm';
import KishanParivarHero from '../components/kishanParivar/KishanParivarHero';
import FeaturesKishanParivar from '../components/kishanParivar/FeaturesKishanParivar';
import MembershipStatusSection from '@/components/kishanParivar/MembershipStatusSecction';



const KishanParivarPage = () => {
  // Type the ref properly
  const targetRef = useRef<HTMLDivElement>(null);

  // Scroll function in the Kishan Parivar Page
  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
