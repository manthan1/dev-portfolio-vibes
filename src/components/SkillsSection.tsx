
import React from "react";
import FadeInView from "./animations/FadeInView";
import { Phone, Brain, Wrench, RefreshCw, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorkflowStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    icon: <Phone className="h-10 w-10" />,
    title: "Discovery Call",
    description: "Free initial consultation",
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: "Problem Mapping",
    description: "Strategic implementation plan",
  },
  {
    icon: <Wrench className="h-10 w-10" />,
    title: "Custom AI Dev",
    description: "Tailored workflow solutions",
  },
  {
    icon: <RefreshCw className="h-10 w-10" />,
    title: "Integration",
    description: "Seamless deployment",
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Go-Live & Support",
    description: "Ongoing optimization",
  },
];

export default function OurProcessSection() {
  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills">
      <div className="container max-w-7xl mx-auto">
        <FadeInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block pill bg-primary/10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              <span className="font-medium">Our Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              🧩 How We Work
            </h2>
            <p className="text-muted-foreground">
              Our proven workflow delivers AI solutions that solve real business problems and drive measurable results.
            </p>
          </div>
        </FadeInView>

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {workflowSteps.map((step, index) => (
              <FadeInView
                key={index}
                animation="scale-in"
                delay={100 * index}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] relative z-10"
              >
                <div 
                  className="glass p-6 rounded-xl h-full border border-transparent transition-all duration-300 
                             hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:bg-background/80"
                >
                  {/* Step Number Indicator */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 w-fit
                                group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="mt-2">
                    <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-transparent border border-input text-white gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" 
            variant="outline" 
            onClick={handleScrollTo("contact")}
          >
            Book a Free Consultation <ArrowRight className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" />
          </Button>
        </div>
      </div>
    </section>
  );
}
