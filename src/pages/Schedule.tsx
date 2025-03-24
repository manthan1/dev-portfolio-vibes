
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FadeInView from "../components/animations/FadeInView";
import { Card } from "@/components/ui/card";

export default function Schedule() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  
  useEffect(() => {
    // Check if Calendly script is already loaded
    const isScriptLoaded = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!isScriptLoaded) {
      // If not loaded, inject the script
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setIsCalendlyLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsCalendlyLoaded(true);
    }
    
    return () => {
      // Clean up if needed
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container max-w-7xl mx-auto px-6">
          <FadeInView animation="fade-in">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block pill bg-primary/10 text-cyan-400 dark:bg-primary/20 dark:text-cyan-400 mb-4 px-3 py-1 rounded-full">
                <span className="font-medium">Book a Meeting</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-cyan-400">
                Schedule a Consultation
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose a convenient time for us to discuss your project needs and how I can help you achieve your goals.
              </p>
            </div>
          </FadeInView>

          <div className="max-w-4xl mx-auto">
            <FadeInView animation="fade-in">
              <Card className="overflow-hidden shadow-lg border border-border/50">
                <div className="bg-secondary/30 px-6 py-4 border-b border-border/50">
                  <h3 className="text-xl font-semibold text-cyan-400">Select Your Preferred Time Slot</h3>
                </div>
                <div className="calendly-inline-widget" 
                  data-url="https://calendly.com/manthanjethwani02/consultancy-call" 
                  style={{ minWidth: "320px", height: "700px" }}>
                </div>
              </Card>
            </FadeInView>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <div className="container">
          <p>© {new Date().getFullYear()} AI Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
