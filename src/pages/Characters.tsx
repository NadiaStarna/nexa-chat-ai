import { useMemo, useState } from "react";
import { IconSearch, IconSparkles } from "@tabler/icons-react";
import { characters } from "../data/characters";
import { getCategoryLabel } from "../data/categories";
import { CharacterCard } from "../components/CharacterCard";

export function Characters() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(characters.map((c) => c.category)));
    return ["todos", ...unique];
  }, []);

  const filtered = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "todos" || character.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-6 text-center">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-1">
          Explorá{" "}
          <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#E879F9] bg-clip-text text-transparent">
            personajes
          </span>{" "}
          <IconSparkles className="inline w-5 h-5" />
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          Elegí un personaje y comenzá una conversación única.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-6">
        <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 mb-4">
          <IconSearch size={16} className="text-[var(--text-faint)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar personajes..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-faint)] text-[var(--text-secondary)]"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs px-3 py-1.5 rounded-full transition ${
                  isActive
                    ? "bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] text-white"
                    : "text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-primary)]"
                }`}
              >
                {category === "todos" ? "Todos" : getCategoryLabel(category)}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <p className="text-center text-[var(--text-faint)] text-sm py-10">
            No encontramos personajes con ese filtro.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {filtered.map((character) => (
              <CharacterCard key={character.id} character={character} showChatButton />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
