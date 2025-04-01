import { Copy, Mail, Phone, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import FadeInView from "./animations/FadeInView";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
interface ContactInfoType {
  icon: JSX.Element;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}
const contactInfo: ContactInfoType[] = [{
  icon: <Mail className="h-5 w-5" />,
  label: "Email",
  value: "contactus@phazeai.com",
  href: "mailto:contactus@phazeai.com",
  copyable: true
}, {
  icon: <Phone className="h-5 w-5" />,
  label: "Phone",
  value: "+91 7990700545",
  href: "tel:+917990700545",
  copyable: true
}];
export default function ContactSection() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    // Check if Calendly script is already loaded
    const isScriptLoaded = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!isScriptLoaded) {
      // Load Calendly widget script
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setIsCalendlyLoaded(true);
      document.body.appendChild(script);

      // Load Calendly CSS
      const link = document.createElement('link');
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    } else {
      setIsCalendlyLoaded(true);
    }
  }, []);
  const openCalendlyPopup = () => {
    // Use the Calendly popup when button is clicked
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
  return <section id="contact" className="bg-background py-20">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeInView animation="fade-in-right">
            <Card className="overflow-hidden shadow-md border border-border/50 h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="bg-secondary/30 px-6 py-4 border-b border-border/50">
                  <h3 className="text-xl font-semibold text-cyan-400">Schedule a Meeting</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  {isMobile ? <div className="text-center space-y-4">
                      <p className="text-muted-foreground">Book a 30-minute consultation call to discuss your project requirements.</p>
                      <Button onClick={openCalendlyPopup} className="bg-cyan-400 hover:bg-cyan-500 text-black font-medium">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule a Call
                      </Button>
                    </div> : <div className="calendly-inline-widget flex-1" data-url="https://calendly.com/manthanjethwani2803/30min" style={{
                  minWidth: "320px",
                  height: "450px"
                }}>
                    </div>}
                </div>
              </CardContent>
            </Card>
          </FadeInView>

          <div className="flex flex-col space-y-6">
            {/* First Box: Contact Information Only */}
            <FadeInView animation="fade-in-left" className="flex-grow">
              <Card className="overflow-hidden shadow-md border border-border/50">
                <CardContent className="p-0">
                  <div className="bg-secondary/30 px-6 py-4 border-b border-border/50">
                    <h3 className="text-xl font-semibold text-cyan-400">Contact Information</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {contactInfo.map((info, index) => <div key={info.label} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                          <div className="bg-primary/5 p-2 rounded-full text-cyan-400">
                            {info.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              {info.label}
                            </div>
                            <div className="flex items-center justify-between">
                              {info.href ? <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm hover:text-cyan-400 transition-colors">
                                  {info.value}
                                </a> : <span className="text-sm">{info.value}</span>}
                              {info.copyable && <button type="button" onClick={() => copyToClipboard(info.value, info.label)} className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity hover:bg-secondary/30 text-cyan-400" aria-label={`Copy ${info.label}`}>
                                  <Copy className="h-4 w-4" />
                                </button>}
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>
            
            {/* Second Box: Why Work With Me */}
            <FadeInView animation="fade-in-left" delay={100}>
              <Card className="shadow-md border border-border/50 bg-gradient-to-br from-secondary/40 to-background">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">Why Work With Me</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">✓ Specialized in AI-driven solutions</p>
                    <p className="text-sm text-muted-foreground">✓ Dedicated to meeting client objectives</p>
                    <p className="text-sm text-muted-foreground">✓ Fast turnaround and responsive communication</p>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>
            
            {/* Third Box: Location and Work Availability */}
            <FadeInView animation="fade-in-left" delay={200}>
              <Card className="shadow-md border border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">Location & Availability</h3>
                  <div className="space-y-3">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Based in:</span> 
                      <span className="ml-2 text-slate-50">Mumbai, India</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Available for:</span>
                      <span className="ml-2">Remote work worldwide</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>;
}