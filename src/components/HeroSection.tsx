
import { SplineScene } from "./ui/splite";
import { Button } from "./ui/button";
import { MoveRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { openChatbot } from "./ChatbotWidget";
import { Spotlight } from "./ui/spotlight";

export default function HeroSection() {
  const [isHovering, setIsHovering] = useState(false);

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden">
      <Spotlight fill="white" size={1200} fullScreen={true} />
      
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          {/* 3D Bot as the main centerpiece */}
          <motion.div 
            className="relative w-full max-w-2xl h-[500px] mx-auto rounded-lg overflow-hidden shadow-lg bg-black/[0.96]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
            {isHovering && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
                <Button 
                  size="lg" 
                  onClick={openChatbot}
                  className="gap-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300"
                >
                  Talk to me
                </Button>
              </div>
            )}
          </motion.div>
          
          {/* Text content below the 3D model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                AI Assistant
              </span>
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              Your intelligent companion for automating tasks, answering questions, and helping your business grow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-transparent border border-input text-white gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" 
                variant="outline" 
                onClick={handleScrollTo("contact")}
              >
                Book a Free Call <PhoneCall className="w-4 h-4 text-cyan-400" />
              </Button>
              <Button 
                size="lg" 
                className="gap-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" 
                onClick={openChatbot}
              >
                Try the AI <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
