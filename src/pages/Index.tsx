
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import OurProcessSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";

// Add Calendly type declaration
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const Index = () => {
  useEffect(() => {
    // Set HTML class for smooth scrolling
    document.documentElement.classList.add("smooth-scroll");
    
    // Remove any overflow hidden properties that might prevent scrolling
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    
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
          {/* Divider line between Hero and About */}
          <div className="absolute left-0 right-0 z-10">
            <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            <div className="h-12 bg-gradient-to-b from-background to-background"></div>
          </div>
          <AboutSection />
        </div>
        <div className="relative">
          {/* Divider line between About and Skills */}
          <div className="absolute left-0 right-0 z-10">
            <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            <div className="h-12 bg-gradient-to-b from-background to-background"></div>
          </div>
          <OurProcessSection />
        </div>
        <div className="relative">
          {/* Divider line between Skills and Projects */}
          <div className="absolute left-0 right-0 z-10">
            <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            <div className="h-12 bg-gradient-to-b from-background to-background"></div>
          </div>
          <ProjectsSection />
        </div>
        <div className="relative">
          {/* Divider line between Projects and Contact */}
          <div className="absolute left-0 right-0 z-10">
            <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            <div className="h-12 bg-gradient-to-b from-background to-background"></div>
          </div>
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
