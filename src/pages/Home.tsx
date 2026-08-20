import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconSparkles,
  IconBolt,
  IconShieldCheck,
  IconStar,
  IconHistory,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { characters } from "../data/characters";
import { CharacterCard } from "../components/CharacterCard";

const features = [
  {
    icon: IconBolt,
    color: "text-[var(--accent-indigo)]",
    title: "Respuestas inteligentes",
    description: "IA avanzada que entiende el contexto.",
  },
  {
    icon: IconShieldCheck,
    color: "text-[var(--accent-sky)]",
    title: "Privado y seguro",
    description: "Tus charlas quedan protegidas.",
  },
  {
    icon: IconStar,
    color: "text-[var(--accent-fuchsia)]",
    title: "Personajes únicos",
    description: "Personalidades propias y detalladas.",
  },
  {
    icon: IconHistory,
    color: "text-[var(--accent-purple)]",
    title: "Historial guardado",
    description: "Volvé a tus charlas cuando quieras.",
  },
];

// Triplicamos la lista para poder hacer loop infinito: arrancamos parados
// en la copia del medio, y cuando el scroll se acerca a un extremo lo
// reacomodamos de golpe (sin animación) al punto equivalente de la copia
// del medio, así nunca se nota el "corte".
const loopedCharacters = [...characters, ...characters, ...characters];

export function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth / 3;
    }
  }, []);

  const normalizeLoop = () => {
    const el = scrollRef.current;
    if (!el) return;
    const setWidth = el.scrollWidth / 3;
    if (el.scrollLeft < setWidth * 0.5) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft > setWidth * 1.5) {
      el.scrollLeft -= setWidth;
    }
  };

  const scroll = (direction: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  const startAutoScroll = (direction: 1 | -1) => {
    stopAutoScroll();
    autoScrollRef.current = window.setInterval(() => {
      scrollRef.current?.scrollBy({ left: direction * 6 });
    }, 16);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current !== null) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  return (
    <div>
      <section className="text-center pt-10 pb-8 px-6">
        <h1 className="text-4xl md:text-5xl leading-tight font-bold text-[var(--text-primary)] mb-1">
          Chateá con tu
        </h1>
        <h1 className="text-4xl md:text-5xl leading-tight font-bold mb-3 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#E879F9] bg-clip-text text-transparent text-shimmer">
          personaje favorito <IconSparkles className="inline w-9 h-9 text-[var(--accent-fuchsia)]" />
        </h1>
        <p className="text-[var(--text-muted)] max-w-md mx-auto mb-5 text-sm leading-relaxed">
          Elegí un personaje y empezá una conversación única.
          <br />
          Cada uno tiene su propia personalidad, historia y forma de responder.
        </p>
        <button
          onClick={() => navigate("/personajes")}
          className="bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] text-white text-sm font-medium px-7 py-3 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90 transition"
        >
          Explorar personajes <IconSparkles size={16} />
        </button>
      </section>

      <section className="px-6 pb-14">
        <div className="flex items-center gap-4 max-w-5xl mx-auto">
          <button
            onClick={() => scroll(-1)}
            onMouseEnter={() => startAutoScroll(-1)}
            onMouseLeave={stopAutoScroll}
            className="text-[var(--text-faint)] hover:text-[var(--text-primary)] transition shrink-0"
            aria-label="Ver personajes anteriores"
          >
            <IconChevronLeft size={22} />
          </button>

          <div
            ref={scrollRef}
            onScroll={normalizeLoop}
            className="flex gap-5 overflow-x-auto flex-1 no-scrollbar pb-1"
          >
            {loopedCharacters.map((character, index) => (
              <div key={`${character.id}-${index}`} className="shrink-0 w-[46%] sm:w-[31%] md:w-[23%]">
                <CharacterCard character={character} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            onMouseEnter={() => startAutoScroll(1)}
            onMouseLeave={stopAutoScroll}
            className="text-[var(--text-faint)] hover:text-[var(--text-primary)] transition shrink-0"
            aria-label="Ver más personajes"
          >
            <IconChevronRight size={22} />
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
          {features.map((feature) => (
            <div key={feature.title} className="p-5 flex items-start gap-3">
              <feature.icon className={`${feature.color} mt-0.5`} size={22} stroke={1.6} />
              <div>
                <p className="font-medium text-[var(--text-primary)] text-sm">{feature.title}</p>
                <p className="text-[var(--text-muted)] text-xs mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}