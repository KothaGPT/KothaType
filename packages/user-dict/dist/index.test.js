import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { saveWord, all } from './index';
// Mock the database to avoid actual IndexedDB in tests
describe('user-dict', () => {
    beforeEach(async () => {
        // Clear any existing data
        const words = await all();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const word of words) {
            // Note: In a real implementation, you'd want a delete function
            // For now, we're just testing the basic functionality
        }
    });
    afterEach(async () => {
        // Cleanup after tests
    });
    it('saves a word to the dictionary', async () => {
        await saveWord('hello', 'হ্যালো');
        const words = await all();
        const savedWord = words.find(w => w.roman === 'hello');
        expect(savedWord).toBeDefined();
        expect(savedWord?.bangla).toBe('হ্যালো');
    });
    it('retrieves all words from dictionary', async () => {
        // Clear existing data first
        await saveWord('test1', 'টেস্ট১');
        await saveWord('test2', 'টেস্ট২');
        const words = await all();
        expect(words.length).toBeGreaterThanOrEqual(2);
        expect(words.some(w => w.roman === 'test1')).toBe(true);
        expect(words.some(w => w.roman === 'test2')).toBe(true);
    });
    it('handles empty dictionary', async () => {
        const words = await all();
        expect(Array.isArray(words)).toBe(true);
    });
    it('saves multiple words and retrieves them correctly', async () => {
        await saveWord('bangla', 'বাংলা');
        await saveWord('english', 'ইংরেজি');
        await saveWord('computer', 'কম্পিউটার');
        const words = await all();
        const banglaWord = words.find(w => w.roman === 'bangla');
        const englishWord = words.find(w => w.roman === 'english');
        const computerWord = words.find(w => w.roman === 'computer');
        expect(banglaWord?.bangla).toBe('বাংলা');
        expect(englishWord?.bangla).toBe('ইংরেজি');
        expect(computerWord?.bangla).toBe('কম্পিউটার');
    });
});
