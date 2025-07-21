import { SectionWrapper } from "@/components/section-wrapper";
import { BookingForm } from "@/components/booking-form";
import { CountdownTimer } from "@/components/countdown-timer";

export function BookingSection() {
  const twoWeeksFromNow = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  return (
    <SectionWrapper id="booking" alternateBackground={true}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Registrations Open <span className="text-primary">Soon!</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Secure your spot for a fantastic day of golf for a great cause. Bookings open in:
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        {/* The BookingForm is hidden and replaced by the CountdownTimer */}
        <CountdownTimer targetDate={twoWeeksFromNow} />

        {/* 
          To re-enable the form, comment out the CountdownTimer above 
          and uncomment the BookingForm below.
        */}
        {/* <BookingForm /> */}
      </div>
    </SectionWrapper>
  );
}
