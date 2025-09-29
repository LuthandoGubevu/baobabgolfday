
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPinIcon, Loader2 } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { submitMessage } from "@/actions/contact-actions";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      const result = await submitMessage(values);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "An error occurred.",
          variant: "destructive",
        });
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            const fieldName = field as keyof ContactFormValues;
            if (Array.isArray(messages)) {
              form.setError(fieldName, { type: 'server', message: messages.join(', ') });
            }
          });
        }
      }
    });
  };

  return (
    <SectionWrapper id="contact-page" className="min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions or need more information? Get in touch!
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} {...form.register("message")} />
                {form.formState.errors.message && <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Get In Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
             <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <p>Email: <a href="mailto:roslyn@baobabbrands.com" className="hover:text-primary transition-colors">roslyn@baobabbrands.com</a></p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <p>Phone: <a href="tel:0836799305" className="hover:text-primary transition-colors">083 679 9305</a></p>
            </div>
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <p className="font-semibold text-foreground">Event Address:</p>
                <p>
                  Olivewood Golf Club <br />
                  Schafli Road, Chintsa East <br />
                  East London, Eastern Cape <br />
                  South Africa
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
