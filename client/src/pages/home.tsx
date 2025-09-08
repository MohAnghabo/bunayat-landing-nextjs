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

export default function Home() {
  useEffect(() => {
    // Track landing page view
    trackConversionFunnel.landingPageView();
  }, []);

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
