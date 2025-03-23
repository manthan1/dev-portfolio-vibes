
import React from "react";
import FadeInView from "./animations/FadeInView";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Phone, Brain, Wrench, RefreshCw, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    icon: <Phone className="h-10 w-10" />,
    title: "Discovery Call",
    description: "We start by understanding your unique business needs, challenges, and goals during a complimentary consultation.",
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: "Problem Mapping",
    description: "Our team analyzes your workflow, identifies bottlenecks, and creates a strategic plan for AI implementation.",
  },
  {
    icon: <Wrench className="h-10 w-10" />,
    title: "Custom AI Dev",
    description: "We build tailored AI solutions that integrate seamlessly with your existing systems and business processes.",
  },
  {
    icon: <RefreshCw className="h-10 w-10" />,
    title: "Integration",
    description: "Our experts ensure a smooth transition, with training and support to help your team adapt to the new tools.",
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Go-Live & Support",
    description: "We provide ongoing optimization and maintenance to ensure your AI solutions continue to deliver results.",
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

        <div className="relative px-8 md:px-16 py-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {workflowSteps.map((step, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <FadeInView
                    animation="scale-in"
                    delay={100 * index}
                    className="h-full"
                  >
                    <div className="glass p-6 rounded-xl h-full flex flex-col">
                      <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 w-fit mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {step.description}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        Step {index + 1} of {workflowSteps.length}
                      </div>
                    </div>
                  </FadeInView>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 md:left-4" />
            <CarouselNext className="absolute right-2 md:right-4" />
          </Carousel>
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
