
"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { bookingFormSchema, BookingFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { submitBooking } from "@/actions/form-actions";
import { useState, useTransition, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import Image from "next/image";

interface Hole {
    id: string;
    status: 'available' | 'pending' | 'confirmed';
}

export function BookingForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [holes, setHoles] = useState<Hole[]>([]);
  const [holeError, setHoleError] = useState<string | null>(null);
  const [holesLoading, setHolesLoading] = useState(true);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phoneNumber: "",
      businessVatNumber: "",
      callingCardName: "",
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      sponsorHole1000: false,
      sponsorHole1800: false,
      sponsorAuctionPrize: false,
      donateWithoutAttending: false,
      golfCartInterest: false,
      termsAccepted: false,
      sponsoredHoleNumber: undefined,
      paymentReference: "",
    },
  });

  const watchSponsorHole1000 = form.watch("sponsorHole1000");
  const watchSponsorHole1800 = form.watch("sponsorHole1800");
  const showHoleSelector = watchSponsorHole1000 || watchSponsorHole1800;

  useEffect(() => {
    setHolesLoading(true);
    setHoleError(null);
    const q = query(collection(db, "holes"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedHoles: Hole[] = [];
        querySnapshot.forEach((doc) => {
            fetchedHoles.push({ id: doc.id, ...doc.data() } as Hole);
        });
        
        const filteredAndSortedHoles = fetchedHoles
            .filter(hole => parseInt(hole.id) <= 18) // Filter out holes greater than 18
            .sort((a, b) => parseInt(a.id) - parseInt(b.id));
            
        setHoles(filteredAndSortedHoles);
        setHolesLoading(false);

    }, (error) => {
        console.error("Firestore onSnapshot error:", error);
        setHoleError("Could not load hole availability in real-time. Please check permissions or contact the event organizer.");
        setHoles([]);
        setHolesLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  // When sponsorship is unchecked, reset hole selection
  useEffect(() => {
      if (!showHoleSelector) {
          form.setValue("sponsoredHoleNumber", undefined);
          form.clearErrors("sponsoredHoleNumber");
      }
  }, [showHoleSelector, form]);

  const onSubmit = (values: BookingFormValues) => {
    startTransition(async () => {
      const result = await submitBooking(values);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "An error occurred.",
          variant: "destructive",
        });
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            const fieldName = field as keyof BookingFormValues;
            if (Array.isArray(messages)) {
                form.setError(fieldName, { type: "server", message: messages.join(', ') });
            }
          });
        }
      }
    });
  };

  return (
    <Card className="w-full bg-card shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Team Registration & Sponsorship</CardTitle>
        <CardDescription className="text-muted-foreground">
          Book your 4-ball team and explore sponsorship opportunities.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" {...form.register("companyName")} />
                {form.formState.errors.companyName && <p className="text-sm text-destructive mt-1">{form.formState.errors.companyName.message}</p>}
              </div>
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input id="contactName" {...form.register("contactName")} />
                {form.formState.errors.contactName && <p className="text-sm text-destructive mt-1">{form.formState.errors.contactName.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="tel" {...form.register("phoneNumber")} />
                {form.formState.errors.phoneNumber && <p className="text-sm text-destructive mt-1">{form.formState.errors.phoneNumber.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="businessVatNumber">Business VAT number (Optional)</Label>
              <Input id="businessVatNumber" {...form.register("businessVatNumber")} />
              {form.formState.errors.businessVatNumber && <p className="text-sm text-destructive mt-1">{form.formState.errors.businessVatNumber.message}</p>}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Team Registration */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Team Registration</h3>
            <div>
              <Label htmlFor="callingCardName">Calling Card Name (Team Name)</Label>
              <Input id="callingCardName" {...form.register("callingCardName")} />
              {form.formState.errors.callingCardName && <p className="text-sm text-destructive mt-1">{form.formState.errors.callingCardName.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num}>
                  <Label htmlFor={`player${num}`}>Player {num} Full Name</Label>
                  <Input id={`player${num}`} {...form.register(`player${num}` as `player${1 | 2 | 3 | 4}`)} />
                  {form.formState.errors[`player${num}` as `player${1 | 2 | 3 | 4}`] && <p className="text-sm text-destructive mt-1">{form.formState.errors[`player${num}` as `player${1 | 2 | 3 | 4}`]?.message}</p>}
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="bg-border" />

          {/* Sponsorship Options */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Sponsorship Options</h3>
            <div className="space-y-3">
              {[
                { id: "sponsorHole1000", label: "Hole Sponsor (R1,000)" },
                { id: "sponsorHole1800", label: "Hole Sponsor (R1,800 - includes premium placement)" },
                { id: "sponsorAuctionPrize", label: "Auction/Prize Sponsorship (we'll contact you for details)" },
                { id: "donateWithoutAttending", label: "Donate without attending (amount to be specified separately)" },
                { id: "golfCartInterest", label: "Golf Cart Hire (Express interest - arrange with club separately)" },
              ].map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Controller
                    name={item.id as keyof BookingFormValues} // Cast is safe as these keys exist in BookingFormValues
                    control={form.control}
                    render={({ field }) => (
                       <Checkbox id={item.id} checked={field.value as boolean | undefined} onCheckedChange={field.onChange} />
                    )}
                  />
                  <Label htmlFor={item.id} className="font-normal text-muted-foreground">{item.label}</Label>
                </div>
              ))}
            </div>
             {showHoleSelector && (
              <div className="pt-4 space-y-4">
                <h4 className="font-semibold text-foreground">Select Your Sponsored Hole</h4>
                 {holeError && (
                    <div className="p-3 my-2 text-sm rounded-md bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <p>{holeError}</p>
                    </div>
                )}
                {holesLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p>Loading available holes...</p>
                    </div>
                )}
                {!holesLoading && !holeError && holes.length === 0 && (
                     <div className="p-3 my-2 text-sm rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <p>No holes are currently available for sponsorship. Please check back later.</p>
                    </div>
                )}
                {holes.length > 0 && 
                  <Controller
                    name="sponsoredHoleNumber"
                    control={form.control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        className="grid grid-cols-6 sm:grid-cols-9 gap-2"
                      >
                        {holes.map((hole) => {
                          const isDisabled = hole.status !== 'available';
                          return (
                            <div key={hole.id} className="flex items-center justify-center">
                              <RadioGroupItem value={hole.id} id={`hole-${hole.id}`} className="sr-only" disabled={isDisabled} />
                              <Label
                                htmlFor={`hole-${hole.id}`}
                                className={cn(
                                  "flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all",
                                  field.value === parseInt(hole.id)
                                    ? "bg-primary text-primary-foreground border-primary ring-2 ring-offset-2 ring-offset-background ring-primary"
                                    : "bg-background text-foreground border-border",
                                  isDisabled
                                    ? "bg-muted text-muted-foreground border-dashed cursor-not-allowed line-through"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                )}
                              >
                                {hole.id}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    )}
                  />
                }
                {form.formState.errors.sponsoredHoleNumber && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {form.formState.errors.sponsoredHoleNumber.message}
                    </p>
                )}
                <div className="mt-6 aspect-[4/3] relative rounded-lg overflow-hidden border border-border shadow-md">
                    <Image 
                        src="/Course.jpg" 
                        alt="Golf course layout" 
                        fill
                        className="object-contain"
                        data-ai-hint="golf course map"
                    />
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Please note: Holes are first come, first served. Your selection will be confirmed once payment has been received and verified.
                </p>
              </div>
            )}
          </div>

          <Separator className="bg-border" />

          {/* Payment Reference */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Payment Information</h3>
            <div>
                <Label htmlFor="paymentReference">Payment Reference Number (Optional)</Label>
                <Input id="paymentReference" {...form.register("paymentReference")} placeholder="e.g., EFT-12345" />
                <p className="text-xs text-muted-foreground mt-1">If you have already made a payment, please provide the reference number.</p>
                {form.formState.errors.paymentReference && <p className="text-sm text-destructive mt-1">{form.formState.errors.paymentReference.message}</p>}
            </div>
          </div>
          
          <Separator className="bg-border" />

          {/* Terms and Conditions */}
          <div>
            <div className="flex items-center space-x-2">
               <Controller
                name="termsAccepted"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    id="termsAccepted"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={form.formState.errors.termsAccepted ? "true" : "false"}
                  />
                )}
              />
              <Label htmlFor="termsAccepted" className="font-normal text-muted-foreground">
                I have read and agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline" target="_blank">
                  Terms and Conditions
                </Link>
                .
              </Label>
            </div>
            {form.formState.errors.termsAccepted && (
              <p className="text-sm text-destructive mt-1 ml-6">{form.formState.errors.termsAccepted.message}</p>
            )}
          </div>

        </CardContent>
        <CardFooter>
          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Submit Booking
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
