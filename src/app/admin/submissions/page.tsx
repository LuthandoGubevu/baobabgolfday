
"use client";

import { useEffect, useState, useTransition } from 'react';
import { collection, getDocs, orderBy, query, Timestamp as FirestoreTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, PackageOpen, BookUser, Trash2 } from "lucide-react";
import type { BookingFormValues } from '@/lib/schemas'; // For type safety
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteSubmission } from '@/actions/admin-actions';
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

interface BookingSubmission extends BookingFormValues {
  id: string;
  submittedAt: FirestoreTimestamp | null; // Firestore Timestamp
}

function formatTimestamp(timestamp: FirestoreTimestamp | null): string {
  if (!timestamp) return 'N/A';
  return timestamp.toDate().toLocaleString();
}

function formatSponsorship(submission: BookingFormValues): string {
  const sponsorships = [];
  if (submission.sponsorHole1000) sponsorships.push("Hole (R1000)");
  if (submission.sponsorHole1800) sponsorships.push("Hole (R1800)");
  if (submission.sponsorAuctionPrize) sponsorships.push("Auction/Prize");
  if (submission.donateWithoutAttending) sponsorships.push("Donation Only");
  return sponsorships.length > 0 ? sponsorships.join(', ') : 'None';
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<BookingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isDeleting, startDeleteTransition] = useTransition();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        const bookingsCollection = collection(db, "bookings");
        const q = query(bookingsCollection, orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedSubmissions: BookingSubmission[] = [];
        querySnapshot.forEach((doc) => {
          fetchedSubmissions.push({ 
            id: doc.id, 
            ...(doc.data() as BookingFormValues),
            submittedAt: doc.data().submittedAt as FirestoreTimestamp | null 
          });
        });
        setSubmissions(fetchedSubmissions);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Failed to load submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = (submissionId: string) => {
    startDeleteTransition(async () => {
        const result = await deleteSubmission(submissionId);
        if (result.success) {
            toast({
                title: "Success",
                description: result.message,
            });
            // Optimistically remove the submission from the local state
            setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            });
        }
    });
  };

  return (
    <div id="admin-submissions-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          <BookUser className="h-12 w-12"/> Booking Submissions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          View all golf day registrations and sponsorship bookings.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-xl text-muted-foreground">Loading submissions...</p>
        </div>
      )}

      {error && (
        <Card className="max-w-2xl mx-auto bg-destructive/10 border-destructive shadow-xl my-6">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive-foreground">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground/80">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && submissions.length === 0 && (
        <Card className="max-w-xl mx-auto bg-card shadow-lg">
            <CardHeader className="items-center text-center">
                <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <CardTitle className="text-2xl text-foreground">No Submissions Yet</CardTitle>
                <CardDescription className="text-muted-foreground">
                Once bookings are made, they will appear here.
                </CardDescription>
            </CardHeader>
        </Card>
      )}

      {!loading && !error && submissions.length > 0 && (
        <Card className="bg-card shadow-xl overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">All Bookings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Total submissions: {submissions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Sponsorship</TableHead>
                  <TableHead>Prize Details</TableHead>
                  <TableHead>Hole Req.</TableHead>
                  <TableHead>Payment Ref.</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="whitespace-nowrap">{formatTimestamp(sub.submittedAt)}</TableCell>
                    <TableCell>{sub.companyName}</TableCell>
                    <TableCell>{sub.contactName}</TableCell>
                    <TableCell className="min-w-[200px]">
                      {sub.player1 && <div>1. {sub.player1}</div>}
                      {sub.player2 && <div>2. {sub.player2}</div>}
                      {sub.player3 && <div>3. {sub.player3}</div>}
                      {sub.player4 && <div>4. {sub.player4}</div>}
                    </TableCell>
                    <TableCell>{formatSponsorship(sub)}</TableCell>
                    <TableCell className="min-w-[200px] whitespace-pre-wrap">{sub.auctionPrizeDescription || 'N/A'}</TableCell>
                    <TableCell className="text-center font-bold">{sub.sponsoredHoleNumber || 'N/A'}</TableCell>
                    <TableCell>{sub.paymentReference || 'N/A'}</TableCell>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>{sub.phoneNumber}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" disabled={isDeleting}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete Submission</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the submission from <span className="font-bold">{sub.companyName}</span>.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(sub.id)}>
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
