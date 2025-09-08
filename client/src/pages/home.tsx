import { useEffect } from "react";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import ProblemSolution from "@/components/sections/problem-solution";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";
import FinalCTA from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";
import { trackConversionFunnel } from "@/lib/posthog";
import { useUserBehavior } from "@/hooks/use-user-behavior";

export default function Home() {
  const { trackPerformance, trackJourneyCompletion } = useUserBehavior();

  useEffect(() => {
    // Track landing page view
    trackConversionFunnel.landingPageView();
    
    // Track page performance
    trackPerformance();
    
    // Track journey completion on page unload
    const handleBeforeUnload = () => {
      trackJourneyCompletion();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackJourneyCompletion();
    };
  }, [trackPerformance, trackJourneyCompletion]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
