import { useTheme } from "../context/ThemeContext";

interface NexaLogoProps {
  height?: number;
}

export function NexaLogo({ height = 26 }: NexaLogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark" ? "/nexa-wordmark-white.png" : "/nexa-wordmark.png";

  return <img src={src} alt="Nexa" style={{ height }} className="w-auto" />;
}