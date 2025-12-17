"use client";

import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarTrigger,
    SidebarInset,
  } from '@/components/ui/sidebar';
import { GraduationCap, UserCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Link from 'next/link';

type DashboardLayoutProps = {
    children: React.ReactNode;
    sidebarContent: React.ReactNode;
};

export function DashboardLayout({ children, sidebarContent }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary rounded-lg p-2">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-semibold font-headline">AcademiaFlow</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    {sidebarContent}
                </SidebarContent>
                <SidebarFooter>
                    {/* can add footer content here if needed */}
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 items-center justify-between lg:justify-end gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
                    <SidebarTrigger className="lg:hidden"/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <UserCircle className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/login">Logout</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-4 sm:p-6 bg-muted/40">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}