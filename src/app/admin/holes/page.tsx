
"use client";

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, doc, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Loader2, Golf, CircleCheck, CircleHelp, CircleX, RefreshCw, AlertTriangle } from "lucide-react";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
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
} from "@/components/ui/alert-dialog"

type HoleStatus = 'available' | 'pending' | 'confirmed';
interface Hole {
  id: string;
  status: HoleStatus;
  bookingId?: string;
  companyName?: string;
  contactName?: string;
  email?: string;
}

const statusConfig: Record<HoleStatus, {
    label: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
}> = {
    available: { label: 'Available', icon: CircleCheck, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    pending: { label: 'Pending Confirmation', icon: CircleHelp, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    confirmed: { label: 'Confirmed', icon: Golf, color: 'text-red-500', bgColor: 'bg-red-500/10' },
};

export default function AdminHolesPage() {
  const [holes, setHoles] = useState<Hole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "holes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedHoles: Hole[] = [];
      querySnapshot.forEach((doc) => {
        fetchedHoles.push({ id: doc.id, ...doc.data() } as Hole);
      });
      fetchedHoles.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      setHoles(fetchedHoles);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching holes:", err);
      setError("Failed to load hole statuses. Please check permissions and try again.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAction = async (action: 'confirm' | 'release', holeId: string, bookingId?: string) => {
    setIsSubmitting(holeId);
    try {
        if (action === 'confirm' && bookingId) {
            const holeRef = doc(db, "holes", holeId);
            await runTransaction(db, async (transaction) => {
                const holeDoc = await transaction.get(holeRef);
                if (!holeDoc.exists() || holeDoc.data().bookingId !== bookingId) {
                    throw new Error("Hole status has changed or booking ID does not match.");
                }
                transaction.update(holeRef, { status: "confirmed" });
            });
            toast({ title: "Success", description: `Hole ${holeId} has been confirmed.` });
        } else if (action === 'release') {
            const holeRef = doc(db, "holes", holeId);
            await updateDoc(holeRef, {
                status: "available",
                bookingId: null,
                companyName: null,
                contactName: null,
                email: null,
            });
            toast({ title: "Success", description: `Hole ${holeId} is now available.` });
        } else {
            throw new Error("Invalid action or missing booking ID.");
        }
    } catch (err: any) {
        console.error("Admin action failed:", err);
        toast({ title: "Action Failed", description: err.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
        setIsSubmitting(null);
    }
  };


  return (
    <div id="admin-holes-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          <Golf className="h-12 w-12"/> Hole Sponsorship Status
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manually confirm and manage the status of each sponsored hole.
        </p>
      </div>

       {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-xl text-muted-foreground">Loading hole statuses...</p>
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

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {holes.map((hole) => {
            const config = statusConfig[hole.status] || statusConfig.available;
            const Icon = config.icon;
            const isActionPending = isSubmitting === hole.id;

            return (
                <Card key={hole.id} className={cn("shadow-lg flex flex-col", config.bgColor)}>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                       <CardTitle className="text-lg font-bold">Hole {hole.id}</CardTitle>
                       <div className={cn("flex items-center gap-2 text-sm font-semibold", config.color)}>
                         <Icon className="h-5 w-5" />
                         <span>{config.label}</span>
                       </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        {hole.status !== 'available' && hole.companyName && (
                             <div>
                                <p className="text-sm font-semibold text-foreground">{hole.companyName}</p>
                                <p className="text-xs text-muted-foreground">{hole.contactName}</p>
                                <p className="text-xs text-muted-foreground">{hole.email}</p>
                             </div>
                        )}
                        {hole.status === 'available' && (
                            <p className="text-sm text-muted-foreground italic">This hole is available for sponsorship.</p>
                        )}
                    </CardContent>
                    <div className="p-4 pt-0 flex gap-2">
                        {hole.status === 'pending' && (
                            <Button size="sm" className="flex-1" onClick={() => handleAction('confirm', hole.id, hole.bookingId)} disabled={isActionPending}>
                                {isActionPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <CircleCheck className="h-4 w-4 mr-2"/>} Confirm
                            </Button>
                        )}

                        {(hole.status === 'pending' || hole.status === 'confirmed') && (
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive" className="flex-1" disabled={isActionPending}>
                                        {isActionPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <CircleX className="h-4 w-4 mr-2"/>} Release
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will make Hole {hole.id} available again. The booking from <span className='font-bold'>{hole.companyName}</span> will lose its pending/confirmed status for this hole. This action cannot be undone.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleAction('release', hole.id)}>
                                        Yes, release hole
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}
