"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StudentSidebarNav } from "./_components/student-sidebar";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout sidebarContent={<StudentSidebarNav />}>{children}</DashboardLayout>;
}
