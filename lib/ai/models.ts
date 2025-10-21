export const DEFAULT_CHAT_MODEL: string = "gemini-2.0-flash-exp";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
  provider: 'google' | 'openai' | 'anthropic' | 'openrouter';
  contextWindow?: number;
  supportsVision?: boolean;
  supportsReasoning?: boolean;
};

export const chatModels: ChatModel[] = [
  // Google Gemini (default provider)
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    description: 'Fastest and most efficient multimodal model',
    provider: 'google',
    contextWindow: 1000000,
    supportsVision: true,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    description: 'Most capable Gemini model for complex tasks',
    provider: 'google',
    contextWindow: 2000000,
    supportsVision: true,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    description: 'Fast and versatile performance',
    provider: 'google',
    contextWindow: 1000000,
    supportsVision: true,
  },
  
  // OpenAI
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Most capable OpenAI multimodal model',
    provider: 'openai',
    contextWindow: 128000,
    supportsVision: true,
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast and affordable',
    provider: 'openai',
    contextWindow: 128000,
    supportsVision: true,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Previous generation flagship model',
    provider: 'openai',
    contextWindow: 128000,
    supportsVision: true,
  },
  {
    id: 'o1',
    name: 'o1',
    description: 'Advanced reasoning model',
    provider: 'openai',
    contextWindow: 200000,
    supportsReasoning: true,
  },
  {
    id: 'o1-mini',
    name: 'o1-mini',
    description: 'Faster reasoning for STEM tasks',
    provider: 'openai',
    contextWindow: 128000,
    supportsReasoning: true,
  },
  
  // Anthropic
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    description: 'Best balance of intelligence and speed',
    provider: 'anthropic',
    contextWindow: 200000,
    supportsVision: true,
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    description: 'Fastest Claude model',
    provider: 'anthropic',
    contextWindow: 200000,
    supportsVision: true,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Most capable Claude model',
    provider: 'anthropic',
    contextWindow: 200000,
    supportsVision: true,
  },
  
  // OpenRouter
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    description: 'Flagship Mistral model via OpenRouter',
    provider: 'openrouter',
    contextWindow: 128000,
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B',
    description: 'Open source model via OpenRouter',
    provider: 'openrouter',
    contextWindow: 128000,
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    description: 'High-performance reasoning model',
    provider: 'openrouter',
    contextWindow: 64000,
  },
];

// Helper to get models by provider
export function getModelsByProvider(provider: ChatModel['provider']): ChatModel[] {
  return chatModels.filter(m => m.provider === provider);
}

// Helper to get model by ID
export function getModelById(id: string): ChatModel | undefined {
  return chatModels.find(m => m.id === id);
}
