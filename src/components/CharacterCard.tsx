import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Character } from "../types/character";
import { getAvatarStyle } from "../utils/avatar";
import { useHoverPreview } from "../context/HoverPreviewContext";
import { FavoriteButton } from "./FavoriteButton";

interface CharacterCardProps {
  character: Character;
  showChatButton?: boolean;
  onFavoriteToggle?: (isFavorite: boolean) => void;
}

const statusColor: Record<Character["status"], string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
};

export function CharacterCard({ character, showChatButton = false, onFavoriteToggle }: CharacterCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const { showPreview, hidePreview } = useHoverPreview();

  const goToChat = () => {
    hidePreview();
    navigate(`/chat/${character.id}`);
  };

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
        <FavoriteButton
          characterId={character.id}
          size={16}
          onToggle={onFavoriteToggle}
          className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/90"
        />
        <span
          className={`absolute top-5 right-3 w-3 h-3 rounded-full ${statusColor[character.status]} shadow-[0_0_0_3px_var(--bg-surface)]`}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[var(--text-primary)] text-[15px]">{character.name}</h3>
        <p className="text-xs text-[var(--text-muted)] mb-3">{character.shortDescription}</p>
        <div className={`flex gap-2 flex-wrap ${showChatButton ? "mb-3" : ""}`}>
          {character.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/15 text-[var(--accent-indigo)]"
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