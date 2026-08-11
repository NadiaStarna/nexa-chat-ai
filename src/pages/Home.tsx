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
    color: "text-indigo-400",
    title: "Respuestas inteligentes",
    description: "IA avanzada que entiende el contexto.",
  },
  {
    icon: IconShieldCheck,
    color: "text-sky-400",
    title: "Privado y seguro",
    description: "Tus charlas quedan protegidas.",
  },
  {
    icon: IconStar,
    color: "text-fuchsia-400",
    title: "Personajes únicos",
    description: "Personalidades propias y detalladas.",
  },
  {
    icon: IconHistory,
    color: "text-purple-400",
    title: "Historial guardado",
    description: "Volvé a tus charlas cuando quieras.",
  },
];

export function Home() {
  const navigate = useNavigate();
  const featured = characters.slice(0, 4);

  return (
    <div>
      <section className="text-center pt-16 pb-12 px-6">
        <h1 className="text-3xl md:text-[2.6rem] leading-tight font-semibold text-white mb-2">
          Chateá con tu
        </h1>
        <h1 className="text-3xl md:text-[2.6rem] leading-tight font-semibold mb-4 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#E879F9] bg-clip-text text-transparent">
          personaje favorito <IconSparkles className="inline w-8 h-8" />
        </h1>
        <p className="text-slate-400 max-w-md mx-auto mb-7 text-sm leading-relaxed">
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
          <IconChevronLeft className="text-slate-500 shrink-0" size={22} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 flex-1">
            {featured.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <IconChevronRight className="text-slate-500 shrink-0" size={22} />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <div className="bg-[#12121C] border border-[#1E1E2B] rounded-2xl grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#1E1E2B]">
          {features.map((feature) => (
            <div key={feature.title} className="p-5 flex items-start gap-3">
              <feature.icon className={`${feature.color} mt-0.5`} size={22} stroke={1.6} />
              <div>
                <p className="font-medium text-white text-sm">{feature.title}</p>
                <p className="text-slate-400 text-xs mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
