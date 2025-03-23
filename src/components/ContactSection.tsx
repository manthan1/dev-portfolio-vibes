
import { Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import FadeInView from "./animations/FadeInView";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useSupabaseSubmit } from "../hooks/useSupabaseSubmit";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

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
  phone: string;
  message: string;
}

export default function ContactSection() {
  const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm<FormData>();
  const { submit, isSubmitting, isSuccess, error, reset: resetSubmit } = useSupabaseSubmit();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form submitted with data:', data);
      await submit(data);
      toast.success("Message sent successfully! I'll get back to you soon.");
      resetForm();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "There was an error sending your message. Please try again."
      );
    }
  };

  const handleNewMessage = () => {
    setIsSubmitted(false);
    resetSubmit();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <section id="contact" className="bg-secondary/30">
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
            {error && (
              <Alert className="mb-4 border-destructive bg-destructive/10">
                <AlertTitle className="text-destructive">
                  Error
                </AlertTitle>
                <AlertDescription>
                  {error.message}
                </AlertDescription>
              </Alert>
            )}
            
            {isSubmitted ? (
              <div className="glass p-8 rounded-xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Thank You!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your message has been received. I'll get back to you as soon as possible.
                  </p>
                  <Button onClick={handleNewMessage} className="bg-cyan-500 hover:bg-cyan-600">Send Another Message</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-6 text-cyan-400">Send a Message</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-cyan-400">
                      Name
                    </label>
                    <Input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="w-full focus:border-cyan-400 focus:ring-cyan-400"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-cyan-400">
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
                      className="w-full focus:border-cyan-400 focus:ring-cyan-400"
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-cyan-400">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                          message: "Invalid phone number format"
                        }
                      })}
                      className="w-full focus:border-cyan-400 focus:ring-cyan-400"
                      placeholder="Your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-cyan-400">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      {...register("message", { required: "Message is required" })}
                      rows={5}
                      className="w-full resize-none focus:border-cyan-400 focus:ring-cyan-400"
                      placeholder="Your message"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan-500 hover:bg-cyan-600"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
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
