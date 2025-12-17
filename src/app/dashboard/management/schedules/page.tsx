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

// Semester 1 Exams
const initialInternalExamsSem1: Exam[] = [
    { id: 1, date: new Date(2024, 8, 15), subject: 'Mid-1: Maths' },
    { id: 2, date: new Date(2024, 8, 16), subject: 'Mid-1: Physics' },
    { id: 3, date: new Date(2024, 8, 17), subject: 'Mid-1: Chemistry' },
    { id: 4, date: new Date(2024, 9, 10), subject: 'Lab Internals: Physics Lab' },
    { id: 5, date: new Date(2024, 9, 11), subject: 'Lab Internals: Chemistry Lab' },
    { id: 6, date: new Date(2024, 10, 20), subject: 'Mid-2: Maths' },
    { id: 7, date: new Date(2024, 10, 21), subject: 'Mid-2: Physics' },
    { id: 8, date: new Date(2024, 10, 22), subject: 'Mid-2: Chemistry' },
    { id: 9, date: new Date(2024, 11, 5), subject: 'Lab Internals: Programming Lab' },
];

const initialExternalExamsSem1: Exam[] = [
    { id: 1, date: new Date(2024, 11, 15), subject: 'Semester Final: Maths' },
    { id: 2, date: new Date(2024, 11, 17), subject: 'Semester Final: Physics' },
    { id: 3, date: new Date(2024, 11, 19), subject: 'Semester Final: Chemistry' },
    { id: 4, date: new Date(2024, 11, 21), subject: 'Semester Final: Computer Science' },
];

// Semester 2 Exams
const initialInternalExamsSem2: Exam[] = [
    { id: 10, date: new Date(2025, 2, 10), subject: 'Mid-1: Data Structures' },
    { id: 11, date: new Date(2025, 2, 11), subject: 'Mid-1: Digital Logic Design' },
    { id: 12, date: new Date(2025, 2, 12), subject: 'Mid-1: Economics' },
    { id: 13, date: new Date(2025, 3, 5), subject: 'Lab Internals: Data Structures Lab' },
    { id: 14, date: new Date(2025, 4, 15), subject: 'Mid-2: Data Structures' },
    { id: 15, date: new Date(2025, 4, 16), subject: 'Mid-2: Digital Logic Design' },
    { id: 16, date: new Date(2025, 4, 17), subject: 'Mid-2: Economics' },
    { id: 17, date: new Date(2025, 5, 1), subject: 'Lab Internals: Digital Logic Lab' },
];

const initialExternalExamsSem2: Exam[] = [
    { id: 5, date: new Date(2025, 5, 20), subject: 'Semester Final: Data Structures' },
    { id: 6, date: new Date(2025, 5, 22), subject: 'Semester Final: Digital Logic Design' },
    { id: 7, date: new Date(2025, 5, 24), subject: 'Semester Final: Economics' },
    { id: 8, date: new Date(2025, 5, 26), subject: 'Semester Final: Environmental Science' },
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
    const [internalExamsSem1, setInternalExamsSem1] = useState(initialInternalExamsSem1);
    const [externalExamsSem1, setExternalExamsSem1] = useState(initialExternalExamsSem1);
    const [internalExamsSem2, setInternalExamsSem2] = useState(initialInternalExamsSem2);
    const [externalExamsSem2, setExternalExamsSem2] = useState(initialExternalExamsSem2);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Exam Schedules</h2>
                <p className="text-muted-foreground">
                    Manage schedules for internal and external examinations for the academic year.
                </p>
            </div>
            <Tabs defaultValue="sem1" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sem1">Semester 1</TabsTrigger>
                    <TabsTrigger value="sem2">Semester 2</TabsTrigger>
                </TabsList>
                <TabsContent value="sem1" className="space-y-4">
                    <ScheduleTable title="Internal Exams (Semester 1)" exams={internalExamsSem1} setExams={setInternalExamsSem1} />
                    <ScheduleTable title="External Exams (Semester 1)" exams={externalExamsSem1} setExams={setExternalExamsSem1} />
                </TabsContent>
                <TabsContent value="sem2" className="space-y-4">
                    <ScheduleTable title="Internal Exams (Semester 2)" exams={internalExamsSem2} setExams={setInternalExamsSem2} />
                    <ScheduleTable title="External Exams (Semester 2)" exams={externalExamsSem2} setExams={setExternalExamsSem2} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
