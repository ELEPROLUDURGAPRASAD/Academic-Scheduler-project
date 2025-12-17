"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const subjects = ["Physics", "Mathematics", "Chemistry", "Computer Science", "History"];

export default function SubmissionDatesPage() {
    const { toast } = useToast();
    const [date, setDate] = useState<Date | undefined>();
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleSetDeadline = () => {
         if (!selectedSubject || !date) {
            toast({
                variant: "destructive",
                title: "Incomplete Information",
                description: "Please select a subject and pick a deadline date.",
            });
            return;
        }

        toast({
            title: "Deadline Set",
            description: `The new submission deadline for ${selectedSubject} has been set to ${format(date, 'PPP')}.`,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Set Submission Deadline</CardTitle>
                <CardDescription>
                    Select a subject and set the final date for assignment submission.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select onValueChange={setSelectedSubject} value={selectedSubject}>
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
                    <Label>Submission Deadline</Label>
                    <DatePicker date={date} setDate={setDate} />
                </div>
                <Button onClick={handleSetDeadline}>Set Deadline</Button>
            </CardContent>
        </Card>
    );
}
