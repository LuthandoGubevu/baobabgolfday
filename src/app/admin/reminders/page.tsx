
"use client";

import { useEffect, useState, useTransition } from 'react';
import { collection, getDocs, orderBy, query, Timestamp as FirestoreTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, PackageOpen, BellRing, Trash2, Mail } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteReminder } from '@/actions/reminder-actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReminderFormValues } from '@/lib/schemas';

interface ReminderSubmission extends ReminderFormValues {
  id: string;
  submittedAt: FirestoreTimestamp | null;
}

function formatTimestamp(timestamp: FirestoreTimestamp | null): string {
  if (!timestamp) return 'N/A';
  return timestamp.toDate().toLocaleString();
}

export default function AdminRemindersPage() {
  const [reminders, setReminders] = useState<ReminderSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isDeleting, startDeleteTransition] = useTransition();

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setLoading(true);
        setError(null);
        const remindersCollection = collection(db, "reminders");
        const q = query(remindersCollection, orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedReminders: ReminderSubmission[] = [];
        querySnapshot.forEach((doc) => {
          fetchedReminders.push({ 
            id: doc.id, 
            ...(doc.data() as ReminderFormValues),
            submittedAt: doc.data().submittedAt as FirestoreTimestamp | null 
          });
        });
        setReminders(fetchedReminders);
      } catch (err) {
        console.error("Error fetching reminders:", err);
        setError("Failed to load reminder signups. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  const handleDelete = (reminderId: string, email: string) => {
    startDeleteTransition(async () => {
        const result = await deleteReminder(reminderId);
        if (result.success) {
            toast({ title: "Success", description: result.message });
            setReminders(prev => prev.filter(msg => msg.id !== reminderId));
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
    });
  };

  return (
    <div id="admin-reminders-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          <BellRing className="h-12 w-12"/> Reminder Signups
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          View all users who requested a reminder for when registrations open.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-xl text-muted-foreground">Loading reminders...</p>
        </div>
      )}

      {error && (
        <Card className="max-w-2xl mx-auto bg-destructive/10 border-destructive shadow-xl my-6">
          <CardHeader><CardTitle className="text-2xl text-destructive-foreground">Error Loading Data</CardTitle></CardHeader>
          <CardContent><p className="text-destructive-foreground/80">{error}</p></CardContent>
        </Card>
      )}

      {!loading && !error && reminders.length === 0 && (
        <Card className="max-w-xl mx-auto bg-card shadow-lg">
            <CardHeader className="items-center text-center">
                <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <CardTitle className="text-2xl text-foreground">No Signups Yet</CardTitle>
                <CardDescription className="text-muted-foreground">
                When a user signs up for a reminder, their email will appear here.
                </CardDescription>
            </CardHeader>
        </Card>
      )}

      {!loading && !error && reminders.length > 0 && (
        <Card className="bg-card shadow-xl overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">All Reminder Signups</CardTitle>
            <CardDescription className="text-muted-foreground">
              Total signups: {reminders.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reminders.map((reminder) => (
                  <TableRow key={reminder.id}>
                    <TableCell className="whitespace-nowrap">{formatTimestamp(reminder.submittedAt)}</TableCell>
                    <TableCell><a href={`mailto:${reminder.email}`} className="text-primary hover:underline">{reminder.email}</a></TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" disabled={isDeleting}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete Reminder</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the reminder request for <span className="font-bold">{reminder.email}</span>. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(reminder.id, reminder.email)}>
                                {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Yes, delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
