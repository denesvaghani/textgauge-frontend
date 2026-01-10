import { generateUuidV4 } from '@/lib/uuid-utils';

describe('generateUuidV4', () => {
    // Mock crypto.randomUUID since it might not be available in the test environment (JSDOM/Node) depending on version
    // But typically modern Node has it. If it fails, we'll mock it.
    
    it('should generate the correct number of UUIDs', () => {
        const uuids = generateUuidV4({ count: 5, hyphens: true, uppercase: false, version: 'v4' });
        expect(uuids).toHaveLength(5);
    });

    it('should generate UUIDs with hyphens by default', () => {
        const uuids = generateUuidV4({ count: 1, hyphens: true, uppercase: false, version: 'v4' });
        expect(uuids[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    it('should remove hyphens when requested', () => {
        const uuids = generateUuidV4({ count: 1, hyphens: false, uppercase: false, version: 'v4' });
        expect(uuids[0]).not.toContain('-');
        expect(uuids[0]).toHaveLength(32);
    });

    it('should return uppercase UUIDs when requested', () => {
        const uuids = generateUuidV4({ count: 1, hyphens: true, uppercase: true, version: 'v4' });
        expect(uuids[0]).toBe(uuids[0].toUpperCase());
    });

    it('should handle large counts', () => {
        const uuids = generateUuidV4({ count: 100, hyphens: true, uppercase: false, version: 'v4' });
        expect(uuids).toHaveLength(100);
        const unique = new Set(uuids);
        expect(unique.size).toBe(100); // Verify uniqueness
    });
});
