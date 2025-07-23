import { SectionWrapper } from "@/components/section-wrapper";
import { BookingForm } from "@/components/booking-form";
import { CountdownTimer } from "@/components/countdown-timer";

export function BookingSection() {
  // Set the target date to August 15, 2025. Note: Month is 0-indexed (7 = August).
  const registrationOpenDate = new Date(2025, 7, 15);

  return (
    <SectionWrapper id="booking" alternateBackground={true}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Registrations Open <span className="text-primary">Soon!</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Secure your spot for a fantastic day of golf for a great cause. Registrations open soon.
        </p>
      </div>
      <div className="max-w-3xl mx-auto mt-8">
        {/* The BookingForm is hidden and replaced by the CountdownTimer */}
        <CountdownTimer targetDate={registrationOpenDate} />

        {/* 
          To re-enable the form, comment out the CountdownTimer above 
          and uncomment the BookingForm below.
        */}
        {/* <BookingForm /> */}
      </div>
    </SectionWrapper>
  );
}
