
import { SectionWrapper } from "@/components/section-wrapper";

export function EventIntroSection() {
  return (
    <SectionWrapper id="intro" alternateBackground={false}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
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
    </SectionWrapper>
  );
}
