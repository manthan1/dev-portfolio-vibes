import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, PhoneCall, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openChatbot } from "@/components/ChatbotWidget";
function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const titles = useMemo(() => ["Your Work", "Your Time", "Your Business", "Your Daily Tasks", "Your Growth"], []);
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
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="w-full h-full flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 py-16 lg:py-28">
          <div>
            <Button variant="secondary" size="sm" className="gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" onClick={openChatbot}>
              Talk to our AI assistant <MessageSquare className="w-4 h-4 text-cyan-400" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center mt-2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-primary">The AI Agency Built to Automate</span>
              <div className="relative flex justify-center overflow-hidden text-center h-[clamp(80px,16vw,160px)] my-0 mx-0 px-0 py-0">
                <AnimatePresence mode="wait">
                  <motion.span key={titleNumber} className="absolute font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -20
                }} transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.5
                }}>
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mt-1">
              We build custom AI tools that automate the boring stuff — so you can focus on what actually matters.
            </p>
          </div>
          <div className="flex flex-row gap-3 mt-3">
            <Button size="lg" className="bg-transparent border border-input text-white gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" variant="outline" onClick={handleScrollTo("contact")}>
              Book a Free Call <PhoneCall className="w-4 h-4 text-cyan-400" />
            </Button>
            <Button size="lg" className="gap-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" onClick={handleScrollTo("projects")}>
              Our Work <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
}
export { Hero };