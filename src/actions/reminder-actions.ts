
"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { reminderFormSchema, ReminderFormValues } from "@/lib/schemas";

export async function submitEmailForReminder(values: ReminderFormValues) {
  const validatedFields = reminderFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please enter a valid email.",
    };
  }

  try {
    // Check for duplicates before adding? For now, we'll keep it simple.
    await addDoc(collection(db, "reminders"), {
      ...validatedFields.data,
      submittedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Thank you! We'll send you a reminder when registrations open.",
    };

  } catch (error) {
    console.error("Error submitting email for reminder:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function deleteReminder(reminderId: string) {
  if (!reminderId) {
    return { success: false, message: "Reminder ID is required." };
  }

  // Admin access is controlled by the layout, so we proceed.
  try {
    const reminderRef = doc(db, "reminders", reminderId);
    await deleteDoc(reminderRef);
    
    revalidatePath("/admin/reminders");
    return { success: true, message: "Reminder email deleted successfully." };

  } catch (error) {
    console.error("Error deleting reminder:", error);
    return { success: false, message: "Failed to delete reminder." };
  }
}
