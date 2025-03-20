
import FadeInView from "./animations/FadeInView";

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 1-10
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 9 },
      { name: "JavaScript", level: 7 },
      { name: "TypeScript", level: 7 },
      { name: "SQL", level: 8 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "FastAPI", level: 9 },
      { name: "Django", level: 7 },
      { name: "Node.js", level: 6 },
      { name: "PostgreSQL", level: 8 },
    ],
  },
  {
    title: "AI & ML",
    skills: [
      { name: "Machine Learning", level: 8 },
      { name: "NLP", level: 9 },
      { name: "Computer Vision", level: 7 },
      { name: "TensorFlow", level: 8 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 7 },
      { name: "HTML/CSS", level: 8 },
      { name: "Tailwind CSS", level: 7 },
      { name: "UI/UX Design", level: 6 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 7 },
      { name: "GCP", level: 6 },
      { name: "Docker", level: 7 },
      { name: "CI/CD", level: 6 },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "System Design", level: 8 },
      { name: "Process Automation", level: 9 },
      { name: "API Development", level: 8 },
      { name: "Project Management", level: 7 },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills">
      <div className="container max-w-7xl mx-auto">
        <FadeInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block pill bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground mb-4">
              <span className="font-medium">Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Technical Skills
            </h2>
            <p className="text-muted-foreground">
              The technologies, languages, and frameworks I work with to build innovative solutions.
            </p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <FadeInView
              key={category.title}
              animation="scale-in"
              delay={100 * categoryIndex}
              className="glass p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-4">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level * 10}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{
                          width: `${skill.level * 10}%`,
                          opacity: 0.7 + skill.level * 0.03,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
