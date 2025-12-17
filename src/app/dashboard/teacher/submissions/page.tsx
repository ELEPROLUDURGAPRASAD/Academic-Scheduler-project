"use client";

import { useState } from 'react';
import { format, startOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, endOfMonth, getDay } from 'date-fns';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Submission = {
    date: Date;
    subject: string;
};

const initialSubmissions: Submission[] = [
    { date: new Date(2025, 2, 28), subject: 'Physics Assignment' },
    { date: new Date(2025, 4, 30), subject: 'Maths Assignment' },
];

const subjects = ["Physics", "Mathematics", "Chemistry", "Computer Science", "History"];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function SubmissionCalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const { toast } = useToast();

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        const existingSubmission = submissions.find(d => format(d.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
        setSelectedSubject(existingSubmission?.subject || '');
        setIsDialogOpen(true);
    };

    const setDeadline = () => {
        if (selectedDate && selectedSubject) {
            const newSubmissions = submissions.filter(d => format(d.date, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd'));
            setSubmissions([...newSubmissions, { date: selectedDate, subject: `${selectedSubject} Submission` }]);
            toast({
                title: "Deadline Set",
                description: `Submission deadline for ${selectedSubject} set to ${format(selectedDate, 'PPP')}.`,
            });
            setSelectedSubject('');
            setIsDialogOpen(false);
        } else {
             toast({
                variant: "destructive",
                title: "Incomplete Information",
                description: "Please select a date and subject.",
            });
        }
    };
    
    const removeDeadline = () => {
        if (selectedDate) {
            setSubmissions(submissions.filter(d => format(d.date, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd')));
            toast({
                title: "Deadline Removed",
                description: `Deadline for ${format(selectedDate, 'PPP')} has been removed.`,
            });
            setIsDialogOpen(false);
        }
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const changeMonth = (amount: number) => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + amount, 1));
    };

    const allMonths = Array.from({ length: 12 }, (_, i) => new Date(currentMonth.getFullYear(), i, 1));

    return (
        <div className="relative">
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Card className="w-full bg-card text-card-foreground">
                    <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)}><ChevronLeft /></Button>
                                <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
                                <Button variant="ghost" size="icon" onClick={() => changeMonth(1)}><ChevronRight /></Button>
                            </div>
                           
                        </div>
                        <div className="flex gap-2 overflow-x-auto py-2">
                            {allMonths.map(month => (
                                <Button
                                    key={month.toString()}
                                    variant={format(month, 'MMM') === format(currentMonth, 'MMM') ? 'secondary' : 'ghost'}
                                    className="px-4 py-1 h-auto"
                                    onClick={() => setCurrentMonth(month)}
                                >
                                    {format(month, 'MMM')}
                                </Button>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground border-b">
                            {weekDays.map(day => <div key={day} className="py-2">{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7">
                            {days.map((day) => {
                                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                                const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                                const submission = submissions.find(d => format(d.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));

                                return (
                                    <div
                                        key={day.toString()}
                                        className={cn(
                                            "relative h-28 border-r border-b p-1 text-sm flex flex-col items-start cursor-pointer transition-colors hover:bg-accent",
                                            !isCurrentMonth && "text-muted-foreground/50",
                                            "last:border-r-0"
                                        )}
                                        onClick={() => handleDateClick(day)}
                                    >
                                        <span className={cn(
                                            "w-7 h-7 flex items-center justify-center rounded-full",
                                            isToday && "bg-primary text-primary-foreground"
                                        )}>
                                            {format(day, 'd')}
                                        </span>
                                        <div className="flex flex-col gap-1 mt-1 overflow-y-auto w-full text-xs">
                                            {submission && (
                                                <Badge className="truncate bg-green-500 text-white">
                                                    {submission.subject}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
                <DialogTrigger asChild>
                     <Button className="h-14 w-14 rounded-full shadow-lg absolute bottom-8 right-8" size="icon">
                        <Plus className="h-8 w-8" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Set Submission Deadline</DialogTitle>
                        <DialogDescription>
                            {selectedDate ? `Set or remove a deadline for ${format(selectedDate, 'PPP')}` : 'Select a date from the calendar'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
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
                    </div>
                    <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                         <Button variant="destructive" onClick={removeDeadline} disabled={!selectedDate || !submissions.some(d => format(d.date, 'yyyy-MM-dd') === format(selectedDate!, 'yyyy-MM-dd'))}>
                            Remove Deadline
                        </Button>
                        <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={setDeadline} disabled={!selectedDate || !selectedSubject}>
                           Set Deadline
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
