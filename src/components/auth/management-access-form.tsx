"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { automateManagementCredentialDelivery } from "@/ai/flows/automate-management-credential-delivery";
import { useState } from "react";
import { Mail, Building2 } from 'lucide-react';
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export function ManagementAccessForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // The password would be generated securely on the server.
      const generatedPassword = Math.random().toString(36).slice(-8);
      
      const result = await automateManagementCredentialDelivery({
        email: values.email,
        password: generatedPassword,
      });

      if (result.success) {
        toast({
          title: "Credentials Sent",
          description: result.message,
        });
        // This is a placeholder for a better UX, like redirecting to a "check your email" page
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormLabel className="flex items-center gap-2 font-semibold">
          <Building2 className="h-5 w-5" />
          <span>Management Access</span>
        </FormLabel>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter your management email" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormDescription>
                We'll email you temporary credentials to access the management dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending Credentials..." : "Request Access"}
        </Button>
      </form>
    </Form>
  );
}
