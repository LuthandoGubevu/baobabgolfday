
"use server";

import { bookingFormSchema, BookingFormValues } from '@/lib/schemas';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, runTransaction } from 'firebase/firestore';

export async function submitBooking(values: BookingFormValues) {
  const validatedFields = bookingFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { 
      success: false, 
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input." 
    };
  }

  const { sponsoredHoleNumber, ...formData } = validatedFields.data;

  try {
    // If a hole was selected, run a transaction to reserve it
    if (sponsoredHoleNumber) {
        const holeRef = doc(db, "holes", sponsoredHoleNumber.toString());
        const newBookingRef = doc(collection(db, "bookings")); // Create a reference for the new booking

        try {
            await runTransaction(db, async (transaction) => {
                const holeDoc = await transaction.get(holeRef);

                if (!holeDoc.exists() || holeDoc.data().status !== 'available') {
                    throw new Error("This hole is no longer available. Please select another one.");
                }

                // Hole is available. Create the booking document FIRST.
                transaction.set(newBookingRef, {
                    ...formData,
                    sponsoredHoleNumber,
                    submittedAt: serverTimestamp()
                });

                // THEN, update the hole document to mark it as pending.
                transaction.update(holeRef, {
                    status: 'pending',
                    bookingId: newBookingRef.id,
                    companyName: formData.companyName,
                    contactName: formData.contactName,
                    email: formData.email,
                });
            });

            console.log("Booking submitted with ID: ", newBookingRef.id, formData);
            return { 
                success: true, 
                message: "Booking submitted successfully! Your hole selection is pending confirmation." 
            };

        } catch (error: any) {
            console.error("Hole booking transaction failed: ", error);
            if (error.message.includes("no longer available")) {
                 return {
                    success: false,
                    message: "The hole you selected was just taken. Please refresh and choose another hole."
                 }
            }
            return {
                success: false,
                message: "There was an error reserving your hole. Please try again."
            };
        }

    } else {
      // No hole sponsorship, just add the booking directly
      const docRef = await addDoc(collection(db, "bookings"), {
        ...formData,
        submittedAt: serverTimestamp()
      });
      console.log("Booking submitted with ID: ", docRef.id, formData);
      return { 
        success: true, 
        message: "Booking submitted successfully! We will be in touch shortly." 
      };
    }

  } catch (error) {
    console.error("Error submitting booking:", error);
    return {
      success: false,
      message: "An unexpected error occurred while submitting your booking. Please try again."
    };
  }
}
