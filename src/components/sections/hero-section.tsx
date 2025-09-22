"use client";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import { MapPin, CalendarDays, Clock } from "lucide-react";

export function HeroSection() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden !py-0">
      <div className="absolute inset-0 z-0">
        <Image
          src="/golf-hero.jpg"
          alt="Golf event hero background"
          fill
          quality={80}
          className="opacity-50 object-cover"
          data-ai-hint="golf course hero"
          priority // Keep priority as it's LCP
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      </div>
      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-foreground">
          KFC Add Hope Annual Golf Day 2025
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Join us for a day of golf and giving. All proceeds go to Greensleeves and Masizakhe Children’s Home.
        </p>

        {/* Sponsor Logos */}
        <div className="pt-4">
          
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
             <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Masizakhe (White).png"
                    alt="Masizakhe Logo"
                    fill
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Green Sleeves (White).png"
                    alt="Green Sleeves Logo"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Car City (White) 1.png"
                    alt="Car City Logo"
                    fill
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Olivewood (White).png"
                    alt="Olivewood Logo"
                    fill
                    className="object-contain"
                />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-md md:text-lg text-foreground/90">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Olivewood Golf Club</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>Friday, 5 December 2025</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>09:30 Shotgun Start</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button size="lg" onClick={() => scrollTo('booking')} className="min-w-[160px] shadow-lg hover:shadow-primary/50 transition-shadow">
            Book Now
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
