import { describe, it, expect } from 'vitest';
import { env } from '../config/env';

describe('Backend Environment Configuration', () => {
  it('should load environment variables correctly', () => {
    expect(env.PORT).toBeDefined();
    expect(env.NODE_ENV).toBe('test');
    expect(env.CORS_ORIGIN).toBe('http://localhost:5173');
  });
});
