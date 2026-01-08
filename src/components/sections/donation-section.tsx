
import { SectionWrapper } from "@/components/section-wrapper";
import ReminderForm from "@/components/reminder-form";

export function DonationSection() {
  return (
    <SectionWrapper id="donate">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Don't Miss Out!
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Leave your email below, and we'll send you a one-time reminder when registrations open for the 2025 event.
        </p>
      </div>

      <div className="flex justify-center">
         <ReminderForm />
      </div>
    </SectionWrapper>
  );
}
