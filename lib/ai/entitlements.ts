import type { UserType } from "@/app/(auth)/auth";
import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      // Google Gemini (default)
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash",
      // OpenAI
      "gpt-4o-mini",
      // Anthropic
      "claude-3-5-haiku",
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      // Google Gemini
      "gemini-2.0-flash-exp",
      "gemini-1.5-pro",
      "gemini-1.5-flash",
      // OpenAI
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-4-turbo",
      "o1",
      "o1-mini",
      // Anthropic
      "claude-3-5-sonnet",
      "claude-3-5-haiku",
      "claude-3-opus",
      // OpenRouter
      "mistral-large",
      "llama-3.3-70b",
      "deepseek-chat",
    ],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
