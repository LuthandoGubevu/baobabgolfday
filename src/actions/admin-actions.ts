
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

    // In a real app, you would verify admin privileges here using a passed ID token.
    // For now, we trust the client-side route guard.

    try {
        const submissionRef = doc(db, "bookings", submissionId);
        
        // Before deleting, check if this booking had a sponsored hole
        const submissionDoc = await getDoc(submissionRef);
        if (submissionDoc.exists()) {
            const data = submissionDoc.data();
            // If the submission had a sponsored hole, release it
            if (data.sponsoredHoleNumber && (data.status === 'pending' || data.status === 'confirmed')) {
                const holeRef = doc(db, "holes", data.sponsoredHoleNumber.toString());
                await updateDoc(holeRef, {
                    status: "available",
                    bookingId: null,
                    companyName: null,
                    contactName: null,
                    email: null,
                });
            }
        }
        
        await deleteDoc(submissionRef);
        
        revalidatePath("/admin/submissions"); // Re-renders the page to show updated list
        return { success: true, message: "Submission deleted successfully." };

    } catch (error: any) {
        console.error("Error deleting submission:", error);
        return { success: false, message: "Failed to delete submission. Please try again." };
    }
}
