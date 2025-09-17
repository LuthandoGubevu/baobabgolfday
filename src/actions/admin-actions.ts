
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { doc, runTransaction, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { headers } from "next/headers";

const ADMIN_EMAIL = "shayna@baobabbrands.com";

// Helper function to verify admin user
async function verifyAdmin() {
    // This is a basic check. For production, you'd want to verify
    // the user's ID token sent from the client.
    // For now, we assume this is handled by the client-side route protection.
    // A production implementation would require passing an ID token.
    return true;
}

export async function deleteSubmission(submissionId: string) {
    if (!submissionId) {
        return { success: false, message: "Submission ID is required." };
    }

    // Admin access is controlled by client-side route guard.

    try {
        const submissionRef = doc(db, "bookings", submissionId);
        const submissionDoc = await getDoc(submissionRef);

        if (!submissionDoc.exists()) {
            return { success: false, message: "Submission not found." };
        }

        const submissionData = submissionDoc.data();
        const sponsoredHoleNumber = submissionData.sponsoredHoleNumber;

        // If a hole was sponsored, we need to release it.
        if (sponsoredHoleNumber) {
            const holeRef = doc(db, "holes", sponsoredHoleNumber.toString());

            await runTransaction(db, async (transaction) => {
                const holeDoc = await transaction.get(holeRef);
                
                // Only release the hole if it was linked to THIS specific booking.
                // This prevents accidentally releasing a hole that another booking now holds.
                if (holeDoc.exists() && holeDoc.data().bookingId === submissionId) {
                    transaction.update(holeRef, {
                        status: "available",
                        bookingId: null,
                        companyName: null,
                        contactName: null,
                        email: null,
                    });
                }
                
                // Now, delete the booking document itself within the same transaction.
                transaction.delete(submissionRef);
            });

        } else {
            // No sponsored hole, just delete the submission.
            await deleteDoc(submissionRef);
        }
        
        revalidatePath("/admin/submissions");
        return { success: true, message: "Submission deleted successfully." };

    } catch (error: any) {
        console.error("Error deleting submission:", error);
        return { success: false, message: "Failed to delete submission. Please try again." };
    }
}
