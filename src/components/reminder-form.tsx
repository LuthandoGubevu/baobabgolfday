
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";
import { reminderFormSchema, type ReminderFormValues } from "@/lib/schemas";
import { submitEmailForReminder } from "@/actions/reminder-actions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function ReminderForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: ReminderFormValues) => {
    startTransition(async () => {
      const result = await submitEmailForReminder(values);
      if (result.success) {
        toast({
          title: "Thank You!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "An error occurred.",
          variant: "destructive",
        });
        if (result.errors?.email) {
          form.setError("email", { type: 'server', message: result.errors.email.join(', ') });
        }
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-md mx-auto space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email address"
            className="pl-10"
            {...form.register("email")} 
        />
      </div>
      {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
      
      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Notify Me
      </Button>
    </form>
  );
}
