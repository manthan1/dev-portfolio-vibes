
import { Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import FadeInView from "./animations/FadeInView";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseSubmit } from "@/hooks/useSupabaseSubmit";
import { Link } from "react-router-dom";

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

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { submit, isSubmitting, isSuccess, error, reset } = useSupabaseSubmit();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Ensure all required fields are present
    const formData = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message
    };
    
    await submit(formData);
    if (!error) {
      form.reset();
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
                    <h3 className="text-xl font-semibold text-cyan-400">Send a Message</h3>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground">
                        Fill out the form below and I'll get back to you as soon as possible.
                      </p>
                    </div>
                    
                    {isSuccess ? (
                      <div className="text-center py-8">
                        <div className="bg-primary/5 p-3 rounded-full text-cyan-400 inline-flex mx-auto mb-4">
                          <Mail className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-cyan-400">Message Sent!</h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for reaching out. I'll get back to you as soon as possible.
                        </p>
                        <Button onClick={() => reset()} variant="outline">
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell me about your project or inquiry" 
                                    rows={5}
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {error && (
                            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                              {error.message || "Something went wrong. Please try again."}
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-2">
                            <Link to="/schedule">
                              <Button type="button" variant="outline">
                                Or Schedule a Call
                              </Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
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
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                    Let's Build Something Amazing Together
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Whether you need AI integration, backend development, or process automation, 
                    I'm here to help turn your ideas into reality. Reach out today to discuss 
                    how we can collaborate.
                  </p>
                  <div className="flex items-center gap-2 text-sm mt-6">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span>Based in <span className="font-medium text-cyan-400">Mumbai, India</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span>Available for remote work worldwide</span>
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
