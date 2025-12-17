"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { FileText, Upload, CalendarClock, LayoutDashboard, Calendar, Presentation, GanttChartSquare } from 'lucide-react';

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

  return <DashboardLayout sidebarContent={sidebarNav}>{children}</DashboardLayout>;
}
