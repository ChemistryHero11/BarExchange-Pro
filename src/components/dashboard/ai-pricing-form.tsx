'use client';

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { suggestPricingAction } from '@/actions/suggest-pricing-action';
import type { SuggestPricingInput, SuggestPricingOutput } from '@/ai/flows/suggest-pricing';
import { BrainCircuit, Loader2, DollarSign, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  drinkName: z.string().min(2, { message: "Drink name must be at least 2 characters." }),
  historicalSalesData: z.string().min(10, { message: "Please provide some historical sales data." }),
  currentDemand: z.enum(['low', 'medium', 'high'], { errorMap: () => ({ message: "Please select a valid demand level."}) }),
  k: z.coerce.number().min(0.1, { message: "Market sensitivity (k) must be at least 0.1." }).max(10, { message: "Market sensitivity (k) cannot exceed 10."}),
});

type FormData = z.infer<typeof formSchema>;

export function AiPricingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestPricingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drinkName: "",
      historicalSalesData: "",
      currentDemand: "medium",
      k: 1.0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    setError(null);

    const inputForAI: SuggestPricingInput = {
      ...data,
      k: Number(data.k) // Ensure k is a number
    };

    const result = await suggestPricingAction(inputForAI);

    if ('error' in result) {
      setError(result.error);
    } else {
      setSuggestion(result);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl">AI Pricing Assistant</CardTitle>
        </div>
        <CardDescription>
          Leverage AI to find the optimal price for your drinks. Fill in the details below to get a suggestion.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="drinkName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drink Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Classic Margarita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="historicalSalesData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Sales Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe sales trends, e.g., 'Sold 50 units last Saturday at $10 each. Sales dip on weekdays.'"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details like dates, times, prices, and sales volume.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentDemand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Demand</FormLabel>
                  <FormControl>
                     <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    Estimate the current interest level for this drink.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="k"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Sensitivity (k)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="E.g., 1.5" {...field} />
                  </FormControl>
                  <FormDescription>
                    A constant representing market sensitivity (e.g., 0.1-10). Higher means more sensitive to price.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Suggestion...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Suggest Price
                </>
              )}
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {suggestion && (
              <Alert variant="default" className="bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400">
                 <DollarSign className="h-5 w-5 text-green-600 dark:text-green-500" />
                <AlertTitle className="font-semibold text-green-800 dark:text-green-300">AI Pricing Suggestion</AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <p className="text-2xl font-bold">
                    Suggested Price: ${suggestion.suggestedPrice.toFixed(2)}
                  </p>
                  <div>
                    <h4 className="font-medium">Reasoning:</h4>
                    <p className="text-sm opacity-90">{suggestion.reasoning}</p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
