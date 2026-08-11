import type { ChatMessage, MessageRole } from "../types/chat";

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
