'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { getAiMessageSuggestion, type AiMessageSuggestionsInput } from '@/ai/flows/ai-message-suggestions';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/lib/data';

const formSchema = z.object({
    author: z.string().min(2, 'Name must be at least 2 characters.'),
    text: z.string().min(5, 'Message must be at least 5 characters.'),
});

interface SignCardFormProps {
    onAddMessage: (message: Omit<Message, 'id' | 'avatarUrl'>) => void;
    recipientName: AiMessageSuggestionsInput['recipientName'];
    occasion: AiMessageSuggestionsInput['occasion'];
}

export default function SignCardForm({ onAddMessage, recipientName, occasion }: SignCardFormProps) {
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { author: '', text: '' },
    });
    
    const userNote = form.watch('text');

    const handleGetSuggestions = async () => {
        setIsLoadingAI(true);
        setAiSuggestions([]);
        try {
            const result = await getAiMessageSuggestion({
                recipientName,
                occasion,
                userNote: userNote || `A message for ${recipientName} for their ${occasion}.`,
            });
            if (result.suggestions && result.suggestions.length > 0) {
                setAiSuggestions(result.suggestions);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'AI Error',
                    description: 'Could not generate suggestions. Please try again.',
                });
            }
        } catch (error) {
            console.error('AI suggestion error:', error);
            toast({
                variant: 'destructive',
                title: 'AI Error',
                description: 'An unexpected error occurred. Please try again later.',
            });
        } finally {
            setIsLoadingAI(false);
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        onAddMessage(values);
        form.reset();
        setAiSuggestions([]);
    }

    return (
        <div>
            <h3 className="text-lg font-bold font-headline mb-4">Add your message</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={`Write your message to ${recipientName}...`}
                                        className="resize-none"
                                        rows={4}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button type="submit" className="font-bold flex-1">Add My Message</Button>
                        <Button type="button" variant="outline" onClick={handleGetSuggestions} disabled={isLoadingAI} className="flex-1">
                            {isLoadingAI ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4 text-accent" />
                            )}
                            {isLoadingAI ? 'Generating...' : 'AI Suggestions'}
                        </Button>
                    </div>
                </form>
            </Form>
            
            {aiSuggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-bold">Suggestions:</h4>
                    <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map((suggestion, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => form.setValue('text', suggestion, { shouldValidate: true })}
                            >
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
