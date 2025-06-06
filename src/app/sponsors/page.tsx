
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const pastSponsors = [
  { name: "Sponsor A", logoUrl: "https://placehold.co/200x100.png", dataAiHint: "company logo brand" },
  { name: "Sponsor B", logoUrl: "https://placehold.co/200x100.png", dataAiHint: "corporate logo business" },
  { name: "Sponsor C", logoUrl: "https://placehold.co/200x100.png", dataAiHint: "organization logo" },
  { name: "Sponsor D", logoUrl: "https://placehold.co/200x100.png", dataAiHint: "brand identity" },
  { name: "Sponsor E", logoUrl: "https://placehold.co/200x100.png", dataAiHint: "logo design" },
  { name: "Sponsor F", logoUrl: "https://placehold.co/200x100.png", dataAiHint: "company branding" },
];

export default function SponsorsPage() {
  return (
    <SectionWrapper id="sponsors-page" className="min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Our Valued Sponsors
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A heartfelt thank you to all the organizations supporting the KFC Add Hope Golf Day.
          <br />Sponsors for 2025 will be featured here.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {pastSponsors.map((sponsor, index) => (
          <Card key={index} className="flex flex-col items-center justify-center p-6 bg-card shadow-lg hover:shadow-primary/20 transition-shadow aspect-square">
            <div className="relative w-full h-16 mb-4">
              <Image
                src={sponsor.logoUrl}
                alt={`${sponsor.name} logo`}
                fill
                className="object-contain"
                data-ai-hint={sponsor.dataAiHint}
              />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{sponsor.name}</p>
          </Card>
        ))}
      </div>
       <p className="mt-12 text-center text-lg text-muted-foreground">
          Interested in becoming a sponsor? <a href="/#booking" className="text-primary hover:underline">Click here to see options</a> or <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>
    </SectionWrapper>
  );
}

