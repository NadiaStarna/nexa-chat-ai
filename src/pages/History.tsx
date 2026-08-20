import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch, IconCalendar, IconChevronDown } from "@tabler/icons-react";
import { characters, getCharacterById } from "../data/characters";
import { getAllConversations, type ConversationEntry } from "../utils/chatStorage";
import { getRelativeDayLabel } from "../utils/dateLabels";
import { isFavorite } from "../utils/favorites";
import { Avatar } from "../components/Avatar";
import { FavoriteButton } from "../components/FavoriteButton";
import { BackButton } from "../components/BackButton";

type StatusFilter = "todos" | "favoritos";

export function History() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationEntry[]>([]);
  const [search, setSearch] = useState("");
  const [characterFilter, setCharacterFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [favoritesVersion, setFavoritesVersion] = useState(0);

  useEffect(() => {
    setConversations(getAllConversations());
  }, []);

  const filtered = useMemo(() => {
    return conversations.filter((entry) => {
      const character = getCharacterById(entry.characterId);
      if (!character) return false;

      const matchesSearch =
        character.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.lastMessage.toLowerCase().includes(search.toLowerCase());

      const matchesCharacter = characterFilter === "todos" || entry.characterId === characterFilter;

      const matchesStatus = statusFilter === "todos" || isFavorite(entry.characterId);

      const entryDate = new Date(entry.lastMessageAt);
      const matchesFrom = !dateFrom || entryDate >= new Date(dateFrom);
      const matchesTo = !dateTo || entryDate <= new Date(`${dateTo}T23:59:59`);

      return matchesSearch && matchesCharacter && matchesStatus && matchesFrom && matchesTo;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations, search, characterFilter, statusFilter, dateFrom, dateTo, favoritesVersion]);

  const clearFilters = () => {
    setCharacterFilter("todos");
    setStatusFilter("todos");
    setDateFrom("");
    setDateTo("");
    setSearch("");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-1">
        Historial de{" "}
        <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#E879F9] bg-clip-text text-transparent">
          conversaciones
        </span>
      </h1>
      <p className="text-[var(--text-muted)] text-sm mb-6">Reviví tus conversaciones cuando quieras.</p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 mb-5">
            <IconSearch size={16} className="text-[var(--text-faint)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en tu historial..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-faint)] text-[var(--text-secondary)]"
            />
          </div>

          {conversations.length === 0 ? (
            <p className="text-center text-[var(--text-faint)] text-sm py-10">
              Todavía no tenés conversaciones. Andá al Chat y empezá a hablar con algún personaje.
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[var(--text-faint)] text-sm py-10">
              No encontramos conversaciones con esos filtros.
            </p>
          ) : (
            <div className="space-y-2">
              {filtered.map((entry) => {
                const character = getCharacterById(entry.characterId)!;

                return (
                  <div
                    key={entry.characterId}
                    onClick={() => navigate(`/chat/${entry.characterId}`)}
                    className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl px-4 py-3 flex items-center gap-3 hover:border-indigo-500/40 transition cursor-pointer"
                  >
                    <Avatar character={character} size={40} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-primary)]">{character.name}</p>
                      <p className="text-xs text-[var(--text-faint)] truncate">{entry.lastMessage}</p>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <p className="text-xs text-[var(--text-faint)]">{getRelativeDayLabel(entry.lastMessageAt)}</p>
                      <FavoriteButton
                        characterId={entry.characterId}
                        size={15}
                        onToggle={() => setFavoritesVersion((v) => v + 1)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-full md:w-64 shrink-0">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--text-primary)]">Filtros</p>
              <button onClick={clearFilters} className="text-xs text-[var(--accent-indigo)] hover:text-[var(--accent-indigo)]">
                Limpiar
              </button>
            </div>

            <div>
              <p className="text-xs text-[var(--text-muted)] mb-2">Rango de fechas</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-muted)]">
                  <IconCalendar size={14} />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-[var(--text-secondary)]"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-muted)]">
                  <IconCalendar size={14} />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-[var(--text-secondary)]"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-[var(--text-muted)] mb-2">Personaje</p>
              <div className="relative">
                <select
                  value={characterFilter}
                  onChange={(e) => setCharacterFilter(e.target.value)}
                  className="w-full appearance-none text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-secondary)] outline-none"
                >
                  <option value="todos">Todos los personajes</option>
                  {characters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <IconChevronDown size={14} className="absolute right-3 top-2.5 text-[var(--text-faint)] pointer-events-none" />
              </div>
            </div>

            <div>
              <p className="text-xs text-[var(--text-muted)] mb-2">Estado</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter("todos")}
                  className={`flex-1 text-xs py-1.5 rounded-lg transition ${
                    statusFilter === "todos"
                      ? "bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] text-white"
                      : "text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setStatusFilter("favoritos")}
                  className={`flex-1 text-xs py-1.5 rounded-lg transition ${
                    statusFilter === "favoritos"
                      ? "bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] text-white"
                      : "text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  Favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}