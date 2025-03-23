
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import OurProcessSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";

const Index = () => {
  useEffect(() => {
    // Set HTML class for smooth scrolling
    document.documentElement.classList.add("smooth-scroll");
    
    // Clean up
    return () => {
      document.documentElement.classList.remove("smooth-scroll");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10"></div>
          <AboutSection />
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-[#111827] to-transparent z-10"></div>
          <OurProcessSection />
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-background to-[#111827] z-10"></div>
          <ProjectsSection />
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-[#111827] to-background z-10"></div>
          <ContactSection />
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <div className="container">
          <p>© {new Date().getFullYear()} AI Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
