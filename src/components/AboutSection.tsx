import { Code, Cpu, Server, Zap } from "lucide-react";
const features = [{
  icon: <Cpu className="h-5 w-5" />,
  title: "AI-Powered Automation",
  description: "Streamline operations and eliminate repetitive tasks. Let AI handle the busywork so you can focus on what matters."
}, {
  icon: <Code className="h-5 w-5" />,
  title: "AI Consulting & Strategy",
  description: "We analyze your processes, identify AI opportunities, and craft tailored strategies to maximize ROI."
}, {
  icon: <Server className="h-5 w-5" />,
  title: "Custom AI Development",
  description: "From chatbots to predictive analytics, we build AI solutions tailored to your specific business needs."
}, {
  icon: <Zap className="h-5 w-5" />,
  title: "AI Agents & Virtual Assistants",
  description: "Enhance customer experience with AI assistants capable of handling complex tasks and decision-making."
}];
export default function AboutSection() {
  return <section id="about" className="bg-background py-24">
      <div className="container max-w-7xl mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 lg:px-0">
          <div className="space-y-8">
            <div className="inline-block pill bg-accent/20 text-accent mb-4">
              <span className="font-medium px-1">About Us</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              PhazeAI – Your Partner in AI-Powered Business Transformation
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed px-0 font-normal">At PhazeAI, we go beyond building AI tools—we create intelligent solutions tailored to automate, optimize, and enhance your business processes. Our approach integrates deep technical expertise with strategic business insights, ensuring that every AI system we develop drives substantial value.</p>
              <p className="leading-relaxed">Working closely with our clients, we understand your unique challenges and craft custom AI solutions that fuel growth and efficiency for both startups and scaling enterprises.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(feature => <div key={feature.title} className="p-6 rounded-xl bg-secondary border border-border/30 shadow-lg transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-[1.02] hover:border-accent/40">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit rounded-md bg-accent/20 text-accent">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}