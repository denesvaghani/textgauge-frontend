# 🤖 AI Rephrase Feature - Setup Guide

## Overview

The AI Rephrase feature uses **Google Gemini API** (100% FREE) with intelligent API key rotation to overcome rate limits.

### 🎯 Features
- ✅ FREE Gemini API (no credit card required)
- ✅ Automatic API key rotation
- ✅ Rate limit handling with failover
- ✅ Support for unlimited number of API keys
- ✅ Clean, maintainable code structure
- ✅ Retry logic with exponential backoff
- ✅ Multiple tone options (professional, casual, formal, friendly)

---

## 📋 Quick Setup (5 minutes)

### Step 1: Get Gemini API Keys

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

**Repeat for multiple accounts** (10 accounts = 150 requests/minute!)

### Step 2: Add Keys to `.env.local`

Create `.env.local` file:

```bash
# Add your keys separated by commas
GEMINI_API_KEYS=AIzaSyABC123...,AIzaSyDEF456...,AIzaSyGHI789...
```

### Step 3: Done! 🎉

The system will automatically:
- Rotate between all your API keys
- Skip failed keys (rate limited)
- Auto-recover keys after 1 minute
- Retry with different keys on failure

---

## 🔧 How It Works

### Architecture

```
┌──────────────┐
│  User Types  │
│     Text     │
└──────┬───────┘
       │
       ▼
┌─────────────────┐
│  Frontend UI    │ (Editor component)
│  - Select text  │
│  - Click button │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│  API Route          │ /api/rephrase
│  - Validates text   │
│  - Calls service    │
└────────┬────────────┘
         │
         ▼
┌───────────────────────┐
│  Gemini Service       │ geminiService.ts
│  - Gets API key       │
│  - Builds prompt      │
│  - Calls Gemini API   │
│  - Retries on fail    │
└────────┬──────────────┘
         │
         ▼
┌────────────────────────┐
│  API Key Manager       │ apiKeyManager.ts
│  - Round-robin rotation│
│  - Tracks failed keys  │
│  - Auto-recovery       │
└────────────────────────┘
```

### Key Rotation Strategy

**Round-Robin with Failover:**
1. Request 1 → Key #1
2. Request 2 → Key #2
3. Request 3 → Key #3
4. ...
5. Request 10 → Key #10
6. Request 11 → Key #1 (cycles back)

**Rate Limit Handling:**
- Key hits rate limit → Mark as failed
- Skip failed keys in rotation
- Auto-recover after 1 minute
- Retry with next available key

---

## 📁 Project Structure

```
src/
├── app/
│   └── api/
│       └── rephrase/
│           └── route.ts           # API endpoint
├── lib/
│   ├── apiKeyManager.ts          # Key rotation logic
│   └── geminiService.ts          # Gemini API wrapper
└── components/
    └── Editor.tsx                # UI (todo: add button)
```

### File Descriptions

**`apiKeyManager.ts`** (140 lines)
- Manages multiple API keys
- Round-robin rotation
- Failure tracking
- Auto-recovery
- Statistics tracking

**`geminiService.ts`** (155 lines)
- Wraps Gemini API
- Retry logic
- Error handling
- Tone options
- Batch processing support

**`route.ts`** (99 lines)
- API endpoint
- Input validation
- Error responses
- Health check endpoint

---

## 🎮 Usage

### API Endpoint

**POST `/api/rephrase`**

```typescript
// Request
{
  "text": "Your text here",
  "tone": "professional" // or "casual", "formal", "friendly"
}

// Response (Success)
{
  "success": true,
  "original": "Your text here",
  "rephrased": "Rephrased text here",
  "keyStats": {
    "totalKeys": 10,
    "availableKeys": 9,
    "failedKeys": 1,
    "currentIndex": 5
  }
}

// Response (Error)
{
  "success": false,
  "error": "Error message",
  "keyStats": { ... }
}
```

**GET `/api/rephrase`** (Health Check)

```json
{
  "status": "ok",
  "message": "Rephrase API is running",
  "keyStats": {
    "totalKeys": 10,
    "availableKeys": 10,
    "failedKeys": 0,
    "currentIndex": 0
  },
  "configured": true
}
```

---

## 🔢 Rate Limits & Capacity

### Single API Key (Free Tier)
- 15 requests per minute
- 1,500 requests per day
- = 45,000 requests per month

### With 10 API Keys
- **150 requests per minute** 🚀
- **15,000 requests per day**
- **450,000 requests per month**

### Real-World Capacity
- Average text rephrase: ~2 seconds
- With 10 keys: **4,500 rephrases/hour**
- More than enough for most use cases!

---

## 🧪 Testing

### 1. Test Health Endpoint

```bash
curl http://localhost:3000/api/rephrase
```

Expected:
```json
{
  "status": "ok",
  "configured": true,
  "keyStats": {
    "totalKeys": 3,
    "availableKeys": 3,
    "failedKeys": 0
  }
}
```

### 2. Test Rephrase

```bash
curl -X POST http://localhost:3000/api/rephrase \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello how are you", "tone": "professional"}'
```

Expected:
```json
{
  "success": true,
  "original": "Hello how are you",
  "rephrased": "Greetings, how may I assist you today?"
}
```

---

## 📊 Monitoring

### Check Key Statistics

The API automatically logs key stats:

```javascript
// Check in server logs
API Key Stats: {
  totalKeys: 10,
  availableKeys: 9,  // 1 key is rate limited
  failedKeys: 1,
  currentIndex: 5    // Currently using key #5
}
```

### Rate Limit Warnings

```
API key marked as failed. 1/10 keys failed
Rate limit hit, rotating to next API key...
API key recovered: AIzaSyABC1...
```

---

## ⚠️ Troubleshooting

### "No API keys available"
**Problem:** `GEMINI_API_KEYS` not set  
**Solution:** Add keys to `.env.local`

### "All API keys failed"
**Problem:** All keys hit rate limit  
**Solution:** 
- Add more API keys
- Wait 1 minute for auto-recovery
- Check if keys are valid

### "Rate limit hit immediately"
**Problem:** Keys are invalid or quota exhausted  
**Solution:**
- Verify keys at https://makersuite.google.com/app/apikey
- Check key hasn't expired
- Create new keys if needed

---

## 🎨 Adding to UI (Next Step)

To add the Rephrase button to Editor:

```typescript
// In Editor.tsx, add button:
<button
  onMouseDown={async (e) => {
    e.preventDefault();
    const selection = window.getSelection();
    const text = selection?.toString() || getPlainText();
    
    // Show loading state
    setIsRephrasing(true);
    
    try {
      const response = await fetch('/api/rephrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, tone: 'professional' }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Replace text with rephrased version
        replaceSelection(data.rephrased);
      }
    } finally {
      setIsRephrasing(false);
    }
  }}
  className="bg-purple-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-purple-600 text-xs"
>
  ✨ Rephrase
</button>
```

---

## 💰 Cost Analysis

### Gemini API Free Tier
- **Cost:** $0 (FREE)
- **Limit:** 15 req/min per key
- **No credit card required**

### Scaling Options

**Option 1: Stay Free** (Recommended for launch)
- 10 free keys = 150 req/min
- Cost: $0/month
- Good for: 0-10k users

**Option 2: Upgrade to OpenAI** (If you outgrow free tier)
- GPT-3.5-turbo: $0.002/1K tokens
- GPT-4: $0.03/1K tokens
- Typical rephrase: ~100 tokens = $0.0002
- Cost for 10k requests: ~$2/month

**Option 3: Make it Premium**
- Charge users $5/month for unlimited
- Use OpenAI for better quality
- Profit!

---

## 🚀 Production Deployment

### Environment Variables

In Vercel/Production, add:

```
GEMINI_API_KEYS=key1,key2,key3,key4,key5,key6,key7,key8,key9,key10
```

### Security

- ✅ API keys are server-side only (not exposed to browser)
- ✅ Input validation (max 5000 chars)
- ✅ Rate limiting handled automatically
- ✅ Error messages don't leak sensitive info

---

## 📝 Summary

**What you get:**
- ✅ FREE AI rephrasing
- ✅ Automatic key rotation
- ✅ Rate limit handling
- ✅ Clean code structure
- ✅ Easy to add/remove keys
- ✅ No hard-coded limits
- ✅ Production-ready

**What you need:**
1. Get 10 Gemini API keys (5 min)
2. Add to `.env.local` (1 min)
3. Deploy! (1 min)

**Total setup time:** ~7 minutes 🚀

---

## 🎯 Next Steps

1. Get API keys from https://makersuite.google.com/app/apikey
2. Add to `.env.local`
3. Test with `curl` commands above
4. Add Rephrase button to UI
5. Deploy to production!

Need help? Check the code comments in:
- `src/lib/apiKeyManager.ts`
- `src/lib/geminiService.ts`
- `src/app/api/rephrase/route.ts`
