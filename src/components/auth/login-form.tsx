"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Mail, KeyRound, User } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(1, { message: "Username or Email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  role: z.enum(["student", "teacher", "management"]),
});

type LoginFormProps = {
  onRegisterClick: () => void;
};

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "student",
    },
  });
  
  const selectedRole = form.watch("role");

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.role === "management") {
      if (values.username.toUpperCase() === "SAHITHI" && values.password === "sahithi@8790") {
        toast({
          title: "Login Successful",
          description: "Redirecting to management dashboard...",
        });
        router.push(`/dashboard/management`);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check your username and password.",
        });
      }
      return;
    }
    
    // For student and teacher, we'd normally check against a database.
    // For now, we'll just log them in for demonstration purposes.
    console.log(values);
    toast({
      title: "Login Successful",
      description: `Redirecting to your dashboard...`,
    });
    router.push(`/dashboard/${values.role}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{selectedRole === "management" ? "Username" : "Email"}</FormLabel>
              <FormControl>
                <div className="relative">
                    {selectedRole === 'management' ? (
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                    <Input 
                      placeholder={selectedRole === "management" ? "SAHITHI" : "name@example.com"} 
                      {...field} 
                      className="pl-10" 
                    />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Login</Button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={onRegisterClick}>
            Register
          </Button>
        </p>
      </form>
    </Form>
  );
}
