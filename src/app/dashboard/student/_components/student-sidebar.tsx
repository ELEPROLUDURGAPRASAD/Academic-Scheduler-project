"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { FileText, Upload, CalendarClock, BookOpenCheck, GanttChartSquare, Presentation, Calendar, MessageSquare, LayoutDashboard } from 'lucide-react';

export function StudentSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard/student/view'}>
                <Link href="/dashboard/student/view"><LayoutDashboard /> Dashboard</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarGroupLabel>Management Section</SidebarGroupLabel>
             <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/dashboard/management/timetable"><Calendar /> Timetable</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/dashboard/management/calendar"><GanttChartSquare /> Holidays & Events</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/dashboard/management/schedules"><Presentation /> Exam Schedules</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarGroupLabel>Teacher Section</SidebarGroupLabel>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/student/assignments')}>
                <Link href="/dashboard/student/assignments"><FileText /> Assignments</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/student/notes')}>
                <Link href="/dashboard/student/notes"><Upload /> Notes PDFs</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/student/submissions')}>
                <Link href="/dashboard/student/submissions"><CalendarClock /> Submission Dates</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarGroup>
         <SidebarSeparator />
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href="/dashboard/student/view"><MessageSquare /> Give Feedback</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  );
}
