import { useNavigate } from "react-router-dom";
import type { Character } from "../types/character";

interface CharacterCardProps {
  character: Character;
}

const statusColor: Record<Character["status"], string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
};

export function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/chat/${character.id}`)}
      className="text-left bg-[#12121C] border border-[#1E1E2B] rounded-2xl overflow-hidden hover:border-indigo-500/40 transition"
    >
      <div
        className="relative h-44"
        style={{ background: character.avatarGradient }}
      >
        <span
          className={`absolute top-3 right-3 w-3 h-3 rounded-full ${statusColor[character.status]} shadow-[0_0_0_3px_#12121C]`}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white text-[15px]">{character.name}</h3>
        <p className="text-xs text-slate-400 mb-3">{character.shortDescription}</p>
        <div className="flex gap-2 flex-wrap">
          {character.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
