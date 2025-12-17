"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentTeacherRegisterForm } from "./student-teacher-register-form";
import { ManagementAccessForm } from "./management-access-form";
import { LoginForm } from "./login-form";

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <Tabs defaultValue="register" className="w-full max-w-md" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">Register</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Choose your role to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudentTeacherRegisterForm onLoginClick={() => setActiveTab("login")} />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <ManagementAccessForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onRegisterClick={() => setActiveTab("register")} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
