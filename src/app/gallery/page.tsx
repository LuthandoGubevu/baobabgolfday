
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const galleryImages = [
  { src: "/image-1.jpg", alt: "Gallery image 1 - Highlights from the golf event", dataAiHint: "golf event charity" },
  { src: "/image-2.jpg", alt: "Gallery image 2 - Participants enjoying the golf day", dataAiHint: "charity golf players" },
  { src: "/image-3.jpg", alt: "Gallery image 3 - Scenery from the golf course", dataAiHint: "golf course landscape" },
  { src: "/image-4.jpg", alt: "Gallery image 4 - Action shot from the tournament", dataAiHint: "golf swing action" },
  { src: "/image-5.jpg", alt: "Gallery image 5 - Group photo of attendees", dataAiHint: "event attendees group" },
  { src: "/image-6.jpg", alt: "Gallery image 6 - Award ceremony or closing moments", dataAiHint: "charity event awards" },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="hover:scale-105 transition-transform duration-300 object-cover"
                  data-ai-hint={image.dataAiHint}
                  priority={index < 3} // Prioritize loading for the first few images
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
