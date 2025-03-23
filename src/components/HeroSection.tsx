
import { Hero } from "./ui/component";
import { BeamsBackground } from "./ui/beams-background";

export default function HeroSection() {
  return (
    <section id="home" className="pt-0 pb-0 min-h-screen flex items-center justify-center relative bg-background overflow-hidden">
      <BeamsBackground intensity="medium">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none"></div>
        <Hero />
      </BeamsBackground>
    </section>
  );
}
