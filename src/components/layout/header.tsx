import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Leaf className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-headline font-bold">GroupHug</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="/cards"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Cards
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          FAQ
        </Link>
        <Button asChild>
          <Link href="/cards">Create a Card</Link>
        </Button>
      </nav>
    </header>
  );
}
