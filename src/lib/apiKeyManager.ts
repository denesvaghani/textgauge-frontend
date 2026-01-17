/**
 * API Key Manager
 * Handles rotation of multiple API keys to overcome rate limits
 */

interface ApiKeyStats {
  totalKeys: number;
  activeKeyIndex: number | null;
  failedKeys: string[];
  cooldownMs: number;
}


class ApiKeyManager {
  private keys: string[];
  private currentIndex = 0;
  private failedAt = new Map<string, number>();
  private readonly cooldownMs = 60_000; // 60s cooldown per failed key

  constructor(keys: string[]) {
    this.keys = keys.map((k) => k.trim()).filter(Boolean);
  }

  hasKeys() {
    return this.keys.length > 0;
  }

  getNextKey(): string {
    if (!this.keys.length) {
      throw new Error(
        "No Gemini API keys configured. Set GEMINI_API_KEYS in your environment.",
      );
    }

    const now = Date.now();

    // Try each key at most once per call
    for (let offset = 0; offset < this.keys.length; offset++) {
      const idx = (this.currentIndex + offset) % this.keys.length;
      const key = this.keys[idx];
      const failedTime = this.failedAt.get(key);

      if (!failedTime || now - failedTime > this.cooldownMs) {
        this.currentIndex = idx;
        return key;
      }
    }

    // If all keys are in cooldown, just return the current one anyway
    return this.keys[this.currentIndex];
  }

  markKeyAsFailed(key: string) {
    if (!key) return;
    this.failedAt.set(key, Date.now());
  }

  getStats(): ApiKeyStats {
    return {
      totalKeys: this.keys.length,
      activeKeyIndex: this.keys.length ? this.currentIndex : null,
      failedKeys: Array.from(this.failedAt.keys()),
      cooldownMs: this.cooldownMs,
    };
  }
}

let manager: ApiKeyManager | null = null;

function initManager(): ApiKeyManager {
  if (manager) return manager;

  const raw =
    process.env.GEMINI_API_KEYS ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || // fallback if needed
    "";

  const keys = raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  manager = new ApiKeyManager(keys);
  return manager;
}

/**
 * Get a currently usable API key (with simple rotation + cooldown)
 */
export function getWorkingApiKey(): string {
  const m = initManager();
  return m.getNextKey();
}

/**
 * Report that an API key failed (rate limited or error)
 */
export function reportKeyFailure(key: string): void {
  const m = initManager();
  m.markKeyAsFailed(key);
}

/**
 * Get current API key statistics (for /api/rephrase GET health check)
 */
export function getKeyStats(): ApiKeyStats {
  const m = initManager();
  return m.getStats();
}
