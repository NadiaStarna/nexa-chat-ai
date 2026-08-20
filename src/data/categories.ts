export const categoryLabels: Record<string, string> = {
  fantasia: "Fantasía",
  humor: "Humor",
  intelectuales: "Intelectuales",
  accion: "Acción",
  misterio: "Misterio",
};

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] ?? category;
}
