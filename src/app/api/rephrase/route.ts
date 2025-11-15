import { NextResponse } from "next/server";
import { rephraseText, RephraseTone } from "@/lib/geminiService";
import { getKeyStats } from "@/lib/apiKeyManager";

export const runtime = "nodejs";

interface RephraseRequest {
  text?: string;
  tone?: RephraseTone;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RephraseRequest | null;

    const rawText = body?.text ?? "";
    const text = typeof rawText === "string" ? rawText : String(rawText || "");
    const tone = body?.tone;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { success: false, error: "Text is required" },
        { status: 400 },
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Text too long (max 5000 characters)" },
        { status: 400 },
      );
    }

    const result = await rephraseText(text, { tone });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "AI rephrase service is temporarily unavailable. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      rephrased: result.rephrased,
      original: result.original,
      model: result.model,
    });
  } catch (error: any) {
    console.error("Rephrase API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "AI rephrase service is temporarily unavailable. Please try again.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const stats = getKeyStats();
    return NextResponse.json({
      status: "ok",
      message: "Rephrase API is running",
      keyStats: stats,
      configured: (stats?.totalKeys ?? 0) > 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error?.message || "Failed to read key stats",
      },
      { status: 500 },
    );
  }
}
