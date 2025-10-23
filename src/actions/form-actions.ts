
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
    if (sponsoredHoleNumber) {
        const holeRef = doc(db, "holes", sponsoredHoleNumber.toString());
        // Define newBookingRef outside the transaction so it's available in the catch block.
        const newBookingRef = doc(collection(db, "bookings")); 

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
                bookingId: newBookingRef.id,
                submittedAt: serverTimestamp()
            };

            transaction.set(newBookingRef, bookingData);
            transaction.update(holeRef, {
                status: 'pending',
                bookingId: newBookingRef.id,
                companyName: formData.companyName,
                contactName: formData.contactName,
                email: formData.email,
            });
        }).catch(serverError => {
            // This is the critical change: emitting a contextual error from within the transaction's catch block.
            const permissionError = new FirestorePermissionError({
                path: `Transaction on bookings/${newBookingRef.id} and holes/${sponsoredHoleNumber}`,
                operation: 'write', 
                requestResourceData: {
                    booking: { ...formData, sponsoredHoleNumber, bookingId: newBookingRef.id },
                    holeUpdate: { status: 'pending', bookingId: newBooking_id }
                }
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
            // Re-throw to be caught by the outer try-catch and show a message to the user.
            throw serverError; 
        });

        return { 
            success: true, 
            message: "Booking submitted successfully! Your hole selection is pending confirmation." 
        };

    } else {
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
        throw serverError;
      });

      return { 
        success: true, 
        message: "Booking submitted successfully! We will be in touch shortly." 
      };
    }

  } catch (error: any) {
    console.error("Error submitting booking:", error);
    // Return a more specific message if it's the one we expect from the transaction.
    const specificMessage = error.message.includes("This hole is no longer available") 
        ? error.message 
        : "An unexpected error occurred while submitting your booking. Please try again.";

    return {
      success: false,
      message: specificMessage
    };
  }
}
