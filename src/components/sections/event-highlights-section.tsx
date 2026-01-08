
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const highlightImages: { src: string, alt: string, dataAiHint: string }[] = [
    { src: "/DSC_7261.jpeg", alt: "Golf event attendees", dataAiHint: "golf event" },
    { src: "/DSC_7289.jpeg", alt: "Golfers on the course", dataAiHint: "golf course" },
    { src: "/DSC_7296.jpeg", alt: "Group photo at golf day", dataAiHint: "group photo" },
    { src: "/DSC_7300.jpeg", alt: "Golfer taking a shot", dataAiHint: "golf swing" },
    { src: "/DSC_7302.jpeg", alt: "Smiling attendees", dataAiHint: "people smiling" },
    { src: "/DSC_7306.jpeg", alt: "Golfers chatting", dataAiHint: "people talking" },
    { src: "/DSC_7308.jpeg", alt: "Prize giving ceremony", dataAiHint: "award ceremony" },
    { src: "/DSC_7311.jpeg", alt: "Golf cart on the green", dataAiHint: "golf cart" },
    { src: "/DSC_7320.jpeg", alt: "Players at the tee box", dataAiHint: "golf tee" },
    { src: "/DSC_7322.jpeg", alt: "Celebrating a good shot", dataAiHint: "people celebrating" },
    { src: "/DSC_7326.jpeg", alt: "Team of golfers", dataAiHint: "golf team" },
    { src: "/DSC_7334.jpeg", alt: "Scenic view of the golf course", dataAiHint: "golf landscape" },
    { src: "/DSC_7383.jpeg", alt: "Dinner at the clubhouse", dataAiHint: "event dinner" },
    { src: "/DSC_7444.jpeg", alt: "Close-up of a golf swing", dataAiHint: "golf swing" },
    { src: "/DSC_7451.jpeg", alt: "Networking at the event", dataAiHint: "business networking" },
    { src: "/DSC_7479.jpeg", alt: "Player looking at the fairway", dataAiHint: "golfer looking" },
    { src: "/DSC_7498.jpeg", alt: "Sponsor banners at the event", dataAiHint: "event banner" },
    { src: "/DSC_7512.jpeg", alt: "Happy participants", dataAiHint: "happy people" },
    { src: "/DSC_7538.jpeg", alt: "Golfers with their clubs", dataAiHint: "golf clubs" },
    { src: "/DSC_7556.jpeg", alt: "Charity event auction", dataAiHint: "charity auction" },
    { src: "/DSC_7574.jpeg", alt: "Audience at the awards", dataAiHint: "event audience" },
    { src: "/DSC_7675.jpeg", alt: "Putting on the green", dataAiHint: "golf putting" },
    { src: "/DSC_7699.jpeg", alt: "Group of attendees posing for a photo", dataAiHint: "group photo" },
    { src: "/DSC_7731.jpeg", alt: "Winner receiving a prize", dataAiHint: "award winner" },
    { src: "/DSC_7735.jpeg", alt: "Shaking hands at the event", dataAiHint: "handshake business" },
    { src: "/DSC_7745.jpeg", alt: "Candid shot of golfers", dataAiHint: "candid photo" },
    { src: "/DSC_7769.jpeg", alt: "Event organizers", dataAiHint: "event staff" },
    { src: "/DSC_7854.jpeg", alt: "View of the course from the clubhouse", dataAiHint: "golf clubhouse" },
    { src: "/DSC_7902.jpeg", alt: "Evening reception", dataAiHint: "evening event" },
    { src: "/DSC_7989.jpeg", alt: "Golfers driving a cart", dataAiHint: "golf cart" },
    { src: "/DSC_8086.jpeg", alt: "Trophy presentation", dataAiHint: "trophy presentation" },
    { src: "/DSC_8125.jpeg", alt: "Team photo on the course", dataAiHint: "golf team" },
    { src: "/DSC_8197.jpeg", alt: "Player hitting out of a sand bunker", dataAiHint: "golf bunker" },
    { src: "/DSC_8216.jpeg", alt: "Cheerful group at the golf day", dataAiHint: "cheerful people" },
    { src: "/DSC_8254.jpeg", alt: "Sunset over the golf course", dataAiHint: "golf sunset" }
];

export function EventHighlightsSection() {
  return (
    <SectionWrapper id="highlights" alternateBackground={false}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">
          Event Highlights
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A look back at the memorable moments from our golf day.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightImages.map((image, index) => (
            <Card key={image.src} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="hover:scale-105 transition-transform duration-300 object-cover"
                    data-ai-hint={image.dataAiHint}
                    priority={index < 6} 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </SectionWrapper>
  );
}
