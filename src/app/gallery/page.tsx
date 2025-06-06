import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function GalleryPage() {
  const placeholderImages = Array(6).fill(null);

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
        {placeholderImages.map((_, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <Image 
                  src={`https://placehold.co/600x400?text=Golf+Event+${index + 1}`} 
                  alt={`Placeholder image ${index + 1} for gallery`}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                  data-ai-hint="golf tournament charity"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
