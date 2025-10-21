# Multi-Provider AI Chat Setup Guide

This guide will help you configure the AI chatbot to work with multiple providers: Google Gemini (default), OpenAI, Anthropic, and OpenRouter.

## Prerequisites

- Node.js 18+ and pnpm installed
- API keys for the providers you want to use
- A PostgreSQL database (Vercel Postgres or Neon recommended)

## Step 1: Environment Variables

Create a `.env.local` file in the `ai-chatbot` directory with the following variables:

```env
# Database (Vercel Postgres or Neon)
# Get from: https://vercel.com/storage or https://neon.tech
POSTGRES_URL=postgresql://username:password@host:5432/database

# Auth.js
# Generate with: openssl rand -base64 32
AUTH_SECRET=your-auth-secret-here
AUTH_URL=http://localhost:3000

# AI Providers - Add your API keys here

# Google Gemini (default provider) - REQUIRED
# Get from: https://aistudio.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key

# OpenAI - OPTIONAL
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-key

# Anthropic - OPTIONAL
# Get from: https://console.anthropic.com/settings/keys
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# Vercel AI Gateway - OPTIONAL
# Get from: https://vercel.com/docs/ai-gateway
# Required for OpenRouter models and non-Vercel deployments
AI_GATEWAY_API_KEY=

# Vercel Blob Storage (for file uploads) - OPTIONAL
# Get from: https://vercel.com/storage/blob
BLOB_READ_WRITE_TOKEN=

# Redis (optional, for stream resumption) - OPTIONAL
REDIS_URL=
```

### Generating AUTH_SECRET

On Linux/Mac:
```bash
openssl rand -base64 32
```

On Windows (PowerShell):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

## Step 2: Install Dependencies

```bash
cd ai-chatbot
pnpm install
```

## Step 3: Set Up Database

### Option A: Vercel Postgres (Recommended for Vercel deployments)

1. Go to [Vercel Storage](https://vercel.com/storage)
2. Create a new Postgres database
3. Copy the `POSTGRES_URL` connection string to your `.env.local`

### Option B: Neon (Free PostgreSQL)

1. Go to [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string to your `.env.local`

### Run Migrations

```bash
pnpm db:push
```

This will create all necessary tables in your database.

## Step 4: Configure Providers

The app is configured to use multiple AI providers with Google Gemini as the default.

### Minimum Configuration (Gemini only)

At minimum, you need:
- `POSTGRES_URL`
- `AUTH_SECRET`
- `GOOGLE_GENERATIVE_AI_API_KEY`

This will give you access to all Gemini models.

### Full Configuration (All providers)

Add all provider API keys to enable the full range of models:
- Google Gemini (3 models)
- OpenAI (5 models including GPT-4o and o1)
- Anthropic (3 Claude models)
- OpenRouter (3+ models via AI Gateway)

## Step 5: Run Locally

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 6: Test Different Providers

1. Click on the model selector in the chat interface
2. You should see models grouped by provider:
   - Google Gemini (Default)
   - OpenAI
   - Anthropic
   - OpenRouter

3. Select a model from any provider and start chatting

## Available Models

### Google Gemini (Default Provider)
- **Gemini 2.0 Flash** - Fastest, 1M context
- **Gemini 1.5 Pro** - Most capable, 2M context
- **Gemini 1.5 Flash** - Balanced, 1M context

### OpenAI
- **GPT-4o** - Most capable multimodal
- **GPT-4o Mini** - Fast and affordable
- **GPT-4 Turbo** - Previous generation
- **o1** - Advanced reasoning (no tools)
- **o1-mini** - Fast reasoning (no tools)

### Anthropic
- **Claude 3.5 Sonnet** - Best balance
- **Claude 3.5 Haiku** - Fastest
- **Claude 3 Opus** - Most capable

### OpenRouter
- **Mistral Large** - Flagship Mistral
- **Llama 3.3 70B** - Open source
- **DeepSeek Chat** - High-performance reasoning

## User Entitlements

The app has two user types with different model access:

### Guest Users (No Account)
- 20 messages per day
- Access to: Gemini Flash, GPT-4o Mini, Claude Haiku

### Regular Users (With Account)
- 100 messages per day
- Access to all models

You can modify these in `lib/ai/entitlements.ts`.

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add all environment variables in the Vercel dashboard
4. Deploy!

Vercel will automatically handle:
- Database connection
- AI Gateway authentication (no API key needed)
- Blob storage

## Troubleshooting

### "Provider not configured" error
- Make sure you've added the API key for that provider in `.env.local`
- Restart the dev server after adding new environment variables

### Database connection error
- Verify your `POSTGRES_URL` is correct
- Make sure you've run `pnpm db:push`

### Models not appearing
- Check `lib/ai/entitlements.ts` - the model IDs must be in the `availableChatModelIds` array
- Make sure the model ID in `models.ts` matches the ID in `providers.ts`

### Reasoning models (o1) showing tool errors
- This is expected - o1 models don't support tools
- The code already handles this, but if you see errors, verify the chat API route has the updated logic

## API Endpoint

You can query available models via:

```bash
# Get all models
curl http://localhost:3000/api/models

# Get models by provider
curl http://localhost:3000/api/models?provider=google
```

## Next Steps

- Customize the system prompts in `lib/ai/prompts.ts`
- Add more models by updating `lib/ai/models.ts` and `lib/ai/providers.ts`
- Adjust user entitlements in `lib/ai/entitlements.ts`
- Configure authentication providers in `app/(auth)/auth.ts`

## Support

For issues specific to:
- **AI SDK**: [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- **Chat SDK**: [Chat SDK Docs](https://chat-sdk.dev/docs)
- **Model APIs**: Check respective provider documentation

