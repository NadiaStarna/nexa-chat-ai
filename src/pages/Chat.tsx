import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconDots, IconTrash, IconSend, IconArrowLeft } from "@tabler/icons-react";
import { characters, getCharacterById } from "../data/characters";
import { CharacterSidebar } from "../components/CharacterSidebar";
import { CharacterProfilePanel } from "../components/CharacterProfilePanel";
import { MessageBubble } from "../components/MessageBubble";
import { FavoriteButton } from "../components/FavoriteButton";
import { fetchAIResponse } from "../services/gemini";
import { formatMessage, isValidMessage, loadMessages, saveMessages, clearMessages } from "../utils/chatStorage";
import { Avatar } from "../components/Avatar";
import type { ChatMessage } from "../types/chat";

export function Chat() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const activeId = characterId ?? characters[0].id;
  const character = getCharacterById(activeId) ?? characters[0];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(loadMessages(character.id));
    setMenuOpen(false);
  }, [character.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCharacter = (id: string) => {
    navigate(`/chat/${id}`);
  };

  const handleDeleteConversation = () => {
    clearMessages(character.id);
    setMessages([]);
    setMenuOpen(false);
  };

  const handleSend = async () => {
    if (!isValidMessage(input) || isLoading) return;

    const userMessage = formatMessage("user", input.trim());
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    saveMessages(character.id, nextMessages);
    setInput("");
    setIsLoading(true);

    const withTyping = [...nextMessages, formatMessage("assistant", "", true)];
    setMessages(withTyping);

    try {
      const data = await fetchAIResponse(character, nextMessages);
      const reply = formatMessage("assistant", data.reply || "No pude responder 😢");
      const finalMessages = [...nextMessages, reply];
      setMessages(finalMessages);
      saveMessages(character.id, finalMessages);
    } catch (error) {
      console.error(error);
      const errMsg = formatMessage("assistant", "Error al conectar 😢");
      const finalMessages = [...nextMessages, errMsg];
      setMessages(finalMessages);
      saveMessages(character.id, finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex max-w-6xl mx-auto" style={{ height: "calc(100vh - 73px)" }}>
      <CharacterSidebar characters={characters} activeId={character.id} onSelect={handleSelectCharacter} />

      <div className="flex-1 flex flex-col border-r border-[var(--border-soft)] min-w-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-soft)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              aria-label="Volver"
              className="text-[var(--text-faint)] hover:text-[var(--text-primary)] transition mr-1"
            >
              <IconArrowLeft size={18} />
            </button>
            <Avatar character={character} size={40} />
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                {character.name}
                <span
                  className={`w-2 h-2 rounded-full inline-block ${
                    character.status === "online" ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                />
              </p>
              <p className="text-xs text-[var(--text-faint)]">{character.shortDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[var(--text-faint)]">
            <FavoriteButton key={character.id} characterId={character.id} size={18} />

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((open) => !open)} aria-label="Más opciones">
                <IconDots size={18} className="hover:text-[var(--text-primary)] transition" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  <button
                    onClick={handleDeleteConversation}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--accent-rose)] hover:bg-[var(--bg-surface-2)] transition"
                  >
                    <IconTrash size={16} /> Borrar conversación
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {messages.length === 0 && (
            <p className="text-center text-[var(--text-dim)] text-sm mt-10">
              Empezá la conversación con {character.name} ✨
            </p>
          )}
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-6 py-4 border-t border-[var(--border-soft)]">
          <div className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl px-4 py-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Escribí tu mensaje..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-faint)] text-[var(--text-secondary)] disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] flex items-center justify-center disabled:opacity-50 shrink-0"
            >
              <IconSend size={15} className="text-white" />
            </button>
          </div>
          <p className="text-[11px] text-[var(--text-dim)] mt-2 text-center">
            Nexa puede contener errores. Verificá la información importante.
          </p>
        </div>
      </div>

      <CharacterProfilePanel character={character} />
    </div>
  );
}