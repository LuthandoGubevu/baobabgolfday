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

  const { proofOfPayment, ...formData } = validatedFields.data;

  console.log("Booking Form Data:", formData);
  if (proofOfPayment) {
    console.log("Proof of Payment File Name:", proofOfPayment.name);
    console.log("Proof of Payment File Size:", proofOfPayment.size);
    console.log("Proof of Payment File Type:", proofOfPayment.type);
    // In a real app, you would upload this file to storage (e.g., Firebase Storage, S3)
    // const fileBuffer = Buffer.from(await proofOfPayment.arrayBuffer());
    // await uploadFileToStorage(proofOfPayment.name, fileBuffer);
  }
  
  // Simulate database save or API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { 
    success: true, 
    message: "Booking submitted successfully! We will be in touch shortly." 
  };
}


export async function submitDonationProof(values: DonationFormValues) {
  const validatedFields = donationFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input."
    };
  }
  
  const { proofOfPayment, donorName } = validatedFields.data;

  console.log("Donation Proof Form Data - Donor:", donorName);
  if (proofOfPayment) {
    console.log("Proof of Payment File Name:", proofOfPayment.name);
    console.log("Proof of Payment File Size:", proofOfPayment.size);
    console.log("Proof of Payment File Type:", proofOfPayment.type);
    // similar file upload logic as above
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Donation proof submitted successfully! Thank you for your generosity."
  };
}
