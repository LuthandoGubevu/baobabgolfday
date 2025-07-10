
import { z } from 'zod';

// fileSchema is no longer needed as uploads are removed.

export const bookingFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  postalAddress: z.string().min(1, "Postal address is required"),
  callingCardName: z.string().min(1, "Calling card name is required"),
  player1: z.string().min(1, "Player 1 name is required"),
  player2: z.string().min(1, "Player 2 name is required"),
  player3: z.string().min(1, "Player 3 name is required"),
  player4: z.string().min(1, "Player 4 name is required"),
  sponsorHole1000: z.boolean().optional(),
  sponsorHole1800: z.boolean().optional(),
  sponsorAuctionPrize: z.boolean().optional(),
  donateWithoutAttending: z.boolean().optional(),
  golfCartInterest: z.boolean().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
  sponsoredHoleNumber: z.number().optional()
    .refine(num => num === undefined || (num >= 1 && num <= 18), {
        message: "Please select a valid hole number between 1 and 18."
    }),
  paymentReference: z.string().optional(),
}).refine(data => {
  // If a hole sponsorship is selected, a hole number must also be selected.
  if ((data.sponsorHole1000 || data.sponsorHole1800) && !data.sponsoredHoleNumber) {
    return false;
  }
  return true;
}, {
  message: "Please select an available hole for your sponsorship.",
  path: ["sponsoredHoleNumber"], // Correctly associate error with the hole number field
});


export type BookingFormValues = z.infer<typeof bookingFormSchema>;

// donationFormSchema and DonationFormValues removed as the form is no longer used.
/*
export const donationFormSchema = z.object({
  donorName: z.string().min(1, "Your name or company name is required for reference."),
  // proofOfPayment: fileSchema.refine(file => file !== undefined && file !== null, "Proof of payment is required."), // Removed
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;
*/
