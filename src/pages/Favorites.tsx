import { useEffect, useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { characters } from "../data/characters";
import { getFavoriteIds } from "../utils/favorites";
import { CharacterCard } from "../components/CharacterCard";
import { BackButton } from "../components/BackButton";

export function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavoriteIds());
  }, []);

  const favoriteCharacters = characters.filter((c) => favoriteIds.includes(c.id));

  const handleToggle = (characterId: string, isFav: boolean) => {
    if (!isFav) {
      setFavoriteIds((current) => current.filter((id) => id !== characterId));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <BackButton />
      <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-1">
        Mis personajes{" "}
        <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#E879F9] bg-clip-text text-transparent">
          favoritos
        </span>
      </h1>
      <p className="text-[var(--text-muted)] text-sm mb-6">
        Tus preferidos, siempre al alcance para chatear cuando quieras. Tocá el corazón para sacar uno.
      </p>

      {favoriteCharacters.length === 0 ? (
        <div className="text-center py-16">
          <IconHeart size={40} className="text-[var(--text-dim)] mx-auto mb-3" />
          <p className="text-[var(--text-faint)] text-sm">
            Todavía no tenés favoritos. Marcá un personaje con el corazón para verlo acá.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {favoriteCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              showChatButton
              onFavoriteToggle={(isFav) => handleToggle(character.id, isFav)}
            />
          ))}
        </div>
      )}
    </div>
  );
}