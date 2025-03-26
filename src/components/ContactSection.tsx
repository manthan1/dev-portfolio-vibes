import { Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import FadeInView from "./animations/FadeInView";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

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
  }, []);

  const openCalendlyPopup = () => {
    // Use the Calendly popup instead of inline widget when button is clicked
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/manthanjethwani2803/30min'
      });
      return false;
    } else {
      toast.error("Calendly is not loaded properly. Please try again.");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <section id="contact" className="bg-background py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <FadeInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block pill bg-primary/10 text-cyan-400 dark:bg-primary/20 dark:text-cyan-400 mb-4 px-3 py-1 rounded-full">
              <span className="font-medium">Get in Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-cyan-400">
              Let's Connect
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to explore collaboration opportunities? I'd love to hear from you!
            </p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <FadeInView animation="fade-in-right">
              <Card className="overflow-hidden shadow-md border border-border/50 h-full">
                <CardContent className="p-0">
                  <div className="bg-secondary/30 px-6 py-4 border-b border-border/50">
                    <h3 className="text-xl font-semibold text-cyan-400">Schedule a Meeting</h3>
                  </div>
                  <div className="calendly-inline-widget" 
                    data-url="https://calendly.com/manthanjethwani2803/30min" 
                    style={{ minWidth: "320px", height: "600px" }}>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <FadeInView animation="fade-in-left">
              <Card className="overflow-hidden shadow-md border border-border/50">
                <CardContent className="p-0">
                  <div className="bg-secondary/30 px-6 py-4 border-b border-border/50">
                    <h3 className="text-xl font-semibold text-cyan-400">Contact Information</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {contactInfo.map((info, index) => (
                        <div key={info.label}>
                          <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                            <div className="bg-primary/5 p-2 rounded-full text-cyan-400">
                              {info.icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-muted-foreground mb-1">
                                {info.label}
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
                                    className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity hover:bg-secondary/30 text-cyan-400"
                                    aria-label={`Copy ${info.label}`}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          {index < contactInfo.length - 1 && (
                            <Separator className="my-2 opacity-30" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>

            <FadeInView animation="fade-in" delay={200}>
              <Card className="shadow-md border border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span>Based in <span className="font-medium text-cyan-400">Mumbai, India</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span>Available for remote work worldwide</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
