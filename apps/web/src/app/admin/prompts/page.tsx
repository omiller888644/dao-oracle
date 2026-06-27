import { AdminShell } from "@/components/admin-shell";

export default function AdminPromptsPage() {
  return (
    <AdminShell
      title="Prompts"
      description="Prompt versions control the boundary between fixed hexagram knowledge and personalized model interpretation."
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-mist">
        Active and draft prompt versions will be managed here.
      </div>
    </AdminShell>
  );
}
