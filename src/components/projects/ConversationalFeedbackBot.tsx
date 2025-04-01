
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ConversationalFeedbackBot() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">AI-Powered Conversational Feedback Bot</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive chatbot that collects client feedback through natural conversation
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Overview</h2>
          <p className="mb-4">
            We developed an AI-powered conversational bot for a service-based company to replace traditional
            feedback forms with natural, engaging conversations that collect more detailed and honest feedback.
          </p>
          <p>
            The system engages customers in dialogue, asks follow-up questions based on their responses, and
            provides the business with actionable insights through sentiment analysis and trend identification.
          </p>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Implementation</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Advanced NLP for understanding context and sentiment in customer responses</li>
            <li>Dynamic conversation flow that adapts based on previous answers</li>
            <li>Sentiment analysis to categorize positive, negative, and neutral feedback</li>
            <li>Topic modeling to identify common themes across feedback</li>
            <li>Analytics dashboard for visualizing feedback trends over time</li>
          </ul>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Details and Explanations</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Solved low response rates issue with traditional feedback forms</li>
            <li>Created natural conversational approach that increases user engagement</li>
            <li>Built dynamic question flow that adapts based on customer responses</li>
            <li>Implemented sentiment analysis to identify emotional nuances in feedback</li>
            <li>Developed analytics dashboard to transform feedback into actionable insights</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
