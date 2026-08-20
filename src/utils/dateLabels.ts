export function getRelativeDayLabel(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) / (1000 * 60 * 60 * 24)
  );

  const time = date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

  if (diffDays === 0) return `Hoy, ${time}`;
  if (diffDays === 1) return `Ayer, ${time}`;
  if (diffDays < 7) return `Hace ${diffDays} días`;

  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
}
