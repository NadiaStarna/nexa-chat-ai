export type CharacterStatus = "online" | "away";

export interface Character {
  id: string;
  name: string;
  shortDescription: string;
  bio: string;
  systemPrompt: string;
  tags: string[];
  category: string;
  chatStyle: string;
  favoriteTopics: string[];
  dislikes: string;
  avatarGradient: string;
  imageUrl?: string;
  emoji: string;
  status: CharacterStatus;
}
