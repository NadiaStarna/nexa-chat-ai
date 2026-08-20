import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1.5 text-sm text-[var(--text-faint)] hover:text-[var(--text-primary)] transition mb-4"
    >
      <IconArrowLeft size={16} /> Volver
    </button>
  );
}