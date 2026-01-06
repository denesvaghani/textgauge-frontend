import { fromBase64, toBase64 } from '@/lib/base64-utils';
import { describe, it, expect } from 'vitest';

describe('Base64 Utils', () => {
    
    it('should encode simple ASCII text correctly', () => {
        const input = "Hello World";
        // "SGVsbG8gV29ybGQ=" is standard base64 for Hello World
        expect(toBase64(input)).toBe("SGVsbG8gV29ybGQ=");
    });

    it('should decode simple ASCII text correctly', () => {
        const input = "SGVsbG8gV29ybGQ=";
        expect(fromBase64(input)).toBe("Hello World");
    });

    it('should handle Unicode characters (Emojis, Accents) correctly', () => {
        const input = "Héllò 👋";
        // Default btoa fails on this. Our util should work.
        const encoded = toBase64(input);
        const decoded = fromBase64(encoded);
        expect(decoded).toBe(input);
    });

    it('should throw error on invalid base64 string', () => {
        expect(() => fromBase64("Not a base64 string")).toThrow();
    });
});
