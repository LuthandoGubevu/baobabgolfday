
"use server";

import { bookingFormSchema, BookingFormValues, donationFormSchema, DonationFormValues } from '@/lib/schemas';

export async function submitBooking(values: BookingFormValues) {
  const validatedFields = bookingFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { 
      success: false, 
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input." 
    };
  }

  // proofOfPayment is removed from schema, so it won't be in validatedFields.data
  const formData = validatedFields.data;

  console.log("Booking Form Data:", formData);
  // File upload logic for proofOfPayment is removed.
  
  // Simulate database save or API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { 
    success: true, 
    message: "Booking submitted successfully! We will be in touch shortly." 
  };
}


export async function submitDonationReference(values: DonationFormValues) { // Renamed function
  const validatedFields = donationFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input."
    };
  }
  
  // proofOfPayment is removed from schema
  const { donorName } = validatedFields.data;

  console.log("Donation Reference - Donor:", donorName);
  // File upload logic for proofOfPayment is removed.
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Donation reference submitted successfully! Thank you for your generosity." // Updated message
  };
}
