
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
          <div className="space-y-4">
            <p>
              This project was developed for a B2B sales organization that was spending excessive time on pre-sales research and outreach preparation, limiting their ability to scale operations effectively.
            </p>
            <p>
              Our system begins by identifying potential target companies based on customizable parameters such as industry, company size, location, and recent funding events. It then scrapes public data from company websites, LinkedIn, news sources, and other platforms to build comprehensive profiles.
            </p>
            <p>
              A key innovation in this project is the decision-maker identification algorithm. Using a combination of organizational chart analysis and role-based pattern matching, the system can identify the most appropriate contacts for outreach based on the specific solution being sold, whether it's a technical product requiring CTO approval or a marketing service targeting CMOs.
            </p>
            <p>
              The email generation component goes beyond simple templates by analyzing the prospect's company news, social media activity, and public statements to identify relevant pain points and interests. This allows the system to create outreach messages that reference specific challenges the prospect is facing and how the solution can address them.
            </p>
            <p>
              To ensure quality control, the system presents generated emails to sales staff for review before sending. Over time, the AI learns from which emails perform best (based on open and response rates) and refines its approach for different industries and prospect types.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
