
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsAndConditionsPage() {
  return (
    <SectionWrapper id="terms-page" className="min-h-screen">
      <Card className="max-w-4xl mx-auto bg-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline text-primary">
            Sponsorship/Advertising Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">1. THE BENEFICIARY</h2>
            <p>
              The Organiser will be donating all net proceeds from the Event to Greensleaves and Masizakhe Children's Home, but the Organiser is entitled to change the nominated beneficiary for any reason whatsoever.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">2. THE SPONSOR’S OBLIGATIONS</h2>
            <p className="mb-2">
              <strong>2.1</strong> The Sponsor agrees to (i) obey all rules, laws, by-laws, ordinances and regulations governing use of the facility at which the Event is to be held, (ii) abide by the rules and regulations of the local authority or any other government or regulatory body having authority to regulate the facility and the Event; and (iii) obey all laws, including those pertaining to health and safety, consumer protection and protection of visitors and fellow attendees to the Event.
            </p>
            <p className="mb-2">
              <strong>2.2</strong> The Sponsor agrees to occupy the exhibit space during the Event hours and to advertise only the products and services related to their company or associated companies.
            </p>
            <p>
              <strong>2.3</strong> The Sponsor is responsible for setting up and removing of any advertising material, banners etc immediately after the Event. The Organiser will not be responsible for any loss or damage caused by the Sponsor’s failure to remove the advertising material timeously.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">3. PAYMENTS TERMS AND CHARGES</h2>
            <p className="mb-2">
              <strong>3.1</strong> The Sponsor shall pay the Organiser the price in accordance with the Sponsorship Package selected on the Booking Form.
            </p>
            <p className="mb-2">
              <strong>3.2</strong> The invoice will be generated upon receipt of an authorized booking form.
            </p>
            <p className="mb-2">
              <strong>3.3</strong> Any additional charges incurred at the Event, which are not covered by the package, shall be borne by the Sponsor.
            </p>
            <p>
              <strong>3.4</strong> Payment must be received within 7 days from date of invoice and not later than 72 hours before the Event.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">4. The Organisers Rights</h2>
            <p className="mb-2">
              <strong>4.1</strong> The Organiser reserves the right, in its sole and unfettered discretion to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li><strong>4.1.1</strong> determine the eligibility of sponsors and sponsorships for the Event;</li>
              <li><strong>4.1.2</strong> reject or prohibit sponsors or advertising material which Organiser considers objectionable, inappropriate, disruptive or offensive to the Organiser, other sponsors or the Event attendees;</li>
              <li><strong>4.1.3</strong> change or modify the layout of the Event and/or relocate sponsors;</li>
              <li><strong>4.1.4</strong> cancel, in whole or in part, the Event due to a Force Majeure or otherwise; or</li>
              <li><strong>4.1.5</strong> change the date, location and duration of the Event; without any liability whatsoever to the Sponsor.</li>
            </ul>
            <p className="mb-2">
              <strong>4.2</strong> In respect of 4.1.4 and 4.1.5 the Organiser will endeavor to develop an event of the same or similar value that is suitable to both parties to replace the cancelled event.
            </p>
            <p>
              <strong>4.3</strong> If it transpires that the Event cannot be rescheduled and it is impossible to hold the Event, due to a Force Majeure event or otherwise, the Sponsor will receive 100% refund of any monies paid, less those reasonable costs incurred by the Sponsor up until the notification of cancellation. The Organiser will use its best endeavors to refund any amounts due to the Sponsor within twenty (20) working days following notification of the cancellation.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">5. INDEMNITY/LIABILITY/INSURANCE</h2>
            <p className="mb-2">
              <strong>5.1</strong> The Sponsor agrees to indemnify and hold harmless the Organiser, other Event sponsors and the facility and their respective officers, agents, insurers and employees, against all claims, damages, costs and charges of every kind resulting from their sponsorship or its occupancy of exhibit space, for personal injuries, death, property damages or any other damage sustained by the Sponsor.
            </p>
            <p className="mb-2">
              <strong>5.2</strong> The Organiser accepts no responsibility for any loss or damage to property, personal injuries or death to any of the Sponsor’s employees, staff or agents that occurs during or in preparation for the Event unless such harm is occasioned by the gross negligence of the Organiser.
            </p>
            <p>
              <strong>5.3</strong> The Sponsor is responsible to arrange suitable insurance with a reputable insurance provider with regard to an exhibit, personnel, display and materials from any damage or loss through theft, fire, accident or other cause and accepts all risks associated with the use of its exhibit space.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">6. Cancellation and Termination</h2>
            <p>
              In the event that the Sponsor notifies the Organiser less than 7 (seven) days preceding the date of the Event that it wishes to not participate in the Event or except as otherwise permitted herein, fails to appear at the Event, the booking will be charged for in full and the Sponsor will not be entitled to a refund.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">7. Miscellaneous</h2>
            <p className="mb-2">
              <strong>7.1</strong> The Organiser makes no representations or gives any warranties as to the success of the Event, attendance or numbers.
            </p>
            <p>
              <strong>7.2</strong> Neither Party may assign, transfer or otherwise deal their rights interest and obligations hereunder without the written consent of the other.
            </p>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
