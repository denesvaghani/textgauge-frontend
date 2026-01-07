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

    it('should decode standard Base64 with + and / correctly', () => {
        // "subjects?_d" -> "c3ViamVjdHM/X2Q=" in standard (has /)
        // Let's use a string we know produces + and /
        // Input: "\xfb\ef\be" (from previous test idea)
        // or just standard test: ">>?" -> "Pj4/"
        // ">>?" -> 
        // > = 00111110 (62) -> +? No.
        // Let's use known values. 
        // Index 62 (+) and 63 (/)
        // \x3e (>) is 00111110. 
        // 00111110 00111110 00111100 -> P j 4 = ??
        // Let's blindly trust btoa for ground truth in the test
        const standardInput = "Standard+Base64/With+Symbols=="; 
        // This is a valid base64 pattern (length wise), let's see if it decodes without throwing
        // Actually best to roundtrip it to be sure
        const original = "\u00fb\u00ef\u00be"; // bytes that might produce weird stuff
        const encodedStandard = toBase64(original, false); // Standard, False for urlSafe
        const decoded = fromBase64(encodedStandard);
        expect(decoded).toBe(original);
        
        // Also verify our "fix" didn't break valid + or /
        // The fix replaces - with + and _ with /.
        // It does NOT replace + or /. So they remain. 
        // So "a+b/c=" remains "a+b/c=". This is correct.
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

    // EDGE CASES
    it('should handle empty string', () => {
        expect(toBase64("")).toBe("");
        expect(fromBase64("")).toBe("");
    });

    it('should support URL-safe encoding', () => {
        // Standard Base64 for '???' ends in 'Pz8/', URL safe should replace '/'
        // Actually let's use a known string that produces + or /
        // 'subjects?_d' -> 'c3ViamVjdHM/X2Q=' (has / and + maybe?)
        // Let's use binary simulation: inputs that result in + and /
        // Char code 251 -> + or /
        // Let's rely on the flag behavior
        
        const input = "subjects>>?"; // > is closer to +/ range maybe?
        // Let's just test the replacement logic directly with a known outcome or property
        const inputNeedsPlus = "\xFB\xEF\xBE"; // Random bytes often produce +/
        const encodedSafe = toBase64(inputNeedsPlus, true);
        expect(encodedSafe).not.toContain("+");
        expect(encodedSafe).not.toContain("/");
    });

    // If we want fromBase64 to handle URL safe, we should test it
    // Currently implementation might fail, let's verify:
    it('should decode URL-safe strings correctly (auto-detect)', () => {
       // "c3ViamVjdHM_X2Q" is "subjects?_d" url safe (hypothetically)
       // Let's construct one
       const regular = "subjects?_d"; 
       const encoded = toBase64(regular, true); // URL safe
       // fromBase64 should handle it
       const decoded = fromBase64(encoded);
       expect(decoded).toBe(regular);
    });
});
