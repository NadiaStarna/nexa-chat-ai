import { NavLink } from "react-router-dom";
import { IconMoon, IconBell, IconChevronDown } from "@tabler/icons-react";
import { NexaLogo } from "./NexaLogo";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/chat", label: "Chat" },
  { to: "/personajes", label: "Personajes" },
  { to: "/historial", label: "Historial" },
  { to: "/favoritos", label: "Favoritos" },
];

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#1A1A26]">
      <NavLink to="/">
        <NexaLogo />
      </NavLink>

      <div className="hidden md:flex items-center gap-9 text-sm text-slate-400">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              isActive
                ? "text-white pb-4 border-b-2 border-indigo-400 -mb-4"
                : "hover:text-white transition"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <button aria-label="Cambiar tema" className="text-slate-400 hover:text-white transition">
          <IconMoon size={20} stroke={1.6} />
        </button>
        <button aria-label="Notificaciones" className="relative text-slate-400 hover:text-white transition">
          <IconBell size={20} stroke={1.6} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[9px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#4F8DF7] to-[#C026D3] text-white">
            2
          </span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-[#1E1E2B]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8DF7] to-[#C026D3] flex items-center justify-center text-xs font-medium text-white">
            N
          </div>
          <span className="hidden sm:block text-sm text-white">Nadia</span>
          <IconChevronDown size={14} className="hidden sm:block text-slate-500" />
        </div>
      </div>
    </nav>
  );
}
