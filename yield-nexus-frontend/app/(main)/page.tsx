"use client"

import YieldNexusCtaSection from "@/components/Landing/CTA/YieldNexusCtaSection";
import YieldNexusFeatures from "@/components/Landing/Features/YieldNexusFeatures";
import YieldNexusHero from "@/components/Landing/Hero/YieldNexusHero";
import YieldNexusHowItWorks from "@/components/Landing/HowItWorks/YieldNexusHowItWorks";
import StrategyWizardSBTC from "@/components/Landing/YieldStrategy/StrategyWizardSBTC";
import YieldStrategySectionSBTC from "@/components/Landing/YieldStrategy/YieldStrategySectionSBTC";
import { useState } from "react";


export default function Home() {
  const [showStrategyWizard, setShowStrategyWizard] = useState(false);
  return (
    <>
      <YieldNexusHero />
      <YieldNexusFeatures />
      <YieldNexusHowItWorks />

      <YieldStrategySectionSBTC 
        onOpenWizard={() => setShowStrategyWizard(true)}
      />

      <YieldNexusCtaSection />

      
      {/* Strategy Wizard Modal */}
      {showStrategyWizard && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <StrategyWizardSBTC 
          onClose={() => setShowStrategyWizard(false)}
        />
      </div>
)}
    </>
  );
}
