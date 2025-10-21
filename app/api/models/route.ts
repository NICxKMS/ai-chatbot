import { NextResponse } from 'next/server';
import { chatModels, getModelsByProvider } from '@/lib/ai/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider');
  
  if (provider) {
    const models = getModelsByProvider(provider as any);
    return NextResponse.json({ provider, models });
  }
  
  return NextResponse.json({
    models: chatModels,
    providers: ['google', 'openai', 'anthropic', 'openrouter'],
    default: {
      provider: 'google',
      model: 'gemini-2.0-flash-exp',
    },
  });
}

