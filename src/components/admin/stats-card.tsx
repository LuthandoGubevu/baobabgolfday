
"use client";

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Loader2 } from 'lucide-react';

interface VisitStats {
  count: number;
}

export function StatsCard() {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const statsRef = doc(db, 'site_stats', 'visits');

    const unsubscribe = onSnapshot(statsRef, (doc) => {
      if (doc.exists()) {
        setStats(doc.data() as VisitStats);
      } else {
        setStats({ count: 0 }); // Default to 0 if doc doesn't exist
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching visit stats:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Website Visits
        </CardTitle>
        <Eye className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2">
             <Loader2 className="h-6 w-6 animate-spin text-primary" />
             <span className="text-2xl font-bold">Loading...</span>
          </div>
        ) : (
          <div className="text-2xl font-bold">
            {stats ? stats.count.toLocaleString() : '0'}
          </div>
        )}
        <p className="text-xs text-muted-foreground pt-1">
          Total number of unique user sessions.
        </p>
      </CardContent>
    </Card>
  );
}
