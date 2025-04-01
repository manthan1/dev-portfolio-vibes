
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
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Details and Explanations</h2>
          <div className="space-y-4">
            <p>
              This project was developed for a business services company that wanted to stand out from competitors by offering a more engaging way for potential clients to learn about their services.
            </p>
            <p>
              Traditional text-based chatbots often fail to create a personal connection, leading to high bounce rates. Our video chatbot solution maintains the convenience of 24/7 availability while adding a human element that creates trust and engagement.
            </p>
            <p>
              The system works by recording a set of video responses to common questions, then using natural language processing to match user queries with the appropriate video response. For unique questions without a pre-recorded answer, the system uses a fallback mechanism to provide text responses while also collecting these queries for future video content creation.
            </p>
            <p>
              One of the technical challenges we solved was minimizing latency in video playback. We implemented an advanced buffering system and predictive loading based on conversation context, which reduced response time by 67% compared to standard video streaming approaches.
            </p>
            <p>
              The chatbot was also designed to adapt to user behavior, learning from interactions to improve response accuracy over time. This machine learning component allowed the system to become increasingly effective at understanding industry-specific terminology and addressing complex service inquiries.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
