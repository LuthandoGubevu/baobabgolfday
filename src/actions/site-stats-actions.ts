
"use server";

import { db } from "@/lib/firebase";
import { doc, runTransaction, serverTimestamp, increment } from "firebase/firestore";

export async function incrementVisitCount() {
    const statsRef = doc(db, "site_stats", "visits");

    try {
        await runTransaction(db, async (transaction) => {
            const statsDoc = await transaction.get(statsRef);
            if (!statsDoc.exists()) {
                // If the document doesn't exist, create it with a count of 1.
                transaction.set(statsRef, { 
                    count: 1,
                    lastUpdated: serverTimestamp()
                });
            } else {
                // Otherwise, increment the existing count.
                transaction.update(statsRef, { 
                    count: increment(1),
                    lastUpdated: serverTimestamp()
                });
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Error incrementing visit count:", error);
        // We don't return an error to the client to avoid console noise for end-users.
        // This is a background task.
        return { success: false };
    }
}
