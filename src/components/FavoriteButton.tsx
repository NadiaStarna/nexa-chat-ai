import { useState } from "react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

interface FavoriteButtonProps {
  characterId: string;
  size?: number;
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
}

export function FavoriteButton({ characterId, size = 16, className = "", onToggle }: FavoriteButtonProps) {
  const [fav, setFav] = useState(() => isFavorite(characterId));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nowFav = toggleFavorite(characterId);
    setFav(nowFav);
    onToggle?.(nowFav);
  };

  return (
    <button onClick={handleClick} aria-label="Marcar como favorito" className={className}>
      {fav ? (
        <IconHeartFilled size={size} className="text-pink-400" />
      ) : (
        <IconHeart size={size} className="text-current hover:text-pink-400 transition" />
      )}
    </button>
  );
}