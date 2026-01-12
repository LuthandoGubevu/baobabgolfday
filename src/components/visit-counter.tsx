
"use client";

import { useEffect, useState } from 'react';
import { incrementVisitCount } from '@/actions/site-stats-actions';

export function VisitCounter() {
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    // This effect runs only once on initial component mount on the client.
    // The `hasCounted` state prevents it from running again on re-renders.
    if (!hasCounted) {
      incrementVisitCount();
      setHasCounted(true);
    }
  }, [hasCounted]); // Dependency array ensures this logic is controlled.

  return null; // This component doesn't render anything visible
}
