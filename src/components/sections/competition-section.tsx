
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Car, Target } from "lucide-react";
import Image from "next/image";

export function CompetitionSection() {
  return (
    <SectionWrapper id="competition">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl order-last md:order-first">
           <Image
            src="/golfer.png"
            alt="A golfer celebrating a successful shot after winning the hole-in-one competition"
            fill
            data-ai-hint="golfer celebrating"
            className="transform hover:scale-105 transition-transform duration-300 object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
            Hole-in-One <span className="text-primary">Competition</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This year, we're upping the stakes! Score a hole-in-one on the challenging 17th hole and you could be driving away in a brand-new car worth R300,000.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                    <h3 className="font-semibold text-foreground">The Challenge</h3>
                    <p className="text-muted-foreground">A single hole-in-one on the 17th hole during the tournament.</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <Car className="h-8 w-8 text-primary" />
                <div>
                    <h3 className="font-semibold text-foreground">The Grand Prize</h3>
                    <p className="text-muted-foreground">A spectacular new car valued at R300,000.</p>
                </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Terms and conditions apply. The prize is non-transferable and subject to availability.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
