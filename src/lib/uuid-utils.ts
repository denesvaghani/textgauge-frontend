// UUID Generation Utilities
// Supports: UUID v4, UUID v7, ULID, NanoID

export type IdType = 'uuidv4' | 'uuidv7' | 'ulid' | 'nanoid';

export interface GenerateOptions {
  type: IdType;
  count: number;
  hyphens: boolean;
  uppercase: boolean;
  prefix?: string;
}

// Generate UUID v4 (random)
export const generateUuidV4 = (): string => {
  return crypto.randomUUID();
};

// Generate UUID v7 (timestamp-ordered)
export const generateUuidV7 = (): string => {
  // UUID v7 structure: timestamp (48 bits) + version (4 bits) + random (12 bits) + variant (2 bits) + random (62 bits)
  const timestamp = Date.now();
  
  // Create a 16-byte array
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  
  // Set timestamp (first 48 bits / 6 bytes)
  bytes[0] = (timestamp / 2**40) & 0xff;
  bytes[1] = (timestamp / 2**32) & 0xff;
  bytes[2] = (timestamp / 2**24) & 0xff;
  bytes[3] = (timestamp / 2**16) & 0xff;
  bytes[4] = (timestamp / 2**8) & 0xff;
  bytes[5] = timestamp & 0xff;
  
  // Set version 7 (4 bits in byte 6)
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  
  // Set variant (2 bits in byte 8)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  // Convert to hex string with hyphens
  const hex = Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};

// ULID alphabet (Crockford's Base32)
const ULID_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

// Generate ULID (Universally Unique Lexicographically Sortable Identifier)
export const generateUlid = (): string => {
  const timestamp = Date.now();
  
  // Encode timestamp (first 10 chars)
  let encodedTime = '';
  let t = timestamp;
  for (let i = 0; i < 10; i++) {
    encodedTime = ULID_ALPHABET[t % 32] + encodedTime;
    t = Math.floor(t / 32);
  }
  
  // Generate random part (last 16 chars)
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);
  
  let encodedRandom = '';
  for (let i = 0; i < 16; i++) {
    const byteIndex = Math.floor(i * 5 / 8);
    const bitOffset = (i * 5) % 8;
    let value: number;
    
    if (bitOffset <= 3) {
      value = (randomBytes[byteIndex] >> (3 - bitOffset)) & 0x1f;
    } else {
      value = ((randomBytes[byteIndex] << (bitOffset - 3)) | (randomBytes[byteIndex + 1] >> (11 - bitOffset))) & 0x1f;
    }
    
    encodedRandom += ULID_ALPHABET[value];
  }
  
  return encodedTime + encodedRandom;
};

// NanoID alphabet (URL-safe)
const NANOID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Generate NanoID (short, URL-friendly)
export const generateNanoId = (size: number = 21): string => {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  
  let id = '';
  for (let i = 0; i < size; i++) {
    id += NANOID_ALPHABET[bytes[i] & 63];
  }
  
  return id;
};

// Main generator function
export const generateIds = (options: GenerateOptions): string[] => {
  const { type, count, hyphens, uppercase, prefix = '' } = options;
  const ids: string[] = [];
  
  for (let i = 0; i < count; i++) {
    let id: string;
    
    switch (type) {
      case 'uuidv4':
        id = generateUuidV4();
        break;
      case 'uuidv7':
        id = generateUuidV7();
        break;
      case 'ulid':
        id = generateUlid();
        break;
      case 'nanoid':
        id = generateNanoId();
        break;
      default:
        id = generateUuidV4();
    }
    
    // Apply formatting options (only for UUID types)
    if (type === 'uuidv4' || type === 'uuidv7') {
      if (!hyphens) {
        id = id.replace(/-/g, '');
      }
    }
    
    if (uppercase) {
      id = id.toUpperCase();
    }
    
    // Add prefix if specified
    if (prefix) {
      id = prefix + id;
    }
    
    ids.push(id);
  }
  
  return ids;
};

// Export formats
export type ExportFormat = 'txt' | 'json' | 'csv' | 'sql';

export const exportIds = (ids: string[], format: ExportFormat, tableName: string = 'ids'): string => {
  switch (format) {
    case 'txt':
      return ids.join('\n');
    
    case 'json':
      return JSON.stringify(ids, null, 2);
    
    case 'csv':
      return 'id\n' + ids.join('\n');
    
    case 'sql':
      const values = ids.map(id => `('${id}')`).join(',\n  ');
      return `INSERT INTO ${tableName} (id) VALUES\n  ${values};`;
    
    default:
      return ids.join('\n');
  }
};

// Type descriptions for UI
export const ID_TYPE_INFO: Record<IdType, { name: string; description: string; example: string }> = {
  uuidv4: {
    name: 'UUID v4',
    description: 'Random UUID. Most widely used. Good for unpredictable IDs.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  },
  uuidv7: {
    name: 'UUID v7',
    description: 'Timestamp-ordered UUID. Better for databases. New standard.',
    example: '018d5f9c-7e8a-7000-8000-446655440000',
  },
  ulid: {
    name: 'ULID',
    description: 'Sortable 26-char ID. Compact and URL-friendly.',
    example: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
  },
  nanoid: {
    name: 'NanoID',
    description: 'Short 21-char ID. URL-safe. Great for web apps.',
    example: 'V1StGXR8_Z5jdHi6B-myT',
  },
};
