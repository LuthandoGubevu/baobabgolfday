
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import participants from '@/app/lib/placeholder-images.json';


export function ParticipantsSection() {
  return (
    <SectionWrapper id="participants" alternateBackground={true}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Thank You to Our Business Community
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Together we raised R150,000 for children in need. Now, let’s return the support by doing business with those who made it possible.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {participants.map((company, index) => {
          return (
            <Card key={index} className="flex flex-col transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden">
                <div className="relative aspect-square w-full">
                  <Image
                    src={company.src}
                    alt={`${company.name} logo`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                    data-ai-hint="business logo"
                  />
                </div>
                <CardContent className="flex flex-col flex-grow items-center justify-center p-4 text-center">
                    <p className="text-base font-bold text-foreground flex-grow mb-4">{company.name}</p>
                    {company.url && (
                        <Button asChild variant="outline" size="sm">
                           <a href={company.url} target="_blank" rel="noopener noreferrer">
                             <LinkIcon className="mr-2 h-4 w-4" />
                             Learn More
                           </a>
                        </Button>
                    )}
                </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-16">
        <p className="text-muted-foreground">
            If your business participated and you&apos;d like to be listed here, <a href="mailto:roslyn@baobabbrands.com" className="text-primary hover:underline">contact us to be included</a>.
        </p>
      </div>
    </SectionWrapper>
  );
}
