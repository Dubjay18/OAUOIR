import HeroSection from "@/app/components/home/Hero.section";
import AboutSection from "@/app/components/home/About.section";
import QuickFixSection from "./components/home/QuickFix.section";

export default function Home() {
  return (
    <main className={"overflow-x-hidden"}>
      <HeroSection />
      <QuickFixSection />
      <AboutSection />
    </main>
  );
}
