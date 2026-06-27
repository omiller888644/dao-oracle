import { AdminShell } from "@/components/admin-shell";
import { loadHexagramSeed } from "@/lib/hexagrams/load-source";

export default function AdminHexagramsPage() {
  const hexagrams = loadHexagramSeed();

  return (
    <AdminShell
      title="Hexagrams"
      description="The 64 fixed records are the source of truth for every reading. The model may personalize these records, but it must not invent meanings."
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-gold">{hexagrams.length} records loaded from seed.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {hexagrams.slice(0, 8).map((hexagram) => (
            <div className="rounded-xl bg-black/20 p-4" key={hexagram.number}>
              <p className="text-sm text-gold">Hexagram {hexagram.number}</p>
              <h2 className="font-serif text-xl">{hexagram.title_en}</h2>
              <p className="mt-2 text-sm text-mist">{hexagram.core_en}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
