import { createContext, useContext, useState, type ReactNode } from "react";
import type { Character } from "../types/character";

interface HoverPreviewState {
  character: Character;
  rect: DOMRect;
}

interface HoverPreviewContextValue {
  preview: HoverPreviewState | null;
  showPreview: (character: Character, rect: DOMRect) => void;
  hidePreview: () => void;
}

const HoverPreviewContext = createContext<HoverPreviewContextValue | undefined>(undefined);

export function HoverPreviewProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<HoverPreviewState | null>(null);

  const showPreview = (character: Character, rect: DOMRect) => {
    setPreview({ character, rect });
  };

  const hidePreview = () => setPreview(null);

  return (
    <HoverPreviewContext.Provider value={{ preview, showPreview, hidePreview }}>
      {children}
    </HoverPreviewContext.Provider>
  );
}

export function useHoverPreview(): HoverPreviewContextValue {
  const context = useContext(HoverPreviewContext);
  if (!context) throw new Error("useHoverPreview debe usarse dentro de un HoverPreviewProvider");
  return context;
}