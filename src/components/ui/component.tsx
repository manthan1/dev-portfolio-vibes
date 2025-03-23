import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState as useDialogState } from "react";

function ChatbotModal() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi there! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "system", 
        content: "Thanks for your message! Our team will get back to you shortly." 
      }]);
    }, 1000);
  };
  
  return (
    <DialogContent className="sm:max-w-md rounded-xl border border-border/50 bg-background p-0 overflow-hidden">
      <div className="flex flex-col h-[450px]">
        <div className="p-4 border-b border-border/50 bg-secondary/20">
          <h3 className="text-lg font-semibold text-white">Chat with AI Agency</h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, i) => (
            <div 
              key={i} 
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  message.role === "user" 
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white" 
                    : "bg-secondary border border-border/30 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="border-t border-border/50 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-secondary rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
              Send
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const titles = useMemo(
    () => ["Your Work", "Your Time", "Your Business", "Your Daily Tasks", "Your Growth"],
    []
  );

  useEffect(() => {
    // Clear any existing interval when component mounts or titleNumber changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set new interval
    intervalRef.current = window.setInterval(() => {
      setTitleNumber(prev => prev === titles.length - 1 ? 0 : prev + 1);
    }, 2000);
    
    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [titles.length]);

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300"
                >
                  Talk to our AI assistant <MessageSquare className="w-4 h-4 text-cyan-400" />
                </Button>
              </DialogTrigger>
              <ChatbotModal />
            </Dialog>
          </div>
          
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-primary">The AI Agency Built to Automate</span>
              <div className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 h-[60px] md:h-[80px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="absolute font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      mass: 0.5
                    }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              We build custom AI tools that automate the boring stuff — so you can focus on what actually matters.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button 
              size="lg" 
              className="bg-transparent border border-input text-white gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" 
              variant="outline" 
              onClick={handleScrollTo("contact")}
            >
              Book a Free Call <PhoneCall className="w-4 h-4 text-cyan-400" />
            </Button>
            <Button 
              size="lg" 
              className="gap-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300" 
              onClick={handleScrollTo("projects")}
            >
              Our Work <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
