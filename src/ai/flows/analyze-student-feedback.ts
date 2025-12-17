'use server';

/**
 * @fileOverview An AI-driven tool to analyze student feedback, categorizing it into key themes for actionable insights.
 *
 * - analyzeStudentFeedback - A function that handles the feedback analysis process.
 * - AnalyzeStudentFeedbackInput - The input type for the analyzeStudentFeedback function.
 * - AnalyzeStudentFeedbackOutput - The return type for the analyzeStudentFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStudentFeedbackInputSchema = z.object({
  feedback: z
    .string()
    .describe('The student feedback to be analyzed.'),
});

export type AnalyzeStudentFeedbackInput = z.infer<typeof AnalyzeStudentFeedbackInputSchema>;

const AnalyzeStudentFeedbackOutputSchema = z.object({
  themes: z
    .array(z.string())
    .describe('Key themes identified in the student feedback.'),
  summary: z.string().describe('A concise summary of the feedback.'),
});

export type AnalyzeStudentFeedbackOutput = z.infer<typeof AnalyzeStudentFeedbackOutputSchema>;

export async function analyzeStudentFeedback(
  input: AnalyzeStudentFeedbackInput
): Promise<AnalyzeStudentFeedbackOutput> {
  return analyzeStudentFeedbackFlow(input);
}

const analyzeStudentFeedbackPrompt = ai.definePrompt({
  name: 'analyzeStudentFeedbackPrompt',
  input: {schema: AnalyzeStudentFeedbackInputSchema},
  output: {schema: AnalyzeStudentFeedbackOutputSchema},
  prompt: `You are an AI assistant tasked with analyzing student feedback and identifying key themes.
  Please analyze the following feedback and extract the main themes and provide a concise summary.

  Feedback: {{{feedback}}}
  Themes (as a list of strings):
  Summary:`, // Removed Handlebars `{{#each}}` loop since it's not valid inside prompt.
});

const analyzeStudentFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeStudentFeedbackFlow',
    inputSchema: AnalyzeStudentFeedbackInputSchema,
    outputSchema: AnalyzeStudentFeedbackOutputSchema,
  },
  async input => {
    const {output} = await analyzeStudentFeedbackPrompt(input);
    return output!;
  }
);
