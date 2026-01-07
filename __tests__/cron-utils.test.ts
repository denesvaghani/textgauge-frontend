import { describeCron } from '@/lib/cron-utils';
import { describe, it, expect } from 'vitest';

describe('describeCron', () => {
    
    it('should describe simple every minute', () => {
        expect(describeCron("* * * * *")).toBe("Every minute");
    });

    it('should describe exact time', () => {
        // 0 8 * * * -> At minute 0, past hour 8
        const desc = describeCron("0 8 * * *");
        expect(desc).toContain("minute 0");
        expect(desc).toContain("past hour 8");
    });

    it('should describe intervals', () => {
        // */5 * * * * -> every 5 minutes
        expect(describeCron("*/5 * * * *")).toContain("every 5 minutes");
    });

    it('should handle complex day of week', () => {
        // 0 9 * * 1 -> At minute 0, past hour 9, on day of week 1
        const desc = describeCron("0 9 * * 1");
        expect(desc).toContain("day of week 1");
    });

    // EDGE CASES
    it('should return empty string for empty input', () => {
        expect(describeCron("")).toBe("");
    });

    it('should return error message for invalid cron format', () => {
        expect(describeCron("invalid cron string")).toBe("Invalid format (needs 5 parts)");
        expect(describeCron("* * *")).toBe("Invalid format (needs 5 parts)");
    });

    it('should handle ranges nicely (pass-through)', () => {
        // 1-5 * * * * -> runs at minute 1-5
        const desc = describeCron("1-5 * * * *");
        expect(desc).toContain("at minute 1-5");
    });

    it('should handle lists nicely (pass-through)', () => {
        // 1,15,30 * * * * -> runs at minute 1,15,30
        const desc = describeCron("1,15,30 * * * *");
        expect(desc).toContain("at minute 1,15,30");
    });

    it('should show error for invalid characters in parts', () => {
        // User reported issue: "* * 4 * *e" 
        // Current behavior: "Runs every minute... on day of week *e"
        // Expected behavior: "Invalid cron expression" or similar specific error
        const desc = describeCron("* * 4 * *e");
        expect(desc).toBe("Invalid cron expression"); // This will fail currently
    });
});
