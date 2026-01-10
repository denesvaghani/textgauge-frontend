# TextGauge - Word Counter & SEO Analyzer

A real-time text analysis tool built with Next.js that provides instant metrics for word counts, character counts, reading time, keyword density, and repeated phrases detection.

## Features

- ✍️ **Real-time Text Analysis**: Instant metrics as you type
- 📊 **Comprehensive Stats**: Word count, character count, sentences, paragraphs
- ⏱️ **Time Estimates**: Reading and speaking time calculations
- 🔍 **SEO Keyword Tracking**: Monitor keyword usage and density
- 🔄 **Repeated Phrase Detection**: Identify commonly repeated 3-word phrases
- 🎨 **Text Tools**: Bold, italic, case conversion, and formatting tools
- ↩️ **Undo/Redo**: Full history management for your edits
- 🚀 **Vercel-Ready**: Optimized for serverless deployment

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js (for API routes)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## API Routes

### POST /api/analyze

Analyzes text and returns comprehensive metrics.

**Request Body:**
```json
{
  "text": "Your text to analyze",
  "keyword": "optional SEO keyword"
}
```

**Response:**
```json
{
  "ok": true,
  "wordCount": 10,
  "charCount": 50,
  "sentenceCount": 2,
  "paragraphCount": 1,
  "readingTime": 3,
  "speakingTime": 4,
  "keywordCount": 1,
  "keywordDensity": 10.0,
  "repeatedPhrases": [
    {
      "phrase": "example repeated phrase",
      "count": 2
    }
  ]
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world. This is a test.","keyword":"test"}'
```

## Project Structure

```
textgauge-frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts       # Text analysis API endpoint
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   └── Editor.tsx             # Main editor component
│   └── lib/
│       ├── types.ts               # TypeScript type definitions
│       └── useLiveMetrics.ts      # Hook for API interaction
├── public/                        # Static assets
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in [Vercel](https://vercel.com)
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or `textgauge-frontend` if in a monorepo)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
4. Deploy!

**No environment variables are required** - the app is fully self-contained.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform
- Self-hosted with PM2 or Docker

## Features Explained

### Text Analysis Metrics

- **Word Count**: Total number of words (alphanumeric sequences)
- **Character Count**: Total characters including spaces and punctuation
- **Sentence Count**: Counts sentences ending with `.`, `!`, or `?` (including the last sentence without punctuation)
- **Paragraph Count**: Separated by double line breaks (minimum 1 for non-empty text)
- **Reading Time**: Based on average reading speed of 225 words per minute
- **Speaking Time**: Based on average speaking speed of 150 words per minute

### Keyword Analysis

- **Keyword Count**: Number of times the keyword appears in the text
- **Keyword Density**: Percentage of keyword occurrences relative to total words
- **Special Character Support**: Handles keywords with spaces, parentheses, and other special characters

### Repeated Phrase Detection

Identifies the top 5 most frequently repeated 3-word phrases with at least 2 occurrences, helpful for identifying:
- Overused expressions
- Content repetition
- SEO optimization opportunities

## Bug Fixes & Improvements

This version includes important bug fixes from the original backend:

1. **Regex Injection Prevention**: Keywords with special characters (e.g., "best laptop (2024)") are properly escaped
2. **Sentence Counting**: Correctly counts the last sentence even without trailing punctuation
3. **Paragraph Counting**: Ensures minimum count of 1 for non-empty single-line text
4. **Code Cleanup**: Removed unused helper functions and duplicate exports
5. **WebSocket Removal**: Migrated to REST API for Vercel compatibility

## Development

### Code Style

The project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier (via ESLint config)

### Adding New Features

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests: `npm run lint && npm run build`
4. Commit: `git commit -m "feat: your feature description"`
5. Push and create a pull request

## License

ISC

## Support

For issues, questions, or contributions, please open an issue in the repository.

---

Built with ❤️ using Next.js
