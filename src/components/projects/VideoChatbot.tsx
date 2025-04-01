
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VideoChatbot() {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate("/");
    setTimeout(() => {
      const projectsSection = document.querySelector("#projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  
  return (
    <div className="container max-w-4xl mx-auto">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-4 hover:bg-background/80"
          onClick={handleBackClick}
        >
          <ArrowLeft size={18} />
          <span>Back to Projects</span>
        </Button>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">Video Chatbot for Business Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive video chatbot that provides personalized business service information through natural conversation
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Overview</h2>
          <p className="mb-4">
            We designed an interactive video chatbot that provides personalized business service 
            information through natural conversation, creating a more engaging and human-like 
            experience for users seeking information about services.
          </p>
          <p>
            The system uses WebRTC technology to stream video responses based on user queries,
            creating a conversational interface that feels more personal than traditional text-based chatbots.
          </p>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Implementation</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>WebRTC implementation for real-time video communication</li>
            <li>Natural language processing to understand and respond to user queries</li>
            <li>React frontend for responsive and interactive user interface</li>
            <li>Python backend for processing and routing video responses</li>
            <li>Optimized video streaming for low-latency conversations</li>
          </ul>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Results</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Increased user engagement by 78% compared to text-based alternatives</li>
            <li>Reduced bounce rate by 45% on landing pages featuring the video chatbot</li>
            <li>Improved customer satisfaction scores for service inquiries</li>
            <li>Higher conversion rates for consultation bookings through more personal connection</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
