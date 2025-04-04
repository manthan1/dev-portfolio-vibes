
import { cn } from "@/lib/utils";
import { useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface SpotlightProps {
  children?: React.ReactNode;
  className?: string;
  fill?: string;
  size?: number;
  fullScreen?: boolean;
}

export function Spotlight({
  children,
  className,
  fill = "white",
  size = 500,
  fullScreen = false,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const opacity = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
      opacity.set(0.3); // Increased opacity for more visible effect
    };

    const handleMouseLeave = () => {
      opacity.set(0);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [opacity]);

  return (
    <div
      ref={ref}
      className={cn(
        fullScreen ? "fixed inset-0 z-0" : "h-full w-full overflow-hidden absolute inset-0 z-0",
        className
      )}
    >
      <div
        className="absolute inset-0 z-30"
        style={{
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${fill}, transparent)`,
          opacity: opacity.get(),
        }}
      />
      {children}
    </div>
  );
}
