
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Instagram, 
  Link, 
  Mail, 
  Calendar, 
  Briefcase, 
  QrCode,
  ExternalLink
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Links = () => {
  // For page animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Add the custom glassmorphism effect when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("links-header");
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add("glass");
        } else {
          header.classList.remove("glass");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
      {/* Header */}
      <header 
        id="links-header" 
        className="w-full fixed top-0 z-50 transition-all duration-300 py-4"
      >
        <div className="container flex justify-center">
          <img 
            src="/lovable-uploads/948e89d2-a6b7-4de3-af06-8130d4feb947.jpg" 
            alt="PhazeAI Logo" 
            className="h-10 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-md mx-auto pt-24 pb-16 px-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent mb-4">
            <img 
              src="/lovable-uploads/948e89d2-a6b7-4de3-af06-8130d4feb947.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-1">PhazeAI</h1>
          <p className="text-center text-muted-foreground mb-4">
            AI Automation & Workflow Optimization
          </p>
        </div>

        {/* Links Section */}
        <motion.div 
          className="flex flex-col gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Main Website */}
          <motion.div variants={item}>
            <LinkCard 
              icon={<Link />}
              title="Main Website"
              href="https://phazeai.com"
            />
          </motion.div>

          {/* Instagram */}
          <motion.div variants={item}>
            <LinkCard 
              icon={<Instagram />}
              title="Instagram"
              subtext="@phazeai"
              href="https://instagram.com/phazeai"
            />
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <LinkCard 
              icon={<Mail />}
              title="Contact Us"
              subtext="Get in touch"
              href="mailto:contact@phazeai.com"
            />
          </motion.div>

          {/* Book a Call */}
          <motion.div variants={item}>
            <LinkCard 
              icon={<Calendar />}
              title="Schedule a Meeting"
              subtext="Book a consultation"
              href="https://calendly.com/phazeai"
            />
          </motion.div>

          {/* Portfolio */}
          <motion.div variants={item}>
            <LinkCard 
              icon={<Briefcase />}
              title="Our Projects"
              subtext="See what we've built"
              href="/projects"
            />
          </motion.div>

          {/* Digital Business Card */}
          <motion.div variants={item}>
            <LinkCard 
              icon={<QrCode />}
              title="Digital Business Card"
              subtext="Save our contact"
              href="/card"
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-sm text-muted-foreground text-center">
        <p>© {new Date().getFullYear()} PhazeAI</p>
      </footer>
    </div>
  );
};

interface LinkCardProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  subtext?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ icon, title, href, subtext }) => {
  return (
    <Card className="w-full overflow-hidden border border-border/40 hover:border-accent transition-all duration-300 group">
      <a 
        href={href} 
        target={href.startsWith("http") ? "_blank" : "_self"}
        rel={href.startsWith("http") ? "noopener noreferrer" : ""}
        className="flex items-center gap-3 p-4"
      >
        <div className="bg-muted p-2 rounded-md text-accent">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="font-medium">{title}</h2>
          {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </div>
        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-70 transition-opacity" />
      </a>
    </Card>
  );
};

export default Links;
