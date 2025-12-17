"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GraduationCap, Code } from 'lucide-react';

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const branches = ["Computer Science (CSE)", "Electronics & Communication (ECE)", "Electrical & Electronics (EEE)", "AI & Machine Learning (AIML)", "Data Science"];

export default function StudentSetupPage() {
    const router = useRouter();

    const handleProceed = () => {
        // In a real app, save these choices and then redirect.
        router.push("/dashboard/student/view");
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Welcome, Student!</CardTitle>
                    <CardDescription>
                        Please select your year and branch to view your personalized dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Academic Year</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map(year => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Code className="h-4 w-4" /> Branch</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {branches.map(branch => (
                                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full" onClick={handleProceed}>
                        Go to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
