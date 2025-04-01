
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
          <div className="space-y-4">
            <p>
              The jewelry business faced challenges managing installment payments from numerous customers, with the owner spending hours each week tracking payments manually and sending reminders.
            </p>
            <p>
              Our solution was designed to work within the Telegram messaging platform, which was already widely used by the business's customers. The bot accepts both text and voice commands, making it accessible to customers who prefer different communication methods.
            </p>
            <p>
              When a customer makes a payment, they can simply tell the bot "I paid $200 for my gold necklace today" either through text or voice. The bot uses natural language processing to extract the payment amount, item, and date, then logs this information automatically in a Google Sheet.
            </p>
            <p>
              The integration with Google Tasks creates automated payment reminders based on each customer's installment schedule. Customers receive friendly reminders before payments are due, which has significantly reduced late payments.
            </p>
            <p>
              The bot also provides customers with an easy way to check their payment history and remaining balance by simply asking "How much do I still owe?" or "Show me my payment history." This self-service capability has reduced customer service inquiries by 68%.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
