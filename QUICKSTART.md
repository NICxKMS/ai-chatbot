# Quick Start Guide - 5 Minutes to Running

## Step 1: Create .env.local (2 minutes)

In the `ai-chatbot` folder, create a file named `.env.local`:

```bash
# Required - Database
POSTGRES_URL=postgresql://your_connection_string_here

# Required - Auth (generate a random string)
AUTH_SECRET=your_random_secret_32chars_minimum
AUTH_URL=http://localhost:3000

# Required - Google Gemini API Key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key

# Optional - Add these if you want to use other providers
OPENAI_API_KEY=sk-your_openai_key
ANTHROPIC_API_KEY=sk-ant-your_anthropic_key
```

### Quick Setup Options:

**Database (choose one):**
- **Neon (Free)**: Go to https://neon.tech → Create project → Copy connection string
- **Vercel Postgres**: Go to https://vercel.com/storage → Create database → Copy URL

**Auth Secret:**
```bash
# Mac/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Google Gemini API Key (Free):**
- Go to https://aistudio.google.com/app/apikey
- Click "Create API Key"
- Copy the key

## Step 2: Initialize Database (30 seconds)

```bash
cd ai-chatbot
pnpm db:push
```

You should see: "✓ Database migrations complete"

## Step 3: Run the App (30 seconds)

```bash
pnpm dev
```

Open http://localhost:3000

## Step 4: Test It (2 minutes)

1. **First Message**
   - The app will open
   - You'll see "Gemini 2.0 Flash" as the selected model
   - Type: "Hello! Can you see me?"
   - Press Enter

2. **Try Different Models**
   - Click the model selector (shows "Gemini 2.0 Flash")
   - You'll see models grouped by provider
   - Try "GPT-4o Mini" if you added OpenAI key
   - Try "Claude 3.5 Haiku" if you added Anthropic key

3. **Test Vision (optional)**
   - Keep Gemini or GPT-4o selected
   - Click the image upload button
   - Upload an image
   - Ask: "What's in this image?"

4. **Test Tools**
   - Ask: "What's the weather in Tokyo?"
   - The model will use the weather tool
   - You should see the weather data

## That's It! 🎉

You now have a fully functional multi-provider AI chat app.

## What You Get

With just the Google API key (free tier):
- ✅ Gemini 2.0 Flash (fastest)
- ✅ Gemini 1.5 Pro (most capable)
- ✅ Gemini 1.5 Flash (balanced)
- ✅ Vision support (analyze images)
- ✅ 1-2M token context windows
- ✅ Tools (weather, documents, etc.)
- ✅ Streaming responses
- ✅ Chat history

Add OpenAI key (paid):
- ✅ GPT-4o, GPT-4o Mini
- ✅ o1, o1-mini (reasoning models)

Add Anthropic key (paid):
- ✅ Claude 3.5 Sonnet, Haiku, Opus

## Troubleshooting

**"Provider not configured" error:**
```bash
# Make sure your .env.local has the API key
# Restart the dev server
pnpm dev
```

**Database connection error:**
```bash
# Verify your POSTGRES_URL is correct
# Format: postgresql://user:pass@host:5432/dbname
# Run migrations again
pnpm db:push
```

**Port already in use:**
```bash
# Kill the process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill
# Windows:
netstat -ano | findstr :3000
# Then kill the PID

# Or use a different port
pnpm dev -- -p 3001
```

## Next Steps

Once you have it running:

1. **Read the Full Docs**
   - `SETUP.md` - Detailed setup guide
   - `CHANGES.md` - What was changed
   - `IMPLEMENTATION_COMPLETE.md` - Full feature list

2. **Add More API Keys**
   - Add OpenAI, Anthropic keys to `.env.local`
   - Restart server
   - Try more models!

3. **Customize**
   - Edit `lib/ai/prompts.ts` for system prompts
   - Edit `lib/ai/entitlements.ts` for user permissions
   - Edit `app/globals.css` for styling

4. **Deploy**
   - Push to GitHub
   - Connect to Vercel
   - Add environment variables
   - Deploy!

## Common Questions

**Q: Which provider should I start with?**
A: Google Gemini - it's free and has generous limits

**Q: Do I need all provider API keys?**
A: No, just Google is fine to start. Add others when you want to try them.

**Q: Is this free?**
A: 
- Google Gemini: Free tier (generous limits)
- OpenAI: Paid (pay per use)
- Anthropic: Paid (pay per use)
- Vercel hosting: Free tier available
- Neon database: Free tier available

**Q: Can I use this in production?**
A: Yes! Just make sure to:
- Set up proper database (Vercel Postgres or Neon)
- Configure authentication properly
- Add rate limiting if needed
- Monitor API usage and costs

**Q: How do I update models?**
A: Edit `lib/ai/models.ts` and `lib/ai/providers.ts`, add model IDs to `lib/ai/entitlements.ts`

## Get Help

- 📖 Full setup guide: `SETUP.md`
- 📝 What changed: `CHANGES.md`
- 🎯 Feature complete: `IMPLEMENTATION_COMPLETE.md`
- 🔗 AI SDK docs: https://sdk.vercel.ai/docs
- 🔗 Chat SDK docs: https://chat-sdk.dev/docs

Happy chatting! 🚀

