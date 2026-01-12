
"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import type { ReactNode } from "react";

interface ImageDialogProps {
  src: string;
  alt: string;
  children: ReactNode;
}

export function ImageDialog({ src, alt, children }: ImageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl h-auto p-2 bg-black border-border">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="relative aspect-video">
          <Image 
            src={src} 
            alt={alt} 
            fill
            sizes="100vw"
            className="object-contain" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
