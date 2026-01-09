
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const highlightItems: { type: 'image' | 'video', src: string, alt: string, dataAiHint: string }[] = [
    { type: 'video', src: "/Comp Video Final.mp4", alt: "Event highlight video", dataAiHint: "golf event video" },
    { type: 'image', src: "/DSC_7261.jpg", alt: "Golf event attendees", dataAiHint: "golf event" },
    { type: 'image', src: "/DSC_7289.jpg", alt: "Golfers on the course", dataAiHint: "golf course" },
    { type: 'image', src: "/DSC_7296.jpg", alt: "Group photo at golf day", dataAiHint: "group photo" },
    { type: 'image', src: "/DSC_7300.jpg", alt: "Golfer taking a shot", dataAiHint: "golf swing" },
    { type: 'image', src: "/DSC_7302.jpg", alt: "Smiling attendees", dataAiHint: "people smiling" },
    { type: 'image', src: "/DSC_7306.jpg", alt: "Golfers chatting", dataAiHint: "people talking" },
    { type: 'image', src: "/DSC_7308.jpg", alt: "Prize giving ceremony", dataAiHint: "award ceremony" },
    { type: 'image', src: "/DSC_7311.jpg", alt: "Golf cart on the green", dataAiHint: "golf cart" },
    { type: 'image', src: "/DSC_7320.jpg", alt: "Players at the tee box", dataAiHint: "golf tee" },
    { type: 'image', src: "/DSC_7322.jpg", alt: "Celebrating a good shot", dataAiHint: "people celebrating" },
    { type: 'image', src: "/DSC_7326.jpg", alt: "Team of golfers", dataAiHint: "golf team" },
    { type: 'image', src: "/DSC_7334.jpg", alt: "Scenic view of the golf course", dataAiHint: "golf landscape" },
    { type: 'image', src: "/DSC_7383.jpg", alt: "Dinner at the clubhouse", dataAiHint: "event dinner" },
    { type: 'image', src: "/DSC_7444.jpg", alt: "Close-up of a golf swing", dataAiHint: "golf swing" },
    { type: 'image', src: "/DSC_7451.jpg", alt: "Networking at the event", dataAiHint: "business networking" },
    { type: 'image', src: "/DSC_7479.jpg", alt: "Player looking at the fairway", dataAiHint: "golfer looking" },
    { type: 'image', src: "/DSC_7498.jpg", alt: "Sponsor banners at the event", dataAiHint: "event banner" },
    { type: 'image', src: "/DSC_7512.jpg", alt: "Happy participants", dataAiHint: "happy people" },
    { type: 'image', src: "/DSC_7538.jpg", alt: "Golfers with their clubs", dataAiHint: "golf clubs" },
    { type: 'image', src: "/DSC_7556.jpg", alt: "Charity event auction", dataAiHint: "charity auction" },
    { type: 'image', src: "/DSC_7574.jpg", alt: "Audience at the awards", dataAiHint: "event audience" },
    { type: 'image', src: "/DSC_7675.jpg", alt: "Putting on the green", dataAiHint: "golf putting" },
    { type: 'image', src: "/DSC_7699.jpg", alt: "Group of attendees posing for a photo", dataAiHint: "group photo" },
    { type: 'image', src: "/DSC_7731.jpg", alt: "Winner receiving a prize", dataAiHint: "award winner" },
    { type: 'image', src: "/DSC_7735.jpg", alt: "Shaking hands at the event", dataAiHint: "handshake business" },
    { type: 'image', src: "/DSC_7745.jpg", alt: "Candid shot of golfers", dataAiHint: "candid photo" },
    { type: 'image', src: "/DSC_7769.jpg", alt: "Event organizers", dataAiHint: "event staff" },
    { type: 'image', src: "/DSC_7854.jpg", alt: "View of the course from the clubhouse", dataAiHint: "golf clubhouse" },
    { type: 'image', src: "/DSC_7902.jpg", alt: "Evening reception", dataAiHint: "evening event" },
    { type: 'image', src: "/DSC_7989.jpg", alt: "Golfers driving a cart", dataAiHint: "golf cart" },
    { type: 'image', src: "/DSC_8086.jpg", alt: "Trophy presentation", dataAiHint: "trophy presentation" },
    { type: 'image', src: "/DSC_8125.jpg", alt: "Team photo on the course", dataAiHint: "golf team" },
    { type: 'image', src: "/DSC_8197.jpg", alt: "Player hitting out of a sand bunker", dataAiHint: "golf bunker" },
    { type: 'image', src: "/DSC_8216.jpg", alt: "Cheerful group at the golf day", dataAiHint: "cheerful people" },
    { type: 'image', src: "/DSC_8254.jpg", alt: "Sunset over the golf course", dataAiHint: "golf sunset" }
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
          {highlightItems.map((item, index) => (
            <Card key={item.src} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="hover:scale-105 transition-transform duration-300 object-cover w-full h-full"
                      data-ai-hint={item.dataAiHint}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="hover:scale-105 transition-transform duration-300 object-cover"
                      data-ai-hint={item.dataAiHint}
                      priority={index < 6}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </SectionWrapper>
  );
}
