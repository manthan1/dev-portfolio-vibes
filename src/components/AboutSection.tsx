
import { Code, Cpu, Server, Zap } from "lucide-react";
import FadeInView from "./animations/FadeInView";
import { BeamsBackground } from "./ui/beams-background";

const features = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "AI Automation",
    description: "Creating intelligent systems that automate repetitive tasks and workflows.",
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: "Custom AI Solutions",
    description: "Building tailored AI applications that solve your specific business challenges.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "Smart Infrastructure",
    description: "Designing scalable AI systems that grow with your business needs.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Business Optimization",
    description: "Streamlining operations and driving efficiency through intelligent automation.",
  },
];

export default function AboutSection() {
  return (
    <BeamsBackground intensity="subtle">
      <section id="about" className="relative py-24">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FadeInView animation="fade-in">
                <div className="inline-block pill bg-accent/20 text-accent mb-4">
                  <span className="font-medium">About Us</span>
                </div>
              </FadeInView>
              
              <FadeInView animation="fade-in">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Your partner in AI-powered business transformation
                </h2>
              </FadeInView>
              
              <FadeInView animation="fade-in" delay={200}>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We're not just building tools—we're building smart solutions that think, learn, and deliver results. 
                    Whether you're a startup or a scaling enterprise, our AI-driven systems are designed to automate, 
                    optimize, and accelerate your workflow.
                  </p>
                  <p>
                    At our agency, we combine deep technical expertise with strategic business thinking to create AI 
                    solutions that deliver real value. Our team of specialists works closely with you to understand your 
                    challenges and build custom AI systems that drive growth and efficiency.
                  </p>
                  <p>
                    From chatbots and recommendation engines to predictive analytics and automation tools, our solutions 
                    are built to enhance your business capabilities and give you a competitive edge in the digital age.
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
                  className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg"
                >
                  <div className="flex flex-col gap-3">
                    <div className="p-2 w-fit rounded-md bg-accent/20 text-accent">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BeamsBackground>
  );
}
