import type { ChatMessage, MessageRole } from "../types/chat";
import { characters } from "../data/characters";

export function formatMessage(
  role: MessageRole,
  content: string,
  loading = false
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: getTimestamp(),
    createdAt: new Date().toISOString(),
    loading,
  };
}

export function isValidMessage(value: string): boolean {
  return value.trim().length > 0;
}

export function getTimestamp(): string {
  return new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function saveMessages(characterId: string, messages: ChatMessage[]) {
  localStorage.setItem(`chat_${characterId}`, JSON.stringify(messages));
}

export function loadMessages(characterId: string): ChatMessage[] {
  const raw = localStorage.getItem(`chat_${characterId}`);
  return raw ? JSON.parse(raw) : [];
}

export function clearMessages(characterId: string) {
  localStorage.removeItem(`chat_${characterId}`);
}

export function getLastMessagePreview(characterId: string): string | null {
  const messages = loadMessages(characterId);
  if (messages.length === 0) return null;
  const last = messages[messages.length - 1];
  return last.content.length > 32 ? `${last.content.slice(0, 32)}...` : last.content;
}

export interface ConversationEntry {
  characterId: string;
  lastMessage: string;
  lastMessageAt: string;
}

export function getAllConversations(): ConversationEntry[] {
  const entries: ConversationEntry[] = [];

  for (const character of characters) {
    const messages = loadMessages(character.id);
    if (messages.length === 0) continue;

    const nonLoading = messages.filter((m) => !m.loading);
    const last = nonLoading[nonLoading.length - 1];
    if (!last) continue;

    entries.push({
      characterId: character.id,
      lastMessage: last.content,
      lastMessageAt: last.createdAt,
    });
  }

  return entries.sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );
}
