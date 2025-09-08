import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sampleCard } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import MessageList from './_components/message-list';
import { Gift, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CardSigningPage({ params }: { params: { slug: string } }) {
  // In a real app, you'd fetch card data by slug
  if (params.slug !== sampleCard.slug) {
    notFound();
  }

  const card = sampleCard;

  return (
    <div className="bg-secondary/40 min-h-screen py-12 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">You&apos;re invited to sign a card for {card.recipientName}!</h1>
            <p className="text-muted-foreground mt-2">Add your message below and share in the celebration.</p>
        </div>
        
        <div className="flex justify-center mb-8 gap-4">
            <Button>
                <Copy className="mr-2 h-4 w-4" /> Copy Signing Link
            </Button>
            <Button variant="outline">
                <Gift className="mr-2 h-4 w-4" /> Add a Gift Card
            </Button>
        </div>

        <Card className="shadow-2xl w-full">
            <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex justify-center items-center">
                        <Image
                            src={card.template.imageUrl}
                            data-ai-hint={card.template.aiHint}
                            alt={card.template.title}
                            width={400}
                            height={500}
                            className="rounded-lg object-cover aspect-[4/5] shadow-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold font-headline text-primary mb-4">
                            Happy Birthday, {card.recipientName}!
                        </h2>
                        
                        <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                            <p className="text-muted-foreground italic">&quot;{card.senderNote}&quot;</p>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex-grow space-y-4 overflow-y-auto max-h-[50vh] pr-2">
                          <MessageList initialMessages={card.messages} recipientName={card.recipientName} occasion={card.template.occasion} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
