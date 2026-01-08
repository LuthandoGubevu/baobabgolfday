"use client";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import Link from 'next/link';

export function HeroSection() {

  return (
    <SectionWrapper id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-16 md:py-24">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        src="/Comp Video Final.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 text-center space-y-8 animate-in fade-in duration-1000 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-white drop-shadow-md">
          Together, We Raised R150,000 for Children in Need
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 drop-shadow-md">
          Thank you for joining the KFC Add Hope Annual Golf Day. Because of your support, we raised over R150,000 for Greensleeves and Masizakhe Children’s Home — helping nourish more young lives.
        </p>

        {/* Sponsor Logos */}
        <div className="pt-4">
          
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
             <div className="relative h-16 w-40 drop-shadow-lg" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Masizakhe (White).png"
                    alt="Masizakhe Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40 drop-shadow-lg" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Green Sleeves (White).png"
                    alt="Green Sleeves Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                />
            </div>
            <div className="relative h-16 w-40 drop-shadow-lg" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Car City (White) 1.png"
                    alt="Car City Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40 drop-shadow-lg" data-ai-hint="sponsor logo">
                <Image
                    src="/Golf Day Logo - Olivewood (White).png"
                    alt="Olivewood Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                />
            </div>
             <div className="relative h-16 w-40 drop-shadow-lg" data-ai-hint="sponsor logo">
                <Image
                    src="/daily-logo.png"
                    alt="Daily Dispatch Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
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
