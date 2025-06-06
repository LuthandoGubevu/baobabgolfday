
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Download, Gift } from "lucide-react"; // Gift and Download are no longer needed
// import { DonationReferenceForm } from "@/components/donation-form"; // DonationReferenceForm is no longer needed

const bankingDetails = [
  { label: "Account Name", value: "KFC Add Hope" },
  { label: "Bank", value: "Sample Bank Name" },
  { label: "Account Number", value: "1234567890" },
  { label: "Branch Code", value: "000000" },
  { label: "Reference", value: "[Your Name / Company]" },
];

export function DonationSection() {
  return (
    <SectionWrapper id="donate">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Support <span className="text-primary">Add Hope</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Can’t make it to the event? You can still support Add Hope by donating via EFT.
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-8 lg:gap-12 items-start max-w-xl mx-auto">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Banking Details</CardTitle>
            <CardDescription className="text-muted-foreground">
              Please use the following details for your EFT donation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {bankingDetails.map((detail, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium text-foreground/80">{detail.label}:</span>
                <span className="text-muted-foreground text-right">{detail.value}</span>
              </div>
            ))}
             <p className="text-xs text-muted-foreground pt-4">
              Remember to use your name or company name as the reference so we can acknowledge your generous contribution.
            </p>
          </CardContent>
        </Card>

        {/* "Let Us Know About Your Donation" section and "Download Donation Info PDF" button removed */}
        {/* 
        <div className="space-y-6">
          <Card className="bg-card shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary flex items-center gap-2">
                <Gift className="h-7 w-7"/> Let Us Know About Your Donation
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                After making your donation, please let us know by providing your name/company for our reference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonationReferenceForm />
            </CardContent>
          </Card>
          
          <a href="/KFC-AddHope-GolfDay-DonationInfo.pdf" download="KFC-AddHope-GolfDay-DonationInfo.pdf">
            <Button variant="outline" size="lg" className="w-full border-primary text-primary hover:bg-primary/10">
              <Download className="mr-2 h-5 w-5" />
              Download Donation Info PDF
            </Button>
          </a>
        </div> 
        */}
      </div>
    </SectionWrapper>
  );
}
