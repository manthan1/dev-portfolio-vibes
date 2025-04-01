import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import WhatsAppChatbot from "../components/projects/WhatsAppChatbot";
import QuotationAssistant from "../components/projects/QuotationAssistant";
import ConversationalFeedbackBot from "../components/projects/ConversationalFeedbackBot";
import AIRecruitmentBot from "../components/projects/AIRecruitmentBot";

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = React.useState<any>(null);

  useEffect(() => {
    // Simulate fetching project data based on projectId
    const fetchProject = async () => {
      // Replace this with your actual data fetching logic
      const projects = [
        {
          id: "whatsapp-chatbot",
          name: "WhatsApp Chatbot",
          description: "Details about WhatsApp Chatbot project.",
        },
        {
          id: "quotation-assistant",
          name: "AI-Powered Quotation Assistant",
          description: "Details about AI-Powered Quotation Assistant project.",
        },
        {
          id: "conversational-feedback-bot",
          name: "AI-Powered Conversational Feedback Bot",
          description:
            "Details about AI-Powered Conversational Feedback Bot project.",
        },
        {
          id: "ai-recruitment-bot",
          name: "AI-Powered Telegram Payment Bot",
          description: "Details about AI-Powered Telegram Payment Bot project.",
        },
      ];

      const foundProject = projects.find((p) => p.id === projectId);
      setProject(foundProject);
    };

    fetchProject();
  }, [projectId]);
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container text-center">
            <h2>Project Not Found</h2>
            <p>Sorry, the project you are looking for does not exist.</p>
          </div>
        </main>
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
          <div className="container">
            <p>© {new Date().getFullYear()} PhazeAI — Elevate Your Business to the Next Phaze.</p>
          </div>
        </footer>
      </div>
    );
  }

  // For all the custom project sections (whatsapp-chatbot, quotation-assistant, etc.), we need to update the footer
  // I'll update the last part of each section where the footer appears

  // Update footer for WhatsApp Chatbot project
  if (projectId === "whatsapp-chatbot") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <WhatsAppChatbot />
        </main>
        
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
          <div className="container">
            <p>© {new Date().getFullYear()} PhazeAI — Elevate Your Business to the Next Phaze.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Update footer for AI-Powered Quotation Assistant
  if (projectId === "quotation-assistant") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <QuotationAssistant />
        </main>
        
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
          <div className="container">
            <p>© {new Date().getFullYear()} PhazeAI — Elevate Your Business to the Next Phaze.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Update footer for AI-Powered Conversational Feedback Bot
  if (projectId === "conversational-feedback-bot") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <ConversationalFeedbackBot />
        </main>
        
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
          <div className="container">
            <p>© {new Date().getFullYear()} PhazeAI — Elevate Your Business to the Next Phaze.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Update footer for AI-Powered Telegram Payment Bot
  if (projectId === "ai-recruitment-bot") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <AIRecruitmentBot />
        </main>
        
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
          <div className="container">
            <p>© {new Date().getFullYear()} PhazeAI — Elevate Your Business to the Next Phaze.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Update footer for default project page
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container">
          <h2>{project?.name}</h2>
          <p>{project?.description}</p>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <div className="container">
          <p>© {new Date().getFullYear()} PhazeAI — Elevate Your Business to the Next Phaze.</p>
        </div>
      </footer>
    </div>
  );
}
