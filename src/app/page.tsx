import { AboutSection } from "@/components/AboutSection";
import { AwardsSection } from "@/components/AwardsSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import Lanyard from "@/components/Lanyard";
import { NavBar } from "@/components/NavBar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { TimelineSection } from "@/components/TimelineSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <NavBar />
      <div className="pointer-events-auto fixed right-4 top-16 z-40 hidden lg:block h-96 w-[220px]">
        <Lanyard className="h-full w-full" />
      </div>
      <HeroSection />
      <AwardsSection />
      <AboutSection />
      <ProjectsSection />
      <PublicationsSection />
      <BlogSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
