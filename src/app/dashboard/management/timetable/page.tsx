"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

const initialTimetable = {
  Monday: ["Maths", "Physics", "Chemistry", "Lunch", "Biology", "History", "Geography"],
  Tuesday: ["Physics", "Maths", "English", "Lunch", "History", "Geography", "Biology"],
  Wednesday: ["Chemistry", "Biology", "Maths", "Lunch", "Physics", "English", "History"],
  Thursday: ["Biology", "Chemistry", "Physics", "Lunch", "Geography", "Maths", "English"],
  Friday: ["History", "English", "Geography", "Lunch", "Maths", "Physics", "Chemistry"],
  Saturday: ["Geography", "History", "English", "Lunch", "Chemistry", "Biology", "Physics"],
};

const periods = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "1:00-2:00", "2:00-3:00", "3:00-4:00"];
const days = Object.keys(initialTimetable);

export default function TimetablePage() {
  const [timetable, setTimetable] = useState(initialTimetable);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (day: string, periodIndex: number, value: string) => {
    const newTimetable = { ...timetable };
    (newTimetable as any)[day][periodIndex] = value;
    setTimetable(newTimetable);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Class Timetable</CardTitle>
                <CardDescription>Manage the weekly class schedule. Click edit to make changes.</CardDescription>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Save Changes' : 'Edit Timetable'}
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Day/Time</TableHead>
                {periods.map((period, index) => (
                    <TableHead key={index} className="text-center">{period}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {days.map(day => (
                <TableRow key={day}>
                    <TableHead>{day}</TableHead>
                    {(timetable as any)[day].map((subject: string, index: number) => (
                    <TableCell key={index} className="text-center">
                        {index === 3 ? (
                            <div className="bg-muted text-muted-foreground rounded-md p-2 font-semibold">Lunch</div>
                        ) : isEditing ? (
                        <Input
                            value={subject}
                            onChange={(e) => handleInputChange(day, index, e.target.value)}
                            className="text-center"
                        />
                        ) : (
                        subject
                        )}
                    </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
