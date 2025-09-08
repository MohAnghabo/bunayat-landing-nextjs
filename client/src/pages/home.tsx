import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Problem from "@/components/sections/problem";
import Solution from "@/components/sections/solution";
import SocialProof from "@/components/sections/social-proof";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import CompetitiveAdvantage from "@/components/sections/competitive-advantage";
import Pricing from "@/components/sections/pricing";
import Demo from "@/components/sections/demo";
import FAQ from "@/components/sections/faq";
import FinalCTA from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <SocialProof />
      <Features />
      <HowItWorks />
      <CompetitiveAdvantage />
      <Pricing />
      <Demo />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
