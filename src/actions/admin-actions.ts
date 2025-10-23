
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { doc, runTransaction, getDoc, deleteDoc } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors";


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

    const submissionRef = doc(db, "bookings", submissionId);
    
    // We wrap the logic but don't expect a user-facing message, 
    // as the error emitter will handle dev feedback.
    try {
        const submissionDoc = await getDoc(submissionRef);

        if (!submissionDoc.exists()) {
            return { success: false, message: "Submission not found." };
        }

        const submissionData = submissionDoc.data();
        const sponsoredHoleNumber = submissionData.sponsoredHoleNumber;

        if (sponsoredHoleNumber) {
            const holeRef = doc(db, "holes", sponsoredHoleNumber.toString());
            
            await runTransaction(db, async (transaction) => {
                const holeDoc = await transaction.get(holeRef);
                
                if (holeDoc.exists() && holeDoc.data().bookingId === submissionId) {
                    transaction.update(holeRef, {
                        status: "available",
                        bookingId: null,
                        companyName: null,
                        contactName: null,
                        email: null,
                    });
                }
                
                transaction.delete(submissionRef);
            }).catch(async (serverError) => {
                 const permissionError = new FirestorePermissionError({
                    path: submissionRef.path,
                    operation: 'delete',
                } satisfies SecurityRuleContext);
                errorEmitter.emit('permission-error', permissionError);
                throw serverError; // Re-throw to be caught by outer try-catch
            });

        } else {
            // No sponsored hole, just delete the submission document.
            await deleteDoc(submissionRef).catch(async (serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: submissionRef.path,
                    operation: 'delete',
                } satisfies SecurityRuleContext);
                errorEmitter.emit('permission-error', permissionError);
                throw serverError; // Re-throw to be caught by outer try-catch
            });
        }
        
        revalidatePath("/admin/submissions");
        return { success: true, message: "Submission deleted successfully." };

    } catch (error: any) {
        // The error is now caught here after being emitted, preventing app crash
        // but still providing dev feedback via the emitter.
        console.error("Error processing submission deletion:", error);
        return { success: false, message: "Failed to delete submission due to a permissions error. Check the console for details." };
    }
}
