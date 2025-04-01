
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
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Details and Explanations</h2>
          <div className="space-y-4">
            <p>
              This project addressed a critical challenge faced by medical clinics: balancing quality patient communication with operational efficiency. The clinic staff was spending significant time on phone calls for appointment scheduling and reminders, taking away from patient care.
            </p>
            <p>
              Our AI calling system was designed to sound natural and conversational, using Eleven Labs' voice synthesis technology to create a voice that patients found friendly and approachable. The system can understand various accents and speaking patterns thanks to advanced natural language processing.
            </p>
            <p>
              The workflow automation component, built with n8n, handles everything from scheduling logic to follow-up reminders. When a patient misses an appointment, the system automatically calls to reschedule. For routine check-ups, the system proactively reaches out to patients due for appointments.
            </p>
            <p>
              By handling an average of 120 calls per day that previously required manual attention, the clinic has been able to redirect their front desk staff to focus on improving the in-person patient experience, resulting in higher satisfaction scores and more efficient operations.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
