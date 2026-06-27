import { AdminShell } from "@/components/admin-shell";
import { adminRoutes } from "@/lib/admin/admin-routes";

export default function AdminPage() {
  return (
    <AdminShell
      title="Operations overview"
      description="This admin MVP defines the operating surface for readings, prompts, feedback, and SEO/GEO content. Supabase data wiring comes after staging credentials are connected."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {adminRoutes.slice(1).map((route) => (
          <article
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            key={route.path}
          >
            <h2 className="font-serif text-2xl">{route.label}</h2>
            <p className="mt-3 text-mist">{route.description}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
