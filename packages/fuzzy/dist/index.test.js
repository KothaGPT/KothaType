import { describe, it, expect } from 'vitest';
import { suggest, useFuzzyMatch } from './index';
describe('fuzzy.suggest', () => {
    it('suggests plausible completions', () => {
        const s = suggest('bangl');
        expect(s[0]).toBe('bangla');
    });
    it('returns top 5 suggestions by default', () => {
        const s = suggest('a');
        expect(s.length).toBe(5);
    });
    it('suggests exact matches first', () => {
        const s = suggest('ami');
        expect(s[0]).toBe('ami');
    });
    it('handles empty input', () => {
        const s = suggest('');
        expect(s.length).toBe(5);
        expect(s[0]).toBe('ami'); // closest to empty string
    });
    it('suggests based on edit distance', () => {
        const s = suggest('bngla');
        expect(s[0]).toBe('bangla');
    });
    it('returns suggestions in order of similarity', () => {
        const s = suggest('gan');
        expect(s[0]).toBe('gan');
        expect(s[1]).toBe('nam');
    });
});
describe('fuzzy.useFuzzyMatch', () => {
    it('replaces words with fuzzy matches', () => {
        const result = useFuzzyMatch('am bangl gan');
        expect(result).toBe('ami bangla gan');
    });
    it('leaves unmatched words unchanged', () => {
        const result = useFuzzyMatch('hello ami world');
        expect(result).toBe('hello ami world');
    });
    it('handles multiple spaces correctly', () => {
        const result = useFuzzyMatch('  ami   bangla  ');
        expect(result).toBe('ami bangla');
    });
    it('handles empty string', () => {
        expect(useFuzzyMatch('')).toBe('');
    });
    it('processes entire sentences', () => {
        const result = useFuzzyMatch('tomr nam ami likhb');
        expect(result).toBe('tomar nam ami likhbo');
    });
});
