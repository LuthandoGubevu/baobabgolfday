import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPinIcon } from "lucide-react";

export default function ContactPage() {
  // Dummy action for form
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    console.log("Contact Form Submission:", { name, email, message });
    // Here you would typically send an email or save to a database
    // For now, we'll just log it.
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
            <form action={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input type="text" id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" name="email" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={5} required />
              </div>
              <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Event Organizer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <p>Email: <a href="mailto:events@addhope.co.za" className="hover:text-primary transition-colors">events@addhope.co.za</a> (Example)</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <p>Phone: <a href="tel:+27001234567" className="hover:text-primary transition-colors">+27 (00) 123 4567</a> (Example)</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-6 w-6 text-primary mt-1" />
              <p>
                KFC Add Hope Foundation <br/>
                1 Example Street, Suburb <br/>
                City, Postal Code, South Africa (Example)
              </p>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-foreground mb-2">Event Venue:</h3>
              <p>East London Golf Club</p>
              <p>[Club Address Line 1]</p>
              <p>East London, [Postal Code]</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
