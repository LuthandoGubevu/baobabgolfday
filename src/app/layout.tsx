
import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/footer'; // Import the new Footer component
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export const metadata: Metadata = {
  title: 'Hope Fore Hunger - KFC Add Hope Golf Day 2025',
  description: 'Join the KFC Add Hope Annual Golf Day 2025 for a day of golf and giving.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer /> {/* Add the Footer component here */}
        <Toaster />
        <FirebaseErrorListener />
      </body>
    </html>
  );
}
