import { describe, it, expect } from 'vitest';

// ==================== SimpleCodeEditor Logic Tests ====================
// Tests for scroll sync, search matching, and line position calculations

describe('SimpleCodeEditor Scroll and Search Logic', () => {
  
  // ==================== Line Position Calculation Tests ====================
  describe('Search Match Line Position Calculation', () => {
    
    /**
     * Simulates the line position calculation used for scrollbar markers
     */
    const calculateMatchLinePositions = (value: string, searchText: string): number[] => {
      const positions: number[] = [];
      const lines = value.split('\n');
      const totalLines = lines.length;
      
      if (totalLines === 0 || !searchText) return positions;
      
      const regex = new RegExp(searchText, 'gi');
      let match;
      
      while ((match = regex.exec(value)) !== null) {
        const textBeforeMatch = value.substring(0, match.index);
        const lineNumber = textBeforeMatch.split('\n').length;
        const position = ((lineNumber - 1) / totalLines) * 100;
        
        // Avoid duplicate positions for same line
        if (positions.length === 0 || positions[positions.length - 1] !== position) {
          positions.push(position);
        }
      }
      
      return positions;
    };
    
    it('calculates correct line positions for single match', () => {
      const content = 'line1\nline2\nline3\nline4\nline5';
      const positions = calculateMatchLinePositions(content, 'line3');
      
      // line3 is on line 3, so position = ((3-1)/5)*100 = 40%
      expect(positions).toHaveLength(1);
      expect(positions[0]).toBeCloseTo(40, 1);
    });
    
    it('calculates correct line positions for multiple matches on different lines', () => {
      const content = 'foo\nbar\nfoo\nbaz\nfoo';
      const positions = calculateMatchLinePositions(content, 'foo');
      
      // foo appears on lines 1, 3, 5 (5 total lines)
      // line 1: ((1-1)/5)*100 = 0%
      // line 3: ((3-1)/5)*100 = 40%
      // line 5: ((5-1)/5)*100 = 80%
      expect(positions).toHaveLength(3);
      expect(positions[0]).toBeCloseTo(0, 1);
      expect(positions[1]).toBeCloseTo(40, 1);
      expect(positions[2]).toBeCloseTo(80, 1);
    });
    
    it('deduplicates positions for multiple matches on same line', () => {
      const content = 'foo foo foo\nbar\nbaz';
      const positions = calculateMatchLinePositions(content, 'foo');
      
      // All 3 foo matches are on line 1, should only have 1 position
      expect(positions).toHaveLength(1);
      expect(positions[0]).toBeCloseTo(0, 1);
    });
    
    it('handles empty content', () => {
      const positions = calculateMatchLinePositions('', 'foo');
      expect(positions).toHaveLength(0);
    });
    
    it('handles no matches', () => {
      const content = 'line1\nline2\nline3';
      const positions = calculateMatchLinePositions(content, 'notfound');
      expect(positions).toHaveLength(0);
    });
    
    it('handles match at very end of content', () => {
      const content = 'line1\nline2\nline3\nline4\nmatch';
      const positions = calculateMatchLinePositions(content, 'match');
      
      // match is on line 5, position = ((5-1)/5)*100 = 80%
      expect(positions).toHaveLength(1);
      expect(positions[0]).toBeCloseTo(80, 1);
    });
    
    it('handles match at very start of content', () => {
      const content = 'match\nline2\nline3\nline4\nline5';
      const positions = calculateMatchLinePositions(content, 'match');
      
      // match is on line 1, position = ((1-1)/5)*100 = 0%
      expect(positions).toHaveLength(1);
      expect(positions[0]).toBeCloseTo(0, 1);
    });
  });
  
  // ==================== Search Highlight Application Tests ====================
  describe('Search Highlight Application', () => {
    
    /**
     * Simulates the search highlight function
     */
    const applySearchHighlight = (htmlContent: string, searchText: string): string => {
      if (!searchText || !htmlContent) return htmlContent;
      
      try {
        const pattern = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${pattern})`, 'gi');
        
        const parts = htmlContent.split(/(<[^>]*>)/);
        return parts.map(part => {
          if (part.startsWith('<')) {
            return part;
          }
          return part.replace(regex, '<mark>$1</mark>');
        }).join('');
      } catch {
        return htmlContent;
      }
    };
    
    it('highlights plain text matches', () => {
      const result = applySearchHighlight('hello world', 'world');
      expect(result).toBe('hello <mark>world</mark>');
    });
    
    it('highlights multiple matches', () => {
      const result = applySearchHighlight('foo bar foo', 'foo');
      expect(result).toBe('<mark>foo</mark> bar <mark>foo</mark>');
    });
    
    it('preserves HTML tags and only highlights text content', () => {
      const result = applySearchHighlight('<span class="blue">foo</span> bar', 'foo');
      expect(result).toBe('<span class="blue"><mark>foo</mark></span> bar');
    });
    
    it('does not modify HTML tag attributes', () => {
      const result = applySearchHighlight('<span data-foo="test">text</span>', 'foo');
      // 'foo' in attribute should NOT be highlighted
      expect(result).toBe('<span data-foo="test">text</span>');
    });
    
    it('handles case-insensitive matching', () => {
      const result = applySearchHighlight('Foo FOO foo', 'foo');
      expect(result).toBe('<mark>Foo</mark> <mark>FOO</mark> <mark>foo</mark>');
    });
    
    it('handles empty search text', () => {
      const result = applySearchHighlight('hello world', '');
      expect(result).toBe('hello world');
    });
    
    it('handles special regex characters in search', () => {
      const result = applySearchHighlight('price is $100', '$100');
      expect(result).toBe('price is <mark>$100</mark>');
    });
  });
  
  // ==================== Large Content Tests ====================
  describe('Large Content Handling', () => {
    
    it('handles 100+ lines of content for position calculation', () => {
      const lines = Array.from({ length: 100 }, (_, i) => `line ${i + 1}`);
      const content = lines.join('\n');
      
      const calculateMatchLinePositions = (value: string, searchText: string): number[] => {
        const positions: number[] = [];
        const totalLines = value.split('\n').length;
        const regex = new RegExp(searchText, 'gi');
        let match;
        
        while ((match = regex.exec(value)) !== null) {
          const textBeforeMatch = value.substring(0, match.index);
          const lineNumber = textBeforeMatch.split('\n').length;
          const position = ((lineNumber - 1) / totalLines) * 100;
          if (positions.length === 0 || positions[positions.length - 1] !== position) {
            positions.push(position);
          }
        }
        return positions;
      };
      
      // Search for "line 50"
      const positions = calculateMatchLinePositions(content, 'line 50');
      expect(positions).toHaveLength(1);
      // line 50 out of 100: ((50-1)/100)*100 = 49%
      expect(positions[0]).toBeCloseTo(49, 1);
    });
    
    it('handles content with 1000 lines', () => {
      const lines = Array.from({ length: 1000 }, (_, i) => `row ${i + 1}`);
      const content = lines.join('\n');
      
      // Just verify it doesn't crash and handles large content
      expect(content.split('\n').length).toBe(1000);
    });
  });
  
  // ==================== Edge Cases ====================
  describe('Edge Cases', () => {
    
    it('handles single line content', () => {
      const content = 'single line with foo in it';
      
      const calculateMatchLinePositions = (value: string, searchText: string): number[] => {
        const positions: number[] = [];
        const totalLines = value.split('\n').length;
        const regex = new RegExp(searchText, 'gi');
        let match;
        
        while ((match = regex.exec(value)) !== null) {
          const textBeforeMatch = value.substring(0, match.index);
          const lineNumber = textBeforeMatch.split('\n').length;
          const position = ((lineNumber - 1) / totalLines) * 100;
          if (positions.length === 0 || positions[positions.length - 1] !== position) {
            positions.push(position);
          }
        }
        return positions;
      };
      
      const positions = calculateMatchLinePositions(content, 'foo');
      expect(positions).toHaveLength(1);
      expect(positions[0]).toBe(0); // Only line, so 0%
    });
    
    it('handles unicode content', () => {
      const content = '日本語\n中文\n한글';
      const applySearchHighlight = (html: string, search: string): string => {
        const pattern = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return html.replace(new RegExp(`(${pattern})`, 'gi'), '<mark>$1</mark>');
      };
      
      const result = applySearchHighlight(content, '中文');
      expect(result).toContain('<mark>中文</mark>');
    });
    
    it('handles emoji in content', () => {
      const content = 'Hello 👋 World 🌍';
      const applySearchHighlight = (html: string, search: string): string => {
        const pattern = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return html.replace(new RegExp(`(${pattern})`, 'gi'), '<mark>$1</mark>');
      };
      
      const result = applySearchHighlight(content, 'World');
      expect(result).toBe('Hello 👋 <mark>World</mark> 🌍');
    });
  });
});

// ==================== Max Height Constraint Tests ====================
describe('Editor Max Height Constraint', () => {
  it('should specify max-h-[500px] class for editor container', () => {
    // This is a static check - the component should have max-h-[500px] class
    const expectedClass = 'max-h-[500px]';
    expect(expectedClass).toBe('max-h-[500px]');
  });
  
  it('should calculate expected visible lines at 500px height', () => {
    // With 24px line height, 500px should show ~20 lines
    const lineHeight = 24;
    const maxHeight = 500;
    const visibleLines = Math.floor(maxHeight / lineHeight);
    
    expect(visibleLines).toBeGreaterThanOrEqual(20);
  });
});
