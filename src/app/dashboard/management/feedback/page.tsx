"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { analyzeStudentFeedback } from '@/ai/flows/analyze-student-feedback';
import { Loader2, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AnalysisResult = {
    themes: string[];
    summary: string;
};

export default function FeedbackPage() {
    const [feedbackText, setFeedbackText] = useState("The course material for Physics is excellent, but the pace is a bit too fast. I'm also finding it hard to get help during lab sessions for Chemistry. The new online portal is great, though!");
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await analyzeStudentFeedback({ feedback: feedbackText });
            setAnalysis(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred during analysis.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Student Feedback Analysis</CardTitle>
                    <CardDescription>Paste student feedback below and use the AI to analyze it for key themes and a summary.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea 
                        placeholder="Paste student feedback here..." 
                        className="min-h-[200px] text-base"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                    />
                    <Button onClick={handleAnalyze} disabled={isLoading || !feedbackText} className="w-full">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        Analyze with AI
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>AI-generated insights from the feedback.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading && (
                        <div className="flex items-center justify-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    )}
                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Analysis Failed</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {analysis && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Summary</h3>
                                <p className="text-muted-foreground text-sm">{analysis.summary}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Key Themes</h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.themes.map((theme, index) => (
                                        <Badge key={index} variant="secondary">{theme}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !error && !analysis && (
                        <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Analysis will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
