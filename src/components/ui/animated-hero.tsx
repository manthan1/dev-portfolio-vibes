
import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import * as THREE from "three";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Your Work", "Your Time", "Your Business", "Your Daily Tasks", "Your Growth"],
    []
  );
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!cubeRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(100, 100);
    cubeRef.current.innerHTML = '';
    cubeRef.current.appendChild(renderer.domElement);
    
    // Create cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x0084ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Position camera
    camera.position.z = 2.5;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
    
    // Cleanup
    return () => {
      if (cubeRef.current) {
        cubeRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                <span className="text-primary">The AI Agency Built to Automate</span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>
              <div ref={cubeRef} className="w-24 h-24 ml-4 hidden md:block"></div>
            </div>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              We're not just building tools—we're building smart solutions that think, learn, and deliver results for businesses of all sizes.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline" asChild>
              <Link to="/#contact">Book a Free Call <PhoneCall className="w-4 h-4" /></Link>
            </Button>
            <Button size="lg" className="gap-4" asChild>
              <Link to="/#projects">Our Work <MoveRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
