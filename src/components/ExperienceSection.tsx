
import { Briefcase } from "lucide-react";
import FadeInView from "./animations/FadeInView";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

const experiences: Experience[] = [
  {
    title: "Co-founder",
    company: "Maanya AI Agency",
    period: "2022 - Present",
    description: "Leading AI solutions development for businesses across various industries, focusing on automation, optimization, and intelligent systems.",
    achievements: [
      "Developed AI-powered recruitment solutions that reduced hiring time by 40%",
      "Created custom chatbots for healthcare and real estate clients",
      "Implemented automation systems for jewelry business EMI tracking",
      "Built AI agents for website management and Google Ads optimization"
    ]
  },
  {
    title: "AI/ML Intern",
    company: "Dotkonnekt",
    period: "2021 - 2022",
    description: "Worked on image classification systems and analytics dashboards, gaining hands-on experience with machine learning models and backend development.",
    achievements: [
      "Developed an image classification system with 95% accuracy",
      "Built RESTful APIs using FastAPI for data processing",
      "Created analytics dashboards to visualize business metrics",
      "Optimized data preprocessing workflows for ML models"
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-secondary/50">
      <div className="container max-w-7xl mx-auto">
        <FadeInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block pill bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground mb-4">
              <span className="font-medium">Career Path</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Professional Experience
            </h2>
            <p className="text-muted-foreground">
              My journey in technology and AI, where I've contributed to innovative solutions and grown my expertise.
            </p>
          </div>
        </FadeInView>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <div key={exp.title} className="mb-12 last:mb-0">
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-secondary border-2 border-primary md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-10"></div>

                {/* Left or empty for even items on desktop */}
                <div className={`relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <FadeInView animation={index % 2 === 0 ? "fade-in-right" : "fade-in-left"}>
                    <div className="glass p-6 rounded-xl h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                      <p className="mb-4 text-sm">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement) => (
                          <li key={achievement} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeInView>
                </div>

                {/* Empty for odd items on desktop */}
                <div className={`hidden md:block ${index % 2 === 1 ? "md:order-1" : ""}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
