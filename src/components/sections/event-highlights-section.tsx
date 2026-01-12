
"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { Download } from "lucide-react";

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
    { type: 'image', src: "/DSC_8254.jpg", alt: "Sunset over the golf course", dataAiHint: "golf sunset" },
    { type: 'image', src: '/Image-1.jpg', alt: 'Golf event photo 1', dataAiHint: 'golf event' },
    { type: 'image', src: '/Image-2.jpg', alt: 'Golf event photo 2', dataAiHint: 'golf course' },
    { type: 'image', src: '/Image-3.jpg', alt: 'Golf event photo 3', dataAiHint: 'group photo' },
    { type: 'image', src: '/Image-4.jpg', alt: 'Golf event photo 4', dataAiHint: 'golf swing' },
    { type: 'image', src: '/Image-5.jpg', alt: 'Golf event photo 5', dataAiHint: 'people smiling' },
    { type: 'image', src: '/Image-6.jpg', alt: 'Golf event photo 6', dataAiHint: 'people talking' },
    { type: 'image', src: '/Image-7.jpg', alt: 'Golf event photo 7', dataAiHint: 'award ceremony' },
    { type: 'image', src: '/Image-8.jpg', alt: 'Golf event photo 8', dataAiHint: 'golf cart' },
    { type: 'image', src: '/Image-9.jpg', alt: 'Golf event photo 9', dataAiHint: 'golf tee' },
    { type: 'image', src: '/Image-10.jpg', alt: 'Golf event photo 10', dataAiHint: 'people celebrating' },
    { type: 'image', src: '/Image-11.jpg', alt: 'Golf event photo 11', dataAiHint: 'golf team' },
    { type: 'image', src: '/Image-12.jpg', alt: 'Golf event photo 12', dataAiHint: 'golf landscape' },
    { type: 'image', src: '/Image-13.jpg', alt: 'Golf event photo 13', dataAiHint: 'event dinner' },
    { type: 'image', src: '/Image-14.jpg', alt: 'Golf event photo 14', dataAiHint: 'golf swing' },
    { type: 'image', src: '/Image-15.jpg', alt: 'Golf event photo 15', dataAiHint: 'business networking' },
    { type: 'image', src: '/Image-16.jpg', alt: 'Golf event photo 16', dataAiHint: 'golfer looking' },
    { type: 'image', src: '/Image-17.jpg', alt: 'Golf event photo 17', dataAiHint: 'event banner' },
    { type: 'image', src: '/Image-18.jpg', alt: 'Golf event photo 18', dataAiHint: 'happy people' },
    { type: 'image', src: '/Image-19.jpg', alt: 'Golf event photo 19', dataAiHint: 'golf clubs' },
    { type: 'image', src: '/Image-20.jpg', alt: 'Golf event photo 20', dataAiHint: 'charity auction' },
    { type: 'image', src: '/Image-21.jpg', alt: 'Golf event photo 21', dataAiHint: 'event audience' },
    { type: 'image', src: '/Image-22.jpg', alt: 'Golf event photo 22', dataAiHint: 'golf putting' },
    { type: 'image', src: '/Image-23.jpg', alt: 'Golf event photo 23', dataAiHint: 'group photo' },
    { type: 'image', src: '/Image-24.jpg', alt: 'Golf event photo 24', dataAiHint: 'award winner' },
    { type: 'image', src: '/Image-25.jpg', alt: 'Golf event photo 25', dataAiHint: 'handshake business' },
    { type: 'image', src: '/Image-26.jpg', alt: 'Golf event photo 26', dataAiHint: 'candid photo' },
    { type: 'image', src: '/Image-27.jpg', alt: 'Golf event photo 27', dataAiHint: 'event staff' },
    { type: 'image', src: '/Image-28.jpg', alt: 'Golf event photo 28', dataAiHint: 'golf clubhouse' },
    { type: 'image', src: '/Image-29.jpg', alt: 'Golf event photo 29', dataAiHint: 'evening event' },
    { type: 'image', src: '/Image-30.jpg', alt: 'Golf event photo 30', dataAiHint: 'golf cart' }
];

export function EventHighlightsSection() {
  return (
    <SectionWrapper id="highlights" alternateBackground={false}>
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">
          A Day of Golf, Giving and Good Times
        </h2>
        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
                On December 5th, the greens of Olivewood came alive with energy, laughter and a shared purpose. The KFC Add Hope Annual Golf Day 2025 brought together businesses, colleagues and friends for a day that was as fun as it was meaningful. From competitive swings to cheerful carts, prize moments to high fives at the hole, every smile told a story.
            </p>
            <p>
                Thanks to your participation, we raised R150,000 to support Masizakhe Children’s Home and Greensleeves Place of Safety. Whether you were teeing off, handing out prizes, or just soaking in the good vibes, you were part of something special.
            </p>
            <p>
                Take a look back at the day that brought our community together, all in the name of hope.
            </p>
        </div>
      </div>
      <TooltipProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightItems.map((item, index) => (
            <Card key={item.src} className="group overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="object-cover w-full h-full"
                      data-ai-hint={item.dataAiHint}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="group-hover:scale-105 transition-transform duration-300 object-cover"
                        data-ai-hint={item.dataAiHint}
                        priority={index < 6}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                            <a href={item.src} download className="absolute bottom-2 right-2 z-10 p-2 rounded-full bg-black/50 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary">
                                <Download className="h-5 w-5" />
                                <span className="sr-only">Download image</span>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Download</p>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TooltipProvider>
    </SectionWrapper>
  );
}
