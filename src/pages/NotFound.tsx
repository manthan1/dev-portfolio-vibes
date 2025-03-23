
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="text-center max-w-md px-6 relative z-10">
        <h1 className="text-8xl font-bold mb-6 neon-text">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page or resource you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="neon-outline-button">
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AI Agency. All rights reserved.</p>
      </div>
    </div>
  );
};

export default NotFound;
