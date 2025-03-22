
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../components/ProjectsSection";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import FadeInView from "@/components/animations/FadeInView";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  
  const project = projects.find((p) => p.id === projectId);
  
  useEffect(() => {
    // Set HTML class for smooth scrolling
    document.documentElement.classList.add("smooth-scroll");
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // Clean up
    return () => {
      document.documentElement.classList.remove("smooth-scroll");
    };
  }, []);
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Go Back Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container max-w-5xl mx-auto pb-16">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/#projects">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <FadeInView animation="fade-in">
            <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
            
            <div className="aspect-video overflow-hidden rounded-lg mb-8 border border-border">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="pill bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc nec ultricies ultricies, 
                  nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc. Nullam euismod, nunc nec ultricies ultricies,
                  nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Solution & Implementation</h2>
                <p className="text-muted-foreground mb-4">
                  Our team developed a customized solution that addressed the specific challenges of this project:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Advanced machine learning algorithms for pattern recognition</li>
                  <li>Custom-built infrastructure for scalable processing</li>
                  <li>Intuitive user interface for seamless interaction</li>
                  <li>Comprehensive data analysis and reporting tools</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Results</h2>
                <p className="text-muted-foreground mb-4">
                  The implementation of our AI solution resulted in:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>40% increase in operational efficiency</li>
                  <li>25% reduction in human error rates</li>
                  <li>Significant cost savings across multiple departments</li>
                  <li>Enhanced data-driven decision making capabilities</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/#contact">
                  Request Similar Solution
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              {project.links?.github && (
                <Button variant="outline" asChild>
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </a>
                </Button>
              )}
              
              {project.links?.live && (
                <Button variant="outline" asChild>
                  <a 
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
            </div>
          </FadeInView>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <div className="container">
          <p>© {new Date().getFullYear()} AI Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
