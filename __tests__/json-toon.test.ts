import { describe, it, expect } from 'vitest';
import { jsonToToon, toonToJson } from '../src/lib/converters/json-toon';

describe('jsonToToon', () => {
  // ==================== Basic Object Tests ====================
  describe('Basic Objects', () => {
    it('converts simple object with single key', () => {
      const input = '{"a": 1}';
      const result = jsonToToon(input);
      expect(result).toBe('a: 1');
    });

    it('converts object with multiple keys', () => {
      const input = '{"name": "John", "age": 30}';
      const result = jsonToToon(input);
      expect(result).toContain('name: John');
      expect(result).toContain('age: 30');
    });

    it('converts object with string value', () => {
      const input = '{"greeting": "Hello World"}';
      const result = jsonToToon(input);
      expect(result).toBe('greeting: Hello World');
    });
  });

  // ==================== Tabular Array Tests ====================
  describe('Tabular Arrays', () => {
    it('converts array of objects to tabular format', () => {
      const input = '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]';
      const result = jsonToToon(input);
      expect(result).toContain('[2]');
      expect(result).toContain('name, age');
      expect(result).toContain('John, 30');
      expect(result).toContain('Jane, 25');
    });

    it('handles inconsistent keys in array objects', () => {
      const input = '[{"name": "John"}, {"name": "Jane", "city": "NYC"}]';
      const result = jsonToToon(input);
      expect(result).toContain('[2]');
      expect(result).toContain('name');
      expect(result).toContain('city');
    });

    it('converts empty array to [0]', () => {
      const input = '[]';
      const result = jsonToToon(input);
      expect(result).toBe('[0]');
    });

    it('converts single-item array', () => {
      const input = '[{"name": "John"}]';
      const result = jsonToToon(input);
      expect(result).toContain('[1]');
      expect(result).toContain('name');
      expect(result).toContain('John');
    });
  });

  // ==================== Nested Object Tests ====================
  describe('Nested Objects', () => {
    it('flattens nested object with dot notation', () => {
      const input = '{"user": {"name": "John"}}';
      const result = jsonToToon(input);
      expect(result).toBe('user.name: John');
    });

    it('handles deeply nested objects', () => {
      const input = '{"a": {"b": {"c": {"d": 1}}}}';
      const result = jsonToToon(input);
      expect(result).toBe('a.b.c.d: 1');
    });

    it('flattens nested objects in arrays', () => {
      const input = '[{"user": {"name": "John"}}]';
      const result = jsonToToon(input);
      expect(result).toContain('user.name');
    });
  });

  // ==================== Data Type Tests ====================
  describe('Data Types', () => {
    it('handles null values', () => {
      const input = '{"a": null}';
      const result = jsonToToon(input);
      expect(result).toBe('a: null');
    });

    it('handles boolean true', () => {
      const input = '{"active": true}';
      const result = jsonToToon(input);
      expect(result).toBe('active: true');
    });

    it('handles boolean false', () => {
      const input = '{"active": false}';
      const result = jsonToToon(input);
      expect(result).toBe('active: false');
    });

    it('handles integer numbers', () => {
      const input = '{"count": 42}';
      const result = jsonToToon(input);
      expect(result).toBe('count: 42');
    });

    it('handles floating point numbers', () => {
      const input = '{"pi": 3.14159}';
      const result = jsonToToon(input);
      expect(result).toBe('pi: 3.14159');
    });

    it('handles negative numbers', () => {
      const input = '{"temp": -5}';
      const result = jsonToToon(input);
      expect(result).toBe('temp: -5');
    });
  });

  // ==================== String Edge Cases ====================
  describe('String Edge Cases', () => {
    it('quotes strings with commas', () => {
      const input = '{"name": "John, Jr."}';
      const result = jsonToToon(input);
      expect(result).toContain('"John, Jr."');
    });

    it('quotes strings with colons', () => {
      const input = '{"time": "12:30:00"}';
      const result = jsonToToon(input);
      expect(result).toContain('"12:30:00"');
    });

    it('handles empty string', () => {
      const input = '{"name": ""}';
      const result = jsonToToon(input);
      expect(result).toContain('""');
    });

    it('handles unicode characters', () => {
      const input = '{"city": "北京"}';
      const result = jsonToToon(input);
      expect(result).toBe('city: 北京');
    });

    it('handles emoji', () => {
      const input = '{"mood": "😀"}';
      const result = jsonToToon(input);
      expect(result).toBe('mood: 😀');
    });
  });

  // ==================== Array Value Tests ====================
  describe('Array Values', () => {
    it('handles array of primitives in object', () => {
      const input = '{"tags": [1, 2, 3]}';
      const result = jsonToToon(input);
      expect(result).toBe('tags: [1, 2, 3]');
    });

    it('handles mixed array in object', () => {
      const input = '{"data": [1, "two", true]}';
      const result = jsonToToon(input);
      expect(result).toBe('data: [1, two, true]');
    });
  });

  // ==================== Empty Object Tests ====================
  describe('Empty Objects', () => {
    it('handles empty object', () => {
      const input = '{}';
      const result = jsonToToon(input);
      expect(result).toBe('');
    });
  });

  // ==================== Error Handling ====================
  describe('Error Handling', () => {
    it('throws error for invalid JSON', () => {
      expect(() => jsonToToon('invalid json')).toThrow('JSON Parse Error');
    });

    it('throws error for malformed JSON', () => {
      expect(() => jsonToToon('{name: "John"}')).toThrow('JSON Parse Error');
    });
  });
});

describe('toonToJson', () => {
  // ==================== Basic Key-Value Tests ====================
  describe('Key-Value Format', () => {
    it('converts simple key-value to JSON object', () => {
      const input = 'a: 1';
      const result = JSON.parse(toonToJson(input));
      expect(result).toEqual({ a: 1 });
    });

    it('converts multiple key-value lines', () => {
      const input = 'name: John\nage: 30';
      const result = JSON.parse(toonToJson(input));
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('rebuilds nested object from dot notation', () => {
      const input = 'user.name: John';
      const result = JSON.parse(toonToJson(input));
      expect(result).toEqual({ user: { name: 'John' } });
    });
  });

  // ==================== Tabular Format Tests ====================
  describe('Tabular Format', () => {
    it('converts tabular format to array of objects', () => {
      const input = '[2]\nname, age\nJohn, 30\nJane, 25';
      const result = JSON.parse(toonToJson(input));
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ name: 'John', age: 30 });
      expect(result[1]).toEqual({ name: 'Jane', age: 25 });
    });

    it('converts [0] to empty array', () => {
      const input = '[0]';
      const result = JSON.parse(toonToJson(input));
      expect(result).toEqual([]);
    });

    it('handles single row tabular format', () => {
      const input = '[1]\nname\nJohn';
      const result = JSON.parse(toonToJson(input));
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ name: 'John' });
    });
  });

  // ==================== Data Type Parsing Tests ====================
  describe('Data Type Parsing', () => {
    it('parses null', () => {
      const input = 'value: null';
      const result = JSON.parse(toonToJson(input));
      expect(result.value).toBeNull();
    });

    it('parses boolean true', () => {
      const input = 'active: true';
      const result = JSON.parse(toonToJson(input));
      expect(result.active).toBe(true);
    });

    it('parses boolean false', () => {
      const input = 'active: false';
      const result = JSON.parse(toonToJson(input));
      expect(result.active).toBe(false);
    });

    it('parses integers', () => {
      const input = 'count: 42';
      const result = JSON.parse(toonToJson(input));
      expect(result.count).toBe(42);
    });

    it('parses floats', () => {
      const input = 'pi: 3.14159';
      const result = JSON.parse(toonToJson(input));
      expect(result.pi).toBeCloseTo(3.14159);
    });
  });

  // ==================== Quoted String Tests ====================
  describe('Quoted Strings', () => {
    it('parses double-quoted strings', () => {
      const input = 'name: "John, Jr."';
      const result = JSON.parse(toonToJson(input));
      expect(result.name).toBe('John, Jr.');
    });

    it('parses single-quoted strings', () => {
      const input = "name: 'John'";
      const result = JSON.parse(toonToJson(input));
      expect(result.name).toBe('John');
    });
  });

  // ==================== Empty Input Tests ====================
  describe('Empty Input', () => {
    it('converts empty input to empty object', () => {
      const result = JSON.parse(toonToJson(''));
      expect(result).toEqual({});
    });

    it('handles whitespace-only input', () => {
      const result = JSON.parse(toonToJson('   \n   '));
      expect(result).toEqual({});
    });
  });
});

// ==================== Roundtrip Tests ====================
describe('Roundtrip Conversion', () => {
  it('roundtrips simple object', () => {
    const original = '{"name": "John", "age": 30}';
    const toon = jsonToToon(original);
    const backToJson = toonToJson(toon);
    const result = JSON.parse(backToJson);
    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('roundtrips array of objects', () => {
    const original = '[{"name": "John"}, {"name": "Jane"}]';
    const toon = jsonToToon(original);
    const backToJson = toonToJson(toon);
    const result = JSON.parse(backToJson);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('John');
    expect(result[1].name).toBe('Jane');
  });

  it('roundtrips nested objects', () => {
    const original = '{"user": {"profile": {"name": "John"}}}';
    const toon = jsonToToon(original);
    const backToJson = toonToJson(toon);
    const result = JSON.parse(backToJson);
    expect(result.user.profile.name).toBe('John');
  });

  it('roundtrips with various data types', () => {
    const original = '{"a": 1, "b": true, "c": null, "d": "text"}';
    const toon = jsonToToon(original);
    const backToJson = toonToJson(toon);
    const result = JSON.parse(backToJson);
    expect(result.a).toBe(1);
    expect(result.b).toBe(true);
    expect(result.c).toBeNull();
    expect(result.d).toBe('text');
  });
});
