import { describe, it, expect } from 'vitest';
import { suggest, useFuzzyMatch } from './index';

describe('fuzzy.suggest', () => {
  it('returns suggestions sorted by edit distance', () => {
    const result = suggest('am');
    expect(result).toContain('ami');
    expect(result.length).toBeLessThanOrEqual(5);
  });

  it('handles exact matches', () => {
    const result = suggest('ami');
    expect(result[0]).toBe('ami');
  });

  it('handles empty input', () => {
    const result = suggest('');
    expect(result).toEqual([]);
  });

  it('limits results to 5 suggestions', () => {
    const result = suggest('a');
    expect(result.length).toBeLessThanOrEqual(5);
  });

  it('returns suggestions in order of similarity', () => {
    const result = suggest('tom');
    expect(result[0]).toBe('tomar');
  });
});

describe('fuzzy.useFuzzyMatch', () => {
  it('replaces words with fuzzy matches', () => {
    const result = useFuzzyMatch('am bang gan');
    expect(result).toContain('ami');
    expect(result).toContain('bangla');
    expect(result).toContain('gan');
  });

  it('keeps words that have no matches', () => {
    const result = useFuzzyMatch('xyz hello');
    expect(result).toBe('xyz hello');
  });

  it('handles empty string', () => {
    const result = useFuzzyMatch('');
    expect(result).toBe('');
  });

  it('handles multiple spaces correctly', () => {
    const result = useFuzzyMatch('am   bang');
    expect(result).toBe('ami   bangla');
  });

  it('replaces each word independently', () => {
    const result = useFuzzyMatch('am gan');
    expect(result).toBe('ami gan');
  });
});
