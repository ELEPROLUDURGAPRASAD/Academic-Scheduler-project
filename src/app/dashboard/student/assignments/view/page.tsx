"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const assignmentsBySubject: Record<string, string> = {
    "Physics": "1. Explain Newton's laws of motion with real-world examples.\n2. Derive the formula for kinetic energy.\n3. What is the difference between series and parallel circuits?",
    "Mathematics": "1. Solve the following system of linear equations...\n2. Find the derivative of f(x) = (x^2 + 1) * sin(x).\n3. Prove the Pythagorean theorem.",
    "Chemistry": "1. Balance the chemical equation for the combustion of methane.\n2. Describe the structure of an atom.\n3. What are the properties of acids and bases?",
    "Computer Science": "1. Write a Python function to sort a list of integers in ascending order using Bubble Sort.\n2. Explain the concept of Object-Oriented Programming.\n3. What is a binary search tree?",
    "History": "1. Discuss the major causes of World War I.\n2. Describe the key events of the French Revolution.\n3. Write a short note on the Indus Valley Civilization."
};

export default function StudentAssignmentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>View Assignments</CardTitle>
                <CardDescription>
                    Here are the assignments posted by your teachers for each subject.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(assignmentsBySubject).map(([subject, questions]) => (
                        <AccordionItem value={subject} key={subject}>
                            <AccordionTrigger className="text-lg font-semibold">{subject}</AccordionTrigger>
                            <AccordionContent>
                                {questions ? (
                                    <div className="p-4 bg-muted/50 rounded-md">
                                        <h4 className="font-semibold mb-2">Assignment Questions:</h4>
                                        <pre className="whitespace-pre-wrap font-sans text-sm">{questions}</pre>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No assignments uploaded for this subject yet.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
