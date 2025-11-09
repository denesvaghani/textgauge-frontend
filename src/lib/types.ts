export interface Metrics {
    wordCount: number;
    characters: number;
    charactersNoSpaces: number;
    spaces: number;
    sentenceCount: number;
    paragraphCount: number;
    readingTimeSeconds: number;
    speakingTimeSeconds: number;
    pageCount: number;
    keyword: string;
    keywordCount: number;
    keywordDensity: number;
    topKeywords: { word: string; count: number; density: number }[];
    repeatedPhrases: { phrase: string; count: number }[];
    warnings: string[];
  }
  