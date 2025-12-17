
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

type Note = {
    title: string;
    url: string; // In a real app, this would be a URL to the PDF file
};

const notesBySubject: Record<string, Note[]> = {
    "Physics": [
        { title: "Chapter 1: Kinematics.pdf", url: "/placeholder.pdf" },
        { title: "Chapter 2: Laws of Motion.pdf", url: "/placeholder.pdf" },
    ],
    "Mathematics": [
        { title: "Chapter 1: Linear Algebra.pdf", url: "/placeholder.pdf" },
    ],
    "Chemistry": [
        { title: "Chapter 1: Atomic Structure.pdf", url: "/placeholder.pdf" },
    ],
    "Computer Science": [
        { title: "Chapter 1: Introduction to Algorithms.pdf", url: "/placeholder.pdf" },
        { title: "Chapter 2: Data Structures.pdf", url: "/placeholder.pdf" },
    ],
    "History": [
        { title: "Chapter 1: Ancient Civilizations.pdf", url: "/placeholder.pdf" },
    ]
};

export default function StudentNotesPage() {

    const handleViewPdf = (url: string) => {
        // In a real application, you would handle the file download or viewing here.
        // For this example, we'll just open a new tab.
        window.open(url, '_blank');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Download Notes</CardTitle>
                <CardDescription>
                    Browse and download notes uploaded by your teachers for each subject.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(notesBySubject).map(([subject, notes]) => (
                        <AccordionItem value={subject} key={subject}>
                            <AccordionTrigger className="text-lg font-semibold">{subject}</AccordionTrigger>
                            <AccordionContent>
                                {notes.length > 0 ? (
                                    <ul className="space-y-2">
                                        {notes.map((note, index) => (
                                            <li key={index} className="flex items-center justify-between p-2 rounded-md border">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-5 w-5 text-primary" />
                                                    <span>{note.title}</span>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => handleViewPdf(note.url)}>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    View PDF
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No notes uploaded for this subject yet.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
