
"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
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
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        if (user.email === ADMIN_EMAIL) {
          setIsAuthorized(true);
        } else {
          // User is logged in, but not the authorized admin
          signOut(auth).then(() => {
            toast({
              title: "Access Denied",
              description: "This account is not authorized for admin access. Please sign in with the correct admin credentials.",
              variant: "destructive",
            });
            router.replace('/login');
          }).catch(() => {
            // Handle sign out error if necessary
            router.replace('/login');
          });
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
    // However, as a fallback or during the very short period before redirect,
    // we can show a message or nothing.
    // Returning null is fine as the user will be redirected.
    return null;
  }

  return <>{children}</>;
}
