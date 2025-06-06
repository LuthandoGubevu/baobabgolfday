"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { bookingFormSchema, BookingFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { submitBooking } from "@/actions/form-actions";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export function BookingForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phoneNumber: "",
      postalAddress: "",
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
      proofOfPayment: undefined,
    },
  });

  const onSubmit = (values: BookingFormValues) => {
    setFileError(null);
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
        // Handle field specific errors if any from server
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            const fieldName = field as keyof BookingFormValues;
            if (Array.isArray(messages)) {
                form.setError(fieldName, { type: "server", message: messages.join(', ') });
            }
          });
          if (result.errors.proofOfPayment) {
            setFileError(result.errors.proofOfPayment.join(', '));
          }
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
              <Label htmlFor="postalAddress">Postal Address</Label>
              <Input id="postalAddress" {...form.register("postalAddress")} />
              {form.formState.errors.postalAddress && <p className="text-sm text-destructive mt-1">{form.formState.errors.postalAddress.message}</p>}
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
                    name={item.id as keyof BookingFormValues}
                    control={form.control}
                    render={({ field }) => (
                       <Checkbox id={item.id} checked={field.value as boolean | undefined} onCheckedChange={field.onChange} />
                    )}
                  />
                  <Label htmlFor={item.id} className="font-normal text-muted-foreground">{item.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Proof of Payment */}
          <div className="space-y-2">
            <Label htmlFor="proofOfPayment" className="text-xl font-semibold text-foreground">Upload Proof of Payment (Optional)</Label>
            <p className="text-sm text-muted-foreground">If you've already made a payment, please upload the proof (PDF, JPG, PNG - Max 5MB).</p>
            <Controller
                name="proofOfPayment"
                control={form.control}
                render={({ field: { onChange, value, ...restField } }) => (
                    <Input
                        id="proofOfPayment"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                        className="file:text-primary-foreground file:bg-primary hover:file:bg-primary/90"
                        {...restField}
                    />
                )}
            />
            {form.formState.errors.proofOfPayment && <p className="text-sm text-destructive mt-1">{form.formState.errors.proofOfPayment.message}</p>}
            {fileError && <p className="text-sm text-destructive mt-1">{fileError}</p>}
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
