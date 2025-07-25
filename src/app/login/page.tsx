
"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';
import { SectionWrapper } from '@/components/section-wrapper';

const ADMIN_EMAIL = "shayna@baobabbrands.com";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    startTransition(async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        if (user.email === ADMIN_EMAIL) {
          toast({
            title: "Login Successful",
            description: "Redirecting to admin dashboard...",
          });
          router.push('/admin/submissions');
        } else {
          await signOut(auth); // Sign out the unauthorized user
          toast({
            title: "Access Denied",
            description: "This account is not authorized for admin access.",
            variant: "destructive",
          });
          form.reset(); // Reset form for security
        }
      } catch (error: any) {
        console.error("Firebase Auth Error:", error);
        let errorMessage = "An unknown error occurred. Please try again.";
        if (error.code) {
            switch (error.code) {
                case "auth/user-not-found":
                case "auth/wrong-password":
                case "auth/invalid-credential":
                    errorMessage = "Invalid email or password.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email format.";
                    break;
                case "auth/too-many-requests":
                     errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
                     break;
                case "auth/network-request-failed":
                    errorMessage = "Network error. Please check your internet connection and try again.";
                    break;
                 case "auth/operation-not-allowed":
                    errorMessage = "Email/password sign-in is not enabled for this project. Please contact the administrator.";
                    break;
                default:
                    errorMessage = "Login failed. Please try again.";
            }
        }
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <SectionWrapper id="login-page" className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-card shadow-xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary flex items-center justify-center gap-2">
            <LogIn className="h-8 w-8" /> Admin Sign In
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="admin@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder="••••••••"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </SectionWrapper>
  );
}
