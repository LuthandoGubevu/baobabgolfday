import { SectionWrapper } from "@/components/section-wrapper";
import { BookingForm } from "@/components/booking-form";

export function BookingSection() {
  return (
    <SectionWrapper id="booking" alternateBackground={true}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Register Your <span className="text-primary">Team</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Secure your spot for a fantastic day of golf for a great cause.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <BookingForm />
      </div>
    </SectionWrapper>
  );
}
