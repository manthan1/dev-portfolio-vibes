import { ArrowDown } from "lucide-react";
import FadeInView from "./animations/FadeInView";
import { Button } from "./ui/button";
export default function HeroSection() {
  return <section id="home" className="pt-32 md:pt-40 pb-16 md:pb-24 min-h-screen flex flex-col justify-center relative">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 space-y-8">
            <FadeInView animation="fade-in">
              <div className="inline-block pill bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground mb-4">
                <span className="font-medium">AI Agency</span>
              </div>
            </FadeInView>
            
            <FadeInView animation="fade-in" delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tighter">
                Unlock the power of <br className="hidden md:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                  AI
                </span>{" "}
                for your business
              </h1>
            </FadeInView>
            
            <FadeInView animation="fade-in" delay={400}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                We're not just building tools—we're building smart solutions that think, learn, and deliver results for businesses of all sizes.
              </p>
            </FadeInView>
            
            <FadeInView animation="fade-in" delay={600}>
              <div className="flex flex-wrap gap-4 pt-4 my-0">
                <Button size="lg" asChild className="rounded-md">
                  <a href="#contact" className="px-[24px] py-[12px]">Book a Free Call</a>
                </Button>
                <a href="#projects" className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/80 transition-colors">
                  Our Work
                </a>
              </div>
            </FadeInView>
          </div>
          
          <div className="lg:col-span-2 relative">
            <FadeInView animation="scale-in" delay={300} className="relative z-10 rounded-xl overflow-hidden aspect-[3/4] border border-border/50 shadow-xl">
              <img src="https://images.unsplash.com/photo-1581092921461-39b10bc4abad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="AI team working on solutions" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
            </FadeInView>
            
            <div className="absolute -bottom-6 -right-6 -z-10 w-3/4 h-3/4 bg-secondary rounded-xl"></div>
            <div className="absolute -top-6 -left-6 -z-10 w-3/4 h-3/4 bg-primary/5 rounded-xl"></div>
          </div>
        </div>
      </div>
      
      <a href="#about" className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <span className="text-sm font-medium">Scroll Down</span>
        <ArrowDown className="h-4 w-4 animate-float" />
      </a>
    </section>;
}