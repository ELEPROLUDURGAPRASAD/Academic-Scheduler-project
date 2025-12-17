import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Calendar, GanttChartSquare, MessageSquare, Presentation } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function ManagementDashboard() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Management Dashboard Overview</CardTitle>
                <CardDescription>Welcome to your dashboard. From here you can manage all academic activities.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Use the navigation on the left to manage timetables, calendars, schedules, and view student feedback.</p>
            </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Class Timetable
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Weekly View</div>
                    <p className="text-xs text-muted-foreground">
                        Organize and edit class schedules.
                    </p>
                    <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="/dashboard/management/timetable">Manage Timetable</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Academic Calendar
                    </CardTitle>
                    <GanttChartSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5 Upcoming</div>
                    <p className="text-xs text-muted-foreground">
                        Mark holidays and events.
                    </p>
                     <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="/dashboard/management/calendar">Manage Calendar</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Exam Schedules
                    </CardTitle>
                    <Presentation className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4 Schedules</div>
                    <p className="text-xs text-muted-foreground">
                        Set internal and external exam dates.
                    </p>
                     <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="/dashboard/management/schedules">Manage Schedules</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Student Feedback
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">15 New</div>
                    <p className="text-xs text-muted-foreground">
                        Review and analyze feedback.
                    </p>
                     <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="/dashboard/management/feedback">View Feedback</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
