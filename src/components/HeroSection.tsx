
import { Hero, ChatbotWidget } from "./ui/component";

export default function HeroSection() {
  return (
    <>
      <section id="home" className="pt-0 pb-0 min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden">
        <Hero />
      </section>
      <ChatbotWidget />
    </>
  );
}
