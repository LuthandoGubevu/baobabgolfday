
"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SectionWrapper } from '@/components/section-wrapper';

const ADMIN_EMAIL = "shayna@baobabbrands.com";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        if (user.email === ADMIN_EMAIL) {
          // Check Firestore for admin role
          try {
            const roleDocRef = doc(db, "roles", user.email);
            const roleDocSnap = await getDoc(roleDocRef);

            if (roleDocSnap.exists() && roleDocSnap.data().role === "admin") {
              setIsAuthorized(true);
            } else {
              // User is ADMIN_EMAIL but doesn't have admin role in Firestore
              await signOut(auth);
              toast({
                title: "Authorization Failed",
                description: "You do not have the necessary admin privileges. Ensure your role is set in Firestore.",
                variant: "destructive",
              });
              router.replace('/login');
            }
          } catch (error) {
            console.error("Error checking admin role in Firestore:", error); // Log the specific error
            await signOut(auth);
            toast({
              title: "Error Verifying Privileges",
              description: "Could not verify admin privileges. Please check console for details or try again.",
              variant: "destructive",
            });
            router.replace('/login');
          }
        } else {
          // User is logged in, but not the authorized admin email
          await signOut(auth);
          toast({
            title: "Access Denied",
            description: "This account is not authorized for admin access. Please sign in with the correct admin credentials.",
            variant: "destructive",
          });
          router.replace('/login');
        }
      } else {
        // User is not logged in
        toast({
          title: "Authentication Required",
          description: "Please sign in to access the admin area.",
          variant: "destructive",
        });
        router.replace('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, toast]);

  if (loading) {
    return (
      <SectionWrapper id="admin-loading" className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Verifying access...</p>
      </SectionWrapper>
    );
  }

  if (!isAuthorized) {
    // This state should ideally be brief as the redirect happens in useEffect.
    // It can also be a fallback if redirection fails for some reason or while it's in progress.
    return (
        <SectionWrapper id="admin-unauthorized" className="min-h-screen flex justify-center items-center">
             <p className="text-xl text-muted-foreground">Redirecting to login...</p>
        </SectionWrapper>
    );
  }

  return <>{children}</>;
}
