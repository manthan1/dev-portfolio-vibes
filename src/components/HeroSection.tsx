
import { Hero } from "./ui/component";
import ChatbotWidget from "./ChatbotWidget";
import { SplineScene } from "./ui/splite";
import { Button } from "./ui/button";
import { MoveRight, PhoneCall, Bot } from "lucide-react";
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

  const handleOpenAIAssistant = () => {
    openChatbot();
  };

  return (
    <>
      <section id="home" className="pt-0 pb-0 min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden">
        <Spotlight fill="white" size={1200} fullScreen={true} className="z-0" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
            {/* Left side - Text content */}
            <div className="flex flex-col items-start justify-center gap-6 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300 border-cyan-400/50"
                  onClick={handleOpenAIAssistant}
                >
                  <span className="text-xs sm:text-sm">Talk to our AI assistant</span> 
                  <Bot className="w-4 h-4 text-cyan-400" />
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col gap-2 items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
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
              </motion.div>
              <motion.div 
                className="flex flex-row gap-3 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
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
              </motion.div>
            </div>
            
            {/* Right side - 3D Avatar */}
            <motion.div 
              className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg order-1 lg:order-2 bg-black/[0.96]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating AI Assistant Button */}
      <ChatbotWidget />
    </>
  );
}
