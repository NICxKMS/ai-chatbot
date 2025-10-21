import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { gateway } from "@ai-sdk/gateway";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        // Google Gemini (default provider)
        'gemini-2.0-flash-exp': google('gemini-2.0-flash-exp'),
        'gemini-1.5-pro': google('gemini-1.5-pro-latest'),
        'gemini-1.5-flash': google('gemini-1.5-flash-latest'),
        
        // OpenAI
        'gpt-4o': openai('gpt-4o'),
        'gpt-4o-mini': openai('gpt-4o-mini'),
        'gpt-4-turbo': openai('gpt-4-turbo'),
        'o1': openai('o1'),
        'o1-mini': openai('o1-mini'),
        
        // Anthropic
        'claude-3-5-sonnet': anthropic('claude-3-5-sonnet-20241022'),
        'claude-3-5-haiku': anthropic('claude-3-5-haiku-20241022'),
        'claude-3-opus': anthropic('claude-3-opus-20240229'),
        
        // OpenRouter (via AI SDK Gateway)
        'mistral-large': gateway.languageModel('openrouter/mistralai/mistral-large-2411'),
        'llama-3.3-70b': gateway.languageModel('openrouter/meta-llama/llama-3.3-70b-instruct'),
        'deepseek-chat': gateway.languageModel('openrouter/deepseek/deepseek-chat'),
        
        // Special models for internal use
        'chat-model': google('gemini-2.0-flash-exp'), // Default for chat
        'chat-model-reasoning': wrapLanguageModel({
          model: openai('o1'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': google('gemini-1.5-flash-latest'), // Fast for titles
        'artifact-model': google('gemini-1.5-pro-latest'), // Good for artifacts
      },
    });
