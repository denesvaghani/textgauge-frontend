
export interface RepeatedPhrase {
  phrase: string;
  count: number;
}

export interface Metrics {
  ok: boolean;
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;      // seconds
  speakingTime: number;     // seconds
  keywordCount: number;
  keywordDensity: number;   // %
  repeatedPhrases: RepeatedPhrase[];
}
