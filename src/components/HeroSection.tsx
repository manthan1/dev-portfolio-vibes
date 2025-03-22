
import { Hero } from "./ui/component";

export default function HeroSection() {
  return (
    <section id="home" className="pt-0 pb-0 min-h-screen flex items-center justify-center relative bg-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none"></div>
      <Hero />
    </section>
  );
}
