
import React, { useEffect, useRef, useState } from "react";

interface FadeInViewProps {
  children: React.ReactNode;
  animation?: 
    | "fade-in"
    | "fade-in-right"
    | "fade-in-left"
    | "scale-in";
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function FadeInView({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  className = "",
}: FadeInViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? `animate-${animation}` : "opacity-0"
      }`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}
