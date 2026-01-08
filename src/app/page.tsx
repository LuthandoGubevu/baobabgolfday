
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { Separator } from '@/components/ui/separator';
import { DonationSection } from '@/components/sections/donation-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Separator className="bg-secondary h-px md:h-0.5" />
      <AboutSection />
      <Separator className="bg-secondary h-px md:h-0.5" />
      <DonationSection />
    </div>
  );
}
