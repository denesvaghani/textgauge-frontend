/**
 * Encodes a string to Base64, handling UTF-8 characters correctly.
 */
export const toBase64 = (str: string): string => {
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      }));
  } catch (e) {
    throw new Error('Unable to encode input.');
  }
};

/**
 * Decodes a Base64 string to text, handling UTF-8 characters correctly.
 */
export const fromBase64 = (str: string): string => {
  try {
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    throw new Error('Invalid Base64 string.');
  }
};
