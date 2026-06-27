import { AdminShell } from "@/components/admin-shell";

export default function AdminReadingsPage() {
  return (
    <AdminShell
      title="Readings"
      description="This section will show user questions, question types, line casts, selected hexagrams, and conversion into result views."
    >
      <EmptyState label="Readings will appear here after Supabase Staging is connected." />
    </AdminShell>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-mist">{label}</div>;
}
