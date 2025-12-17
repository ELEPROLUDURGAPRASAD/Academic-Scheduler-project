"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { FileText, Upload, CalendarClock } from 'lucide-react';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarNav = (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === '/dashboard/teacher' || pathname.startsWith('/dashboard/teacher/assignments')}>
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
    </SidebarMenu>
  );

  return <DashboardLayout sidebarContent={sidebarNav}>{children}</DashboardLayout>;
}
