
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Minimize2, Maximize2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

// Create a global context for opening the chatbot from anywhere
let globalOpenChatbot: () => void;

export function openChatbot() {
  if (globalOpenChatbot) {
    globalOpenChatbot();
  }
}

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
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

  // Register the global open function
  useEffect(() => {
    globalOpenChatbot = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
  }, []);
  
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
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={toggleChat} 
            className="rounded-full h-14 w-14 p-0 bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-shadow duration-300"
          >
            <Bot className="h-6 w-6" />
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
              <span className="text-sm font-medium">Chat with AI Assistant</span>
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
              className="bg-background border border-border/50 rounded-xl overflow-hidden shadow-lg flex flex-col h-[400px] w-[380px]"
            >
              <div className="p-3 border-b border-border/50 bg-secondary/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-md font-semibold text-white">AI Assistant</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={minimizeChat}>
                    <Minimize2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                <Bot className="h-16 w-16 mb-4 text-cyan-400 opacity-70" />
                <p className="text-lg text-white max-w-[85%]">
                  Hey there! I'm your AI assistant. How can I help you automate your business today?
                </p>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatbotWidget;
