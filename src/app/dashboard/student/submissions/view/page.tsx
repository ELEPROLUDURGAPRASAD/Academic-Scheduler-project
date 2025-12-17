"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";

type Submission = {
    date: Date;
    subject: string;
};

const initialSubmissions: Submission[] = [
    { date: new Date(2025, 2, 28), subject: 'Physics Assignment' },
    { date: new Date(2025, 4, 30), subject: 'Maths Assignment' },
    { date: new Date(2025, 3, 15), subject: 'Chemistry Lab Report' },
    { date: new Date(2025, 5, 10), subject: 'Computer Science Project' },
];

export default function StudentSubmissionsPage() {
    const sortedSubmissions = initialSubmissions.sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assignment Submission Deadlines</CardTitle>
                <CardDescription>
                    Here are the upcoming submission deadlines for your assignments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Deadline</TableHead>
                            <TableHead>Subject / Assignment</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedSubmissions.map((submission, index) => {
                            const isPast = submission.date < new Date();
                            return (
                                <TableRow key={index} className={isPast ? "text-muted-foreground" : ""}>
                                    <TableCell className="font-medium">{format(submission.date, 'PPP')}</TableCell>
                                    <TableCell>{submission.subject}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={isPast ? "outline" : "secondary"}>
                                            {isPast ? "Closed" : "Upcoming"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
