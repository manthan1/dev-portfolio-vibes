import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import OurProcessSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { openChatbot } from "../components/ChatbotWidget";

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
        
        {/* Chat with AI button - positioned under Hero section */}
        <div className="container mx-auto text-center -mt-16 mb-16 relative z-10">
          <Button 
            onClick={openChatbot}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-300"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with our AI assistant
          </Button>
        </div>
        
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
