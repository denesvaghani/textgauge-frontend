// Hash Generation Utilities
// Supports: MD5, SHA-1, SHA-256, SHA-384, SHA-512

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
  security: 'insecure' | 'weak' | 'secure';
  securityNote: string;
}

// MD5 implementation (not available in Web Crypto API)
// Based on RFC 1321 - optimized for browser
function md5(input: string): string {
  function rotateLeft(x: number, n: number): number {
    return (x << n) | (x >>> (32 - n));
  }

  function addUnsigned(x: number, y: number): number {
    const x8 = x & 0x80000000;
    const y8 = y & 0x80000000;
    const x4 = x & 0x40000000;
    const y4 = y & 0x40000000;
    const result = (x & 0x3fffffff) + (y & 0x3fffffff);
    if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8;
    if (x4 | y4) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x8 ^ y8;
      else return result ^ 0x40000000 ^ x8 ^ y8;
    }
    return result ^ x8 ^ y8;
  }

  function f(x: number, y: number, z: number): number { return (x & y) | (~x & z); }
  function g(x: number, y: number, z: number): number { return (x & z) | (y & ~z); }
  function h(x: number, y: number, z: number): number { return x ^ y ^ z; }
  function i(x: number, y: number, z: number): number { return y ^ (x | ~z); }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function utf8Encode(str: string): string {
    let output = '';
    for (let n = 0; n < str.length; n++) {
      const c = str.charCodeAt(n);
      if (c < 128) {
        output += String.fromCharCode(c);
      } else if (c < 2048) {
        output += String.fromCharCode((c >> 6) | 192);
        output += String.fromCharCode((c & 63) | 128);
      } else {
        output += String.fromCharCode((c >> 12) | 224);
        output += String.fromCharCode(((c >> 6) & 63) | 128);
        output += String.fromCharCode((c & 63) | 128);
      }
    }
    return output;
  }

  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  const str = utf8Encode(input);
  const x: number[] = [];
  let k: number, AA: number, BB: number, CC: number, DD: number;
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

  const len = str.length;
  const wordLen = ((len + 8) >> 6) + 1;
  const totalLen = wordLen * 16;

  for (k = 0; k < totalLen; k++) x[k] = 0;

  for (k = 0; k < len; k++) {
    x[k >> 2] |= str.charCodeAt(k) << ((k % 4) * 8);
  }
  x[k >> 2] |= 0x80 << ((k % 4) * 8);
  x[totalLen - 2] = len * 8;

  for (k = 0; k < totalLen; k += 16) {
    AA = a; BB = b; CC = c; DD = d;
    a = ff(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = ff(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = ff(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = ff(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = ff(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = ff(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = ff(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = ff(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = ff(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = ff(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = ff(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = ff(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = ff(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = ff(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = ff(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = ff(b, c, d, a, x[k + 15], S14, 0x49b40821);
    a = gg(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = gg(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = gg(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = gg(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = gg(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = gg(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = gg(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = gg(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = gg(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = gg(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = gg(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = gg(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = gg(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = gg(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = gg(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = gg(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
    a = hh(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = hh(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = hh(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = hh(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = hh(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = hh(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = hh(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = hh(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = hh(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = hh(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = hh(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = hh(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = hh(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = hh(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = hh(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = hh(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
    a = ii(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = ii(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = ii(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = ii(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = ii(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = ii(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = ii(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = ii(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = ii(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = ii(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = ii(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = ii(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = ii(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = ii(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = ii(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = ii(b, c, d, a, x[k + 9], S44, 0xeb86d391);
    a = addUnsigned(a, AA); b = addUnsigned(b, BB);
    c = addUnsigned(c, CC); d = addUnsigned(d, DD);
  }

  const hexChars = '0123456789abcdef';
  const toHex = (n: number) => {
    let s = '';
    for (let j = 0; j < 4; j++) {
      s += hexChars.charAt((n >> (j * 8 + 4)) & 0x0f) + hexChars.charAt((n >> (j * 8)) & 0x0f);
    }
    return s;
  };

  return toHex(a) + toHex(b) + toHex(c) + toHex(d);
}

// SHA-1 implementation (not available in older browsers, fallback)
async function sha1(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// SHA-256 using Web Crypto API
async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// SHA-384 using Web Crypto API
async function sha384(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-384', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// SHA-512 using Web Crypto API
async function sha512(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// File hashing functions
export async function hashFile(file: File, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashFileMd5(file: File): Promise<string> {
  const text = await file.text();
  return md5(text);
}

// Security information for each algorithm
const ALGORITHM_INFO: Record<HashAlgorithm, { security: 'insecure' | 'weak' | 'secure'; note: string }> = {
  'MD5': { security: 'insecure', note: 'Broken. Use only for checksums, not security.' },
  'SHA-1': { security: 'weak', note: 'Deprecated. Avoid for security-critical uses.' },
  'SHA-256': { security: 'secure', note: 'Recommended for most security uses.' },
  'SHA-384': { security: 'secure', note: 'Strong security with larger output.' },
  'SHA-512': { security: 'secure', note: 'Maximum security, 512-bit output.' },
};

// Generate all hashes at once
export async function generateAllHashes(input: string): Promise<HashResult[]> {
  const algorithms: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
  
  const results = await Promise.all([
    Promise.resolve(md5(input)),
    sha1(input),
    sha256(input),
    sha384(input),
    sha512(input),
  ]);
  
  return algorithms.map((algo, index) => ({
    algorithm: algo,
    hash: results[index],
    security: ALGORITHM_INFO[algo].security,
    securityNote: ALGORITHM_INFO[algo].note,
  }));
}

// Generate file hashes
export async function generateFileHashes(file: File): Promise<HashResult[]> {
  const algorithms: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
  
  const results = await Promise.all([
    hashFileMd5(file),
    hashFile(file, 'SHA-1'),
    hashFile(file, 'SHA-256'),
    hashFile(file, 'SHA-384'),
    hashFile(file, 'SHA-512'),
  ]);
  
  return algorithms.map((algo, index) => ({
    algorithm: algo,
    hash: results[index],
    security: ALGORITHM_INFO[algo].security,
    securityNote: ALGORITHM_INFO[algo].note,
  }));
}

// Export formats
export function exportHashesAsJson(input: string, results: HashResult[]): string {
  return JSON.stringify({
    input: input.length > 100 ? input.substring(0, 100) + '...' : input,
    generated: new Date().toISOString(),
    hashes: results.reduce((acc, r) => ({ ...acc, [r.algorithm]: r.hash }), {}),
  }, null, 2);
}

export function exportHashesAsCsv(results: HashResult[]): string {
  const header = 'Algorithm,Hash,Security';
  const rows = results.map(r => `${r.algorithm},${r.hash},${r.security}`);
  return [header, ...rows].join('\n');
}

export function exportHashesAsTxt(results: HashResult[]): string {
  return results.map(r => `${r.algorithm}: ${r.hash}`).join('\n');
}
