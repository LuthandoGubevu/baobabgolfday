
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail } from "lucide-react";
import participants from '@/app/lib/placeholder-images.json';

export function ParticipantsSection() {
  return (
    <SectionWrapper id="participants" alternateBackground={true}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground">
          Support Our <span className="text-primary">Supporters</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          The KFC Add Hope Annual Golf Day was made possible by the generosity of these organizations. We encourage you to return the support by exploring their services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {participants.map((company, index) => {
          const isEmail = company.url?.startsWith('mailto:');
          const buttonLabel = isEmail ? "Email Us" : "Visit Website";
          const Icon = isEmail ? Mail : ExternalLink;

          return (
            <Card 
              key={index} 
              className="group flex flex-col h-full bg-card border-border hover:border-primary/50 transition-all duration-300 ease-in-out shadow-sm hover:shadow-xl"
            >
              <CardContent className="flex flex-col flex-grow p-6 text-left">
                <div className="space-y-2 mb-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {company.name}
                  </h3>
                  {company.industry && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                      {company.industry}
                    </p>
                  )}
                </div>
                
                {company.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {company.description}
                  </p>
                )}
              </CardContent>

              {company.url && (
                <CardFooter className="px-6 pb-6 pt-0 mt-auto">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-primary/20 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    <a 
                      href={company.url} 
                      target={isEmail ? "_self" : "_blank"} 
                      rel={isEmail ? "" : "noopener noreferrer"}
                      className="flex items-center justify-center gap-2"
                    >
                      {buttonLabel}
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          )
        })}
      </div>
      
      <div className="text-center mt-20 p-8 border border-border/40 rounded-2xl bg-black/20">
        <p className="text-muted-foreground text-sm italic">
          If your business participated and you&apos;d like to update your details or be listed here, 
          please <a href="mailto:roslyn@baobabbrands.com" className="text-primary font-medium hover:underline ml-1">contact our team</a>.
        </p>
      </div>
    </SectionWrapper>
  );
}
