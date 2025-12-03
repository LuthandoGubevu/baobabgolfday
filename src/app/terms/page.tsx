
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditionsPage() {
  return (
    <SectionWrapper id="terms-page" className="min-h-screen">
      <Card className="max-w-4xl mx-auto bg-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline text-primary">
            Add Hope Golf Day – Terms &amp; Conditions (South Africa)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-muted-foreground">

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Existing Terms</h3>
            <p>Please review the original terms and conditions that were provided for the event.</p>
            {/* The original content would be preserved here if it were different. 
                Since the provided text was a complete replacement, this section is a placeholder. 
                If there were distinct old terms, they would go here. */}
          </div>
          
          <Separator className="bg-border my-8" />

          {/* New T&Cs sections */}
          <div className="space-y-6">
            <div className="space-y-4">
                <ul className="list-none space-y-2">
                <li><strong>Event:</strong> Add Hope Golf Day 2025</li>
                <li><strong>Date:</strong> 5 December 2025</li>
                <li><strong>Venue:</strong> Olivewood Golf Club</li>
                <li><strong>Promoter:</strong> Baobab Khulisani (Pty) Ltd t/a KFC South Africa Reg. No. 2006/034509/07</li>
                <li><strong>Contact:</strong> reception@baobabbrands.com; Tel: 043 004 0071</li>
                </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">1. Definitions</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>“Event” means the golf day and all associated activities (e.g., registration, prize-giving, auction).</li>
                <li>“Participant” includes players, team captains, caddies, volunteers, and guests.</li>
                <li>“Sponsor” means any entity providing financial or in-kind support.</li>
                <li>“Fees” means entry fees, sponsorship fees, and any add-ons (e.g., carts, halfway house).</li>
                <li>“Club Rules” refers to the host club’s rules and local rules.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">2. Eligibility &amp; Registration</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Participation is open to persons aged 18+ unless otherwise stated.</li>
                <li>Only amateur players allowed.</li>
                <li>Entries must be submitted via registration platform, https://addhope.kfcbaobab.com, and are confirmed once payment is received and a confirmation email is issued.</li>
                <li>The Promoter may accept, refuse, or waitlist entries at its discretion (capacity limits, handicap validation, compliance).</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">3. Rules of Play</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>The Event is played under the Rules of Golf (R&amp;A), GolfRSA Handicapping, and Club Local Rules.</li>
                <li>Format: Fourball Alliance, Scramble Drive, minimum 4 (four) drives, 2 (two) to count.</li>
                <li>Handicaps: Players must provide valid GolfRSA handicap details; the Promoter may adjust handicaps for fairness.</li>
                <li>Pace of Play &amp; Etiquette: Players must adhere to marshals’ instructions. Failure may result in penalties or disqualification.</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">4. Fees, Payment &amp; Invoices</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Fees: R3 500 (incl. VAT) per 4-ball</li>
                <li>Fees: R1 500 (incl. VAT) Hole sponsor – catered (drinks and food on hole)</li>
                <li>Fees: R2 000 (incl. VAT) Hole sponsor - uncatered</li>
                <li>Payment terms: payable within 7 days of invoice; EFT only</li>
                <li>Non-payment: The Promoter reserves the right to cancel unconfirmed registrations.</li>
                <li>VAT: applicable</li>
                <li>Proof of payment must reference invoice number/team name.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">5. Cancellations, Substitutions &amp; Refunds</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Participant cancellations: 100% refund less administration fee, where applicable.</li>
                <li>Substitutions are permitted. Notification to be sent to the Promoter 48 hours before the Event with written notice.</li>
                <li>Event changes: The Promoter may alter format, schedule, or venue for operational or safety reasons.</li>
                <li>Force Majeure: If the Event is cancelled due to weather, safety, public regulation, or circumstances beyond control, the Promoter will reschedule or provide a reasonable credit/partial refund after deducting unrecoverable costs.</li>
                <li>These terms comply with the Consumer Protection Act 68 of 2008 (CPA) (fair, transparent terms). Nothing herein limits non-excludable CPA rights.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">6. Safety, Health &amp; Conduct</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Participants must comply with Occupational Health and Safety Act requirements, Club safety rules, and instructions from officials.</li>
                <li>The Promoter may remove any person for intoxication, disorderly conduct, dangerous behaviour, or breach of rules—no refund in such cases.</li>
                <li>Alcohol: Service is subject to the Liquor Act and club policy; drink responsibly. No outside alcohol is permitted.</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">7. Equipment, Carts &amp; Course Access</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Carts: 2 (two) carts per 4-ball will be provided and are used at participants own risk.</li>
                <li>Participants are responsible for their own equipment and personal belongings. The Promoter and Club are not liable for loss, theft, or damage except where caused by gross negligence or wilful misconduct.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">8. Prizes &amp; Competitions</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Eligibility: Only registered players who complete the minimum required holes in accordance with the format are eligible.</li>
                <li>Tie-breaking: calculation to be performed using Club rules. This decision is final.</li>
                <li>Handicap verification may be requested; false information may lead to disqualification.</li>
                <li>Sponsored prizes: May be subject to sponsor-specific terms.</li>
                <li>Tax: Any tax implications on prizes are the recipient’s responsibility.</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">9. Sponsorships &amp; Branding</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Sponsorship packages: refer to the Sponsorship/Advertising Terms and Conditions on the Events microsite.</li>
                <li>Sponsors must comply with advertising standards, Club rules, and safety requirements.</li>
                <li>No ambush marketing or unauthorised branding.</li>
                <li>The Promoter may reposition or remove branding for safety/compliance.</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">10. Photography, Media &amp; Privacy (POPIA)</h3>
              <p>By participating in this Event, participants consent to the collection, processing, and storage of their personal information by the Promoter for purposes related to this Event i.e. Event reporting, marketing and social media, in accordance with the Protection of Personal Information Act, 4 of 2013 (“POPIA”). Participants have the right to request access to, correction, or deletion of their personal information by contacting POPIcompliance@kfcbaobab.com. The Promoter will retain personal information only as long as necessary for the fulfilment of these purposes and compliance with applicable laws and will implement reasonable security measures to protect such information. Personal information will not be shared with third parties without the participant’s consent, except as required by law.</p>
              <p>If you do not wish to be photographed, please inform registration staff; reasonable steps will be taken to accommodate.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">11. Liability, Indemnity &amp; Insurance</h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Golf involves inherent risks (e.g., stray balls, weather, course conditions). Participants attend and play at their own risk.</li>
                <li>To the maximum extent permitted by South African law, the Promoter, Club, and their staff are not liable for injury, loss, or damage arising from participation, except where caused by gross negligence or wilful misconduct.</li>
                <li>Participants indemnify the Promoter against third-party claims arising from their own conduct or breach of these terms.</li>
                <li>The Promoter maintains public liability—this does not replace participants’ personal insurance.</li>
                <li>The Participant is responsible for arranging their own transport to and from the Event, accommodation or both at their own expense.</li>
              </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">12. Compliance &amp; Illegal Items</h3>
                <ul className="list-disc list-outside pl-5 space-y-2">
                    <li>No weapons, drugs, or prohibited items.</li>
                    <li>Adherence to environmental and wildlife guidelines on the course.</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">13. Weather Policy</h3>
                <ul className="list-disc list-outside pl-5 space-y-2">
                    <li>Play suspensions (lightning, unsafe conditions) follow the Club’s lightning and safety protocols.</li>
                    <li>If play is interrupted, the Promoter may modify format (e.g., reduced holes) to determine results fairly.</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">14. Communication</h3>
                <p>Official updates will be sent via email to the contact on file.</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">15. Dispute Resolution &amp; Governing Law</h3>
                <ul className="list-disc list-outside pl-5 space-y-2">
                    <li>The Parties shall first attempt to resolve any dispute, controversy, or claim arising out of or relating to these Terms and Conditions amicably through good faith negotiations. Either Party may initiate such discussions by providing written notice to the other Party outlining the nature of the dispute.</li>
                    <li>If the dispute cannot be resolved within ten (10) working days of the initial notice, the Parties agree to submit the matter to mediation, to be conducted by an independent and accredited mediator appointed by mutual agreement. The mediation shall take place in East London, South Africa, unless otherwise agreed, and the costs shall be shared equally between the Parties.</li>
                    <li>Should mediation fail to resolve the dispute, the matter shall be referred to arbitration in accordance with the rules of the Arbitration Foundation of Southern Africa (AFSA). The arbitration shall be conducted in English, in East London, South Africa, and the decision of the arbitrator shall be final and binding on both Parties.</li>
                    <li>Nothing in this clause shall prevent either Party from seeking urgent interim relief from a court of competent jurisdiction, including the High Court of South Africa, where such relief is necessary to prevent irreparable harm.</li>
                    <li>This Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of South Africa. Subject to the provisions of this clause, the Parties consent to the jurisdiction of the courts of South Africa for the enforcement of any arbitral award or interim relief.</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">16. Amendments</h3>
                <p>The Promoter may update these terms with notice on the Event microsite or via email. Material changes will be highlighted.</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">17. Acceptance</h3>
                <p>By registering, paying, or attending, Participants confirm they have read, understood, and accepted these Terms & Conditions.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
