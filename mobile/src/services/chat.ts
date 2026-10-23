import { authenticatedRequest } from "./auth";

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatResult = { message: string; conversationId: string; category: string };

export function sendMessage(input: {
  conversationId?: string;
  category: string;
  messages: ChatMessage[];
}) {
  return authenticatedRequest<ChatResult>("/api/ai/chat", input);
}
