"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const subjects = ["Physics", "Mathematics", "Chemistry", "Computer Science", "History"];

const exampleQuestions: Record<string, string> = {
    "Physics": "1. Explain Newton's laws of motion with real-world examples.\n2. Derive the formula for kinetic energy.\n3. What is the difference between series and parallel circuits?",
    "Mathematics": "1. Solve the following system of linear equations...\n2. Find the derivative of f(x) = (x^2 + 1) * sin(x).\n3. Prove the Pythagorean theorem.",
    "Chemistry": "1. Balance the chemical equation for the combustion of methane.\n2. Describe the structure of an atom.\n3. What are the properties of acids and bases?",
    "Computer Science": "1. Write a Python function to sort a list of integers in ascending order using Bubble Sort.\n2. Explain the concept of Object-Oriented Programming.\n3. What is a binary search tree?",
    "History": "1. Discuss the major causes of World War I.\n2. Describe the key events of the French Revolution.\n3. Write a short note on the Indus Valley Civilization."
};

export default function AssignmentsPage() {
    const { toast } = useToast();
    const [selectedSubject, setSelectedSubject] = useState('');
    const [assignmentText, setAssignmentText] = useState('');

    const handleSubjectChange = (subject: string) => {
        setSelectedSubject(subject);
        setAssignmentText(exampleQuestions[subject] || '');
    };
    
    const handlePublish = () => {
        if (!selectedSubject || !assignmentText) {
             toast({
                variant: "destructive",
                title: "Incomplete Information",
                description: "Please select a subject and enter assignment questions.",
            });
            return;
        }
        toast({
            title: "Assignment Published",
            description: `The assignment for ${selectedSubject} has been made available to students.`,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Assignment</CardTitle>
                <CardDescription>
                    Select your subject and write the assignment questions below.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select onValueChange={handleSubjectChange} value={selectedSubject}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {subjects.map(subject => (
                                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Assignment Questions</Label>
                    <Textarea 
                        placeholder="1. Explain..." 
                        className="min-h-[200px]" 
                        value={assignmentText}
                        onChange={(e) => setAssignmentText(e.target.value)}
                    />
                </div>
                <Button onClick={handlePublish}>Publish Assignment</Button>
            </CardContent>
        </Card>
    );
}
