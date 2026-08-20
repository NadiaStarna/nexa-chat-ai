import { useEffect, useMemo, useRef, useState } from "react";
import { IconSearch, IconSparkles, IconMenu2, IconCheck } from "@tabler/icons-react";
import { characters } from "../data/characters";
import { getCategoryLabel } from "../data/categories";
import { CharacterCard } from "../components/CharacterCard";
import { BackButton } from "../components/BackButton";

export function Characters() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(characters.map((c) => c.category)));
    return ["todos", ...unique];
  }, []);

  const filtered = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "todos" || character.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 pt-6">
        <BackButton />
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-6 text-center">
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg px-4 py-2.5">
            <IconSearch size={16} className="text-[var(--text-faint)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar personajes..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-faint)] text-[var(--text-secondary)]"
            />
          </div>

          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Filtrar por categoría"
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-lg border transition ${
                activeCategory !== "todos"
                  ? "border-indigo-500/50 text-[var(--accent-indigo)] bg-indigo-500/10"
                  : "border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <IconMenu2 size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden py-1 z-50">
                {categories.map((category) => {
                  const isActive = category === activeCategory;
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition"
                    >
                      {category === "todos" ? "Todos" : getCategoryLabel(category)}
                      {isActive && <IconCheck size={14} className="text-[var(--accent-indigo)]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
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