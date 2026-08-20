import { IconMessageCircle, IconSparkles, IconX } from "@tabler/icons-react";
import { useHoverPreview } from "../context/HoverPreviewContext";
import { getAvatarStyle } from "../utils/avatar";

const PANEL_WIDTH = 260;
const GAP = 14;

export function HoverPreviewPanel() {
  const { preview } = useHoverPreview();

  if (!preview) return null;

  const { character, rect } = preview;

  const spaceOnRight = window.innerWidth - rect.right;
  const openLeft = spaceOnRight < PANEL_WIDTH + GAP + 16;

  const rawLeft = openLeft ? rect.left - PANEL_WIDTH - GAP : rect.right + GAP;
  const left = Math.min(Math.max(rawLeft, 8), window.innerWidth - PANEL_WIDTH - 8);
  const maxTop = window.innerHeight - 340;
  const top = Math.max(12, Math.min(rect.top, maxTop));

  return (
    <div
      className="fixed z-[100] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-5 shadow-2xl pointer-events-none animate-[fadeIn_0.15s_ease-out]"
      style={{ left, top, width: PANEL_WIDTH }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-2xl"
          style={getAvatarStyle(character)}
        >
          {!character.imageUrl && character.emoji}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{character.name}</p>
          <p className="text-xs text-[var(--text-faint)]">{character.shortDescription}</p>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{character.bio}</p>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--accent-indigo)] flex items-center gap-1 mb-1">
            <IconMessageCircle size={12} /> Estilo de charla
          </p>
          <p className="text-xs text-[var(--text-muted)]">{character.chatStyle}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--accent-fuchsia)] flex items-center gap-1 mb-1">
            <IconSparkles size={12} /> Temas favoritos
          </p>
          <p className="text-xs text-[var(--text-muted)]">{character.favoriteTopics.join(", ")}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--accent-rose)] flex items-center gap-1 mb-1">
            <IconX size={12} /> No le gusta
          </p>
          <p className="text-xs text-[var(--text-muted)]">{character.dislikes}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        {character.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-[var(--accent-indigo)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}