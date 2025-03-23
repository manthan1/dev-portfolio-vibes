import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, MoveRight, PhoneCall, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

function ChatbotWidget() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi there! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Prepare messages for API - include context but limit to last 10 messages to keep token count down
      const contextMessages = [...messages.slice(-9), userMessage];
      
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { messages: contextMessages }
      });
      
      if (error) {
        console.error('Error calling AI function:', error);
        setMessages(prev => [...prev, { 
          role: "system", 
          content: "I'm sorry, I encountered an error. Please try again later." 
        }]);
      } else if (data?.message) {
        setMessages(prev => [...prev, { 
          role: "system", 
          content: data.message 
        }]);
      }
    } catch (err) {
      console.error('Error in chat interaction:', err);
      setMessages(prev => [...prev, { 
        role: "system", 
        content: "I'm sorry, something went wrong. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Button */}
      {!isOpen && (
        <Button 
          onClick={toggleChat} 
          className="rounded-full h-12 w-12 p-0 bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
      
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isMinimized 
              ? { opacity: 1, y: 0, scale: 1, height: "auto", width: "auto" }
              : { opacity: 1, y: 0, scale: 1, height: "450px", width: "350px" }
            }
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`bg-background border border-border/50 rounded-xl overflow-hidden shadow-lg flex flex-col`}
          >
            {isMinimized ? (
              <div 
                className="p-3 cursor-pointer flex items-center justify-between bg-secondary/20 hover:bg-secondary/30 transition-colors"
                onClick={() => setIsMinimized(false)}
              >
                <span className="text-sm font-medium">Chat with AI Agency</span>
                <div className="flex gap-2">
                  <Maximize2 className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 border-b border-border/50 bg-secondary/20 flex justify-between items-center">
                  <h3 className="text-md font-semibold text-white">Chat with AI Agency</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={minimizeChat}>
                      <Minimize2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
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
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-secondary border border-border/30 text-white px-4 py-2 rounded-lg max-w-[80%] flex items-center">
                        <span className="flex gap-1">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce delay-100">.</span>
                          <span className="animate-bounce delay-200">.</span>
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="border-t border-border/50 p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-secondary rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                      disabled={isLoading}
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
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
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-4 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300"
              onClick={() => {
                // Find the ChatbotWidget component and trigger it
                const chatButton = document.querySelector('.fixed.bottom-4.right-4 button');
                if (chatButton instanceof HTMLElement) {
                  chatButton.click();
                }
              }}
            >
              Talk to our AI assistant <MessageSquare className="w-4 h-4 text-cyan-400" />
            </Button>
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

export { Hero, ChatbotWidget };
