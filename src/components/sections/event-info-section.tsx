
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CalendarDays, Clock, Users, Gift, Coffee, ShoppingBag } from "lucide-react";

const eventDetails = [
  { icon: MapPin, label: "Location", value: "Olivewood Golf Club" },
  { icon: CalendarDays, label: "Date", value: "Friday, 5 December 2025" },
  { icon: Clock, label: "Time", value: "TBA" },
  { icon: Users, label: "Format", value: "4 Ball Alliance" },
  { icon: Gift, label: "Prizes", value: "Longest Drive, Closest to Pin, Best Team" },
  { icon: ShoppingBag, label: "Includes", value: "Gift Bags" },
  { icon: Coffee, label: "Refreshments", value: "Light Refreshments Included" },
];

export function EventInfoSection() {
  return (
    <SectionWrapper id="event-info">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground">
          Event <span className="text-primary">Information</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about the big day.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventDetails.map((item, index) => (
          <Card key={index} className="bg-card shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <item.icon className="h-8 w-8 text-primary" />
              <CardTitle className="text-xl font-semibold text-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-base">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
