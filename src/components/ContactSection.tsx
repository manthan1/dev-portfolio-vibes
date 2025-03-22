
import { Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import FadeInView from "./animations/FadeInView";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";

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

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // This URL should be replaced with your actual serverless function endpoint
      // You can use services like Google Cloud Functions, AWS Lambda, or Vercel Functions
      const response = await fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'no-cors' // May be needed for Google Apps Script
      });
      
      setIsSubmitted(true);
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <section id="contact" className="bg-secondary/50">
      <div className="container max-w-7xl mx-auto">
        <FadeInView animation="fade-in">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block pill bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground mb-4">
              <span className="font-medium">Get in Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Let's Connect
            </h2>
            <p className="text-muted-foreground">
              Have a project in mind or want to explore collaboration opportunities? I'd love to hear from you!
            </p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <FadeInView animation="fade-in-right">
            {isSubmitted ? (
              <div className="glass p-8 rounded-xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Thank You!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your message has been received. I'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="w-full"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="w-full"
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      {...register("message", { required: "Message is required" })}
                      rows={5}
                      className="w-full resize-none"
                      placeholder="Your message"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </FadeInView>

          <div className="space-y-8">
            <FadeInView animation="fade-in-left">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="glass p-4 rounded-xl flex flex-col gap-2 group"
                  >
                    <div className="flex items-center gap-2 text-primary">
                      {info.icon}
                      <span className="text-sm font-medium">{info.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm hover:text-primary transition-colors"
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
                          className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"
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
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">
                  Let's Build Something Amazing Together
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Whether you need AI integration, backend development, or process automation, 
                  I'm here to help turn your ideas into reality. Reach out today to discuss 
                  how we can collaborate.
                </p>
                <p className="text-sm">
                  Based in{" "}
                  <span className="font-medium">Mumbai, India</span> — Available for remote work worldwide
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
