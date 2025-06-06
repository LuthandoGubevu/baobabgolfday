import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src="/add-hope-logo.png" 
        alt="Add Hope Logo"
        width={150} // You might want to adjust this
        height={40} // You might want to adjust this
        priority // Preload logo as it's likely LCP
      />
    </Link>
  );
}
