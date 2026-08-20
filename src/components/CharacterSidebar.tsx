import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import type { Character } from "../types/character";
import { getLastMessagePreview } from "../utils/chatStorage";
import { Avatar } from "./Avatar";

interface CharacterSidebarProps {
  characters: Character[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CharacterSidebar({ characters, activeId, onSelect }: CharacterSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-72 border-r border-[var(--border-soft)] flex flex-col shrink-0 hidden md:flex">
      <div className="px-4 py-4 border-b border-[var(--border-soft)]">
        <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg px-3 py-2">
          <IconSearch size={15} className="text-[var(--text-faint)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar personaje..."
            className="flex-1 bg-transparent outline-none text-xs placeholder:text-[var(--text-faint)] text-[var(--text-secondary)]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((character) => {
          const isActive = character.id === activeId;
          const preview = getLastMessagePreview(character.id);

          return (
            <button
              key={character.id}
              onClick={() => onSelect(character.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                isActive
                  ? "bg-indigo-500/10 border-l-2 border-indigo-400"
                  : "hover:bg-[var(--bg-surface)] border-l-2 border-transparent"
              }`}
            >
              <div className="relative shrink-0">
                <Avatar character={character} size={44} />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
                    character.status === "online" ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                  style={{ boxShadow: "0 0 0 2px var(--bg-app)" }}
                />
              </div>
              <div className="min-w-0">
                <p className={`text-sm truncate ${isActive ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}`}>
                  {character.name}
                </p>
                <p className="text-xs text-[var(--text-faint)] truncate">
                  {preview ?? "Empezá una conversación"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
