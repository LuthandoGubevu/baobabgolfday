
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Car, Target, HeartHandshake } from "lucide-react";
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint="golfer celebrating"
            className="transform hover:scale-105 transition-transform duration-300 object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
            Hole-in-One <span className="text-primary">Competition</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The 'WIN A CAR' & 'R100k' Hole-in-One prize applies only to the 17th hole. If you get a Hole-in-One, you win a car to the value of R300k, and an additional R100k is donated to the Add Hope beneficiaries.
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
                    <p className="text-muted-foreground">A car to the value of R300,000 Proudly covered by Car City</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <HeartHandshake className="h-8 w-8 text-primary" />
                <div>
                    <h3 className="font-semibold text-foreground">Charity Bonus</h3>
                    <p className="text-muted-foreground">R100,000 will be donated to Add Hope in your name.</p>
                </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Terms and conditions apply.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
