import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { EventInfoSection } from '@/components/sections/event-info-section';
import { BookingSection } from '@/components/sections/booking-section';
import { DonationSection } from '@/components/sections/donation-section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Separator className="bg-secondary h-px md:h-0.5" />
      <AboutSection />
      <Separator className="bg-secondary h-px md:h-0.5" />
      <EventInfoSection />
      <Separator className="bg-secondary h-px md:h-0.5" />
      <BookingSection />
      <Separator className="bg-secondary h-px md:h-0.5" />
      <DonationSection />
    </div>
  );
}
