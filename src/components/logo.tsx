import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src="/add-hope.png" 
        alt="Add Hope Logo"
        width={150} 
        height={40} 
        priority 
      />
    </Link>
  );
}
