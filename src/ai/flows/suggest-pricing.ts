// src/ai/flows/suggest-pricing.ts
'use server';
/**
 * @fileOverview An AI agent that suggests optimal drink pricing for bar owners.
 *
 * - suggestPricing - A function that provides AI-driven price suggestions.
 * - SuggestPricingInput - The input type for the suggestPricing function.
 * - SuggestPricingOutput - The return type for the suggestPricing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPricingInputSchema = z.object({
  drinkName: z.string().describe('The name of the drink.'),
  historicalSalesData: z
    .string()
    .describe(
      'Historical sales data for the drink, including date, time, and sales volume.'
    ),
  currentDemand: z.string().describe('Current demand for the drink (e.g., high, medium, low).'),
  k: z
    .number()
    .describe(
      'A constant representing market sensitivity; a higher value indicates greater sensitivity to price changes.'
    ),
});
export type SuggestPricingInput = z.infer<typeof SuggestPricingInputSchema>;

const SuggestPricingOutputSchema = z.object({
  suggestedPrice: z
    .number()
    .describe('The AI-suggested optimal price for the drink, in USD.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the suggested price, incorporating sales data and demand.'),
});
export type SuggestPricingOutput = z.infer<typeof SuggestPricingOutputSchema>;

export async function suggestPricing(input: SuggestPricingInput): Promise<SuggestPricingOutput> {
  return suggestPricingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPricingPrompt',
  input: {schema: SuggestPricingInputSchema},
  output: {schema: SuggestPricingOutputSchema},
  prompt: `You are an AI-powered pricing assistant for bar owners.

  Based on the following information, suggest an optimal price for the drink:

  Drink Name: {{{drinkName}}}
  Historical Sales Data: {{{historicalSalesData}}}
  Current Demand: {{{currentDemand}}}
  Market Sensitivity Constant (k): {{{k}}}

  Consider the historical sales data, current demand, and the market sensitivity constant (k) to determine the optimal price. Provide a suggested price and a clear explanation of your reasoning.

  The suggested price should be a number, and the reasoning should explain how you arrived at that price.

  Output MUST be valid JSON matching the following schema:
  {
    "suggestedPrice": "The AI-suggested optimal price for the drink, in USD.",
    "reasoning": "The AI reasoning behind the suggested price, incorporating sales data and demand."
  }
  `,
});

const suggestPricingFlow = ai.defineFlow(
  {
    name: 'suggestPricingFlow',
    inputSchema: SuggestPricingInputSchema,
    outputSchema: SuggestPricingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

