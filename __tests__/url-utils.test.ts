/**
 * URL Encoding/Decoding Utilities Tests
 */

import {
  encodeURLComponent,
  decodeURLComponent,
  recursiveDecode,
  getEncodingDepth,
  parseURL,
  buildURL,
  parseQueryParams,
  buildQueryString,
} from '../src/lib/url-utils';

describe('encodeURLComponent', () => {
  test('encodes basic ASCII text', () => {
    expect(encodeURLComponent('hello world')).toBe('hello%20world');
  });

  test('encodes special characters', () => {
    expect(encodeURLComponent('a=b&c=d')).toBe('a%3Db%26c%3Dd');
  });

  test('encodes reserved URL characters', () => {
    expect(encodeURLComponent('?query=value')).toBe('%3Fquery%3Dvalue');
  });

  test('encodes Unicode/emoji characters', () => {
    expect(encodeURLComponent('👋🌍')).toBe('%F0%9F%91%8B%F0%9F%8C%8D');
  });

  test('encodes CJK characters', () => {
    const encoded = encodeURLComponent('你好');
    expect(encoded).toBe('%E4%BD%A0%E5%A5%BD');
  });

  test('handles empty string', () => {
    expect(encodeURLComponent('')).toBe('');
  });
});

describe('decodeURLComponent', () => {
  test('decodes basic percent-encoded string', () => {
    expect(decodeURLComponent('hello%20world')).toBe('hello world');
  });

  test('decodes special characters', () => {
    expect(decodeURLComponent('a%3Db%26c%3Dd')).toBe('a=b&c=d');
  });

  test('decodes Unicode/emoji', () => {
    expect(decodeURLComponent('%F0%9F%91%8B%F0%9F%8C%8D')).toBe('👋🌍');
  });

  test('handles malformed input gracefully', () => {
    expect(decodeURLComponent('%ZZ')).toBe('%ZZ'); // Invalid hex
    expect(decodeURLComponent('%')).toBe('%'); // Incomplete encoding
  });

  test('handles empty string', () => {
    expect(decodeURLComponent('')).toBe('');
  });
});

describe('recursiveDecode', () => {
  test('decodes single-encoded string', () => {
    expect(recursiveDecode('hello%20world')).toBe('hello world');
  });

  test('decodes double-encoded string', () => {
    expect(recursiveDecode('hello%2520world')).toBe('hello world');
  });

  test('decodes triple-encoded string', () => {
    expect(recursiveDecode('hello%252520world')).toBe('hello world');
  });

  test('respects maxDepth parameter', () => {
    // Basic check that maxDepth=0 returns original string without decoding
    const encoded = 'hello%20world';
    expect(recursiveDecode(encoded, 0)).toBe('hello%20world');
    // maxDepth=1 should decode once
    expect(recursiveDecode(encoded, 1)).toBe('hello world');
  });

  test('returns original on non-encoded string', () => {
    expect(recursiveDecode('hello world')).toBe('hello world');
  });
});

describe('getEncodingDepth', () => {
  test('returns 0 for non-encoded string', () => {
    expect(getEncodingDepth('hello world')).toBe(0);
  });

  test('returns 1 for single-encoded string', () => {
    expect(getEncodingDepth('hello%20world')).toBe(1);
  });

  test('returns 2 for double-encoded string', () => {
    expect(getEncodingDepth('hello%2520world')).toBe(2);
  });

  test('returns 3 for triple-encoded string', () => {
    expect(getEncodingDepth('hello%252520world')).toBe(3);
  });
});

describe('parseURL', () => {
  test('parses complete URL', () => {
    const result = parseURL('https://example.com:8080/path/to/page?q=test&lang=en#section');
    expect(result.isValid).toBe(true);
    expect(result.scheme).toBe('https');
    expect(result.host).toBe('example.com');
    expect(result.port).toBe('8080');
    expect(result.path).toBe('/path/to/page');
    expect(result.query).toBe('q=test&lang=en');
    expect(result.fragment).toBe('section');
  });

  test('parses minimal URL', () => {
    const result = parseURL('http://example.com');
    expect(result.isValid).toBe(true);
    expect(result.scheme).toBe('http');
    expect(result.host).toBe('example.com');
    expect(result.path).toBe('/');
  });

  test('returns invalid for empty string', () => {
    expect(parseURL('').isValid).toBe(false);
  });

  test('returns invalid for malformed URL', () => {
    expect(parseURL('not-a-url').isValid).toBe(false);
  });
});

describe('buildURL', () => {
  test('builds complete URL from components', () => {
    const url = buildURL({
      scheme: 'https',
      host: 'example.com',
      port: '8080',
      path: '/search',
      query: 'q=test',
      fragment: 'results',
    });
    expect(url).toBe('https://example.com:8080/search?q=test#results');
  });

  test('builds URL without optional components', () => {
    const url = buildURL({
      scheme: 'https',
      host: 'example.com',
      path: '/page',
    });
    expect(url).toBe('https://example.com/page');
  });
});

describe('parseQueryParams', () => {
  test('parses basic query string', () => {
    const params = parseQueryParams('a=1&b=2');
    expect(params).toHaveLength(2);
    expect(params[0].key).toBe('a');
    expect(params[0].value).toBe('1');
    expect(params[1].key).toBe('b');
    expect(params[1].value).toBe('2');
  });

  test('handles URL-encoded values', () => {
    const params = parseQueryParams('q=hello%20world');
    expect(params[0].key).toBe('q');
    expect(params[0].value).toBe('hello world');
  });

  test('handles empty values', () => {
    const params = parseQueryParams('key=');
    expect(params[0].key).toBe('key');
    expect(params[0].value).toBe('');
  });

  test('handles values with = sign', () => {
    const params = parseQueryParams('equation=1+1=2');
    expect(params[0].key).toBe('equation');
    expect(params[0].value).toBe('1+1=2');
  });

  test('removes leading ?', () => {
    const params = parseQueryParams('?a=1');
    expect(params[0].key).toBe('a');
  });

  test('handles empty string', () => {
    expect(parseQueryParams('')).toHaveLength(0);
  });
});

describe('buildQueryString', () => {
  test('builds query string from params', () => {
    const result = buildQueryString([
      { key: 'a', value: '1', id: '1' },
      { key: 'b', value: '2', id: '2' },
    ]);
    expect(result).toBe('a=1&b=2');
  });

  test('encodes special characters', () => {
    const result = buildQueryString([
      { key: 'q', value: 'hello world', id: '1' },
    ]);
    expect(result).toBe('q=hello%20world');
  });

  test('skips empty keys', () => {
    const result = buildQueryString([
      { key: '', value: 'ignored', id: '1' },
      { key: 'valid', value: 'kept', id: '2' },
    ]);
    expect(result).toBe('valid=kept');
  });

  test('handles empty value', () => {
    const result = buildQueryString([
      { key: 'flag', value: '', id: '1' },
    ]);
    expect(result).toBe('flag');
  });
});
