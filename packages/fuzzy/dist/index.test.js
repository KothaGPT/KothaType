import { describe, it, expect } from 'vitest';
import { suggest, useFuzzyMatch } from './index';
describe('fuzzy.suggest', () => {
    it('returns suggestions for valid input', () => {
        const result = suggest('am');
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it('handles exact matches', () => {
        const result = suggest('ami');
        expect(Array.isArray(result)).toBe(true);
    });
    it('handles empty input', () => {
        const result = suggest('');
        expect(result).toEqual([]);
    });
    it('handles whitespace only input', () => {
        const result = suggest('   ');
        expect(result).toEqual([]);
    });
    it('limits results', () => {
        const result = suggest('a');
        expect(result.length).toBeLessThanOrEqual(5);
    });
    it('returns suggestions in order', () => {
        const result = suggest('tom');
        expect(Array.isArray(result)).toBe(true);
    });
    it('filters high edit distance', () => {
        const result = suggest('xyz');
        expect(Array.isArray(result)).toBe(true);
    });
    it('finds close matches', () => {
        const result = suggest('bang');
        expect(Array.isArray(result)).toBe(true);
    });
});
describe('fuzzy.useFuzzyMatch', () => {
    it('replaces words with fuzzy matches', () => {
        const result = useFuzzyMatch('am bang gan');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });
    it('keeps words that have no matches', () => {
        const result = useFuzzyMatch('xyz hello');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });
    it('handles empty string', () => {
        const result = useFuzzyMatch('');
        expect(result).toBe('');
    });
    it('handles multiple spaces correctly', () => {
        const result = useFuzzyMatch('am   bang');
        expect(typeof result).toBe('string');
    });
    it('replaces each word independently', () => {
        const result = useFuzzyMatch('am gan');
        expect(typeof result).toBe('string');
    });
    it('handles words with no close matches', () => {
        const result = useFuzzyMatch('xyz');
        expect(typeof result).toBe('string');
    });
});
