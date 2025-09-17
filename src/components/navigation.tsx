
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // useRouter added
import { Menu, LogIn, LogOut } from 'lucide-react'; // LogOut added
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth'; // signOut, User added
import { auth } from '@/lib/firebase'; // auth imported
import { useToast } from '@/hooks/use-toast'; // useToast imported

const ADMIN_EMAIL = "roslyn@baobabbrands.com"; // Defined for checking admin

const mainNavLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Add Hope' },
  { href: '#event-info', label: 'Event Info' },
  { href: '#booking', label: 'Bookings' },
];

const supportingNavLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter(); // useRouter hook
  const { toast } = useToast(); // toast hook
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // State for admin login

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
      if (user && user.email === ADMIN_EMAIL) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribeAuth(); // Unsubscribe from auth listener
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsSheetOpen(false); 
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdminLoggedIn(false);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout Error:", error);
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
    setIsSheetOpen(false); // Close sheet if open
  };
  
  const renderLinks = (links: { href: string; label: string }[], isMainPageLink: boolean) => (
    links.map((link) => (
      <Link
        key={link.href}
        href={isMainPageLink && pathname === '/' ? link.href : (isMainPageLink ? `/${link.href}`: link.href)}
        onClick={(e) => (isMainPageLink && pathname === '/' ? handleLinkClick(e, link.href) : setIsSheetOpen(false))}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          (isMainPageLink && pathname === `/${link.href}`) || (!isMainPageLink && pathname === link.href) ? "text-primary" : "text-primary-foreground/80"
        )}
      >
        {link.label}
      </Link>
    ))
  );

  const AdminButton = ({ isMobile = false }: { isMobile?: boolean }) => (
    isAdminLoggedIn ? (
      <Button 
        variant="outline" 
        size={isMobile ? "sm" : "sm"} 
        className={cn("border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground", isMobile ? "w-full mt-4" : "ml-2")}
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log Out
      </Button>
    ) : (
      <Link href="/login" passHref>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "sm"} 
          className={cn("border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground", isMobile ? "w-full mt-4" : "ml-2")}
          onClick={() => setIsSheetOpen(false)}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Admin
        </Button>
      </Link>
    )
  );

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-black transition-all duration-300", 
      isScrolled ? "shadow-md" : ""
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-4">
          {renderLinks(mainNavLinks, true)}
          {renderLinks(supportingNavLinks, false)}
          <AdminButton />
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary-foreground" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-black">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {renderLinks(mainNavLinks, true)}
                  {renderLinks(supportingNavLinks, false)}
                  <AdminButton isMobile={true} />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
