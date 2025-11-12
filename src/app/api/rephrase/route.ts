import { NextResponse } from 'next/server';
import { rephraseText } from '@/lib/geminiService';
import { getKeyStats } from '@/lib/apiKeyManager';

export const runtime = 'nodejs';

interface RephraseRequest {
  text: string;
  tone?: 'professional' | 'casual' | 'formal' | 'friendly';
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<RephraseRequest>;

    // Validation
    if (!body.text || typeof body.text !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    if (body.text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Text cannot be empty' },
        { status: 400 }
      );
    }

    if (body.text.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Text is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    // Rephrase the text
    const result = await rephraseText(body.text, {
      tone: body.tone || 'professional',
      maxRetries: 3,
    });

    // Get API key statistics for debugging
    const stats = getKeyStats();
    console.log('API Key Stats:', stats);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Failed to rephrase text',
          keyStats: stats, // Include stats for debugging
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      original: result.original,
      rephrased: result.rephrased,
      keyStats: stats, // Include stats for monitoring
    });

  } catch (error: any) {
    console.error('Rephrase API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check API health and key status
export async function GET() {
  try {
    const stats = getKeyStats();
    
    return NextResponse.json({
      status: 'ok',
      message: 'Rephrase API is running',
      keyStats: stats,
      configured: stats.totalKeys > 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message,
      },
      { status: 500 }
    );
  }
}
