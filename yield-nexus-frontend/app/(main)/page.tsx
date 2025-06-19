import YieldNexusFeatures from "@/components/Landing/Features/YieldNexusFeatures";
import YieldNexusHero from "@/components/Landing/Hero/YieldNexusHero";
import YieldNexusHowItWorks from "@/components/Landing/HowItWorks/YieldNexusHowItWorks";

export default function Home() {
  return (
    <>
      <YieldNexusHero />
      <YieldNexusFeatures />
      <YieldNexusHowItWorks />
    </>
  );
}
