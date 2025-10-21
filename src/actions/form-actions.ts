
"use server";

import { bookingFormSchema, BookingFormValues } from '@/lib/schemas';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, runTransaction } from 'firebase/firestore';
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors";

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

                if (!holeDoc.exists()) {
                    throw new Error(`Hole ${sponsoredHoleNumber} does not exist in the database.`);
                }
                
                if (holeDoc.data().status !== 'available') {
                    throw new Error("This hole is no longer available. Please select another one.");
                }

                const bookingData = {
                    ...formData,
                    sponsoredHoleNumber,
                    submittedAt: serverTimestamp()
                };

                // Create the booking document FIRST.
                transaction.set(newBookingRef, bookingData);

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
            console.error("Hole booking transaction failed:", error);
            
            // Check if it's a permission error, then emit a contextual error.
            if (error.code === 'permission-denied') {
                const permissionError = new FirestorePermissionError({
                    path: `Transaction on bookings and holes/${sponsoredHoleNumber}`,
                    operation: 'write', // Transactions involve writes
                    requestResourceData: {
                        booking: { ...formData, sponsoredHoleNumber },
                        holeUpdate: { status: 'pending', bookingId: newBookingRef.id }
                    }
                } satisfies SecurityRuleContext);
                errorEmitter.emit('permission-error', permissionError);
            }

            // Return the specific error message from the transaction
            return {
                success: false,
                message: error.message || "There was an error reserving your hole. Please try again."
            };
        }

    } else {
      // No hole sponsorship, just add the booking directly
      const docRef = await addDoc(collection(db, "bookings"), {
        ...formData,
        submittedAt: serverTimestamp()
      }).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: 'bookings',
            operation: 'create',
            requestResourceData: formData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        // Re-throw the error to be caught by the outer try-catch and show a message to the user.
        throw serverError;
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
