import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="text-xl md:text-2xl font-headline font-semibold text-primary-foreground hover:opacity-80 transition-opacity">
      Hope Fore Hunger
    </Link>
  );
}
