
import { z } from 'zod';

// fileSchema is no longer needed as uploads are removed.

export const bookingFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  businessVatNumber: z.string().min(1, "Business VAT number is required"),
  registerTeam: z.boolean().optional(),
  callingCardName: z.string().optional(),
  player1: z.string().optional(),
  player2: z.string().optional(),
  player3: z.string().optional(),
  player4: z.string().optional(),
  sponsorHole1500: z.boolean().optional(),
  sponsorHole2000: z.boolean().optional(),
  sponsorAuctionPrize: z.boolean().optional(),
  auctionPrizeDescription: z.string().optional(),
  donateWithoutAttending: z.boolean().optional(),
  donationAmount: z.string().optional(), // New field for donation amount
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
  sponsoredHoleNumber: z.number().optional()
    .refine(num => num === undefined || (num >= 1 && num <= 18), {
        message: "Please select a valid hole number between 1 and 18."
    }),
}).refine(data => {
  // If a hole sponsorship is selected, a hole number must also be selected.
  if ((data.sponsorHole1500 || data.sponsorHole2000) && !data.sponsoredHoleNumber) {
    return false;
  }
  return true;
}, {
  message: "Please select an available hole for your sponsorship.",
  path: ["sponsoredHoleNumber"], 
}).refine(data => {
    // If auction prize is sponsored, a description must be provided.
    if (data.sponsorAuctionPrize && (!data.auctionPrizeDescription || data.auctionPrizeDescription.trim().length === 0)) {
        return false;
    }
    return true;
}, {
    message: "Please describe the prize you will be sponsoring.",
    path: ["auctionPrizeDescription"],
}).refine(data => {
    // If donating without attending, an amount must be specified.
    if (data.donateWithoutAttending && (!data.donationAmount || data.donationAmount.trim().length === 0)) {
        return false;
    }
    return true;
}, {
    message: "Please specify the amount you wish to donate.",
    path: ["donationAmount"],
});


export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Your name is required."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const reminderFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export type ReminderFormValues = z.infer<typeof reminderFormSchema>;
