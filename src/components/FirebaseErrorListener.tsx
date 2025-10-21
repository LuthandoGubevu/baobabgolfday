
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

// This is a simplified development-only listener.
// In a production app, you might log these errors to a monitoring service.
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error("Caught Firestore Permission Error:", error);

      // In a real dev environment, we would throw this to show Next.js error overlay.
      // For this environment, we'll use a toast to make it visible.
      toast({
        variant: "destructive",
        title: "Firestore Permission Error",
        description: `Operation ${error.context.operation} on path ${error.context.path} was denied. Check console for details.`,
        duration: 10000
      });
      
      // This is the ideal line for local development to trigger the overlay
      // throw error; 
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.removeListener('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null; // This component does not render anything
}
