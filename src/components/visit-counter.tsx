
"use client";

import { useEffect } from 'react';
import { incrementVisitCount } from '@/actions/site-stats-actions';

const SESSION_STORAGE_KEY = 'visit-counted';

export function VisitCounter() {
  useEffect(() => {
    // Check if the visit has already been counted in this session
    const visitCounted = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!visitCounted) {
      // If not counted, call the server action to increment
      incrementVisitCount();
      
      // Mark this session as counted
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    }
  }, []);

  return null; // This component doesn't render anything visible
}
