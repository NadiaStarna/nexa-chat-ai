import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import type { Character } from "../types/character";
import { getLastMessagePreview } from "../utils/chatStorage";

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
    <div className="w-72 border-r border-[#1A1A26] flex flex-col shrink-0 hidden md:flex">
      <div className="px-4 py-4 border-b border-[#1A1A26]">
        <div className="flex items-center gap-2 bg-[#12121C] border border-[#1E1E2B] rounded-lg px-3 py-2">
          <IconSearch size={15} className="text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar personaje..."
            className="flex-1 bg-transparent outline-none text-xs placeholder:text-slate-500 text-slate-200"
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
                  : "hover:bg-[#12121C] border-l-2 border-transparent"
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className="w-11 h-11 rounded-full"
                  style={{ background: character.avatarGradient }}
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
                    character.status === "online" ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                  style={{ boxShadow: "0 0 0 2px #0A0A12" }}
                />
              </div>
              <div className="min-w-0">
                <p className={`text-sm truncate ${isActive ? "text-white font-medium" : "text-slate-200"}`}>
                  {character.name}
                </p>
                <p className="text-xs text-slate-500 truncate">
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
