
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { PackageOpen } from "lucide-react";

const galleryImages: { src: string, alt: string, dataAiHint: string }[] = [
    { src: "/DSC_7261.png", alt: "Golf event attendees", dataAiHint: "golf event" },
    { src: "/DSC_7289.png", alt: "Golfers on the course", dataAiHint: "golf course" },
    { src: "/DSC_7296.png", alt: "Group photo at golf day", dataAiHint: "group photo" },
    { src: "/DSC_7300.png", alt: "Golfer taking a shot", dataAiHint: "golf swing" },
    { src: "/DSC_7302.png", alt: "Smiling attendees", dataAiHint: "people smiling" },
    { src: "/DSC_7306.png", alt: "Golfers chatting", dataAiHint: "people talking" },
    { src: "/DSC_7308.png", alt: "Prize giving ceremony", dataAiHint: "award ceremony" },
    { src: "/DSC_7311.png", alt: "Golf cart on the green", dataAiHint: "golf cart" },
    { src: "/DSC_7320.png", alt: "Players at the tee box", dataAiHint: "golf tee" },
    { src: "/DSC_7322.png", alt: "Celebrating a good shot", dataAiHint: "people celebrating" },
    { src: "/DSC_7326.png", alt: "Team of golfers", dataAiHint: "golf team" },
    { src: "/DSC_7334.png", alt: "Scenic view of the golf course", dataAiHint: "golf landscape" },
    { src: "/DSC_7383.png", alt: "Dinner at the clubhouse", dataAiHint: "event dinner" },
    { src: "/DSC_7444.png", alt: "Close-up of a golf swing", dataAiHint: "golf swing" },
    { src: "/DSC_7451.png", alt: "Networking at the event", dataAiHint: "business networking" },
    { src: "/DSC_7479.png", alt: "Player looking at the fairway", dataAiHint: "golfer looking" },
    { src: "/DSC_7498.png", alt: "Sponsor banners at the event", dataAiHint: "event banner" },
    { src: "/DSC_7512.png", alt: "Happy participants", dataAiHint: "happy people" },
    { src: "/DSC_7538.png", alt: "Golfers with their clubs", dataAiHint: "golf clubs" },
    { src: "/DSC_7556.png", alt: "Charity event auction", dataAiHint: "charity auction" },
    { src: "/DSC_7574.png", alt: "Audience at the awards", dataAiHint: "event audience" },
    { src: "/DSC_7675.png", alt: "Putting on the green", dataAiHint: "golf putting" },
    { src: "/DSC_7699.png", alt: "Group of attendees posing for a photo", dataAiHint: "group photo" },
    { src: "/DSC_7731.png", alt: "Winner receiving a prize", dataAiHint: "award winner" },
    { src: "/DSC_7735.png", alt: "Shaking hands at the event", dataAiHint: "handshake business" },
    { src: "/DSC_7745.png", alt: "Candid shot of golfers", dataAiHint: "candid photo" },
    { src: "/DSC_7769.png", alt: "Event organizers", dataAiHint: "event staff" },
    { src: "/DSC_7854.png", alt: "View of the course from the clubhouse", dataAiHint: "golf clubhouse" },
    { src: "/DSC_7902.png", alt: "Evening reception", dataAiHint: "evening event" },
    { src: "/DSC_7989.png", alt: "Golfers driving a cart", dataAiHint: "golf cart" },
    { src: "/DSC_8086.png", alt: "Trophy presentation", dataAiHint: "trophy presentation" },
    { src: "/DSC_8125.png", alt: "Team photo on the course", dataAiHint: "golf team" },
    { src: "/DSC_8197.png", alt: "Player hitting out of a sand bunker", dataAiHint: "golf bunker" },
    { src: "/DSC_8216.png", alt: "Cheerful group at the golf day", dataAiHint: "cheerful people" },
    { src: "/DSC_8254.png", alt: "Sunset over the golf course", dataAiHint: "golf sunset" }
];

export default function GalleryPage() {
  return (
    <SectionWrapper id="gallery-page" className="min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Event Gallery
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Highlights from past KFC Add Hope Golf Days. 2025 gallery coming soon!
        </p>
      </div>
      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
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
                    priority={index < 3} 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-xl mx-auto bg-card shadow-lg">
            <CardHeader className="items-center text-center">
                <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <CardTitle className="text-2xl text-foreground">Gallery Coming Soon</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Photos from the event will be uploaded here shortly. Check back soon!
                </CardDescription>
            </CardHeader>
        </Card>
      )}
    </SectionWrapper>
  );
}
