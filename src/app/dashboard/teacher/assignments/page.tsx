"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const subjects = ["Physics", "Mathematics", "Chemistry", "Computer Science", "History"];

export default function AssignmentsPage() {
    const { toast } = useToast();
    
    const handlePublish = () => {
        toast({
            title: "Assignment Published",
            description: "The assignment has been made available to students.",
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
                    <Select>
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
                    <Textarea placeholder="1. Explain Newton's laws of motion..." className="min-h-[200px]" />
                </div>
                <Button onClick={handlePublish}>Publish Assignment</Button>
            </CardContent>
        </Card>
    );
}
