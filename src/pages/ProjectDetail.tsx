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

  // Custom content for AI Outreach Automation System project
  if (projectId === "ai-job-recommendation") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container max-w-5xl mx-auto pb-16">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/#projects">Projects</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <FadeInView animation="fade-in">
              <h1 className="text-4xl font-bold mb-6">🧠 {project.title}</h1>
              <p className="text-lg mb-8">
                <span className="font-semibold">Tech Stack:</span> {project.tags.join(", ")} | 
                <span className="font-semibold ml-2">Industries:</span> Marketing, Client Outreach, B2B Automation
              </p>
              
              <div className="aspect-video overflow-hidden rounded-lg mb-8 border border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    A consulting team faced a major bottleneck in their outreach process. They were spending hours manually 
                    researching businesses through directories like ZaubaCorp and Tofler, collecting details like registration 
                    info and director data, then manually crafting personalized emails. It was repetitive, slow, and costly.
                  </p>
                  <p className="text-muted-foreground">
                    We stepped in with a custom AI automation system that replaced all of this with one seamless workflow.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Solution & Implementation</h2>
                  <p className="text-muted-foreground mb-4">
                    Our AI-powered pipeline simplified their operations end-to-end:
                  </p>
                  <ul className="list-none pl-6 space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">✅</span>
                      <span><span className="font-medium text-white">Excel-Based Input:</span> Team uploads an Excel file with a list of target companies.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">🔍</span>
                      <span><span className="font-medium text-white">Automated Research Engine:</span> AI scrapes data such as CIN, directors, industry classification, etc., from reliable online sources.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">✍️</span>
                      <span><span className="font-medium text-white">Personalized Message Generator:</span> NLP models generate tailored outreach messages using smart templates.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">📧</span>
                      <span><span className="font-medium text-white">Email Delivery:</span> The system automatically sends out these messages through integrated email channels.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Results</h2>
                  <p className="text-muted-foreground mb-4">
                    🚀 Transformational impact:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><span className="font-semibold text-white">90% reduction</span> in time spent on manual tasks</li>
                    <li><span className="font-semibold text-white">Significant cost savings</span> on staffing and resources</li>
                    <li><span className="font-semibold text-white">Increased outreach success</span> with faster, more personalized communication</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/#contact">
                    💡 Request a Similar Solution
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                  </Link>
                </Button>
                
                {project.links?.github && (
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
            <p>© {new Date().getFullYear()} AutoScale — Helping biz scale with AI.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Custom content for AI-Powered Quotation Assistant
  if (projectId === "quotation-assistant") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container max-w-5xl mx-auto pb-16">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/#projects">Projects</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <FadeInView animation="fade-in">
              <h1 className="text-4xl font-bold mb-6">🛠️ {project.title}</h1>
              <p className="text-lg mb-8">
                <span className="font-semibold">Tech Stack:</span> {project.tags.join(", ")} | 
                <span className="font-semibold ml-2">Industries:</span> Manufacturing, Engineering, B2B Sales
              </p>
              
              <div className="aspect-video overflow-hidden rounded-lg mb-8 border border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    A manufacturing company faced a significant challenge in handling high volumes of quotation requests daily. 
                    Their team manually extracted specifications from engineering drawings, calculated price estimates, and 
                    sent emails—a slow, error-prone process that hindered efficiency.
                  </p>
                  <p className="text-muted-foreground">
                    We introduced an AI-driven quotation assistant that streamlined the entire workflow.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Solution & Implementation</h2>
                  <p className="text-muted-foreground mb-4">
                    Our AI-powered system automated the quotation process end-to-end:
                  </p>
                  <ul className="list-none pl-6 space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">✅</span>
                      <span><span className="font-medium text-white">Drawing Analysis:</span> AI reads technical drawings to detect key components, dimensions, and materials.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">🔍</span>
                      <span><span className="font-medium text-white">Smart Query Handling:</span> The AI agent identifies and logs any customer queries or special requests mentioned in the documents.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">📊</span>
                      <span><span className="font-medium text-white">Automated Calculation Engine:</span> Using predefined pricing rules and historical data, the AI instantly generates price estimates.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">📧</span>
                      <span><span className="font-medium text-white">Instant Communication:</span> The bot formats and sends quotation emails automatically, reducing human intervention.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Results</h2>
                  <p className="text-muted-foreground mb-4">
                    🚀 Impactful transformation:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><span className="font-semibold text-white">Reduced quotation generation time</span> from 30 minutes to under 2 minutes</li>
                    <li><span className="font-semibold text-white">Eliminated dependency</span> on multiple human checkpoints, reducing errors</li>
                    <li><span className="font-semibold text-white">Increased customer satisfaction</span> with faster response times and efficient processing</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/#contact">
                    💡 Request a Similar Solution
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                  </Link>
                </Button>
                
                {project.links?.github && (
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
            <p>© {new Date().getFullYear()} AutoScale — Helping biz scale with AI.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Custom content for AI-Powered Conversational Feedback Bot
  if (projectId === "conversational-feedback-bot") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container max-w-5xl mx-auto pb-16">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/#projects">Projects</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <FadeInView animation="fade-in">
              <h1 className="text-4xl font-bold mb-6">💬 {project.title}</h1>
              <p className="text-lg mb-8">
                <span className="font-semibold">Tech Stack:</span> {project.tags.join(", ")} | 
                <span className="font-semibold ml-2">Industries:</span> Creative Studios, Customer Experience, Service-Based Businesses
              </p>
              
              <div className="aspect-video overflow-hidden rounded-lg mb-8 border border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    A creative studio struggled with collecting meaningful client feedback. Their long, static Google Forms discouraged 
                    users from responding, leading to poor engagement and hard-to-interpret insights.
                  </p>
                  <p className="text-muted-foreground">
                    We developed an AI-driven conversational feedback bot to enhance user interaction and extract valuable feedback effortlessly.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Solution & Implementation</h2>
                  <p className="text-muted-foreground mb-4">
                    Our AI-powered bot transformed feedback collection with an engaging, intelligent approach:
                  </p>
                  <ul className="list-none pl-6 space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">✅</span>
                      <span><span className="font-medium text-white">Interactive Feedback Collection:</span> The bot chats with users in a friendly, conversational manner, making feedback submission effortless.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">🔄</span>
                      <span><span className="font-medium text-white">Follow-up Intelligence:</span> If a user gives a low rating, the bot smartly asks relevant follow-up questions like, "What could we have done better?" or "Was it the delivery, quality, or interaction?"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">📊</span>
                      <span><span className="font-medium text-white">Sentiment Analysis:</span> AI evaluates the tone and emotion behind responses to gain deeper insights.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">📈</span>
                      <span><span className="font-medium text-white">Real-time Dashboard:</span> Feedback data is stored and visualized in an interactive dashboard, highlighting trends and areas needing improvement.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Results</h2>
                  <p className="text-muted-foreground mb-4">
                    🚀 Measurable impact:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><span className="font-semibold text-white">3x increase</span> in client feedback submissions</li>
                    <li><span className="font-semibold text-white">Pinpointed problem areas</span>, such as slow photo delivery or editing issues</li>
                    <li><span className="font-semibold text-white">Enabled continuous improvement</span>, enhancing the overall customer experience</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/#contact">
                    💡 Request a Similar Solution
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                  </Link>
                </Button>
                
                {project.links?.github && (
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
            <p>© {new Date().getFullYear()} AutoScale — Helping biz scale with AI.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Custom content for AI-Powered Telegram Payment Bot
  if (projectId === "ai-recruitment-bot") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container max-w-5xl mx-auto pb-16">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/#projects">Projects</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <FadeInView animation="fade-in">
              <h1 className="text-4xl font-bold mb-6">🤖 {project.title}</h1>
              <p className="text-lg mb-8">
                <span className="font-semibold">Tech Stack:</span> Telegram Bot API, NLP, Speech-to-Text, Google Sheets, Google Tasks | 
                <span className="font-semibold ml-2">Industries:</span> Jewelry, Small Businesses, Finance
              </p>
              
              <div className="aspect-video overflow-hidden rounded-lg mb-8 border border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    A silver business relied on traditional pen-and-paper methods to track installment payments. 
                    They found existing finance apps too complex and wanted a simpler solution.
                  </p>
                  <p className="text-muted-foreground">
                    We built an AI-powered Telegram bot that allows them to manage payments effortlessly using voice commands.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Solution & Implementation</h2>
                  <p className="text-muted-foreground mb-4">
                    Our intelligent Telegram bot automated the payment tracking process with a user-friendly approach:
                  </p>
                  <ul className="list-none pl-6 space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">🗣</span>
                      <span><span className="font-medium text-white">Voice-Based Input:</span> Users simply send a voice note in Hindi or English (e.g., "Manthan ne mujhe 500 rs diye"), and the bot automatically extracts transaction details.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">📊</span>
                      <span><span className="font-medium text-white">Google Sheets Integration:</span> Payment records are instantly updated in a shared Google Sheet, ensuring real-time tracking.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">🔔</span>
                      <span><span className="font-medium text-white">Timely Payment Reminders:</span> The bot periodically notifies users about pending payments and overdue installments.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">📅</span>
                      <span><span className="font-medium text-white">Google Tasks Automation:</span> For overdue payments, tasks are automatically created in Google Tasks, reminding the user to follow up.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-accent mr-2">🔄</span>
                      <span><span className="font-medium text-white">Update & Follow-ups:</span> Users can update payment statuses directly via Telegram, ensuring seamless management.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Results</h2>
                  <p className="text-muted-foreground mb-4">
                    🚀 Streamlined payment tracking:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><span className="font-semibold text-white">Eliminated manual record-keeping</span>, reducing errors and effort.</li>
                    <li><span className="font-semibold text-white">Saved significant time</span> by automating payment reminders and follow-ups.</li>
                    <li><span className="font-semibold text-white">Improved financial organization</span>, ensuring timely collections and better cash flow.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/#contact">
                    💡 Request a Similar Solution
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                  </Link>
                </Button>
                
                {project.links?.github && (
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
                  <Button variant="outline" asChild className="w-full sm:w-auto">
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
            <p>© {new Date().getFullYear()} AutoScale — Helping biz scale with AI.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Default content for other projects
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container max-w-5xl mx-auto pb-16">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#projects">Projects</Link>
                </BreadcrumbLink>
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
