
import { ExternalLink, Github } from "lucide-react";
import FadeInView from "./animations/FadeInView";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  links?: {
    github?: string;
    live?: string;
  };
}

const projects: Project[] = [
  {
    id: "ai-job-recommendation",
    title: "AI-powered Job Recommendation System",
    description: "Developed a recommendation engine that matches job seekers with relevant opportunities based on skills, experience, and preferences.",
    tags: ["Python", "Machine Learning", "NLP", "FastAPI"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "music-recommendation",
    title: "Music Recommendation System using CNN",
    description: "Built a music recommendation system using Convolutional Neural Networks that analyzes audio patterns to suggest similar tracks.",
    tags: ["Python", "TensorFlow", "CNN", "Audio Processing"],
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "number-plate-detection",
    title: "Number Plate Detection (YOLOv8)",
    description: "Implemented a real-time license plate detection system using YOLOv8 for traffic monitoring and security applications.",
    tags: ["Computer Vision", "YOLOv8", "Python", "OpenCV"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "whatsapp-chatbot",
    title: "WhatsApp Chatbot for a Clinic",
    description: "Created an automated WhatsApp chatbot that handles appointment scheduling, reminders, and basic patient queries for a medical clinic.",
    tags: ["Python", "Twilio API", "NLP", "Healthcare"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "video-chatbot",
    title: "Video Chatbot for Business Services",
    description: "Designed an interactive video chatbot that provides personalized business service information through natural conversation.",
    tags: ["WebRTC", "NLP", "React", "Python"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ai-recruitment-bot",
    title: "AI-driven Recruitment Bot",
    description: "Built an intelligent recruitment assistant that screens candidates, conducts initial interviews, and ranks applicants based on job fit.",
    tags: ["Python", "NLP", "ML", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f8f378?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
];

export { projects };

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#111827] py-24 border-t border-b border-accent/10">
      <div className="container max-w-7xl mx-auto relative">
        <FadeInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block pill bg-accent/20 text-accent mb-4">
              <span className="font-medium">Our Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              Featured Projects
            </h2>
            <p className="text-gray-300">
              A selection of our recent work in AI, automation, and software development. Each project represents unique challenges solved with innovative approaches.
            </p>
          </div>
        </FadeInView>

        <div className="absolute -top-16 -left-16 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projects.map((project, index) => (
            <FadeInView 
              key={project.id} 
              animation="scale-in" 
              delay={100 * index}
              className="group"
            >
              <Link to={`/projects/${project.id}`} className="block h-full">
                <div className="h-full flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group-hover:border-accent/20">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        {project.links?.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-accent/20 hover:bg-accent/30 text-white transition-colors"
                            aria-label="View GitHub repository"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.links?.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-accent/20 hover:bg-accent/30 text-white transition-colors"
                            aria-label="View live project"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="pill bg-accent/10 text-accent text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
