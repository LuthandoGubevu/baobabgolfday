
"use client";

import { useEffect, useState, useTransition } from 'react';
import { collection, getDocs, orderBy, query, Timestamp as FirestoreTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, PackageOpen, MessageSquare, Trash2, Mail, User } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteMessage } from '@/actions/contact-actions';
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
import { ContactFormValues } from '@/lib/schemas';

interface MessageSubmission extends ContactFormValues {
  id: string;
  submittedAt: FirestoreTimestamp | null;
}

function formatTimestamp(timestamp: FirestoreTimestamp | null): string {
  if (!timestamp) return 'N/A';
  return timestamp.toDate().toLocaleString();
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isDeleting, startDeleteTransition] = useTransition();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const messagesCollection = collection(db, "messages");
        const q = query(messagesCollection, orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedMessages: MessageSubmission[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ 
            id: doc.id, 
            ...(doc.data() as ContactFormValues),
            submittedAt: doc.data().submittedAt as FirestoreTimestamp | null 
          });
        });
        setMessages(fetchedMessages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = (messageId: string) => {
    startDeleteTransition(async () => {
        const result = await deleteMessage(messageId);
        if (result.success) {
            toast({ title: "Success", description: result.message });
            setMessages(prev => prev.filter(msg => msg.id !== messageId));
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
    });
  };

  return (
    <div id="admin-messages-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          <MessageSquare className="h-12 w-12"/> Contact Messages
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          View all inquiries submitted through the contact form.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-xl text-muted-foreground">Loading messages...</p>
        </div>
      )}

      {error && (
        <Card className="max-w-2xl mx-auto bg-destructive/10 border-destructive shadow-xl my-6">
          <CardHeader><CardTitle className="text-2xl text-destructive-foreground">Error Loading Data</CardTitle></CardHeader>
          <CardContent><p className="text-destructive-foreground/80">{error}</p></CardContent>
        </Card>
      )}

      {!loading && !error && messages.length === 0 && (
        <Card className="max-w-xl mx-auto bg-card shadow-lg">
            <CardHeader className="items-center text-center">
                <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <CardTitle className="text-2xl text-foreground">No Messages Yet</CardTitle>
                <CardDescription className="text-muted-foreground">
                When a user sends a message via the contact form, it will appear here.
                </CardDescription>
            </CardHeader>
        </Card>
      )}

      {!loading && !error && messages.length > 0 && (
        <Card className="bg-card shadow-xl overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">All Messages</CardTitle>
            <CardDescription className="text-muted-foreground">
              Total messages: {messages.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Received At</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell className="whitespace-nowrap">{formatTimestamp(msg.submittedAt)}</TableCell>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell><a href={`mailto:${msg.email}`} className="text-primary hover:underline">{msg.email}</a></TableCell>
                    <TableCell className="min-w-[300px] whitespace-pre-wrap">{msg.message}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" disabled={isDeleting}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete Message</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the message from <span className="font-bold">{msg.name}</span>. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(msg.id)}>
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
