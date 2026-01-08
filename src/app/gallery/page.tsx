
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { PackageOpen } from "lucide-react";

const galleryImages: { src: string, alt: string, dataAiHint: string }[] = [];

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
