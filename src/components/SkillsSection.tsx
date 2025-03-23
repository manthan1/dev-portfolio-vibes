
import React from "react";
import FadeInView from "./animations/FadeInView";
import { ArrowRight, Phone, Brain, Wrench, RefreshCw, Rocket, ArrowDown } from "lucide-react";
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

export default function HowWeWorkSection() {
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

        <div className="relative py-8 px-4 max-w-5xl mx-auto">
          {/* First Row - 2 Steps with Arrow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
            {workflowSteps.slice(0, 2).map((step, index) => (
              <FadeInView
                key={index}
                animation="scale-in"
                delay={100 * index}
                className="relative z-10"
              >
                <div 
                  className="glass p-6 rounded-xl h-full flex flex-col relative group transition-all duration-300 
                             hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:bg-background/80"
                >
                  {/* Step Number Indicator */}
                  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Icon with gradient background */}
                  <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 w-fit mb-4 
                                group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Title with gradient text */}
                  <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </FadeInView>
            ))}
            
            {/* Arrow between first two steps */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <ArrowRight className="w-8 h-8 text-cyan-400 animate-pulse-subtle" />
            </div>
            
            {/* Arrow pointing down to connect rows */}
            <div className="hidden md:flex absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-8 z-20">
              <ArrowDown className="w-8 h-8 text-cyan-400 animate-pulse-subtle" />
            </div>
          </div>
          
          {/* Second Row - 3 Steps with Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {workflowSteps.slice(2).map((step, index) => (
              <FadeInView
                key={index + 2}
                animation="scale-in"
                delay={100 * (index + 2)}
                className="relative z-10"
              >
                <div 
                  className="glass p-6 rounded-xl h-full flex flex-col relative group transition-all duration-300 
                             hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:bg-background/80"
                >
                  {/* Step Number Indicator */}
                  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 3}
                  </div>
                  
                  {/* Icon with gradient background */}
                  <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 w-fit mb-4 
                                group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Title with gradient text */}
                  <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </FadeInView>
            ))}
            
            {/* Arrows between bottom row steps */}
            <div className="hidden md:flex absolute left-[calc(25%-4px)] top-1/2 transform -translate-y-1/2 z-20">
              <ArrowRight className="w-8 h-8 text-cyan-400 animate-pulse-subtle" />
            </div>
            
            <div className="hidden md:flex absolute left-[calc(58.33%-4px)] top-1/2 transform -translate-y-1/2 z-20">
              <ArrowRight className="w-8 h-8 text-cyan-400 animate-pulse-subtle" />
            </div>
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
