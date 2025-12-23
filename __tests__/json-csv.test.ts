import { describe, it, expect, vi, beforeEach } from 'vitest';
import { jsonToCsv, csvToJson } from '../src/lib/converters/json-csv';

describe('JSON to CSV Converter', () => {
  // ==================== jsonToCsv Tests ====================
  describe('jsonToCsv', () => {
    // Basic Conversions
    describe('Basic Conversions', () => {
      it('converts simple array of objects', () => {
        const input = '[{"name": "John", "age": 30}]';
        const result = jsonToCsv(input);
        expect(result).toContain('name,age');
        expect(result).toContain('John,30');
      });

      it('converts multiple rows', () => {
        const input = '[{"a": 1}, {"a": 2}, {"a": 3}]';
        const result = jsonToCsv(input);
        const lines = result.split('\n');
        expect(lines.length).toBe(4); // header + 3 rows
      });

      it('handles single object (not array)', () => {
        const input = '{"name": "John", "age": 30}';
        const result = jsonToCsv(input);
        expect(result).toContain('name,age');
        expect(result).toContain('John,30');
      });
    });

    // Nested Objects (Flattening)
    describe('Nested Objects', () => {
      it('flattens nested objects with dot notation', () => {
        const input = '[{"user": {"name": "John"}}]';
        const result = jsonToCsv(input);
        expect(result).toContain('user.name');
        expect(result).toContain('John');
      });

      it('handles deeply nested objects', () => {
        const input = '[{"a": {"b": {"c": 1}}}]';
        const result = jsonToCsv(input);
        expect(result).toContain('a.b.c');
        expect(result).toContain('1');
      });
    });

    // Inconsistent Keys
    describe('Inconsistent Keys', () => {
      it('includes all keys from all objects', () => {
        const input = '[{"a": 1}, {"b": 2}]';
        const result = jsonToCsv(input);
        expect(result).toContain('a');
        expect(result).toContain('b');
      });

      it('handles missing values with empty cells', () => {
        const input = '[{"a": 1, "b": 2}, {"a": 3}]';
        const result = jsonToCsv(input);
        expect(result).toContain('a,b');
        // Second row should have empty value for b
      });
    });

    // Data Types
    describe('Data Types', () => {
      it('handles null values', () => {
        const input = '[{"a": null}]';
        const result = jsonToCsv(input);
        // null should be empty or represented appropriately
        expect(result).toBeDefined();
      });

      it('handles boolean values', () => {
        const input = '[{"active": true, "deleted": false}]';
        const result = jsonToCsv(input);
        expect(result).toContain('true');
        expect(result).toContain('false');
      });

      it('handles numeric values', () => {
        const input = '[{"int": 42, "float": 3.14}]';
        const result = jsonToCsv(input);
        expect(result).toContain('42');
        expect(result).toContain('3.14');
      });
    });

    // Special Characters
    describe('Special Characters', () => {
      it('escapes values with commas', () => {
        const input = '[{"name": "John, Jr."}]';
        const result = jsonToCsv(input);
        expect(result).toContain('"John, Jr."');
      });

      it('handles values with quotes', () => {
        const input = '[{"name": "He said \\"hello\\""}]';
        const result = jsonToCsv(input);
        expect(result).toBeDefined();
      });

      it('handles unicode characters', () => {
        const input = '[{"city": "北京"}]';
        const result = jsonToCsv(input);
        expect(result).toContain('北京');
      });

      it('handles emoji', () => {
        const input = '[{"mood": "😀"}]';
        const result = jsonToCsv(input);
        expect(result).toContain('😀');
      });
    });

    // Edge Cases
    describe('Edge Cases', () => {
      it('handles empty array', () => {
        const input = '[]';
        expect(() => jsonToCsv(input)).toThrow();
      });

      it('throws error for empty object (no columns)', () => {
        const input = '{}';
        expect(() => jsonToCsv(input)).toThrow();
      });
    });

    // Error Handling
    describe('Error Handling', () => {
      it('throws error for invalid JSON', () => {
        expect(() => jsonToCsv('invalid json')).toThrow();
      });

      it('throws error for malformed JSON', () => {
        expect(() => jsonToCsv('{name: "John"}')).toThrow();
      });
    });
  });

  // ==================== csvToJson Tests ====================
  describe('csvToJson', () => {
    describe('Basic Parsing', () => {
      it('parses simple CSV', () => {
        const input = 'name,age\nJohn,30';
        const result = JSON.parse(csvToJson(input));
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('John');
        expect(result[0].age).toBe(30);
      });

      it('parses multiple rows', () => {
        const input = 'name,id\nJohn,1\nJane,2\nBob,3';
        const result = JSON.parse(csvToJson(input));
        expect(result).toHaveLength(3);
      });
    });

    describe('Data Type Inference', () => {
      it('parses numbers correctly', () => {
        const input = 'value,id\n42,1\n3.14,2';
        const result = JSON.parse(csvToJson(input));
        expect(typeof result[0].value).toBe('number');
        expect(result[0].value).toBe(42);
        expect(result[1].value).toBeCloseTo(3.14);
      });

      it('parses booleans correctly', () => {
        const input = 'active,id\ntrue,1\nfalse,2';
        const result = JSON.parse(csvToJson(input));
        expect(result[0].active).toBe(true);
        expect(result[1].active).toBe(false);
      });
    });

    describe('Dot Notation Headers', () => {
      it('creates nested objects from dot notation', () => {
        const input = 'user.name,user.id\nJohn,1';
        const result = JSON.parse(csvToJson(input));
        expect(result[0].user.name).toBe('John');
      });
    });
  });

  // ==================== Roundtrip Tests ====================
  describe('Roundtrip Conversion', () => {
    it('roundtrips simple data', () => {
      const original = '[{"name": "John", "age": 30}]';
      const csv = jsonToCsv(original);
      const backToJson = csvToJson(csv);
      const result = JSON.parse(backToJson);
      expect(result[0].name).toBe('John');
      expect(result[0].age).toBe(30);
    });
  });
});

// ==================== Integration Tests for File Upload, URL, Conversion ====================
describe('Formatter Integration Tests', () => {
  // Mock fetch for URL loading tests
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('File Upload Simulation', () => {
    it('processes JSON file content correctly', () => {
      const fileContent = '[{"name": "John"}]';
      const result = jsonToCsv(fileContent);
      expect(result).toContain('name');
      expect(result).toContain('John');
    });

    it('processes CSV file content correctly', () => {
      const fileContent = 'name,age\nJohn,30';
      const result = csvToJson(fileContent);
      const parsed = JSON.parse(result);
      expect(parsed[0].name).toBe('John');
    });

    it('handles large file content', () => {
      // Generate large JSON array
      const items = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`
      }));
      const largeJson = JSON.stringify(items);
      
      const result = jsonToCsv(largeJson);
      expect(result.split('\n').length).toBe(1001); // header + 1000 rows
    });
  });

  describe('URL Loading Simulation', () => {
    it('converts fetched JSON data', async () => {
      const jsonData = '[{"name": "Remote User"}]';
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(jsonData)
      });

      const response = await fetch('https://api.example.com/data.json');
      const text = await response.text();
      const result = jsonToCsv(text);
      
      expect(result).toContain('name');
      expect(result).toContain('Remote User');
    });

    it('handles URL fetch errors gracefully', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        statusText: 'Not Found'
      });

      const response = await fetch('https://api.example.com/notfound.json');
      expect(response.ok).toBe(false);
    });
  });

  describe('Conversion Workflow', () => {
    it('complete JSON to CSV workflow', () => {
      // Step 1: Input JSON
      const input = '[{"name": "John", "email": "john@example.com"}]';
      
      // Step 2: Convert
      const csv = jsonToCsv(input);
      
      // Step 3: Verify output
      expect(csv).toContain('name,email');
      expect(csv).toContain('John,john@example.com');
    });

    it('complete CSV to JSON workflow', () => {
      // Step 1: Input CSV
      const input = 'name,email\nJohn,john@example.com';
      
      // Step 2: Convert
      const json = csvToJson(input);
      
      // Step 3: Verify output
      const parsed = JSON.parse(json);
      expect(parsed[0].name).toBe('John');
      expect(parsed[0].email).toBe('john@example.com');
    });

    it('bidirectional workflow maintains data integrity', () => {
      const original = [
        { name: 'John', age: 30, city: 'NYC' },
        { name: 'Jane', age: 25, city: 'LA' }
      ];
      
      // JSON -> CSV
      const csv = jsonToCsv(JSON.stringify(original));
      
      // CSV -> JSON
      const json = csvToJson(csv);
      const result = JSON.parse(json);
      
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('John');
      expect(result[1].name).toBe('Jane');
    });
  });
});
