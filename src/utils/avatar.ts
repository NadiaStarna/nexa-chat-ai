import type { CSSProperties } from "react";
import type { Character } from "../types/character";

export function getAvatarStyle(character: Character): CSSProperties {
  if (character.imageUrl) {
    return {
      backgroundImage: `url(${character.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center 25%",    
    };
  }
  return { background: character.avatarGradient };
}
