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
});
