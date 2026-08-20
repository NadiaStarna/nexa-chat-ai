import { IconGitCommit } from "@tabler/icons-react";

export function DevBanner() {
  return (
    <a
      href="https://github.com/NadiaStarna/nexa-chat-ai/commits/main"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] text-white text-xs font-medium px-4 py-2 hover:opacity-90 transition"
    >
      <IconGitCommit size={14} />
      Proyecto en mejora activa — mirá los commits en vivo en GitHub
    </a>
  );
}