/**
 * Encodes a string to Base64, handling UTF-8 characters correctly.
 */
export function toBase64(str: string, urlSafe = false): string {
  try {
    // Handle Unicode strings
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (byte) =>
      String.fromCodePoint(byte)
    ).join("");
    const base64 = btoa(binString);
    
    if (urlSafe) {
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return base64;
  } catch (err) {
    return "";
  }
}

/**
 * Decodes a Base64 string to text, handling UTF-8 characters correctly.
 */
export const fromBase64 = (str: string): string => {
  try {
    // Auto-fix URL safe characters
    const standard = str.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(atob(standard).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    throw new Error('Invalid Base64 string.');
  }
};
