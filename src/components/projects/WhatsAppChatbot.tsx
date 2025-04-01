
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WhatsAppChatbot() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">AI-Powered Calling Chatbot for a Clinic</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          An automated AI system that handles appointment scheduling, reminders, and patient queries
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Overview</h2>
          <p className="mb-4">
            We developed an AI-powered calling chatbot for a medical clinic to automate their appointment scheduling
            and patient communication, improving operational efficiency while maintaining a personal touch.
          </p>
          <p>
            The system uses natural language processing to understand patient requests, schedule appointments,
            send reminders, and answer common questions, freeing up staff to focus on in-person patient care.
          </p>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Implementation</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Integrated Twilio API for voice calling capabilities</li>
            <li>Utilized Eleven Labs for natural-sounding voice synthesis</li>
            <li>Built with Python backend for processing natural language</li>
            <li>Implemented n8n for workflow automation</li>
            <li>Connected to clinic's calendar system for real-time availability checking</li>
          </ul>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Results</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Reduced appointment scheduling time by 70%</li>
            <li>Decreased no-show rate by 35% through automated reminders</li>
            <li>Improved patient satisfaction scores by providing 24/7 access to information</li>
            <li>Freed up approximately 25 staff hours per week</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
