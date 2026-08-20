import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { IconMoon, IconSun, IconChevronDown, IconUser, IconSettings, IconLogout } from "@tabler/icons-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 pl-3 border-l border-[var(--border-color)]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8DF7] to-[#C026D3] flex items-center justify-center text-xs font-medium text-white">
              N
            </div>
            <span className="hidden sm:block text-sm text-[var(--text-primary)]">Nadia</span>
            <IconChevronDown
              size={14}
              className={`hidden sm:block text-[var(--text-faint)] transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden py-1 z-50">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition"
              >
                <IconUser size={16} /> Mi perfil
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition"
              >
                <IconSettings size={16} /> Configuración
              </button>
              <div className="h-px bg-[var(--border-color)] my-1" />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-400 hover:bg-[var(--bg-surface-2)] transition"
              >
                <IconLogout size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
