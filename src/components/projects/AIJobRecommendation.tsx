
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIJobRecommendation() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">AI Outreach Automation System</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Streamlined research, data collection, and personalized email generation for B2B client outreach
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Overview</h2>
          <p className="mb-4">
            We built an AI automation system that streamlined research, data collection, and personalized 
            email generation for B2B client outreach, significantly reducing the manual effort required 
            for sales teams.
          </p>
          <p>
            The system automates the process of identifying potential clients, gathering relevant information, 
            and crafting personalized outreach messages that resonate with each prospect's specific needs 
            and challenges.
          </p>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Implementation</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Python-based web scraping for gathering company and contact information</li>
            <li>Natural Language Processing (NLP) for analyzing company websites and social media</li>
            <li>Custom algorithms for identifying relevant decision-makers</li>
            <li>AI-powered email generation with personalization factors</li>
            <li>Automated workflow system to manage the outreach process</li>
          </ul>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Details and Explanations</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Solved B2B sales organization's challenge with time-consuming pre-sales research</li>
            <li>Developed targeted company identification based on customizable parameters</li>
            <li>Created algorithm for identifying appropriate decision-makers for specific solutions</li>
            <li>Built personalized email generation system based on prospect's specific pain points</li>
            <li>Implemented quality control through human review before sending outreach messages</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
