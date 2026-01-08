"use client";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import Link from 'next/link';

export function HeroSection() {

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
          sizes="100vw"
          priority // Keep priority as it's LCP
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      </div>
      <div className="relative z-10 text-center space-y-8 animate-in fade-in duration-1000">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-foreground">
          Together, We Raised R150,000 for Children in Need
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Thank you for joining the KFC Add Hope Annual Golf Day. Because of your support, we raised over R150,000 for Greensleeves and Masizakhe Children’s Home — helping nourish more young lives.
        </p>

        {/* Sponsor Logos */}
        <div className="pt-4">
          
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
             <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Masizakhe (White).png"
                    alt="Masizakhe Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Green Sleeves (White).png"
                    alt="Green Sleeves Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                />
            </div>
            <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Car City (White) 1.png"
                    alt="Car City Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Olivewood (White).png"
                    alt="Olivewood Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40" data-ai-hint="sponsor logo">
                <Image
                    src="/daily-logo.png"
                    alt="Daily Dispatch Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/gallery" passHref>
            <Button size="lg" className="min-w-[200px] shadow-lg hover:shadow-primary/50 transition-shadow">
              View Event Highlights
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
