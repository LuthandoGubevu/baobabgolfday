
"use client";

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2, BookUser, ShieldCheck, LayoutDashboard, MessageSquare, BellRing } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SectionWrapper } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';

const ADMIN_EMAILS = ["roslyn@baobabbrands.com", "royden@baobabbrands.com", "ross@baobabbrands.com"];

function AdminNav() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    const navItems = [
        { href: '/admin/submissions', label: 'Submissions', icon: BookUser },
        { href: '/admin/holes', label: 'Hole Status', icon: ShieldCheck },
        { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
        { href: '/admin/reminders', label: 'Reminders', icon: BellRing },
    ];

    return (
        <div className="bg-card p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className='flex items-center gap-2 text-lg font-semibold text-primary'>
                <LayoutDashboard />
                <span>Admin Dashboard</span>
            </div>
            <nav className="flex items-center gap-2 flex-wrap justify-center">
                {navItems.map(item => (
                    <Link key={item.href} href={item.href} passHref>
                        <Button variant={pathname === item.href ? "default" : "outline"} size="sm">
                            <item.icon className='mr-2 h-4 w-4' />
                            {item.label}
                        </Button>
                    </Link>
                ))}
                 <Button variant="destructive" size="sm" onClick={handleLogout}>
                    Log Out
                </Button>
            </nav>
        </div>
    );
}


export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
        // User is logged in and is an admin.
        setIsAuthenticated(true);
      } else {
        // User is not logged in or is not an admin.
        toast({
          title: "Authentication Required",
          description: "You do not have permission to access the admin area.",
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
      <div className="min-h-screen flex justify-center items-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // This state is a fallback while the redirect to login is in progress.
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <p className="text-xl text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <SectionWrapper id="admin-area" className="min-h-screen bg-secondary">
        <AdminNav />
        {children}
    </SectionWrapper>
  );
}
