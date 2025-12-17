"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Trash2 } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';

type Exam = { id: number; date: Date; subject: string; };

const initialInternalExams: Exam[] = [
    { id: 1, date: new Date(2024, 8, 15), subject: 'Internal Assessment 1 - Maths' },
    { id: 2, date: new Date(2024, 8, 16), subject: 'Internal Assessment 1 - Physics' },
];

const initialExternalExams: Exam[] = [
    { id: 1, date: new Date(2024, 11, 10), subject: 'Final Exams - Chemistry' },
    { id: 2, date: new Date(2024, 11, 12), subject: 'Final Exams - Computer Science' },
];

function ScheduleTable({ title, exams, setExams }: { title: string, exams: Exam[], setExams: React.Dispatch<React.SetStateAction<Exam[]>> }) {
    
    const handleAddRow = () => {
        setExams([...exams, { id: Date.now(), date: new Date(), subject: '' }]);
    };
    
    const handleRemoveRow = (id: number) => {
        setExams(exams.filter(exam => exam.id !== id));
    };

    const handleUpdate = (id: number, field: 'date' | 'subject', value: Date | string) => {
        setExams(exams.map(exam => exam.id === id ? { ...exam, [field]: value } : exam));
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{title}</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleAddRow}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Row
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Date</TableHead>
                            <TableHead>Subject / Details</TableHead>
                            <TableHead className="w-[50px] text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell>
                                    <DatePicker date={exam.date} setDate={(newDate) => handleUpdate(exam.id, 'date', newDate || new Date())} />
                                </TableCell>
                                <TableCell>
                                    <Input placeholder="Enter subject and details" value={exam.subject} onChange={(e) => handleUpdate(exam.id, 'subject', e.target.value)} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveRow(exam.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


export default function SchedulesPage() {
    const [internalExams, setInternalExams] = useState(initialInternalExams);
    const [externalExams, setExternalExams] = useState(initialExternalExams);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Exam Schedules</h2>
                <p className="text-muted-foreground">
                    Manage schedules for internal and external examinations.
                </p>
            </div>
            <Tabs defaultValue="internal" className="w-full">
                <TabsList>
                    <TabsTrigger value="internal">Internal Exams</TabsTrigger>
                    <TabsTrigger value="external">External Exams</TabsTrigger>
                </TabsList>
                <TabsContent value="internal">
                    <ScheduleTable title="Internal Exam Schedule" exams={internalExams} setExams={setInternalExams} />
                </TabsContent>
                <TabsContent value="external">
                    <ScheduleTable title="External Exam Schedule" exams={externalExams} setExams={setExternalExams} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
