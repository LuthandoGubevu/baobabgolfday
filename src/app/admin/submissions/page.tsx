import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function AdminSubmissionsPage() {
  return (
    <SectionWrapper id="admin-submissions-page" className="min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          <ShieldAlert className="h-12 w-12"/> Admin Area: Submissions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This area is for administrators to view registration and donation submissions.
        </p>
      </div>
      <Card className="max-w-2xl mx-auto bg-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Submission Data</CardTitle>
          <CardDescription className="text-muted-foreground">
            In a full application, submitted forms and uploaded files would be displayed here after proper authentication and backend integration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Currently, form submissions are logged to the server console for demonstration purposes.
            A complete implementation would require:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 text-muted-foreground">
            <li>User authentication and authorization for admin access.</li>
            <li>A database to store submission data.</li>
            <li>Secure file storage for uploaded proofs of payment.</li>
            <li>An interface to list, view, and manage submissions.</li>
          </ul>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
