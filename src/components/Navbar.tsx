import { NavLink } from "react-router-dom";
import { IconMoon, IconSun, IconUser } from "@tabler/icons-react";
import { NexaLogo } from "./NexaLogo";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/chat", label: "Chat" },
  { to: "/personajes", label: "Personajes" },
  { to: "/historial", label: "Historial" },
  { to: "/favoritos", label: "Favoritos" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[var(--border-soft)]">
      <NavLink to="/">
        <NexaLogo />
      </NavLink>

      <div className="hidden md:flex items-center gap-9 text-sm text-[var(--text-muted)]">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              isActive
                ? "text-[var(--text-primary)] pb-4 border-b-2 border-indigo-400 -mb-4"
                : "hover:text-[var(--text-primary)] transition"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
        >
          {theme === "dark" ? <IconMoon size={20} stroke={1.6} /> : <IconSun size={20} stroke={1.6} />}
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-[var(--border-color)]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8DF7] to-[#C026D3] flex items-center justify-center text-white">
            <IconUser size={16} />
          </div>
          <span className="hidden sm:block text-sm text-[var(--text-primary)]">¡Hola!</span>
        </div>
      </div>
    </nav>
  );
}