import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, SendHorizonal, Users2 } from 'lucide-react';
import { featuredTemplates } from '@/lib/data';
import CardTemplate from '@/components/card-template';
import TreeCounter from '@/components/tree-counter';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Create a group card everyone can sign
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Greetly makes it easy to celebrate together, no matter where
                  you are. Perfect for birthdays, farewells, and thank yous.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="font-bold">
                  <Link href="/cards">Choose a Card</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://picsum.photos/600/400"
              data-ai-hint="happy celebration"
              width={600}
              height={400}
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A simple and joyful experience for everyone involved.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold font-headline">1. Choose a Card</h3>
              <p className="text-sm text-muted-foreground">
                Browse our collection of beautiful designs for any occasion.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Users2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold font-headline">2. Invite Others to Sign</h3>
              <p className="text-sm text-muted-foreground">
                Share a unique link with friends and colleagues to add their messages.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <SendHorizonal className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold font-headline">3. Send with Joy</h3>
              <p className="text-sm text-muted-foreground">
                Schedule the card for delivery and surprise the recipient!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
              Popular Designs
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get started with one of our community&apos;s favorite cards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
            {featuredTemplates.map((template) => (
              <CardTemplate key={template.id} template={template} />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/cards">View All Designs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/40">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm">
                Our Impact
              </div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
                Every Card Plants a Tree
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;re committed to making a positive impact on the planet. For every paid card sent through Greetly, we contribute to tree planting initiatives.
              </p>
              <TreeCounter count={1357} />
            </div>
            <Image
              src="https://picsum.photos/600/400"
              data-ai-hint="forest trees"
              width={600}
              height={400}
              alt="Forest"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
