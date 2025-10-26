import { describe, it, expect } from 'vitest';
describe('user-dict', () => {
    describe('module exports', () => {
        it('exports getDB function', () => {
            const { getDB } = require('./index');
            expect(typeof getDB).toBe('function');
        });
        it('exports saveWord function', () => {
            const { saveWord } = require('./index');
            expect(typeof saveWord).toBe('function');
        });
        it('exports all function', () => {
            const { all } = require('./index');
            expect(typeof all).toBe('function');
        });
    });
    describe('function signatures', () => {
        it('getDB returns a promise', async () => {
            const { getDB } = require('./index');
            const result = getDB();
            expect(result).toBeInstanceOf(Promise);
        });
        it('saveWord accepts two string parameters', async () => {
            const { saveWord } = require('./index');
            // Should not throw with valid parameters
            await expect(saveWord('test', 'টেস্ট')).resolves.toBeUndefined();
        });
        it('all returns a promise', async () => {
            const { all } = require('./index');
            const result = all();
            expect(result).toBeInstanceOf(Promise);
        });
    });
});
