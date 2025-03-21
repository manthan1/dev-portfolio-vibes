
import { Code, Cpu, Server, Zap } from "lucide-react";
import FadeInView from "./animations/FadeInView";

const features = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "AI Automation",
    description: "Creating intelligent systems that automate repetitive tasks and workflows.",
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: "Backend Development",
    description: "Building robust APIs and server-side applications that power digital experiences.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "System Architecture",
    description: "Designing scalable and maintainable software architectures for complex applications.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Process Optimization",
    description: "Streamlining business processes through technology integration and automation.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-secondary/50">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <FadeInView animation="fade-in">
              <div className="inline-block pill bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground mb-4">
                <span className="font-medium">About Me</span>
              </div>
            </FadeInView>
            
            <FadeInView animation="fade-in">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                CSE Engineer with a passion for AI and automation
              </h2>
            </FadeInView>
            
            <FadeInView animation="fade-in" delay={200}>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a Computer Science Engineer from NMIMS with expertise in building intelligent systems 
                  that solve real-world problems. My journey in technology has been driven by a fascination 
                  with how AI can transform businesses and simplify complex processes.
                </p>
                <p>
                  As a co-founder of MJ Agency, I've helped businesses leverage the power of 
                  artificial intelligence to automate workflows, optimize operations, and create unique 
                  digital experiences for their customers.
                </p>
                <p>
                  My approach combines technical expertise with a deep understanding of business needs, 
                  allowing me to create solutions that not only work flawlessly but also deliver 
                  measurable value.
                </p>
              </div>
            </FadeInView>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FadeInView 
                key={feature.title} 
                animation="scale-in" 
                delay={150 * index}
                className="glass p-6 rounded-xl"
              >
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-md bg-primary/5 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
