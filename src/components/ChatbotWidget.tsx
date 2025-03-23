
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// Create a global context for opening the chatbot from anywhere
let globalOpenChatbot: () => void;

export function openChatbot() {
  if (globalOpenChatbot) {
    globalOpenChatbot();
  }
}

function ChatbotWidget() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hey there! I'm the MJ AI assistant. What kind of business are you running, and what challenges are you facing?" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Register the global open function
  useEffect(() => {
    globalOpenChatbot = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);
  
  const handleContactLinkClick = () => {
    setIsOpen(false);
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Check if the message contains call-related keywords
  const containsCallRequest = (message: string): boolean => {
    const callKeywords = [
      "set up a call", "schedule a call", "book a call", 
      "talk to manthan", "speak with manthan", "call with manthan",
      "consultation", "meeting", "discuss", "talk to", "speak with"
    ];
    const lowerCaseMessage = message.toLowerCase();
    return callKeywords.some(keyword => lowerCaseMessage.includes(keyword));
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Check if user wants to set up a call
    if (containsCallRequest(input)) {
      setIsLoading(false);
      setMessages(prev => [...prev, { 
        role: "system", 
        content: "Great! I'll take you to our contact form where you can schedule a free call with Manthan. Just click the link below." 
      }, {
        role: "system",
        content: `<a href="#contact" class="text-cyan-400 underline font-medium" onClick="event.preventDefault(); document.querySelector('#chat-contact-link').click();">Schedule a call with Manthan</a>`
      }]);
      
      // Add a hidden button that will be clicked programmatically 
      return;
    }
    
    try {
      // Filter out system messages with HTML content (links) to avoid sending them to the API
      const contextMessages = messages
        .filter(msg => !(msg.role === "system" && msg.content.includes("<a href")))
        .concat(userMessage);
      
      // Call Supabase Edge Function with the complete conversation history
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
        // Check if the AI response indicates setting up a call
        const aiResponse = data.message;
        
        if (containsCallRequest(aiResponse)) {
          // If AI suggests a call, add a link to the contact form
          setMessages(prev => [...prev, { 
            role: "system", 
            content: aiResponse 
          }, {
            role: "system",
            content: `<a href="#contact" class="text-cyan-400 underline font-medium" onClick="event.preventDefault(); document.querySelector('#chat-contact-link').click();">Schedule a call with Manthan</a>`
          }]);
        } else {
          setMessages(prev => [...prev, { 
            role: "system", 
            content: aiResponse 
          }]);
        }
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
  
  // Animation variants for framer-motion
  const chatWidgetVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const minimizedVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Hidden button for contact navigation */}
      <button 
        id="chat-contact-link" 
        className="hidden" 
        onClick={handleContactLinkClick}
      />
      
      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={toggleChat} 
            className="rounded-full h-12 w-12 p-0 bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
      
      {/* Chat Widget */}
      <AnimatePresence mode="wait">
        {isOpen && (
          isMinimized ? (
            <motion.div 
              key="minimized"
              variants={minimizedVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-3 cursor-pointer flex items-center justify-between bg-secondary/20 hover:bg-secondary/30 transition-colors rounded-xl border border-border/50 shadow-lg"
              onClick={() => setIsMinimized(false)}
            >
              <span className="text-sm font-medium">Chat with MJ AI</span>
              <div className="flex gap-2">
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="expanded"
              variants={chatWidgetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-background border border-border/50 rounded-xl overflow-hidden shadow-lg flex flex-col h-[450px] w-[350px]"
            >
              <div className="p-3 border-b border-border/50 bg-secondary/20 flex justify-between items-center">
                <h3 className="text-md font-semibold text-white">Chat with MJ AI</h3>
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
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`px-4 py-2 rounded-lg max-w-[80%] ${
                        message.role === "user" 
                          ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white" 
                          : "bg-secondary border border-border/30 text-white"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    >
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary border border-border/30 text-white px-4 py-2 rounded-lg max-w-[80%] flex items-center">
                      <span className="flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                      </span>
                    </div>
                  </motion.div>
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
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatbotWidget;
