import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src="/add-hope-2.png" 
        alt="Add Hope Logo"
        width={112} 
        height={30} 
        priority 
      />
    </Link>
  );
}
