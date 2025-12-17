"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const subjects = ["Physics", "Mathematics", "Chemistry", "Computer Science", "History"];

export default function NotesPage() {
    const { toast } = useToast();

    const handleUpload = () => {
        toast({
            title: "Notes Uploaded",
            description: "The PDF has been successfully uploaded.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Notes</CardTitle>
                <CardDescription>
                    Select a subject and upload the notes in PDF format.
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
                    <Label>Notes PDF</Label>
                     <div className="flex w-full items-center space-x-2">
                        <Input type="file" accept=".pdf" />
                        <Button variant="outline" onClick={handleUpload}><Upload className="h-4 w-4 mr-2"/> Upload</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
