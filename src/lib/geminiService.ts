/**
 * Gemini AI Service
 * Handles text rephrasing with automatic API key rotation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getWorkingApiKey, reportKeyFailure } from "./apiKeyManager";

export type RephraseTone = "professional" | "casual" | "formal" | "friendly";

export interface RephraseOptions {
  tone?: RephraseTone;
  maxRetries?: number;
}

export interface RephraseResult {
  original: string;
  rephrased: string;
  success: boolean;
  error?: string;
  usedKey?: string;
  model?: string;
}

const DEFAULT_MODEL =
  process.env.GEMINI_MODEL || "gemini-1.5-flash"; // ✅ modern, supported model

function buildPrompt(text: string, tone?: RephraseTone): string {
  const base = [
    "You are a writing assistant that rewrites text while preserving meaning.",
    "- Fix grammar and clarity.",
    "- Keep roughly the same length.",
    "- Do NOT add new ideas or extra sentences.",
    "- Preserve formatting, lists, and structure where possible.",
  ];

  let toneLine = "";
  switch (tone) {
    case "professional":
      toneLine = "Use a professional, confident tone suitable for business communication.";
      break;
    case "formal":
      toneLine = "Use a formal, polished tone.";
      break;
    case "casual":
      toneLine = "Use a relaxed, conversational tone.";
      break;
    case "friendly":
      toneLine = "Use a warm, friendly tone.";
      break;
    default:
      toneLine = "";
  }

  if (toneLine) base.push(toneLine);

  return `${base.join("\n")}\n\nText to rewrite:\n"""${text}"""`;
}

export async function rephraseText(
  text: string,
  options: RephraseOptions = {},
): Promise<RephraseResult> {
  const maxRetries = options.maxRetries ?? 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const apiKey = getWorkingApiKey();
    const modelName = DEFAULT_MODEL;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const prompt = buildPrompt(text, options.tone);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const out = (response.text() ?? "").trim();

      if (!out) {
        throw new Error("Empty response from Gemini");
      }

      return {
        original: text,
        rephrased: out,
        success: true,
        usedKey: apiKey,
        model: modelName,
      };
    } catch (err: any) {
      console.error(
        `Rephrase attempt ${attempt} failed:`,
        err?.message || err,
      );
      reportKeyFailure(apiKey);
      lastError = err;
    }
  }

  return {
    original: text,
    rephrased: text,
    success: false,
    error:
      (lastError as any)?.message ||
      "AI rephrase service is currently unavailable. Please try again later.",
  };
}

export async function rephraseBatch(
  texts: string[],
  options: RephraseOptions = {},
): Promise<RephraseResult[]> {
  const results: RephraseResult[] = [];

  for (const t of texts) {
    const r = await rephraseText(t, options);
    results.push(r);
    // tiny delay so we don’t hammer a single key
    await new Promise((res) => setTimeout(res, 300));
  }

  return results;
}
