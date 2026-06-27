import Link from "next/link";
import type { ReactNode } from "react";
import { adminRoutes } from "@/lib/admin/admin-routes";

interface AdminShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AdminShell({ title, description, children }: AdminShellProps) {
  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Link className="font-serif text-2xl text-white" href="/">
            Dao Oracle
          </Link>
          <p className="mt-2 text-sm text-mist">Admin MVP</p>
          <nav className="mt-8 grid gap-2">
            {adminRoutes.map((route) => (
              <Link
                className="rounded-xl px-3 py-2 text-sm text-mist transition hover:bg-white/5 hover:text-gold"
                href={route.path}
                key={route.path}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section>
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Dao Oracle Operations
            </p>
            <h1 className="mt-4 font-serif text-5xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-mist">
              {description}
            </p>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
