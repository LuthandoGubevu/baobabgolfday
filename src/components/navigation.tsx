
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const mainNavLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Add Hope' },
  { href: '#event-info', label: 'Event Info' },
  { href: '#booking', label: 'Bookings' },
  { href: '#donate', label: 'Donate' },
];

const supportingNavLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    setIsSheetOpen(false); // Close sheet on link click
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

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-black transition-all duration-300", 
      isScrolled ? "shadow-md" : ""
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          {renderLinks(mainNavLinks, true)}
          {renderLinks(supportingNavLinks, false)}
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary-foreground" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-secondary"> {/* Mobile sheet still uses secondary, consider if this should also be black */}
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {renderLinks(mainNavLinks, true)}
                  {renderLinks(supportingNavLinks, false)}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
