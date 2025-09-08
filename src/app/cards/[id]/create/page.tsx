'use client';

import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { cardTemplates, sampleCard } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  recipientName: z.string().min(2, 'Name must be at least 2 characters.'),
  recipientEmail: z.string().email('Please enter a valid email.'),
  deliveryDate: z.date({ required_error: 'A delivery date is required.' }),
  yourNote: z.string().min(10, 'Your note must be at least 10 characters.'),
});

export default function CreateCardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const template = cardTemplates.find((t) => t.id === params.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      recipientEmail: '',
      yourNote: '',
    },
  });

  if (!template) {
    notFound();
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Card Created!',
      description: 'Your card is ready to be signed. Redirecting...',
    });
    router.push(`/c/${sampleCard.slug}`);
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold font-headline mb-4 text-center">Your chosen card:</h2>
          <Image
            src={template.imageUrl}
            data-ai-hint={template.aiHint}
            alt={template.title}
            width={400}
            height={500}
            className="rounded-lg shadow-lg aspect-[4/5] object-cover"
          />
          <div className="text-center mt-4">
            <h3 className="font-bold font-headline text-lg">{template.title}</h3>
            <p className="text-sm text-muted-foreground">{template.occasion}</p>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Create Your Group Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient&apos;s Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Alex Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient&apos;s Email</FormLabel>
                        <FormControl>
                          <Input placeholder="alex.doe@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Delivery Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yourNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Personal Note</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Start the card with a warm message for the recipient..."
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full font-bold">Create Card & Get Link</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
