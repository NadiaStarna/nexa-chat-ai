import type { Character } from "../types/character";
import { getAvatarStyle } from "../utils/avatar";

interface AvatarProps {
  character: Character;
  size: number;
  className?: string;
}

export function Avatar({ character, size, className = "" }: AvatarProps) {
  const baseClass = "rounded-full flex items-center justify-center overflow-hidden shrink-0";
  const combinedClass = className ? baseClass + " " + className : baseClass;

  return (
    <div
      className={combinedClass}
      style={{ width: size, height: size, ...getAvatarStyle(character) }}
    >
      {!character.imageUrl && (
        <span style={{ fontSize: size * 0.45, lineHeight: 1 }}>{character.emoji}</span>
      )}
    </div>
  );
}
