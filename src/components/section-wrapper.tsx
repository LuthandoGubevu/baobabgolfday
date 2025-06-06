import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
  className?: string;
  containerClassName?: string;
  alternateBackground?: boolean;
}

export function SectionWrapper({ 
  id, 
  children, 
  className, 
  containerClassName,
  alternateBackground = false,
  ...props 
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "py-16 md:py-24", 
        alternateBackground ? "bg-secondary" : "bg-background",
        className
      )} 
      {...props}
    >
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
