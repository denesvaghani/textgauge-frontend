/**
 * URL Encoding/Decoding Utilities
 * Provides functions for URL encoding, decoding, parsing, and query string manipulation.
 */

/**
 * Encodes a string for use in a URL component.
 * Uses encodeURIComponent which encodes all characters except: A-Z a-z 0-9 - _ . ! ~ * ' ( )
 */
export function encodeURLComponent(str: string): string {
  try {
    return encodeURIComponent(str);
  } catch {
    return str;
  }
}

/**
 * Decodes a URL-encoded string.
 * Handles malformed input gracefully by returning original string.
 */
export function decodeURLComponent(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch {
    // Return original string if decoding fails (malformed input)
    return str;
  }
}

/**
 * Recursively decodes a URL-encoded string until no more decoding is possible.
 * Useful for handling double or triple encoded URLs.
 * @param str - The string to decode
 * @param maxDepth - Maximum recursion depth (default: 10)
 */
export function recursiveDecode(str: string, maxDepth: number = 10): string {
  if (maxDepth <= 0) return str;
  
  try {
    const decoded = decodeURIComponent(str);
    // If nothing changed, we're done
    if (decoded === str) return str;
    // Otherwise, try decoding again
    return recursiveDecode(decoded, maxDepth - 1);
  } catch {
    return str;
  }
}

/**
 * Check how many times a string is encoded
 */
export function getEncodingDepth(str: string): number {
  let depth = 0;
  let current = str;
  const maxDepth = 10;
  
  while (depth < maxDepth) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) break;
      current = decoded;
      depth++;
    } catch {
      break;
    }
  }
  
  return depth;
}

export interface URLComponents {
  scheme: string;
  host: string;
  port: string;
  path: string;
  query: string;
  fragment: string;
  isValid: boolean;
}

/**
 * Parses a URL string into its components.
 */
export function parseURL(urlString: string): URLComponents {
  const empty: URLComponents = {
    scheme: '',
    host: '',
    port: '',
    path: '',
    query: '',
    fragment: '',
    isValid: false,
  };

  if (!urlString.trim()) return empty;

  try {
    const url = new URL(urlString);
    return {
      scheme: url.protocol.replace(':', ''),
      host: url.hostname,
      port: url.port,
      path: url.pathname,
      query: url.search.replace(/^\?/, ''),
      fragment: url.hash.replace(/^#/, ''),
      isValid: true,
    };
  } catch {
    // Try to parse as relative URL or malformed URL
    return empty;
  }
}

/**
 * Builds a URL string from components.
 */
export function buildURL(components: Partial<URLComponents>): string {
  const { scheme, host, port, path, query, fragment } = components;
  
  let url = '';
  
  if (scheme && host) {
    url += `${scheme}://${host}`;
    if (port) url += `:${port}`;
  }
  
  if (path) {
    url += path.startsWith('/') ? path : `/${path}`;
  }
  
  if (query) {
    url += `?${query}`;
  }
  
  if (fragment) {
    url += `#${fragment}`;
  }
  
  return url;
}

export interface QueryParam {
  key: string;
  value: string;
  id: string; // Unique identifier for React keys
}

/**
 * Parses a query string into an array of key-value pairs.
 * Handles duplicate keys by keeping all instances.
 */
export function parseQueryParams(queryString: string): QueryParam[] {
  if (!queryString.trim()) return [];
  
  // Remove leading ? if present
  const clean = queryString.replace(/^\?/, '');
  if (!clean) return [];
  
  const params: QueryParam[] = [];
  const pairs = clean.split('&');
  
  for (const pair of pairs) {
    const [key, ...valueParts] = pair.split('=');
    const value = valueParts.join('='); // Handle values with = in them
    
    if (key) {
      params.push({
        key: decodeURLComponent(key),
        value: decodeURLComponent(value || ''),
        id: crypto.randomUUID(),
      });
    }
  }
  
  return params;
}

/**
 * Builds a query string from an array of key-value pairs.
 */
export function buildQueryString(params: QueryParam[]): string {
  if (params.length === 0) return '';
  
  return params
    .filter(p => p.key.trim()) // Skip empty keys
    .map(p => {
      const key = encodeURLComponent(p.key);
      const value = encodeURLComponent(p.value);
      return value ? `${key}=${value}` : key;
    })
    .join('&');
}

/**
 * Common URL-encoded characters reference
 */
export const COMMON_ENCODINGS: Array<{ char: string; encoded: string; description: string }> = [
  { char: ' ', encoded: '%20', description: 'Space' },
  { char: '!', encoded: '%21', description: 'Exclamation mark' },
  { char: '#', encoded: '%23', description: 'Hash/Pound' },
  { char: '$', encoded: '%24', description: 'Dollar sign' },
  { char: '%', encoded: '%25', description: 'Percent sign' },
  { char: '&', encoded: '%26', description: 'Ampersand' },
  { char: "'", encoded: '%27', description: 'Single quote' },
  { char: '(', encoded: '%28', description: 'Open parenthesis' },
  { char: ')', encoded: '%29', description: 'Close parenthesis' },
  { char: '+', encoded: '%2B', description: 'Plus sign' },
  { char: ',', encoded: '%2C', description: 'Comma' },
  { char: '/', encoded: '%2F', description: 'Forward slash' },
  { char: ':', encoded: '%3A', description: 'Colon' },
  { char: ';', encoded: '%3B', description: 'Semicolon' },
  { char: '=', encoded: '%3D', description: 'Equals sign' },
  { char: '?', encoded: '%3F', description: 'Question mark' },
  { char: '@', encoded: '%40', description: 'At sign' },
  { char: '[', encoded: '%5B', description: 'Open bracket' },
  { char: ']', encoded: '%5D', description: 'Close bracket' },
];
