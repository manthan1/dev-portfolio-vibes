
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIRecruitmentBot() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">AI-Powered Telegram Payment Bot</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Intelligent bot that manages installment payments via voice commands for a jewelry business
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Overview</h2>
          <p className="mb-4">
            We built an AI-powered Telegram bot for a jewelry business that allows customers to manage
            installment payments through simple voice commands and text messages.
          </p>
          <p>
            The system integrates with Google Sheets for payment tracking and Google Tasks for reminders,
            providing a seamless payment experience for customers and reducing manual work for the business owner.
          </p>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Implementation</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Integration with Telegram Bot API for messaging and voice commands</li>
            <li>Natural language processing to understand payment instructions</li>
            <li>Connection to Google Sheets API for tracking payment history</li>
            <li>Google Tasks integration for payment reminders</li>
            <li>Secure payment verification system</li>
          </ul>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Details and Explanations</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Addressed challenge of managing installment payments from multiple customers</li>
            <li>Built solution on Telegram platform for easy customer adoption</li>
            <li>Implemented natural language processing for both text and voice command inputs</li>
            <li>Created automated payment reminder system to reduce late payments</li>
            <li>Provided self-service capabilities for customers to check payment history and balances</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
