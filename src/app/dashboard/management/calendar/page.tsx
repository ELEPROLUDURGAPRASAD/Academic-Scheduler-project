"use client";

import { useState } from 'react';
import { addDays, format, startOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, endOfMonth, getDay } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, PartyPopper, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

type MarkedDate = {
    date: Date;
    type: 'holiday' | 'event';
    description: string;
};

const exampleDates: MarkedDate[] = [
    // Semester 1 (2024)
    { date: new Date(2024, 7, 15), type: 'holiday', description: 'Independence Day' },
    { date: new Date(2024, 7, 19), type: 'holiday', description: 'Raksha Bandhan' },
    { date: new Date(2024, 7, 26), type: 'holiday', description: 'Janmashtami' },
    { date: new Date(2024, 8, 5), type: 'event', description: 'Teachers\' Day' },
    { date: new Date(2024, 8, 7), type: 'holiday', description: 'Ganesh Chaturthi' },
    { date: new Date(2024, 9, 2), type: 'holiday', description: 'Gandhi Jayanti' },
    { date: new Date(2024, 9, 12), type: 'holiday', description: 'Dussehra' },
    { date: new Date(2024, 9, 25), type: 'event', description: 'Tech Fest' },
    { date: new Date(2024, 10, 1), type: 'holiday', description: 'Diwali' },
    { date: new Date(2024, 10, 15), type: 'holiday', description: 'Guru Nanak Jayanti' },
    { date: new Date(2024, 11, 25), type: 'holiday', description: 'Christmas' },
    // Semester 2 (2025)
    { date: new Date(2025, 0, 1), type: 'holiday', description: 'New Year\'s Day' },
    { date: new Date(2025, 0, 14), type: 'holiday', description: 'Makar Sankranti / Pongal' },
    { date: new Date(2025, 0, 26), type: 'holiday', description: 'Republic Day' },
    { date: new Date(2025, 1, 14), type: 'event', description: 'Cultural Fest' },
    { date: new Date(2025, 1, 26), type: 'holiday', description: 'Maha Shivaratri' },
    { date: new Date(2025, 2, 14), type: 'holiday', description: 'Holi' },
    { date: new Date(2025, 2, 30), type: 'holiday', description: 'Eid-ul-Fitr' },
    { date: new Date(2025, 3, 14), type: 'holiday', description: 'Ambedkar Jayanti' },
    { date: new Date(2025, 3, 18), type: 'holiday', description: 'Good Friday' },
    { date: new Date(2025, 4, 1), type: 'holiday', description: 'Labour Day' },
    { date: new Date(2025, 4, 5), type: 'holiday', description: 'Buddha Purnima' },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [markedDates, setMarkedDates] = useState<MarkedDate[]>(exampleDates);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [description, setDescription] = useState('');

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        const existingMark = markedDates.find(d => format(d.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
        setDescription(existingMark?.description || '');
        setIsDialogOpen(true);
    };

    const addMarker = (type: 'holiday' | 'event') => {
        if (selectedDate && description) {
            const newMarkedDates = markedDates.filter(d => format(d.date, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd'));
            setMarkedDates([...newMarkedDates, { date: selectedDate, type, description }]);
            setDescription('');
            setIsDialogOpen(false);
        }
    };
    
    const removeMarker = () => {
        if (selectedDate) {
            setMarkedDates(markedDates.filter(d => format(d.date, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd')));
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
                            <DialogTrigger asChild>
                                <Button className="h-10 w-10 rounded-full shadow-lg" size="icon">
                                    <Plus className="h-6 w-6" />
                                </Button>
                            </DialogTrigger>
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
                                const isSunday = getDay(day) === 0;
                                const marks = markedDates.filter(d => format(d.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));

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
                                            isToday && "bg-primary text-primary-foreground",
                                            isSunday && isCurrentMonth && "text-destructive"
                                        )}>
                                            {format(day, 'd')}
                                        </span>
                                        <div className="flex flex-col gap-1 mt-1 overflow-y-auto w-full text-xs">
                                            {marks.map((mark, i) => (
                                                <Badge
                                                    key={i}
                                                    variant={mark.type === 'holiday' ? 'destructive' : 'default'}
                                                    className={cn(
                                                        "truncate text-white",
                                                        mark.type === 'event' && "bg-blue-500",
                                                    )}
                                                >
                                                    {mark.description}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Mark Date</DialogTitle>
                        <DialogDescription>
                            {selectedDate ? format(selectedDate, 'PPP') : 'No date selected'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="description">Event/Holiday Name</Label>
                            <Input
                                id="description"
                                placeholder="e.g., Annual Sports Day"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                disabled={!selectedDate}
                            />
                        </div>
                    </div>
                    <DialogFooter className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Button variant="destructive" onClick={removeMarker} disabled={!selectedDate || !markedDates.some(d => format(d.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))} className="sm:col-span-1">
                            Remove
                        </Button>
                        <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => addMarker('event')} disabled={!selectedDate || !description}>
                                Mark as Event
                            </Button>
                            <Button variant="destructive" className="w-full" onClick={() => addMarker('holiday')} disabled={!selectedDate || !description}>
                                Mark as Holiday
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
