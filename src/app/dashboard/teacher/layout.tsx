"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { FileText, Upload, CalendarClock, LayoutDashboard, Calendar, Presentation, GanttChartSquare, Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarNav = (
    <SidebarMenu>
        <SidebarGroup>
            <SidebarGroupLabel>Teacher Section</SidebarGroupLabel>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/teacher/assignments')}>
                <Link href="/dashboard/teacher/assignments"><FileText /> Assignments</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/teacher/notes')}>
                <Link href="/dashboard/teacher/notes"><Upload /> Notes PDFs</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/teacher/submissions')}>
                <Link href="/dashboard/teacher/submissions"><CalendarClock /> Submission Dates</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarGroupLabel>Management Section</SidebarGroupLabel>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard/management'}>
                <Link href="/dashboard/management"><LayoutDashboard /> Overview</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/management/timetable')}>
                <Link href="/dashboard/management/timetable"><Calendar /> Timetable</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/management/calendar')}>
                <Link href="/dashboard/management/calendar"><GanttChartSquare /> Calendar</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/management/schedules')}>
                <Link href="/dashboard/management/schedules"><Presentation /> Schedules</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarGroup>
    </SidebarMenu>
  );

  const headerContent = (
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
                <p className="font-semibold text-red-600">Holiday Reminder: Diwali</p>
                <p className="text-xs text-muted-foreground">The college will be closed tomorrow for Diwali celebrations.</p>
                <p className="text-xs text-muted-foreground self-end">1 day ago</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-1">
                <p className="font-semibold">Exam Alert: Semester 1 Finals</p>
                <p className="text-xs text-muted-foreground">Final exams for Semester 1 are scheduled to begin in 3 days.</p>
                <p className="text-xs text-muted-foreground self-end">2 days ago</p>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );

  return <DashboardLayout sidebarContent={sidebarNav} headerContent={headerContent}>{children}</DashboardLayout>;
}
