"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Calendar, Presentation, GanttChartSquare, MessageSquare } from 'lucide-react';

export default function ManagementDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarNav = (
    <SidebarMenu>
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
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/management/feedback')}>
          <Link href="/dashboard/management/feedback"><MessageSquare /> Student Feedback</Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );

  return <DashboardLayout sidebarContent={sidebarNav}>{children}</DashboardLayout>;
}
