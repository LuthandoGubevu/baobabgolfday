
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { contactFormSchema, ContactFormValues } from "@/lib/schemas";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors";

export async function submitMessage(values: ContactFormValues) {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input."
    };
  }

  const data = {
    ...validatedFields.data,
    submittedAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, "messages"), data)
      .catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: 'messages',
            operation: 'create',
            requestResourceData: data,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
      });

    return {
      success: true,
      message: "Your message has been sent successfully. We will get back to you shortly."
    };

  } catch (error) {
    console.error("Error submitting message:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
}

export async function deleteMessage(messageId: string) {
  if (!messageId) {
    return { success: false, message: "Message ID is required." };
  }

  try {
    const messageRef = doc(db, "messages", messageId);
    await deleteDoc(messageRef).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: messageRef.path,
            operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    });
    
    revalidatePath("/admin/messages");
    return { success: true, message: "Message deleted successfully." };

  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, message: "Failed to delete message." };
  }
}
