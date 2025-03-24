
import { Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import FadeInView from "./animations/FadeInView";
import { toast } from "sonner";
import { useEffect } from "react";

interface ContactInfo {
  icon: JSX.Element;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "contact@example.com",
    href: "mailto:contact@example.com",
    copyable: true,
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    copyable: true,
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/yourprofile",
    href: "https://linkedin.com/in/yourprofile",
  },
  {
    icon: <Github className="h-5 w-5" />,
    label: "GitHub",
    value: "github.com/yourusername",
    href: "https://github.com/yourusername",
  },
];

export default function ContactSection() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  
  useEffect(() => {
    // Check if Calendly script is already loaded
    const isScriptLoaded = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!isScriptLoaded) {
      // If not loaded, inject the script
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setIsCalendlyLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsCalendlyLoaded(true);
    }
    
    return () => {
      // Clean up if needed
    };
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <section id="contact" className="bg-background">
      <div className="container max-w-7xl mx-auto">
        <FadeInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block pill bg-primary/10 text-cyan-400 dark:bg-primary/20 dark:text-cyan-400 mb-4">
              <span className="font-medium">Get in Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-cyan-400">
              Let's Connect
            </h2>
            <p className="text-muted-foreground">
              Have a project in mind or want to explore collaboration opportunities? I'd love to hear from you!
            </p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <FadeInView animation="fade-in-right">
            <div className="glass p-8 rounded-xl h-full">
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">Book a Free Consultation</h3>
              <div className="calendly-inline-widget" 
                data-url="https://calendly.com/manthanjethwani02/consultancy-call" 
                style={{ minWidth: "320px", height: "600px" }}>
              </div>
            </div>
          </FadeInView>

          <div className="space-y-8">
            <FadeInView animation="fade-in-left">
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="glass p-4 rounded-xl flex flex-col gap-2 group neon-border"
                  >
                    <div className="flex items-center gap-2 text-cyan-400">
                      {info.icon}
                      <span className="text-sm font-medium">{info.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm hover:text-cyan-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-sm">{info.value}</span>
                      )}
                      {info.copyable && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(info.value, info.label)}
                          className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary text-cyan-400"
                          aria-label={`Copy ${info.label}`}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>

            <FadeInView animation="fade-in" delay={200}>
              <div className="glass p-6 rounded-xl neon-border">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                  Let's Build Something Amazing Together
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Whether you need AI integration, backend development, or process automation, 
                  I'm here to help turn your ideas into reality. Reach out today to discuss 
                  how we can collaborate.
                </p>
                <p className="text-sm">
                  Based in{" "}
                  <span className="font-medium text-cyan-400">Mumbai, India</span> — Available for remote work worldwide
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
