import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Character } from "../types/character";
import { getAvatarStyle } from "../utils/avatar";
import { useHoverPreview } from "../context/HoverPreviewContext";

interface CharacterCardProps {
  character: Character;
  showChatButton?: boolean;
}

const statusColor: Record<Character["status"], string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
};

export function CharacterCard({ character, showChatButton = false }: CharacterCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const { showPreview, hidePreview } = useHoverPreview();

  const goToChat = () => navigate(`/chat/${character.id}`);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      showPreview(character, cardRef.current.getBoundingClientRect());
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={goToChat}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hidePreview}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToChat()}
      className="text-left bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="relative h-40 md:h-44 flex items-center justify-center overflow-hidden" style={getAvatarStyle(character)}>
        {!character.imageUrl && (
          <span className="text-5xl drop-shadow-lg">{character.emoji}</span>
        )}
        <span
          className={`absolute top-3 right-3 w-3 h-3 rounded-full ${statusColor[character.status]} shadow-[0_0_0_3px_var(--bg-surface)]`}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[var(--text-primary)] text-[15px]">{character.name}</h3>
        <p className="text-xs text-[var(--text-muted)] mb-3">{character.shortDescription}</p>
        <div className={`flex gap-2 flex-wrap ${showChatButton ? "mb-3" : ""}`}>
          {character.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
        {showChatButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToChat();
            }}
            className="w-full text-xs text-center py-2 rounded-lg bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] text-white hover:opacity-90 transition"
          >
            Chatear
          </button>
        )}
      </div>
    </div>
  );
}