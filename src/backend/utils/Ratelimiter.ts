type RateData = {
  count: number;
  reset: number;
};

export class RateLimiter {
  private static store = new Map<string, RateData>();
  private static LIMIT = 100;
  private static WINDOW = 15 * 60 * 1000;

  static check(key: string) {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || record.reset < now) {
      this.store.set(key, { count: 1, reset: now + this.WINDOW });
      return {
        allowed: true,
        limit: this.LIMIT,
        remaining: this.LIMIT - 1,
        reset: now + this.WINDOW,
      };
    }

    if (record.count >= this.LIMIT) {
      return {
        allowed: false,
        limit: this.LIMIT,
        remaining: 0,
        reset: record.reset,
      };
    }

    record.count++;
    return {
      allowed: true,
      limit: this.LIMIT,
      remaining: this.LIMIT - record.count,
      reset: record.reset,
    };
  }
}
