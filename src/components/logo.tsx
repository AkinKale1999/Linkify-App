import Link from 'next/link';
import Image from 'next/image'; // Import Image component

export default function Logo() {
  return (
    <Link href="/info"> 
      <a>
        <Image src="/your-logo.svg" alt="Linkify Logo" width={150} height={50} /> 
      </a>
    </Link>
  );
}