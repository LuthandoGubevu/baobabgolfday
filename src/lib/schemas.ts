import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

const fileSchema = z.custom<File>((val) => val instanceof File, "Please upload a file")
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .pdf files are accepted."
  ).optional();

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
  proofOfPayment: fileSchema,
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const donationFormSchema = z.object({
  donorName: z.string().min(1, "Your name or company name is required for reference."),
  proofOfPayment: fileSchema.refine(file => file !== undefined && file !== null, "Proof of payment is required."),
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;
