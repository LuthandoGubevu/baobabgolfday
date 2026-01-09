
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";

const participants = [
  "Tile Africa", "Townscape Designs", "Feature Ceilings", 
  "CW Busse Assurance Brokers", "Baobab Service Centre", "BUCO Fleet Street", 
  "Weyercon", "Airfire Solutions", "Chemex", "Stirling Motors", 
  "Nedbank", "Lunotha Security Services", "Van Till Management", 
  "Andion Plumbing", "hrpm", "Eat Sum Meat", "Express Petroleum", 
  "Pegasus Cleaning Solutions SA", "Bradmick Motors T/A Car City", 
  "FNB Brokers", "Gresham Media Company", "Tiletoria", 
  "GTS SA t/a Grease Traps", "Nashua East London", "Vincent Midas", 
  "Bass Property Group", "TRE Business Systems", "Pro Screen East London", 
  "NFB Private Wealth", "Abantu Staffing Solutions", "Charteris and Barnes CC"
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
          A Big Thank You to Our 2025 Participants
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We appreciate every team, donor, and supporter who made this day possible.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {participants.map((company, index) => {
          const heightClass = ['h-32', 'h-40', 'h-36'][simpleHash(company) % 3];
          return (
            <div key={index} className="break-inside-avoid">
                 <Card className="h-full transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
                    <CardContent className="flex items-center justify-center p-6 h-full">
                        <p className="text-lg font-bold text-center text-foreground">{company}</p>
                    </CardContent>
                </Card>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
