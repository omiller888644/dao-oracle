import { AdminShell } from "@/components/admin-shell";

export default function AdminInterpretationsPage() {
  return (
    <AdminShell
      title="Interpretations"
      description="Review generated readings, model source, prompt version, output quality, and failure cases."
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-mist">
        AI interpretation logs will appear here after persistence is connected.
      </div>
    </AdminShell>
  );
}
