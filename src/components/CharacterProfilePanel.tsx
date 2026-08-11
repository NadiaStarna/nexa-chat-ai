import { IconMessageCircle, IconSparkles, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import type { Character } from "../types/character";

interface CharacterProfilePanelProps {
  character: Character;
}

export function CharacterProfilePanel({ character }: CharacterProfilePanelProps) {
  const navigate = useNavigate();

  return (
    <div className="w-72 p-6 flex-col items-center text-center shrink-0 hidden lg:flex">
      <div
        className="w-24 h-24 rounded-full mb-4"
        style={{ background: character.avatarGradient }}
      />
      <h3 className="text-white font-medium">{character.name}</h3>
      <p className="text-xs text-slate-500 mb-5">{character.shortDescription}</p>

      <p className="text-xs text-slate-400 leading-relaxed mb-6">{character.bio}</p>

      <div className="w-full text-left space-y-4">
        <div>
          <p className="text-[11px] text-indigo-400 flex items-center gap-1.5 mb-1">
            <IconMessageCircle size={13} /> Estilo de charla
          </p>
          <p className="text-xs text-slate-400">{character.chatStyle}</p>
        </div>
        <div>
          <p className="text-[11px] text-fuchsia-400 flex items-center gap-1.5 mb-1">
            <IconSparkles size={13} /> Temas favoritos
          </p>
          <p className="text-xs text-slate-400">{character.favoriteTopics.join(", ")}</p>
        </div>
        <div>
          <p className="text-[11px] text-rose-400 flex items-center gap-1.5 mb-1">
            <IconX size={13} /> No le gusta
          </p>
          <p className="text-xs text-slate-400">{character.dislikes}</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/personajes")}
        className="mt-6 text-xs text-indigo-300 border border-indigo-500/30 rounded-lg px-4 py-2 w-full hover:bg-indigo-500/10 transition"
      >
        Ver perfil completo
      </button>
    </div>
  );
}
