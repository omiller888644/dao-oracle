import { AdminShell } from "@/components/admin-shell";
import { publicRoutes } from "@/lib/site/routes";

export default function AdminSeoPagesPage() {
  return (
    <AdminShell
      title="SEO/GEO pages"
      description="Track crawlable pages built for Google, Bing, Perplexity, ChatGPT-style answers, and Western-market independent site growth."
    >
      <div className="grid gap-3">
        {publicRoutes.map((route) => (
          <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4" key={route.path}>
            <p className="text-sm text-gold">{route.path}</p>
            <h2 className="font-serif text-xl">{route.title}</h2>
            <p className="mt-2 text-sm text-mist">{route.description}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
