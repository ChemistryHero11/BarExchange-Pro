'use server';
import { suggestPricing as suggestPricingFlow, type SuggestPricingInput, type SuggestPricingOutput } from '@/ai/flows/suggest-pricing';

export async function suggestPricingAction(input: SuggestPricingInput): Promise<SuggestPricingOutput | { error: string }> {
  try {
    // TODO: Add any necessary validation or transformation here if not covered by Zod schema in the flow
    // For example, ensuring historicalSalesData is in a parseable format if needed before sending to AI.
    // Or, if 'k' needs to be within a certain range from the server's perspective.

    console.log("Calling AI flow with input:", input);
    const result = await suggestPricingFlow(input);
    console.log("AI flow result:", result);
    return result;
  } catch (error) {
    console.error("Error in suggestPricingAction:", error);
    // Construct a user-friendly error message or log more details for debugging
    let errorMessage = "An unexpected error occurred while suggesting pricing.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    // Potentially log the error to a monitoring service
    return { error: errorMessage };
  }
}
