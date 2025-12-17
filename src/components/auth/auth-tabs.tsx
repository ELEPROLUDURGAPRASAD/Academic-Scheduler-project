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
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Tabs defaultValue="login" className="w-full max-w-md" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">Register</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Choose your role to get started. Only for Students and Teachers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudentTeacherRegisterForm onLoginClick={() => setActiveTab("login")} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login to Your Account</CardTitle>
            <CardDescription>
              Select your role and enter your credentials to access your dashboard.
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
