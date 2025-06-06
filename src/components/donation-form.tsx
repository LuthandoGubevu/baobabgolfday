
// This file is no longer needed as the DonationReferenceForm has been removed
// from the DonationSection. You can safely delete this file.
// Content is removed to prevent build errors if it's still imported elsewhere,
// though it shouldn't be.

/*
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // Controller removed as it's not used
import { donationFormSchema, DonationFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitDonationReference } from "@/actions/form-actions"; // Renamed action
import { useTransition } from "react"; // useState removed
import { Loader2 } from "lucide-react";

export function DonationReferenceForm() { // Renamed component
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  // fileError state is removed

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donorName: "",
      // proofOfPayment: undefined, // Removed
    },
  });

  const onSubmit = (values: DonationFormValues) => {
    // setFileError(null); // Removed
    startTransition(async () => {
      const result = await submitDonationReference(values); // Call renamed action
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
          if (result.errors.donorName) {
            form.setError('donorName', { type: 'server', message: result.errors.donorName.join(', ') });
          }
          // Removed proofOfPayment error handling
        }
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6 p-6 border border-border rounded-lg bg-card">
      <div>
        <Label htmlFor="donorName">Your Name / Company Name (for reference)</Label>
        <Input id="donorName" {...form.register("donorName")} className="mt-1" />
        {form.formState.errors.donorName && <p className="text-sm text-destructive mt-1">{form.formState.errors.donorName.message}</p>}
      </div>
      
      
      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Submit Reference 
      </Button>
    </form>
  );
}
*/

export {}; // Add an empty export to make it a module if all content is removed.
