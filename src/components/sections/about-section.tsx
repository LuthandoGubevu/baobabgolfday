
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function AboutSection() {
  return (
    <SectionWrapper id="about" alternateBackground={true}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
            About <span className="text-primary">Add Hope</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Add Hope is KFC’s long-standing initiative to fight childhood hunger across Southern Africa. Since 2009, the campaign has raised over R1 billion and provided 350+ million meals to vulnerable children through local feeding programs and children’s homes.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your participation in the KFC Add Hope Annual Golf Day directly contributes to this incredible cause, helping us nourish more children and give them a chance at a brighter future.
          </p>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
           <Image
            src="/Prize.png"
            alt="Prize giving at the Add Hope golf day"
            fill
            data-ai-hint="charity event prize"
            className="transform hover:scale-105 transition-transform duration-300 object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
