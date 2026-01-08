
import { describeCron } from '../src/lib/cron-utils';

describe('describeCron', () => {
  test('should describe simple every minute', () => {
    expect(describeCron('* * * * *')).toBe('Every minute');
  });

  test('should describe every 30 minutes', () => {
    expect(describeCron('*/30 * * * *')).toBe('Runs every 30 minutes');
  });

  test('should describe specific time', () => {
    // 0 0 * * * -> Every day at midnight
    expect(describeCron('0 0 * * *')).toBe('Every Day at Midnight'); // Based on preset override or general logic usually
    // Since our util might have specific overrides, let's check general logic if overrides aren't hit or hit correctly.
    // The current util has unique returns for "Every minute" and "At minute 0 past every hour".
    // "Runs at minute 0, past hour 0" is acceptable if no preset override.
  });

  test('should return invalid for invalid minute range', () => {
    expect(describeCron('76 * * * *')).toBe('Invalid cron expression');
  });

  test('should return invalid for invalid hour range', () => {
    expect(describeCron('* 87 * * *')).toBe('Invalid cron expression');
  });

  test('should return invalid for invalid day of month', () => {
    expect(describeCron('* * 32 * *')).toBe('Invalid cron expression');
  });

  test('should return invalid for invalid month', () => {
    expect(describeCron('* * * 13 *')).toBe('Invalid cron expression');
  });
  
  test('should return invalid for invalid day of week', () => {
    expect(describeCron('* * * * 8')).toBe('Invalid cron expression');
  });

  test('should handle valid list', () => {
      // List support might be basic in current implementation, but let's assume we want it valid or at least not crashing.
      // If logic update supports it, this should pass.
      const result = describeCron('0,30 * * * *');
      expect(result).not.toBe('Invalid cron expression');
  });
  
  test('should handle valid range', () => {
      const result = describeCron('0-30 * * * *');
      expect(result).not.toBe('Invalid cron expression');
  });

  test('should return invalid for gibberish', () => {
    expect(describeCron('hello world * * *')).toBe('Invalid cron expression');
  });
});
