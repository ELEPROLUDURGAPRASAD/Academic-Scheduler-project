"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, FileText, GanttChartSquare, MessageSquare, Presentation, Upload, CalendarClock, BookOpenCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function StudentViewPage() {
    const { toast } = useToast();
    const [lastFeedbackDate, setLastFeedbackDate] = useState<Date | null>(null);
    const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

    const canGiveFeedback = () => {
        if (!lastFeedbackDate) return true;
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return lastFeedbackDate < oneMonthAgo;
    };

    const handleFeedbackSubmit = () => {
        if (canGiveFeedback()) {
            setLastFeedbackDate(new Date());
            toast({ title: "Feedback Submitted", description: "Thank you for your valuable feedback." });
            setIsFeedbackDialogOpen(false);
        } else {
            toast({ title: "Feedback Limit", description: "You can only submit feedback once per month.", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-6 container py-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Student Dashboard</h1>
                    <p className="text-muted-foreground">4th Year, Computer Science (CSE)</p>
                </div>
                <div className="flex items-center gap-4">
                     <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <MessageSquare className="mr-2 h-4 w-4" /> Give Feedback
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Monthly Feedback</DialogTitle>
                                <DialogDescription>
                                    Provide your feedback on teachers and courses. You can submit this once a month.
                                </DialogDescription>
                            </DialogHeader>
                            <Textarea placeholder="Your feedback..." className="min-h-[150px]" />
                            <DialogFooter>
                                <Button onClick={handleFeedbackSubmit} disabled={!canGiveFeedback()}>Submit Feedback</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-0 right-0 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                         <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex-col items-start gap-1">
                                <p className="font-semibold text-red-600">Holiday Tomorrow!</p>
                                <p className="text-xs text-muted-foreground">The college is closed for Diwali. No classes scheduled.</p>
                                <p className="text-xs text-muted-foreground self-end">1 day ago</p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex-col items-start gap-1">
                                <p className="font-semibold">Semester Exams Approaching</p>
                                <p className="text-xs text-muted-foreground">Your final exams for Semester 1 start in 3 days.</p>
                               <p className="text-xs text-muted-foreground self-end">2 days ago</p>
                            </DropdownMenuItem>
                             <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex-col items-start gap-1">
                                <p className="font-semibold text-blue-600">Event Reminder: Tech Fest "Innovate 2024"</p>
                                <p className="text-xs text-muted-foreground">Starts in 2 days. Get ready for coding challenges and workshops!</p>
                                <p className="text-xs text-muted-foreground self-end">1 hour ago</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <BookOpenCheck /> Management Section
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button asChild variant="secondary" className="w-full justify-start"><Link href="/dashboard/management/timetable"><Calendar className="mr-2 h-4 w-4" /> View Timetable</Link></Button>
                        <Button asChild variant="secondary" className="w-full justify-start"><Link href="/dashboard/management/calendar"><GanttChartSquare className="mr-2 h-4 w-4" /> View Holidays & Events</Link></Button>
                        <Button asChild variant="secondary" className="w-full justify-start"><Link href="/dashboard/management/schedules"><Presentation className="mr-2 h-4 w-4" /> View Exam Schedules</Link></Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <FileText /> Teacher Section
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button asChild variant="secondary" className="w-full justify-start"><Link href="/dashboard/student/assignments/view"><FileText className="mr-2 h-4 w-4" /> View Assignments</Link></Button>
                        <Button asChild variant="secondary" className="w-full justify-start"><Link href="/dashboard/student/notes/view"><Upload className="mr-2 h-4 w-4" /> Download Notes</Link></Button>
                        <Button asChild variant="secondary" className="w-full justify-start"><Link href="/dashboard/student/submissions/view"><CalendarClock className="mr-2 h-4 w-4" /> View Submission Dates</Link></Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
