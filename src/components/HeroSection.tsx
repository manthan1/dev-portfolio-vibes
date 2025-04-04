
import { Hero } from "./ui/component";
import ChatbotWidget from "./ChatbotWidget";
import { SplineScene } from "./ui/splite";
import { Button } from "./ui/button";
import { MoveRight, PhoneCall, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, useRef } from "react";
import { openChatbot } from "./ChatbotWidget";
import { Spotlight } from "./ui/spotlight";

export default function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const titles = useMemo(
    () => ["Your Work", "Your Time", "Your Business", "Your Tasks", "Your Growth"],
    []
  );

  useEffect(() => {
    // Clear any existing interval when component mounts or titleNumber changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set new interval
    intervalRef.current = window.setInterval(() => {
      setTitleNumber(prev => prev === titles.length - 1 ? 0 : prev + 1);
    }, 2000);
    
    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [titles.length]);

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="pt-0 pb-0 min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden">
        <Spotlight fill="white" size={800} fullScreen={true} className="z-0" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
            {/* Left side - Text content */}
            <div className="flex flex-col items-start justify-center gap-6 order-2 lg:order-1">
              <div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300"
                  onClick={openChatbot}
                >
                  <span className="text-xs sm:text-sm">Talk to our AI assistant</span> <MessageSquare className="w-4 h-4 text-cyan-400" />
                </Button>
              </div>
              
              <div className="flex flex-col gap-2 items-start">
                <h1 className="text-4xl sm:text-5xl md:text-7xl max-w-2xl tracking-tighter font-regular">
                  <span className="text-primary">The AI Agency Built to Automate</span>
                  <div className="relative flex overflow-hidden h-[clamp(50px,12vw,90px)] mt-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={titleNumber}
                        className="absolute font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 30,
                          mass: 0.5
                        }}
                      >
                        {titles[titleNumber]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </h1>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
                  We build custom AI tools that automate the boring stuff — so you can focus on what actually matters.
                </p>
              </div>
              <div className="flex flex-row gap-3 mt-2">
                <Button 
                  size="lg" 
                  className="bg-transparent border border-input text-white gap-2 sm:gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300 text-xs sm:text-sm" 
                  variant="outline" 
                  onClick={handleScrollTo("contact")}
                >
                  Book a Free Call <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                </Button>
                <Button 
                  size="lg" 
                  className="gap-2 sm:gap-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300 text-xs sm:text-sm" 
                  onClick={handleScrollTo("projects")}
                >
                  Our Work <MoveRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
            
            {/* Right side - 3D Avatar */}
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg order-1 lg:order-2 bg-black/[0.96]">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <ChatbotWidget />
    </>
  );
}
