"use client";

import { useState } from 'react';
import { addDays, format, addMonths, startOfMonth } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PartyPopper, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type MarkedDate = {
    date: Date;
    type: 'holiday' | 'event';
    description: string;
};

const exampleDates: MarkedDate[] = [
    // Semester 1
    { date: new Date(2024, 7, 15), type: 'holiday', description: 'Independence Day' },
    { date: new Date(2024, 8, 5), type: 'event', description: 'Teachers\' Day Celebration' },
    { date: new Date(2024, 9, 2), type: 'holiday', description: 'Gandhi Jayanti' },
    { date: new Date(2024, 9, 25), type: 'event', description: 'Tech Fest "Innovate 2024"' },
    { date: new Date(2024, 10, 1), type: 'holiday', description: 'Diwali' },
    { date: new Date(2024, 11, 25), type: 'holiday', description: 'Christmas Day' },
    // Semester 2
    { date: new Date(2025, 0, 1), type: 'holiday', description: 'New Year\'s Day' },
    { date: new Date(2025, 0, 26), type: 'holiday', description: 'Republic Day' },
    { date: new Date(2025, 1, 14), type: 'event', description: 'Annual Cultural Fest "Aura"' },
    { date: new Date(2025, 2, 8), type: 'holiday', description: 'Holi' },
    { date: new Date(2025, 3, 18), type: 'holiday', description: 'Good Friday' },
    { date: new Date(2025, 4, 1), type: 'holiday', description: 'Labour Day' },
];


export default function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [description, setDescription] = useState('');
    const [markedDates, setMarkedDates] = useState<MarkedDate[]>(exampleDates);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    
    const addMarker = (type: 'holiday' | 'event') => {
        if (date && description) {
            const newMarkedDates = markedDates.filter(d => format(d.date, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd'));
            setMarkedDates([...newMarkedDates, { date, type, description }]);
            setDescription('');
        }
    };

    const onDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            setCurrentMonth(startOfMonth(selectedDate));
            const existing = markedDates.find(d => format(d.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'));
            setDescription(existing?.description || '');
        } else {
            setDescription('');
        }
    }

    const modifiers = {
        holiday: markedDates.filter(d => d.type === 'holiday').map(d => d.date),
        event: markedDates.filter(d => d.type === 'event').map(d => d.date),
        sunday: { dayOfWeek: [0] as const },
    };

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Calendar</CardTitle>
                        <CardDescription>Select a date to mark it as a holiday or an event. Sundays are default holidays.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={onDateSelect}
                            month={currentMonth}
                            onMonthChange={setCurrentMonth}
                            numberOfMonths={12}
                            pagedNavigation
                            modifiers={modifiers}
                            modifiersClassNames={{
                                holiday: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                                event: "bg-blue-500 text-white hover:bg-blue-600",
                                sunday: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                            }}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Mark Date</CardTitle>
                        <CardDescription>
                            {date ? format(date, 'PPP') : 'Select a date'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="description">Event/Holiday Name</Label>
                            <Input 
                                id="description" 
                                placeholder="e.g., Annual Sports Day"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                disabled={!date}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => addMarker('event')} disabled={!date || !description}>Mark as Event</Button>
                            <Button variant="destructive" className="w-full" onClick={() => addMarker('holiday')} disabled={!date || !description}>Mark as Holiday</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72">
                            <div className="space-y-4">
                                {markedDates.length > 0 ? (
                                    markedDates
                                        .filter(d => d.date >= new Date())
                                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                                        .map((d, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold">{d.description}</p>
                                                <p className="text-sm text-muted-foreground">{format(d.date, 'PPP')}</p>
                                            </div>
                                            <Badge variant={d.type === 'holiday' ? 'destructive' : 'default'} className={cn(d.type === 'event' && 'bg-blue-500 text-white')}>
                                                {d.type === 'holiday' ? <Briefcase className="mr-2 h-4 w-4" /> : <PartyPopper className="mr-2 h-4 w-4" />}
                                                {d.type}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No holidays or events marked.</p>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
