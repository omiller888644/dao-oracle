import { AdminShell } from "@/components/admin-shell";

export default function AdminFeedbackPage() {
  return (
    <AdminShell
      title="Feedback"
      description="Feedback helps tune the product away from generic, overly mystical, or inaccurate interpretations."
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-mist">
        User feedback labels and comments will appear here.
      </div>
    </AdminShell>
  );
}
