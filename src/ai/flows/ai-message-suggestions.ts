'use server';

/**
 * @fileOverview Provides AI-powered message suggestions for e-cards.
 *
 * - getAiMessageSuggestion - A function that generates message suggestions based on the recipient name, occasion, and user's note.
 * - AiMessageSuggestionsInput - The input type for the getAiMessageSuggestion function.
 * - AiMessageSuggestionsOutput - The return type for the getAiMessageSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiMessageSuggestionsInputSchema = z.object({
  recipientName: z.string().describe('The name of the e-card recipient.'),
  occasion: z.string().describe('The occasion for the e-card (e.g., birthday, thank you).'),
  userNote: z.string().describe('The user\'s initial note or message.'),
});
export type AiMessageSuggestionsInput = z.infer<typeof AiMessageSuggestionsInputSchema>;

const AiMessageSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of AI-generated message suggestions.'),
});
export type AiMessageSuggestionsOutput = z.infer<typeof AiMessageSuggestionsOutputSchema>;

export async function getAiMessageSuggestion(input: AiMessageSuggestionsInput): Promise<AiMessageSuggestionsOutput> {
  return aiMessageSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMessageSuggestionsPrompt',
  input: {schema: AiMessageSuggestionsInputSchema},
  output: {schema: AiMessageSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping users write thoughtful messages for e-cards.

  Based on the recipient's name, the occasion, and the user's initial note, generate three message suggestions.
  The suggestions should be concise, heartfelt, and appropriate for the occasion.

  Recipient Name: {{{recipientName}}}
  Occasion: {{{occasion}}}
  User's Note: {{{userNote}}}

  Suggestions:
  1.`, // The prompt is intentionally cut short, the ai will continue the list.
});

const aiMessageSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiMessageSuggestionsFlow',
    inputSchema: AiMessageSuggestionsInputSchema,
    outputSchema: AiMessageSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      suggestions: output?.suggestions ?? [],
    };
  }
);
