
import React from "react";
import Navbar from "../Navbar";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {children}
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <div className="container">
          <p>© {new Date().getFullYear()} PhazeAI — Elevate Your Business to the Next Phaze.</p>
        </div>
      </footer>
    </div>
  );
}
