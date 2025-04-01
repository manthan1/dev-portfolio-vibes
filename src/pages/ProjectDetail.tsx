
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectLayout from "../components/layout/ProjectLayout";
import WhatsAppChatbot from "../components/projects/WhatsAppChatbot";
import QuotationAssistant from "../components/projects/QuotationAssistant";
import ConversationalFeedbackBot from "../components/projects/ConversationalFeedbackBot";
import AIRecruitmentBot from "../components/projects/AIRecruitmentBot";
import VideoChatbot from "../components/projects/VideoChatbot";
import AIJobRecommendation from "../components/projects/AIJobRecommendation";

// Project data
const projects = [
  {
    id: "ai-job-recommendation",
    name: "AI Outreach Automation System",
    description: "Details about AI Outreach Automation System project.",
  },
  {
    id: "quotation-assistant",
    name: "AI-Powered Quotation Assistant",
    description: "Details about AI-Powered Quotation Assistant project.",
  },
  {
    id: "conversational-feedback-bot",
    name: "AI-Powered Conversational Feedback Bot",
    description: "Details about AI-Powered Conversational Feedback Bot project.",
  },
  {
    id: "ai-recruitment-bot",
    name: "AI-Powered Telegram Payment Bot",
    description: "Details about AI-Powered Telegram Payment Bot project.",
  },
  {
    id: "video-chatbot",
    name: "Video Chatbot for Business Services",
    description: "Details about Video Chatbot for Business Services project.",
  },
  {
    id: "whatsapp-chatbot",
    name: "AI-Powered Calling Chatbot for a Clinic",
    description: "Details about AI-Powered Calling Chatbot for a Clinic project.",
  }
];

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Find project data based on projectId
    const foundProject = projects.find((p) => p.id === projectId);
    setProject(foundProject);
  }, [projectId]);
  
  if (!project) {
    return (
      <ProjectLayout>
        <div className="container text-center">
          <h2>Project Not Found</h2>
          <p>Sorry, the project you are looking for does not exist.</p>
        </div>
      </ProjectLayout>
    );
  }

  // Render the appropriate project component based on projectId
  const renderProjectContent = () => {
    switch (projectId) {
      case "ai-job-recommendation":
        return <AIJobRecommendation />;
      case "video-chatbot":
        return <VideoChatbot />;
      case "whatsapp-chatbot":
        return <WhatsAppChatbot />;
      case "quotation-assistant":
        return <QuotationAssistant />;
      case "conversational-feedback-bot":
        return <ConversationalFeedbackBot />;
      case "ai-recruitment-bot":
        return <AIRecruitmentBot />;
      default:
        return (
          <div className="container">
            <h2>{project?.name}</h2>
            <p>{project?.description}</p>
          </div>
        );
    }
  };

  // Return the layout with the appropriate project content
  return (
    <ProjectLayout>
      {renderProjectContent()}
    </ProjectLayout>
  );
}
