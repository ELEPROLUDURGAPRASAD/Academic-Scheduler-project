"use client";

import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PartyPopper, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

type MarkedDate = {
    date: Date;
    type: 'holiday' | 'event';
    description: string;
};

export default function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [description, setDescription] = useState('');
    const [markedDates, setMarkedDates] = useState<MarkedDate[]>([
        { date: addDays(new Date(), 5), type: 'event', description: 'Annual Tech Fest' },
        { date: addDays(new Date(), 10), type: 'holiday', description: 'Summer Break Starts' }
    ]);
    
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
                    <CardContent className="space-y-4">
                        {markedDates.length > 0 ? (
                             markedDates
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
