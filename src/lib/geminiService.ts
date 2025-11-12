/**
 * Gemini AI Service
 * Handles text rephrasing with automatic API key rotation
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { getWorkingApiKey, reportKeyFailure } from './apiKeyManager';

interface RephraseOptions {
  tone?: 'professional' | 'casual' | 'formal' | 'friendly';
  maxRetries?: number;
}

interface RephraseResult {
  original: string;
  rephrased: string;
  success: boolean;
  error?: string;
}

/**
 * Rephrase text using Gemini API with automatic key rotation
 */
export async function rephraseText(
  text: string,
  options: RephraseOptions = {}
): Promise<RephraseResult> {
  const { tone = 'professional', maxRetries = 3 } = options;

  if (!text || text.trim().length === 0) {
    return {
      original: text,
      rephrased: text,
      success: false,
      error: 'Text is empty',
    };
  }

  // Try up to maxRetries times with different API keys
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const apiKey = await getWorkingApiKey();
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Build prompt based on tone
      const prompt = buildPrompt(text, tone);

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const rephrased = response.text();

      return {
        original: text,
        rephrased: rephrased.trim(),
        success: true,
      };

    } catch (error: any) {
      console.error(`Rephrase attempt ${attempt} failed:`, error.message);

      // Check if it's a rate limit error
      if (isRateLimitError(error)) {
        // Get the key that was used and mark it as failed
        const apiKey = await getWorkingApiKey();
        reportKeyFailure(apiKey);
        console.log(`Rate limit hit, rotating to next API key...`);
      }

      // If this was the last attempt, return error
      if (attempt === maxRetries) {
        return {
          original: text,
          rephrased: text,
          success: false,
          error: sanitizeErrorMessage(error.message),
        };
      }

      // Wait a bit before retrying (exponential backoff)
      await sleep(1000 * attempt);
    }
  }

  // Should never reach here, but TypeScript needs it
  return {
    original: text,
    rephrased: text,
    success: false,
    error: 'Unknown error',
  };
}

/**
 * Build the AI prompt based on tone
 */
function buildPrompt(text: string, tone: string): string {
  const toneDescriptions = {
    professional: 'professional and clear',
    casual: 'casual and conversational',
    formal: 'formal and polished',
    friendly: 'friendly and warm',
  };

  const toneDesc = toneDescriptions[tone as keyof typeof toneDescriptions] || 'professional';

  return `Rephrase the following text to make it ${toneDesc} while maintaining its original meaning and key points. Do not add explanations or extra commentary, just provide the rephrased text.

Text to rephrase:
${text}

Rephrased version:`;
}

/**
 * Sanitize error messages to hide internal details from users
 */
function sanitizeErrorMessage(errorMessage: string): string {
  // Remove any mention of environment variables or internal paths
  const sanitized = errorMessage
    .replace(/GEMINI_API_KEYS?/gi, 'API configuration')
    .replace(/\.env(\.local)?/gi, 'configuration file')
    .replace(/No API keys available/gi, 'Service temporarily unavailable');
  
  // Generic fallback for common errors
  if (sanitized.toLowerCase().includes('service temporarily unavailable')) {
    return 'AI rephrase service is currently unavailable. Please try again later.';
  }
  
  if (sanitized.toLowerCase().includes('rate limit') || sanitized.toLowerCase().includes('quota')) {
    return 'AI service is busy. Please try again in a moment.';
  }
  
  return 'Unable to rephrase text at this time. Please try again later.';
}

/**
 * Check if error is a rate limit error
 */
function isRateLimitError(error: any): boolean {
  const errorMessage = error.message?.toLowerCase() || '';
  const errorStatus = error.status || error.statusCode || 0;

  return (
    errorStatus === 429 ||
    errorMessage.includes('rate limit') ||
    errorMessage.includes('quota') ||
    errorMessage.includes('too many requests')
  );
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Batch rephrase multiple texts (useful for future features)
 */
export async function rephraseMultiple(
  texts: string[],
  options: RephraseOptions = {}
): Promise<RephraseResult[]> {
  const results: RephraseResult[] = [];

  for (const text of texts) {
    const result = await rephraseText(text, options);
    results.push(result);
    
    // Small delay between requests to avoid hammering the API
    await sleep(500);
  }

  return results;
}
