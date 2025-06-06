
"use server";

import { bookingFormSchema, BookingFormValues, donationFormSchema, DonationFormValues } from '@/lib/schemas';
import { db } from '@/lib/firebase'; // Import db
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function submitBooking(values: BookingFormValues) {
  const validatedFields = bookingFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { 
      success: false, 
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input." 
    };
  }

  const formData = validatedFields.data;

  try {
    // Add a timestamp to the data
    const bookingDataWithTimestamp = {
      ...formData,
      submittedAt: serverTimestamp() 
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, "bookings"), bookingDataWithTimestamp);
    console.log("Booking submitted with ID: ", docRef.id, formData);
    
    return { 
      success: true, 
      message: "Booking submitted successfully! We will be in touch shortly." 
    };

  } catch (error) {
    console.error("Error submitting booking to Firestore:", error);
    return {
      success: false,
      message: "There was an error submitting your booking. Please try again."
    };
  }
}


export async function submitDonationReference(values: DonationFormValues) { 
  const validatedFields = donationFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input."
    };
  }
  
  const { donorName } = validatedFields.data;

  // In a real app, you might want to save this reference to Firestore as well.
  // For now, it just logs as per existing behavior.
  // Example:
  // try {
  //   await addDoc(collection(db, "donationReferences"), { 
  //     donorName, 
  //     submittedAt: serverTimestamp() 
  //   });
  //   console.log("Donation reference submitted for:", donorName);
  // } catch (error) {
  //   console.error("Error submitting donation reference:", error);
  //   return { success: false, message: "Error saving donation reference."};
  // }

  console.log("Donation Reference - Donor:", donorName);
  
  // Simulate processing for now
  await new Promise(resolve => setTimeout(resolve, 1000));


  return {
    success: true,
    message: "Donation reference submitted successfully! Thank you for your generosity."
  };
}
