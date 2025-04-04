
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuotationAssistant() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">AI-Powered Quotation Assistant</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Automated system that analyzes engineering drawings and generates accurate price quotations
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Overview</h2>
          <p className="mb-4">
            We created an AI-powered system for an engineering firm that automatically analyzes technical drawings,
            extracts specifications, and generates accurate price quotations without manual intervention.
          </p>
          <p>
            This solution drastically reduced the time engineers spent on administrative tasks and improved
            the consistency and accuracy of pricing across different team members.
          </p>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Implementation</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Computer vision algorithms to analyze engineering CAD files and drawings</li>
            <li>Natural language processing to extract specifications from technical documents</li>
            <li>Custom pricing engine that calculates costs based on materials, labor, and complexity</li>
            <li>Integration with the company's existing ERP system</li>
            <li>User-friendly dashboard for reviewing and approving AI-generated quotes</li>
          </ul>
        </Card>

        <Card className="p-6 border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Project Details and Explanations</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Addressed bottleneck in engineering operations by automating the quotation process</li>
            <li>Combined computer vision and NLP to interpret engineering drawings and specifications</li>
            <li>Developed complexity scoring algorithm for accurate labor estimates</li>
            <li>Created dynamic pricing engine with real-time material costs and historical data</li>
            <li>Implemented human-in-the-loop approach for quality control and final approval</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
