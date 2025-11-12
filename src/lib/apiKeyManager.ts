/**
 * API Key Manager
 * Handles rotation of multiple API keys to overcome rate limits
 */

interface ApiKeyConfig {
  keys: string[];
  currentIndex: number;
  failedKeys: Set<string>;
}

class ApiKeyManager {
  private config: ApiKeyConfig;

  constructor(keys: string[]) {
    this.config = {
      keys: keys.filter(k => k && k.trim() !== ''), // Remove empty keys
      currentIndex: 0,
      failedKeys: new Set(),
    };

    if (this.config.keys.length === 0) {
      console.warn('No valid API keys configured');
    }
  }

  /**
   * Get the next available API key
   * Uses round-robin rotation, skipping failed keys
   */
  getNextKey(): string | null {
    if (this.config.keys.length === 0) {
      return null;
    }

    const availableKeys = this.config.keys.filter(
      key => !this.config.failedKeys.has(key)
    );

    if (availableKeys.length === 0) {
      // All keys failed, reset and try again
      console.warn('All API keys failed, resetting failure state');
      this.config.failedKeys.clear();
      return this.config.keys[0];
    }

    // Get current key
    const key = availableKeys[this.config.currentIndex % availableKeys.length];
    
    // Rotate to next key for next request
    this.config.currentIndex = (this.config.currentIndex + 1) % availableKeys.length;

    return key;
  }

  /**
   * Mark a key as failed (rate limited or error)
   * Will be excluded from rotation temporarily
   */
  markKeyAsFailed(key: string): void {
    this.config.failedKeys.add(key);
    console.log(`API key marked as failed. ${this.config.failedKeys.size}/${this.config.keys.length} keys failed`);

    // Auto-reset failed keys after 1 minute
    setTimeout(() => {
      this.config.failedKeys.delete(key);
      console.log(`API key recovered: ${key.substring(0, 10)}...`);
    }, 60000); // 1 minute cooldown
  }

  /**
   * Get statistics about key usage
   */
  getStats() {
    return {
      totalKeys: this.config.keys.length,
      availableKeys: this.config.keys.length - this.config.failedKeys.size,
      failedKeys: this.config.failedKeys.size,
      currentIndex: this.config.currentIndex,
    };
  }

  /**
   * Reset all failure states
   */
  reset(): void {
    this.config.failedKeys.clear();
    this.config.currentIndex = 0;
  }
}

/**
 * Load API keys from environment variable
 * Format: GEMINI_API_KEYS=key1,key2,key3
 */
function loadApiKeys(): string[] {
  const keysString = process.env.GEMINI_API_KEYS || '';
  
  if (!keysString) {
    console.warn('GEMINI_API_KEYS not configured. Add comma-separated keys to .env.local');
    return [];
  }

  const keys = keysString
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0);

  console.log(`Loaded ${keys.length} Gemini API keys`);
  return keys;
}

// Singleton instance
let keyManager: ApiKeyManager | null = null;

/**
 * Get the global API key manager instance
 */
export function getApiKeyManager(): ApiKeyManager {
  if (!keyManager) {
    const keys = loadApiKeys();
    keyManager = new ApiKeyManager(keys);
  }
  return keyManager;
}

/**
 * Get a working API key with automatic rotation
 */
export async function getWorkingApiKey(): Promise<string> {
  const manager = getApiKeyManager();
  const key = manager.getNextKey();
  
  if (!key) {
    throw new Error('No API keys available. Please configure GEMINI_API_KEYS in .env.local');
  }
  
  return key;
}

/**
 * Report that an API key failed (rate limited or error)
 */
export function reportKeyFailure(key: string): void {
  const manager = getApiKeyManager();
  manager.markKeyAsFailed(key);
}

/**
 * Get current API key statistics
 */
export function getKeyStats() {
  const manager = getApiKeyManager();
  return manager.getStats();
}
