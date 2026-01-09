
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import Link from 'next/link';

const participants: { name: string, url: string | null }[] = [
  { name: "Tile Africa", url: "https://www.tileafrica.co.za/" },
  { name: "Townscape Designs (Pty) Ltd", url: null },
  { name: "Feature Ceilings", url: "https://www.facebook.com/featureceilings/" },
  { name: "CW Busse Assurance Brokers", url: null },
  { name: "Baobab Service Centre", url: "https://baobabbrands.com/" },
  { name: "BUCO Fleet Street", url: "https://www.buco.co.za/" },
  { name: "Weyercon", url: "https://www.linkedin.com/company/weyercon/" },
  { name: "Airfire Solutions", url: null },
  { name: "Chemex", url: "https://chemex.co.za/" },
  { name: "Stirling Motors", url: null },
  { name: "Nedbank", url: "https://personal.nedbank.co.za/home.html" },
  { name: "Lunotha Security Services", url: "https://www.facebook.com/p/Lunotha-Security-Services-61558433665314/" },
  { name: "Van Till Management", url: "https://vantill.co.za/" },
  { name: "Andion Plumbing CC", url: "https://iopsa.org.za/plumbers_list/andion-plumbing-cc/" },
  { name: "HRPM", url: "https://supercard.co.za/" },
  { name: "Eat Sum Meat", url: "https://www.facebook.com/eatsummeat/" },
  { name: "Express Petroleum", url: "https://expresspetroleum.co.za/" },
  { name: "Pegasus Cleaning Solutions SA", url: null },
  { name: "Bradmick Motors / Car City", url: "https://carcityel.co.za/" },
  { name: "FNB Brokers", url: "https://www.fnb.co.za/index.html" },
  { name: "Gresham Media Company", url: "https://greshammusicgroup.com/" },
  { name: "Tiletoria", url: null },
  { name: "GTS SA / Grease Traps", url: "https://greasetraps.co.za/" },
  { name: "Nashua East London", url: "https://www.nashua.co.za/" },
  { name: "Vincent Midas", url: "https://vincentmidas.co.za/" },
  { name: "Bass Property Group", url: "https://www.basspropertygroup.co.za/" },
  { name: "TRE Business Systems", url: "https://trebs.co.za/" },
  { name: "Pro Screen East London", url: "https://pro-screen.co.za/" },
  { name: "NFB Private Wealth", url: "https://nfb.co.za/contact-us" },
  { name: "Abantu Staffing Solutions", url: "https://www.abantustaffingsolutions.co.za/" },
  { name: "Charteris and Barnes CC", url: "https://www.cbarnes.co.za/careers.php" }
];


// Simple hashing function to get a pseudo-random but consistent value
const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export function ParticipantsSection() {
  return (
    <SectionWrapper id="participants" alternateBackground={true}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Thank You to Our Business Community
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Together we raised R150,000 for children in need. Now, let’s return the support by doing business with those who made it possible.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {participants.map((company, index) => {
          const heightClass = ['h-32', 'h-40', 'h-36'][simpleHash(company.name) % 3];
          return (
            <div key={index} className="break-inside-avoid">
                 <Card className="h-full flex flex-col transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
                    <CardContent className="flex flex-col flex-grow items-center justify-center p-6 text-center">
                        <p className="text-lg font-bold text-foreground flex-grow">{company.name}</p>
                        {company.url && (
                            <Button asChild variant="outline" size="sm" className="mt-4">
                               <a href={company.url} target="_blank" rel="noopener noreferrer">
                                 <LinkIcon className="mr-2 h-4 w-4" />
                                 Visit Website
                               </a>
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-16">
        <p className="text-muted-foreground">
            If your business participated and you&apos;d like to be listed here, <Link href="/contact" className="text-primary hover:underline">contact us to be included</Link>.
        </p>
      </div>
    </SectionWrapper>
  );
}
