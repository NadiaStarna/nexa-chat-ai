export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  loading?: boolean;
}

export interface ConversationSummary {
  characterId: string;
  lastMessage: string;
  updatedAt: string;
  isFavorite: boolean;
}
