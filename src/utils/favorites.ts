const FAVORITES_KEY = "nexa_favorites";

export function getFavoriteIds(): string[] {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function isFavorite(characterId: string): boolean {
  return getFavoriteIds().includes(characterId);
}

export function toggleFavorite(characterId: string): boolean {
  const current = getFavoriteIds();
  const exists = current.includes(characterId);
  const next = exists
    ? current.filter((id) => id !== characterId)
    : [...current, characterId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return !exists;
}
